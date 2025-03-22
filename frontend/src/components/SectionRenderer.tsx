import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import MediaRenderer from "./MediaRenderer";
import { Article, Section } from "../types/content-types";
import ArticleList from "./ArticleList";
import {  isFetchableSection } from "../utils/typeGuards";

interface Props {
  sections?: Section[];
  sectionContent?: Record<number, unknown[]>
}

export default function SectionRenderer({ sections: sections, sectionContent }: Props) {
  if (!sections || sections.length === 0) {
    return <p className="text-gray-500">Ingen innhold tilgjengelig</p>;
  }

  return (
    <div>
      {sections.map((section, index) => {
        if (isFetchableSection(section)) {
          const data = sectionContent?.[section.id] ?? []
          switch (section.__component) {
            case "page.article-list":
              return <ArticleList title="Artikler" articles={data as Article[]} key={index} />;
            case "page.event-list":
              return (
                <div key={index}>
                  <h2 className="text-2xl font-bold text-gray-800">
                  </h2>
                </div>
              );
          }
        }

          switch (section.__component) {
  
          case "shared.rich-text":
            return (
              <div className="prose" key={index}>
                <BlocksRenderer content={section.innhold} />
                </div>
            );
          case "shared.media":
            return <MediaRenderer file={section.file} key={index} />;
         
          default:
            return <div key={index}>Ukjent type</div>;
        }
      })}
    </div>
  );
}
