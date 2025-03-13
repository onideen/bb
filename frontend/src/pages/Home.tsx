import { useEffect, useState } from "react";
import { api } from "../api";
import PageContent from "../components/PageContent";
import ArticleList from "../components/ArticleList";
import { Article } from "../types/api";


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
      <ArticleList title="Siste nyheter" articles={articles}/>    
    </PageContent>
  );
}

export default HomePage;
