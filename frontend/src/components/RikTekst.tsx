import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { RichTextBlock } from "../types/content-types";

export function RichTextBlockRenderer({ innhold }: RichTextBlock) {
  return <BlocksRenderer content={innhold} />;
}
