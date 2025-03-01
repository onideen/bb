import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import MediaRenderer from "./MediaRenderer";
import { DynamicBlocks } from "../types/content-types";

interface Props {
  blocks?: DynamicBlocks[];
}

export default function RenderDynamicContent({ blocks }: Props) {
  if (!blocks || blocks.length === 0) {
    return <p className="text-gray-500">Ingen innhold tilgjengelig</p>;
  }

  return (
    <div>
      {blocks.map((block, index) => {
        switch (block.__component) {
          case "shared.rich-text":
            return (
              <div className="prose">
                <BlocksRenderer content={block.innhold} key={index} />
                </div>
            );
          case "shared.media":
            return <MediaRenderer file={block.file} key={index} />;
          default:
            return <div>Ukjent type</div>;
        }
      })}
    </div>
  );
}
