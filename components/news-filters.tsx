"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

const categories = [
  { id: "general", name: "Geral" },
  { id: "business", name: "Economia" },
  { id: "technology", name: "Tecnologia" },
  { id: "entertainment", name: "Cultura" },
  { id: "health", name: "Saúde" },
  { id: "science", name: "Ciência" },
  { id: "sports", name: "Esportes" },
]

export function NewsFilters({ activeCategory = "general" }: { activeCategory: string }) {
  const router = useRouter()

  const handleCategoryChange = (category: string) => {
    router.push(`/?category=${category}&page=1`)
  }

  return (
    <div className="flex flex-wrap gap-2 justify-center mb-6">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={category.id === activeCategory ? "default" : "outline"}
          onClick={() => handleCategoryChange(category.id)}
        >
          {category.name}
        </Button>
      ))}
    </div>
  )
}

