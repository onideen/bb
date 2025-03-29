import { Category } from "../types/content-types";

interface Props {
  category: Category;
}

const colorMap: Record<string, string> = {
  yellow: "bg-yellow-100 text-yellow-800",
  green: "bg-green-100 text-green-800",
  blue: "bg-blue-100 text-blue-800",
  red: "bg-red-100 text-red-800",
  gray: "bg-gray-100 text-gray-800",
  // fallback/default styles
  default: "bg-gray-100 text-gray-800",
};

const CategoryTag = ({ category }: Props) => {
  const colorClass = category.color
    ? colorMap[category.color] || colorMap["default"]
    : colorMap["default"];

  return (
    <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${colorClass}`}>
      {category.name}
    </span>
  );
};

export default CategoryTag;
