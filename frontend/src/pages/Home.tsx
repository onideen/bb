import { useEffect, useState } from "react";
import { api } from "../api";
import { Article } from "../types/content-types";
import PageContent from "../components/PageContent";

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
      <h1>Velkommen</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <h2>{article.title}</h2>
            <p>{article.description}</p>
          </li>
        ))}
      </ul>
    </PageContent>
  );
}

export default HomePage;
