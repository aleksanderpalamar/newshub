"use client";

import { Search, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function NoResults({
  error = false,
  errorMessage = "",
}: {
  error?: boolean;
  errorMessage?: string;
}) {
  if (error) {
    return (
      <Alert variant="destructive" className="my-8">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Erro ao carregar notícias</AlertTitle>
        <AlertDescription>
          <p>{errorMessage || "Ocorreu um erro ao carregar as notícias."}</p>
          {errorMessage && errorMessage.includes("403") && (
            <p className="mt-2">
              Você precisa ativar sua conta GNews. Verifique seu email ou
              solicite um novo email de ativação em:
              <a
                href="https://gnews.io/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="underline ml-1"
              >
                https://gnews.io/dashboard
              </a>
            </p>
          )}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert className="my-8 bg-muted">
      <Search className="h-4 w-4" />
      <AlertTitle>Nenhuma notícia encontrada</AlertTitle>
      <AlertDescription>
        Não encontramos notícias para os critérios selecionados. Tente mudar a
        categoria ou voltar mais tarde.
      </AlertDescription>
    </Alert>
  );
}
