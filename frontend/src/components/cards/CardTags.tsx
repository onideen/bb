import { Category } from "../../types/content-types";
import CategoryTag from "../CategoryTag";

interface Props {
  tags?: Category[];
}

export default function CardTags({ tags }: Props) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex flex-weap gap-2">
      {tags
        .filter((tag) => tag.show_as_tag)
        .map((tag) => (
          <CategoryTag key={tag.id} category={tag} />
        ))}
    </div>
  );
}
