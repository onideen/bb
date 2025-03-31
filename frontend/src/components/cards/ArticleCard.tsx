import { Category } from "../../types/content-types";
import { MediaAttributes } from "../MediaRenderer";
import CardBase from "./CardBase";
import CardHeader from "./CardHeader";
import CardTags from "./CardTags";

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
      <CardHeader title={title} />
      <CardTags tags={tags} />
      {shortText && (
        <p className="text-sm mt-1 font-normal text-gray-700 dark:text-gray-400">
          {shortText}
        </p>
      )}
    </CardBase>
  );
}
