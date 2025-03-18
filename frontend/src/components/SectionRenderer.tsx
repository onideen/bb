import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import MediaRenderer from "./MediaRenderer";
import { Article, Section } from "../types/content-types";
import ArticleList from "./ArticleList";

interface Props {
  sections?: Section[];
  sectionContent?: Record<number, Article[]>
}

export default function SectionRenderer({ sections: sections, sectionContent }: Props) {
  if (!sections || sections.length === 0) {
    return <p className="text-gray-500">Ingen innhold tilgjengelig</p>;
  }

  return (
    <div>
      {sections.map((section, index) => {
        switch (section.__component) {
          case "shared.rich-text":
            return (
              <div className="prose" key={index}>
                <BlocksRenderer content={section.innhold} />
                </div>
            );
          case "shared.media":
            return <MediaRenderer file={section.file} key={index} />;
          case "page.article-list":
            return <ArticleList title={section.title} articles={sectionContent?.[section.id] || []} key={index}/>
          default:
            return <div key={index}>Ukjent type</div>;
        }
      })}
    </div>
  );
}
