import { fetchNews } from "@/lib/api";
import { NewsCard } from "./news-card";
import { NoResults } from "./no-results";

// Este componente deve ser um Server Component para usar async/await
export default async function NewsList({
  page = 1,
  category = "general",
}: {
  page: number;
  category: string;
}) {
  try {
    const { articles, totalResults } = await fetchNews(page, category);

    if (!articles || articles.length === 0) {
      return <NoResults />;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <NewsCard
            key={`${article.url || index}-${index}`}
            article={article}
          />
        ))}
      </div>
    );
  } catch (error) {
    console.error("Erro no componente NewsList:", error);
    return (
      <NoResults
        error={true}
        errorMessage={
          error instanceof Error ? error.message : "Erro desconhecido"
        }
      />
    );
  }
}
