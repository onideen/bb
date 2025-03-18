import { useEffect, useState } from "react";
import { api } from "../utils/api";

type Article = {
  id: number;
  title: string;
  content: string;
  
};

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    api.get("/articles?populate=*")
      .then((res) => setArticles(res.data.data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return (
    <div>
      <h1>Strapi + Vite + React</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <h2>{article.title}</h2>
            <p>{article.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
