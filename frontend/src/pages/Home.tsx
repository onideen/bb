import { useEffect, useState } from "react";
import { api } from "../api";
import { Article } from "../types/content-types";
import PageContent from "../components/PageContent";
import Card from "../components/Card";


function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    api
      .get("/articles?populate=*")
      .then((res) => setArticles(res.data.data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return (
    <PageContent title="Hjem">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
            <Card key={article.id} title={article.title} shortText={article.description} url="#" />
          
        ))}
      </div>
    </PageContent>
  );
}

export default HomePage;
