//import { useEffect, useState } from "react";
import PageContent from "../components/PageContent";
import axios, { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";
import { api } from "../api";
import RenderDynamicContent from "../components/DynamicBlockRenderer";
import { useParams } from "react-router-dom";
import { DynamicBlock, Page } from "../types/content-types";
//import { Page } from "../types/api";

//import { ApiPagePage as Page } from "../types/contentTypes";

//import { api } from "../api";

const GenericPage = () => {
  
  const { path } = useParams<{ path: string }>();

  const [pageData, setPageData] = useState<Page>();

  const [articles, setArticles] = useState({}); // Artikler per seksjon
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Henter seksjonskonfigurasjon (første API-kall)
  const fetchPage = useCallback(async () => {
    if (!path) return; // Sjekk at slug faktisk finnes
    try {
      setLoading(true);
      const res = await api.get("/pages", {
        params: {
          filters: { path: { $eq: "/" + path } },
          populate: {
            cover: { populate: "*" },
            blocks: { populate: "*" },
            sections: { populate: "*"}
          },
        },
      });
        const page = res.data.data[0]
        console.log(page)
        setPageData(page)
        
    } catch (err: unknown) { // TypeScript krever "unknown" hvis vi ikke vet typen
      if (axios.isAxiosError(err)) {
        console.error("her")
        setError(err.response?.data?.message || err.message);
      } else {
        
        console.error("her")

        setError("Ukjent feil oppstod");
      }
    } finally {
      setLoading(false);
    }    
  }, [path]);

  // Henter artikler for hver seksjon (andre API-kall)
  const fetchArticlesForSections = useCallback(async () => {
    if (pageData?.sections?.length === 0) return;

    try {
      setLoading(true);

      const requests: Promise<AxiosResponse<unknown>>[]  = pageData?.sections
          .filter(section => section.__component === "page.article-list")
          .map(() =>

          // Todo legge til filter her
          api.get("/articles", {
            params: {
              populate: {
                cover: { populate: "*" },
                blocks: { populate: "*" },
              },
            },
          })
      );
      
      const responses = await axios.all(requests);

      const newArticles = responses.reduce<Record<number, any[]>>((acc, response, index) => {
        acc[pageData?.sections[index].id] = response.data.data;
        return acc;

      }, {} as Record<number, any[]>);

      setArticles(newArticles);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [pageData?.sections]);

  // Hent seksjoner ved første render
  useEffect(() => {
    fetchPage();
  }, [fetchPage]);

  // Hent artikler når seksjonsdata er lastet
  useEffect(() => {
    if (pageData?.sections && pageData.sections.length > 0) {
            fetchArticlesForSections();
    }
  }, [pageData?.sections, fetchArticlesForSections]);

  if (loading) return <p>Laster...</p>;
  if (error) return <p>Feil: {error}</p>;
  if (!pageData) return <p>Fant ikke siden.</p>; // Hindrer videre kjøring
  
console.log(articles)

  return (
    <section>
      <PageContent 
        title={pageData?.title || "tittel"}
        image={pageData?.cover}
      >
        <RenderDynamicContent blocks={pageData?.sections} sectionContent={articles} />
      </PageContent>
    </section>
  );
}

export default GenericPage;
