import { DynamicBlock, MediaBlock, RichTextBlock } from "../types/content-types";


export function isRichTextBlock(block: DynamicBlock): block is RichTextBlock {
  return block.__component === "shared.rich-text";
}

export function isImageBlock(block: DynamicBlock): block is MediaBlock {
  return block.__component === "shared.media";
}