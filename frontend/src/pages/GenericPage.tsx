import PageContent from "../components/PageContent";
import { useCallback, useEffect, useState } from "react";
import { fetchItemsForSections } from "../utils/api";
import SectionRenderer from "../components/SectionRenderer";
import { useParams } from "react-router-dom";
import { Page, SectionContentMap } from "../types/content-types";
import { isFetchableSection } from "../utils/typeGuards";
import { fetchPageData } from "../utils/fetchPageDataGraphQL";
import { mapGraphQLPageToPage } from "../utils/mapGraphqlToClient";

const GenericPage = () => {
  const { path } = useParams<{ path: string }>();

  const [pageData, setPageData] = useState<Page | null>(null);
  const [items, setItems] = useState<SectionContentMap>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const resolvedPath = path || "home";

  console.log("🔄 Render start");
  console.log("📄 pageData:", pageData);
  console.log("📦 items:", items);
  console.log("⏳ loading:", loading);
  console.log("⚠️ error:", error);

  // Henter seksjonskonfigurasjon (første API-kall)
  const loadPageData = useCallback(async () => {
    try {
      const page = await fetchPageData(resolvedPath);
      console.log("✅ Fikk data fra fetchPageData:", page);
      if (!page) {
        setError("Fant ikke side");
        return;
      }
      const mapped = mapGraphQLPageToPage(page);
      console.log("🧭 Mappet page:", mapped);
      setPageData(mapped);
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [resolvedPath]);

  // Henter artikler for hver seksjon (andre API-kall)
  const loadItemsForSections = useCallback(async () => {
    if (!pageData?.sections || pageData.sections.length === 0) return;
    console.log("📥 Henter items for seksjoner...");
    setLoading(true);
    try {
      const fetchableSections = pageData.sections.filter(isFetchableSection);
      const allData = await fetchItemsForSections(fetchableSections);
      console.log("✅ Seksjonsinnhold:", allData);
      setItems(allData);
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [pageData]);

  // Hent seksjoner ved første render
  useEffect(() => {
    console.log("📡 useEffect: Kaller loadPageData");
    loadPageData();
  }, [loadPageData]);

  // Hent items når seksjonsdata er lastet
  useEffect(() => {
    console.log("📡 useEffect: Kaller loadItemsForSections");
    loadItemsForSections();
  }, [loadItemsForSections]);

  if (loading) return <p>Laster...</p>;
  if (error) return <p>Feil: {error}</p>;
  if (!pageData) return <p>Fant ikke siden.</p>; // Hindrer videre kjøring

  return (
    <section>
      <PageContent title={pageData?.title || "tittel"} image={pageData?.cover}>
        <SectionRenderer sections={pageData?.sections} sectionContent={items} />
      </PageContent>
    </section>
  );
};

export default GenericPage;
