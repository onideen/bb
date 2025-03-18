//import { useEffect, useState } from "react";
import PageContent from "../components/PageContent";

import { useEffect, useState } from "react";
import { api } from "../utils/api";
import { Page } from "../types/content-types";
import SectionRenderer from "../components/SectionRenderer";

//import { ApiPagePage as Page } from "../types/contentTypes";

//import { api } from "../api";

function AboutUs() {
  const [page, setPage] = useState<Page>();

  useEffect(() => {
    api
      .get("/pages?filters[slug]$eq=om-oss&populate=*")
      .then((res) => setPage(res.data.data[0]))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);
  return (
    <PageContent title={page?.title || "tittel"}>
      <SectionRenderer sections={page?.blocks} />
    </PageContent>
  );
}

export default AboutUs;
