import { BlocksContent } from "@strapi/blocks-react-renderer";
import { MediaAttributes } from "../components/MediaRenderer";

export interface Article {
  id: number;
  documentId: string;
  title: string;
  cover: MediaAttributes;
  description: string;
  slug: string;
  blocks: Section[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Event {
  id: number;
  documentId: string;
  title: string;
  short_title?: string;
  start_time: string;
  end_time?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  category: string; // hvis det kun er én kategori (string), ellers string[]
  requires_registration: boolean;
  registration_link?: string | null;
  event_state: "planlagt" | "publisert" | "avlyst" | "gjennomført"; // eller string
  cover?: MediaAttributes | null;
  location: Location;
  // legg evt. til location her hvis det finnes
}

export interface Location {
  id: number;
  name: string;
  address?: string;
  postal_code?: number;
  city?: string;
}

export interface Page {
  id: number;
  documentId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  slug: sting;
  cover: MediaAttributes;
  blocks: Section[];
  articles: Article[];
  sections: Section[];
}

export interface DynamicBlock {
  __component: string;
  id: number;
}

export interface FetchableSection<T> extends DynamicBlock {
  apiType: string;
  dataType: T[];
  category?: string;
  filter_type?: "upcoming" | "past";
  limit?: number;
}

export interface ArticleList extends FetchableSection<Article> {
  __component: "page.article-list";
  apiType: "articles";
  title: string;
}

export interface EventList extends FetchableSection<Event> {
  __component: "page.event-list";
  apiType: "events";
  title: string;
}

export interface RichTextBlock extends DynamicBlock {
  __component: "shared.rich-text";
  innhold: BlocksContent;
}

export interface MediaBlock extends DynamicBlock {
  __component: "shared.media";
  file: MediaAttributes;
}

export type FetchableSections = ArticleList | EventList;
export type StaticSections = RichTextBlock | MediaBlock;

export type Section = FetchableSections | StaticSections;
