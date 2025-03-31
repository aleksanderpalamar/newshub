import { Suspense } from "react"
import { NewsFilters } from "@/components/news-filters"
import { ErrorBoundary } from "@/components/error-boundary"
import { NewsSkeleton } from "@/components/news-skeleton"
import NewsList from "@/components/news-list"

// Remove all custom type definitions and let Next.js infer the types
export default async function Home({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }>}) {
  const params = await searchParams
  const page = Number(params?.page) || 1
  const categoryRaw = params?.category
  const category = Array.isArray(categoryRaw) ? categoryRaw[0] : (categoryRaw || "general")

  return (
    <main className="container mx-auto px-4 py-8">
      <NewsFilters activeCategory={category} />
      <NewsList page={page} category={category} />
    </main>
  )
}