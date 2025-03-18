import PageContent from "../components/PageContent";
import { useCallback, useEffect, useState } from "react";
import { fetchArticlesForSections, fetchPageData } from "../utils/api";
import SectionRenderer from "../components/SectionRenderer";
import { useParams } from "react-router-dom";
import { Article, Page } from "../types/content-types";

const GenericPage = () => {
  
  const { path } = useParams<{ path: string }>();

  const [pageData, setPageData] = useState<Page | null>(null);
  const [articles, setArticles] = useState<Record<number, Article[]>>({});  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Henter seksjonskonfigurasjon (første API-kall)
  const loadPageData = useCallback(async () => {
    if (!path) return; // Sjekk at slug faktisk finnes
    try {
        const page = await fetchPageData(path);
        setPageData(page)
        
    } catch (err: unknown) { 
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }    
  }, [path]);

  // Henter artikler for hver seksjon (andre API-kall)
  const loadArticlesForSections = useCallback(async () => {
    if (!pageData?.sections || pageData.sections.length === 0) return;
    setLoading(true);
    try {
      const articlesData = await fetchArticlesForSections(pageData.sections);
      console.log("Artikler hentet fra API:", articlesData);
      setArticles(articlesData);
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [pageData]);


  // Hent seksjoner ved første render
  useEffect(() => {
    loadPageData();
  }, [loadPageData]);

  // Hent artikler når seksjonsdata er lastet
  useEffect(() => {
    
    loadArticlesForSections()
  
  }, [loadArticlesForSections]);

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
