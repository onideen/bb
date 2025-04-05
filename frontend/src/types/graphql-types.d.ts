import {
  ArticleList,
  ContactList,
  EventList,
  MediaBlock,
  RichTextBlock,
} from "./content-types";

// 🔁 GraphQL bruker alias 'articleFilterType' og 'eventFilterType'
export interface GraphQLArticleList extends Omit<ArticleList, "filter_type"> {
  __typename: "ComponentPageArticleList"; // matcher GraphQL typename
  articleFilterType: ArticleList["filter_type"];
  article_title: string; //
}

export interface GraphQLEventList extends Omit<EventList, "filter_type"> {
  __typename: "ComponentPageEventList";
  eventFilterType: EventList["filter_type"];
  event_title: string;
}

type PageSection =
  | GraphQLArticleList
  | GraphQLEventList
  | ContactList
  | RichTextBlock
  | MediaBlock;
