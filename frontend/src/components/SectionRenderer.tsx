import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import MediaRenderer from "./MediaRenderer";
import { Section, SectionContentMap } from "../types/content-types";
import ArticleList from "./lists/ArticleList";
import EventList from "./lists/EventList";
import ContactList from "./lists/ContactList";
import SkeletonContentList from "./lists/SkeletonContentList";

interface Props {
  sections?: Section[];
  sectionContent?: SectionContentMap;
}

function assertNever(value: never): never {
  throw new Error(`Ukjent seksjon: ${JSON.stringify(value)}`);
}

export default function SectionRenderer({ sections, sectionContent }: Props) {
  if (!sections || sections.length === 0) return null;

  return (
    <div>
      {sections.map((section, index) => {
        switch (section.__component) {
          case "page.article-list": {
            const content = sectionContent?.[section.__component]?.[section.id];

            if (!content)
              return <SkeletonContentList key={index} title={section.title} />;
            return (
              <ArticleList
                key={index}
                title={section.title}
                articles={content}
              />
            );
          }

          case "page.event-list": {
            const content = sectionContent?.[section.__component]?.[section.id];

            if (!content)
              return <SkeletonContentList key={index} title={section.title} />;
            return (
              <EventList key={index} title={section.title} events={content} />
            );
          }

          case "page.contact-list": {
            return (
              <ContactList
                key={index}
                title={section.title}
                contacts={section.contacts}
              />
            );
          }
          case "shared.rich-text":
          case "ComponentSharedRichText":
            return (
              <div className="prose" key={index}>
                <BlocksRenderer content={section.innhold} />
              </div>
            );
          
            
          case "shared.media":
          case "ComponentSharedMedia":
            return <MediaRenderer file={section.file} key={index} />;

          default: {
            return assertNever(section);
          }
        }
      })}
    </div>
  );
}
