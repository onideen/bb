import { BlocksContent } from "@strapi/blocks-react-renderer";
import { MediaAttributes } from "../components/MediaRenderer";

export interface Article{
    id: number,
    documentId: string,
    title: string,
    cover: MediaAttributes
    description: string,
    slug: string,
    blocks: Section[],
    createdAt: string,
    updatedAt: string,
    publishedAt: string

}

export interface Page {
    id: number,
    documentId: string,
      title: string,
      createdAt: string,
      updatedAt: string,
      publishedAt: string,
      slug: sting
      cover: MediaAttributes,
      blocks: Section[],
      articles: Article[],
      sections: Section[]
}

export interface DynamicBlock {
    __component: string;
    id: number
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
    innhold: BlocksContent
}

export interface MediaBlock extends DynamicBlock {
    __component: "shared.media";
    file: MediaAttributes;
}

  
export type FetchableSections = ArticleList | EventList;
export type StaticSections = RichTextBlock | MediaBlock;

export type Section = FetchableSections | StaticSections;