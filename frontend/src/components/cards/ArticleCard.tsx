import { Category } from "../../types/content-types";
import CategoryTag from "../CategoryTag";
import { MediaAttributes } from "../MediaRenderer";
import CardBase from "./CardBase";

interface Props {
  title: string;
  url: string;
  image?: MediaAttributes;
  shortText?: string;
  tags?: Category[];
}

export default function ArticleCard({
  title,
  url,
  image,
  shortText,
  tags,
}: Props) {
  return (
    <CardBase title={title} url={url} image={image}>
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags
            .filter((tag) => tag.show_as_tag)
            .map((tag) => (
              <CategoryTag key={tag.id} category={tag} />
            ))}
        </div>
      )}
      {shortText && (
        <p className="text-sm mt-1 font-normal text-gray-700 dark:text-gray-400">
          {shortText}
        </p>
      )}
    </CardBase>
  );
}
