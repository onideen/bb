//import { useEffect, useState } from "react";
import PageContent from "../components/PageContent";

import { useEffect, useState } from "react";
import { api } from "../api";
import { Page } from "../types/content-types";
import RenderDynamicContent from "../components/DynamicBlockRenderer";
import { useParams } from "react-router-dom";

//import { ApiPagePage as Page } from "../types/contentTypes";

//import { api } from "../api";

function GenericPage() {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<Page>();

  useEffect(() => {
    if (!slug) return; // Sjekk at slug faktisk finnes
    api
      .get("/pages", {
        params: {
          filters: { slug: { $eq: slug } },
          populate: {
            cover: { populate: "*" },
            blocks: { populate: "*" },
          },
        },
      })
      .then((res) => setPage(res.data.data[0]))
      .catch((err) => console.error("Error fetching data:", err));
  }, [slug]);
  return (
    <PageContent title={page?.title || "tittel"}>
      <RenderDynamicContent blocks={page?.blocks}  />
    </PageContent>
  );
}

export default GenericPage;
