import {
  ArticleList,
  ContactList,
  EventList,
  MediaBlock,
  Page,
  RichTextBlock,
  Section,
} from "../types/content-types";
import { PageSection } from "../types/graphql-types";
import { RawPageResponse } from "./fetchPageDataGraphQL";

export function mapGraphQLSectionToClient(
  section: PageSection
): ArticleList | EventList | ContactList | MediaBlock | RichTextBlock | null {
  switch (section.__typename) {
    case "ComponentPageArticleList":
      return {
        ...section,
        title: section.article_title,
        __component: "page.article-list",
        apiType: "articles",
        filter_type: section.article_filter_type,
      };

    case "ComponentPageEventList":
      console.log("EVENTLIST", section.event_filter_type);
      return {
        ...section,
        title: section.event_title,
        __component: "page.event-list",
        apiType: "events",
        filter_type: section.event_filter_type,
      };

    case "ComponentPageContactList":
      return {
        ...section,
        __component: "page.contact-list",
      };

    case "ComponentSharedRichText":
      return {
        ...section,
      };

    case "ComponentSharedMedia":
      return {
        ...section,
      };

    default:
      return null;
  }
}

export function mapGraphQLPageToPage(raw: RawPageResponse): Page {
  return {
    documentId: raw.documentId,
    title: raw.title,
    createdAt: "", // må hentes hvis du trenger den (kan legges i query)
    updatedAt: "",
    publishedAt: "",
    cover: raw.cover ?? {
      documentId: "",
      url: "",
      alternativeText: "",
    },
    sections: raw.sections
      .map(mapGraphQLSectionToClient)
      .filter(Boolean) as Section[],
  };
}
