import PageContent from "../components/PageContent";
import axios, { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";
import { api } from "../api";
import SectionRenderer from "../components/SectionRenderer";
import { useParams } from "react-router-dom";
import { Article, Page, Section } from "../types/content-types";

const GenericPage = () => {
  
  const { path } = useParams<{ path: string }>();

  const [pageData, setPageData] = useState<Page | null>(null);
  const [articles, setArticles] = useState<Record<number, Article[]>>({});  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    
    const sections: Section[] | undefined = pageData?.sections;    
    if (!sections || sections.length === 0) return;
    try {
      setLoading(true);

      const requests: Promise<AxiosResponse<{ data: Article[] }>>[]  = sections
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

      const newArticles = responses.reduce<Record<number, Article[]>>((acc, response, index) => {
        const sectionId = sections[index]?.id; // 🎯 Sikrer at sectionId er definert
        if (sectionId) {
          acc[sectionId] = response.data.data;
        }
        return acc;

      }, {} as Record<number, Article[]>);

      setArticles(newArticles);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || err.message);
      } else if (err instanceof Error) {
        setError(err.message); 
      } else {
        setError("Ukjent feil oppstod.");
      }
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
        <SectionRenderer sections={pageData?.sections} sectionContent={articles} />
      </PageContent>
    </section>
  );
}

export default GenericPage;
