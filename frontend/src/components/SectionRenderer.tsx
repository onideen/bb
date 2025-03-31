import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import MediaRenderer from "./MediaRenderer";
import { Section, SectionContentMap } from "../types/content-types";
import ArticleList from "./ArticleList";
import EventList from "./EventList";

interface Props {
  sections?: Section[];
  sectionContent?: SectionContentMap;
}

export default function SectionRenderer({ sections, sectionContent }: Props) {
  if (!sections || sections.length === 0) return null;

  return (
    <div>
      {sections.map((section, index) => {
        switch (section.__component) {
          case "page.article-list": {
            return (
              <ArticleList
                key={index}
                title={section.title}
                articles={
                  sectionContent?.[section.__component]?.[section.id] ?? []
                }
              />
            );
          }

          case "page.event-list": {
            return (
              <EventList
                key={index}
                title={section.title}
                events={
                  sectionContent?.[section.__component]?.[section.id] ?? []
                }
              />
            );
          }

          case "shared.rich-text":
            return (
              <div className="prose" key={index}>
                <BlocksRenderer content={section.innhold} />
              </div>
            );

          case "shared.media":
            return <MediaRenderer file={section.file} key={index} />;

          default: {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const _exhaustive: never = section;
            return <div key={index}>Ukjent seksjonstype</div>;
          }
        }
      })}
    </div>
  );
}
