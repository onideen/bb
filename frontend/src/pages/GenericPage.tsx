import { lazy, Suspense, useEffect, useState } from "react";
import { fetchItemsForSections } from "../utils/api";
import { useParams } from "react-router-dom";
import { Page, SectionContentMap } from "../types/content-types";
import { isFetchableSection } from "../utils/typeGuards";
import { fetchPageData } from "../utils/fetchPageDataGraphQL";
import { mapGraphQLPageToPage } from "../utils/mapGraphqlToClient";
import LoadingFallback from "../components/LoadingFallback";

const SectionRenderer = lazy(() => import("../components/SectionRenderer"));
const PageContent = lazy(() => import("../components/PageContent"));

const GenericPage = () => {
  const { path } = useParams<{ path: string }>();
  const resolvedPath = path || "home";

  const [pageData, setPageData] = useState<Page | null>(null);
  const [items, setItems] = useState<SectionContentMap>({});
  const [error, setError] = useState<string | null>(null);

  // Henter seksjonskonfigurasjon (første API-kall)
  useEffect(() => {
    const load = async () => {
      try {
        const page = await fetchPageData(resolvedPath);
        if (!page) return setError("Fant ikke side");

        const mapped = mapGraphQLPageToPage(page);
        setPageData(mapped);
      } catch (err: unknown) {
        setError((err as Error).message);
      }
    };
    load();
  }, [resolvedPath]);

  useEffect(() => {
    if (!pageData?.sections || pageData.sections.length === 0) return;

    const loadItems = async () => {
      try {
        const fetchableSections = pageData.sections.filter(isFetchableSection);
        const allData = await fetchItemsForSections(fetchableSections);
        setItems(allData);
      } catch (err: unknown) {
        setError((err as Error).message);
      }
    };
    loadItems();
  }, [pageData]);

  if (error) return <p>Feil: {error}</p>;
  if (!pageData) return <p>Laster sideinnhold...</p>; // Kun første gang

  return (
    <section>
      <Suspense fallback={<LoadingFallback />}>
        <PageContent
          title={pageData?.title || "tittel"}
          image={pageData?.cover}
        >
          <SectionRenderer
            sections={pageData?.sections}
            sectionContent={items}
          />
        </PageContent>
      </Suspense>
    </section>
  );
};

export default GenericPage;
