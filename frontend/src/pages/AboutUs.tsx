import { useEffect, useState } from "react";
import PageContent from "../components/PageContent";

import { api } from "../api";
import RenderDynamicContent, {
  DynamicContent,
} from "../components/DynamicContent";

interface OmOss {
  tittel: string;
  blokker: DynamicContent[];
}

function AboutUs() {
  const [aboutUs, setAboutUs] = useState<OmOss>();
  useEffect(() => {
    api
      .get("/om-oss?populate[blokker][populate]=*")
      .then((res) => setAboutUs(res.data.data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return (
    <PageContent title={aboutUs?.tittel || "tittel"}>
      {aboutUs?.blokker?.map((blokk) => {
        return <RenderDynamicContent key={blokk.id} dynamicContent={blokk} />;
      })}
    </PageContent>
  );
}

export default AboutUs;
