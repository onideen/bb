interface Props {
  imageHeight?: string;
}
export default function SkeletonCard({ imageHeight }: Props) {
  const resolvedImageHeight = imageHeight ?? "h-48";

  const wrapperClass = `animate-pulse flex flex-col ${resolvedImageHeight} h-full bg-white border border-gray-200 
  rounded-md shadow-sm overflow-hidden transition-shadow duration-300 hover:shadow-md dark:bg-gray-800 dark:border-gray-700`;

  return (
    <div className={wrapperClass}>
      {/* Bilde-placeholder */}
      <div className="bg-gray-200 h-40 w-full" />

      {/* Tekst-placeholder */}
      <div className="p-4 space-y-3">
        {/* Tittel-linje */}
        <div className="h-5 w-3/4 bg-gray-200 rounded-md blur-sm" />
        {/* Brødtekst-linjer */}
        <div className="h-4 w-full bg-gray-200 rounded blur-sm" />
        <div className="h-4 w-5/6 bg-gray-200 rounded blur-sm" />
      </div>
    </div>
  );
}
