import type { Article, NewsResponse } from "./types"

// Using Google News API for Brazilian news
const API_URL = "https://gnews.io/api/v4/top-headlines"

export async function fetchNews(page = 1, category = "general"): Promise<NewsResponse> {
  // API key is required for GNews
  const API_KEY = process.env.GNEWS_API_KEY

  if (!API_KEY) {
    throw new Error("GNEWS_API_KEY não encontrada. Configure a variável de ambiente.")
  }

  const pageSize = 9

  // Map categories to GNews categories
  const categoryMapping: Record<string, string> = {
    general: "general",
    business: "business",
    technology: "technology",
    entertainment: "entertainment",
    health: "health",
    science: "science",
    sports: "sports",
  }

  // Use mapped category or default to general
  const mappedCategory = categoryMapping[category] || "general"

  // Build URL with proper parameters
  const url = `${API_URL}?lang=pt&country=br&category=${mappedCategory}&max=${pageSize}&apikey=${API_KEY}`

  console.log(`Fetching news from: ${API_URL} (params redacted)`)

  const response = await fetch(url, {
    next: { revalidate: 3600 }, // Revalidate every hour
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error(`API request failed with status ${response.status}: ${errorText}`)

    if (response.status === 403) {
      throw new Error(
          "Erro 403: Sua conta GNews precisa ser ativada. Verifique seu email ou solicite um novo email de ativação em: https://gnews.io/dashboard",
      )
    }

    throw new Error(`Falha na requisição à API: ${response.status}`)
  }

  const data = await response.json()

  // Validate the response data structure
  if (!data.articles || !Array.isArray(data.articles) || data.articles.length === 0) {
    throw new Error("A API não retornou artigos")
  }

  console.log(`Received ${data.articles.length} articles from API`)

  // Transform GNews data to our application format
  const articles: Article[] = data.articles.map((item: any) => ({
    source: {
      id: item.source?.id || null,
      name: item.source?.name || "Fonte Brasileira",
    },
    author: item.author || null,
    title: item.title || "Sem título",
    description: item.description || "Sem descrição",
    url: item.url || "#",
    urlToImage: item.image || null,
    publishedAt: item.publishedAt || new Date().toISOString(),
    content: item.content || item.description || "Sem conteúdo",
  }))

  return {
    status: "ok",
    totalResults: data.totalArticles || articles.length,
    articles,
  }
}

