"use client";

import Image from "next/image";
import { formatDistanceToNow, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { Article } from "@/lib/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useState } from "react";

export function NewsCard({ article }: { article: Article }) {
  const { title, description, url, urlToImage, source, publishedAt } = article;
  const [imgSrc, setImgSrc] = useState(
    urlToImage || "/placeholder.svg?height=192&width=384"
  );

  // Safely parse the date
  const formattedDate = publishedAt
    ? (() => {
        try {
          return formatDistanceToNow(parseISO(publishedAt), {
            addSuffix: true,
            locale: ptBR,
          });
        } catch (e) {
          return "Data recente";
        }
      })()
    : "Data desconhecida";

  // Handle image error
  const handleImageError = () => {
    setImgSrc("/placeholder.svg?height=192&width=384");
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow relative">
      <div className="relative h-48 w-full bg-gray-100">
        <Image
          src={imgSrc || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover"
          onError={handleImageError}
        />
      </div>
      <CardContent className="py-4 flex-grow">
        <h2 className="text-xl font-bold line-clamp-2 mb-2">{title}</h2>
        <p className="text-gray-600 line-clamp-3">
          {description || "Sem descrição disponível"}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-0 pb-4 text-sm text-gray-500">
        <span className="font-medium">
          {source?.name || "Fonte desconhecida"}
        </span>
        <time dateTime={publishedAt}>{formattedDate}</time>
      </CardFooter>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-10"
        aria-label={title}
      >
        <span className="sr-only">Ler mais sobre {title}</span>
      </a>
    </Card>
  );
}
