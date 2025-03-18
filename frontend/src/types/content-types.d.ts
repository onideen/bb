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

export interface RichTextBlock extends DynamicBlock {
    __component: "shared.rich-text";
    innhold: BlocksContent
}

export interface MediaBlock extends DynamicBlock {
    __component: "shared.media";
    file: MediaAttributes;
}

export interface ArticleList extends DynamicBlock {
    __component: "page.article-list",
    title: string,
    filter_type: string,
    limit: number
}
  
export type Section = RichTextBlock | MediaBlock | ArticleList

  