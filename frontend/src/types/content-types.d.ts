import { BlocksContent } from "@strapi/blocks-react-renderer";
import { MediaAttributes } from "../components/MediaRenderer";

export interface Article {
  id: number;
  documentId: string;
  title: string;
  cover: MediaAttributes;
  description: string;
  slug: string;
  authors: Person[];
  blocks: Section[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  categories: Category[];
}

export interface Event {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  short_title?: string;
  start_time: string;
  end_time?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  event_categories: EventCategory[]; // hvis det kun er én kategori (string), ellers string[]
  requires_registration: boolean;
  registration_link?: string | null;
  event_state: "planlagt" | "publisert" | "avlyst" | "gjennomført"; // eller string
  cover?: MediaAttributes | null;
  location: Location;
  content: Section[];
  categories: Category[];
  organizers?: OrganizerInfo[];
}

export type SectionContentMap = {
  [K in keyof ComponentDataMap]?: Record<number, ComponentDataMap[K]>;
};

export type ComponentDataMap = {
  "page.article-list": Article[];
  "page.event-list": Event[];
  // legg til flere her etter behov
};

export interface Category {
  id: number;
  documentId: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  priority: number;
  show_as_tag: boolean;
}

export interface ContentItem {
  id: number;
  title: string;
  url: string;
  image?: MediaAttributes;
  shortText?: string;
  time?: string;
  location?: Location;
  tags?: Category[];
  organizers?: OrganizerInfo[];
}

export interface PersonWithRole {
  id: number;
  documentId: string;
  person: Person;
  role: string;
  show_in_preview: boolean;
  show_contact_info: boolean;
  show_description: boolean;
  show_image?: boolean;
  show_role?: boolean;
  is_primary_contact?: boolean;
}

export interface OrganizerInfo {
  organizer: Organizer;
  people: PersonWithRole[];
}

export interface Organizer {
  id: number;
  name: string;
  logo?: MediaAttributes;
  website: string;
}

export interface Location {
  id: number;
  name: string;
  address?: string;
  postal_code?: number;
  city?: string;
}

export interface Person {
  id: number;
  documentId: string;
  name: string;
  image: MediaAttributes;
  phone_number: string;
  has_consented_to_share_information: boolean;
  email: string;
  profile_picture: MediaAttributes;
  is_member: boolean;
  area: string;
}

export interface PersonRole {
  role: string;
  person: Person;
}

export interface Page {
  documentId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  cover: MediaAttributes;
  sections: Section[];
}

export interface DynamicBlock {
  __component: string;
  id: number;
}

export interface FetchableSection<T> extends DynamicBlock {
  apiType: string;
  dataType: T;
  categories?: Category[];
  filter_type: string;
  limit?: number;
}

export interface ArticleList extends FetchableSection<Article> {
  __component: "page.article-list";
  __typename: "ComponentPageArticleList";
  apiType: "articles";
  filter_type: "latest" | "featured";
  title: string;
}

export interface EventList extends FetchableSection<Event> {
  __component: "page.event-list";
  __typename: "ComponentPageEventList";
  apiType: "events";
  filter_type: "upcoming" | "past" | "featured" | "this_month" | "next_month";
  title: string;
}

export interface RichTextBlock extends DynamicBlock {
  __component: "ComponentSharedRichText" | "shared.rich-text";
  __typename: "ComponentSharedRichText";
  innhold: BlocksContent;
}

export interface ContactList extends DynamicBlock {
  __component: "page.contact-list";
  __typename: "ComponentPageContactList";
  title: string;
  contacts: PersonWithRole[];
}

export interface MediaBlock extends DynamicBlock {
  __component: "ComponentSharedMedia" | "shared.media";
  __typename: "ComponentSharedMedia";
  file: MediaAttributes;
}

export type FetchableSections = ArticleList | EventList;
export type StaticSections = RichTextBlock | MediaBlock | ContactList;

export type Section = FetchableSections | StaticSections;
