import { useEffect, useState } from "react";
import { api } from "../utils/api";
import { Article } from "../types/content-types";
import PageContent from "../components/PageContent";
import SectionRenderer from "../components/SectionRenderer";
import { useParams } from "react-router-dom";


function ArticlePage() {
  const { id } = useParams<{ id: string }>();
    const [article, setArticle] = useState<Article>();
  
    useEffect(() => {
      if (!id) return; // Sjekk at slug faktisk finnes
      api
        .get(`/articles/${id}`, {
          params: {
            populate: {
              cover: { populate: "*" },
              blocks: { populate: "*" },
            },
          },
        })
        .then((res) => setArticle(res.data.data))
        .catch((err) => console.error("Error fetching data:", err));
    }, [id]);

  return (
    <section>
      <PageContent 
        title={article?.title || "tittel"}
        image={article?.cover}
      >
        <SectionRenderer sections={article?.blocks}  />
      </PageContent>
    </section>
  );
}

export default ArticlePage;
