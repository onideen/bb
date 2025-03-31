import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import MediaRenderer from "./MediaRenderer";
import { Article, Event, Section } from "../types/content-types";
import ArticleList from "./ArticleList";
import { isFetchableSection } from "../utils/typeGuards";
import EventList from "./EventList";

interface Props {
  sections?: Section[];
  sectionContent?: Record<number, unknown[]>;
}

export default function SectionRenderer({
  sections: sections,
  sectionContent,
}: Props) {
  if (!sections || sections.length === 0) {
    return;
  }

  return (
    <div>
      {sections.map((section, index) => {
        if (isFetchableSection(section)) {
          const data = sectionContent?.[section.id] ?? [];
          console.log("SECTION: " + section.id);
          console.log(data);
          switch (section.__component) {
            case "page.article-list":
              return (
                <ArticleList
                  title={section.title}
                  articles={data as Article[]}
                  key={index}
                />
              );
            case "page.event-list":
              return (
                <EventList
                  title={section.title}
                  events={data as Event[]}
                  key={index}
                />
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
