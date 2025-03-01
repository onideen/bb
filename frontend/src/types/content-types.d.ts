import { BlocksContent } from "@strapi/blocks-react-renderer";
import { MediaAttributes } from "../components/MediaRenderer";

export interface Article{
    id: number,
    documentId: string,
    title: string,
    cover: MediaAttributes
    description: string,
    slug: string,
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
      blocks: DynamicBlocks[],
      articles: Article[]
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
  
  export type DynamicBlocks = RichTextBlock | MediaBlock

  