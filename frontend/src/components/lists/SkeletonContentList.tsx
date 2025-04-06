import SkeletonCard from "../cards/SkeletonCard";

interface SkeletonContentListProps {
  title: string;
  numItems?: number;
}

export default function SkeletonContentList({
  title,
  numItems = 3,
}: SkeletonContentListProps) {
  return (
    <div className="py-6 animate-pulse">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: numItems }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    </div>
  );
}
