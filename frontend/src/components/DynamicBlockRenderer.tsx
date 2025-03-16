import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import MediaRenderer from "./MediaRenderer";
import { DynamicBlocks } from "../types/content-types";
import ArticleList from "./ArticleList";

interface Props {
  blocks?: DynamicBlocks[];
  sectionContent?: any
}

export default function RenderDynamicContent({ blocks, sectionContent }: Props) {
  if (!blocks || blocks.length === 0) {
    return <p className="text-gray-500">Ingen innhold tilgjengelig</p>;
  }

  return (
    <div>
      {blocks.map((block, index) => {
        switch (block.__component) {
          case "shared.rich-text":
            return (
              <div className="prose" key={index}>
                <BlocksRenderer content={block.innhold} />
                </div>
            );
          case "shared.media":
            return <MediaRenderer file={block.file} key={index} />;
          case "page.article-list":
            return <ArticleList title={sectionContent.title} articles={sectionContent[block.id]} />
          default:
            return <div>Ukjent type</div>;
        }
      })}
    </div>
  );
}
