import PageContent from "../components/PageContent";
import { useCallback, useEffect, useState } from "react";
import { fetchItemsForSections, fetchPageData } from "../utils/api";
import SectionRenderer from "../components/SectionRenderer";
import { useParams } from "react-router-dom";
import { Page } from "../types/content-types";
import { isFetchableSection } from "../utils/typeGuards";

const GenericPage = () => {
  
  const { path } = useParams<{ path: string }>();

  const [pageData, setPageData] = useState<Page | null>(null);
  const [items, setItems] = useState<Record<number, unknown[]>>({});
    const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const resolvedPath = path || "home"; 

  // Henter seksjonskonfigurasjon (første API-kall)
  const loadPageData = useCallback(async () => {
    try {
        const page = await fetchPageData(resolvedPath);
        setPageData(page)
        
    } catch (err: unknown) { 
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }    
  }, [resolvedPath]);

  // Henter artikler for hver seksjon (andre API-kall)
  const loadItemsForSections = useCallback(async () => {
    if (!pageData?.sections || pageData.sections.length === 0) return;
    setLoading(true);
    try {
      console.log(pageData?.sections)
      const fetchableSections = pageData.sections.filter(isFetchableSection);
      console.log(fetchItemsForSections)
      const allData = await fetchItemsForSections(fetchableSections) 

      setItems(allData);
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

  // Hent items når seksjonsdata er lastet
  useEffect(() => {
    
    loadItemsForSections()
  
  }, [loadItemsForSections]);

  if (loading) return <p>Laster...</p>;
  if (error) return <p>Feil: {error}</p>;
  if (!pageData) return <p>Fant ikke siden.</p>; // Hindrer videre kjøring
  
console.log(items)

  return (
    <section>
      <PageContent 
        title={pageData?.title || "tittel"}
        image={pageData?.cover}
      >
        <SectionRenderer sections={pageData?.sections} sectionContent={items} />
      </PageContent>
    </section>
  );
}

export default GenericPage;
