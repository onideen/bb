import { Link } from "react-router-dom";
import { ReactNode, useEffect, useState } from "react";
import { ImageOff } from "lucide-react";
import MediaRenderer, { MediaAttributes } from "../MediaRenderer";

interface CardBaseProps {
  image?: MediaAttributes;
  url: string;
  title: string;
  children?: ReactNode;
}

export default function CardBase({
  image,
  url,
  title,
  children,
}: CardBaseProps) {
  const [isLoading, setIsLoading] = useState(!!image);

  useEffect(() => {
    if (!image) setIsLoading(false);
  }, [image]);

  return (
    <Link
      to={url}
      aria-label={`Åpne ${title}`}
      className="flex flex-col min-h-[420px] h-full bg-white border border-gray-200 
        rounded-md shadow-sm overflow-hidden transition-shadow duration-300 hover:shadow-md dark:bg-gray-800 dark:border-gray-700"
    >
      <div className="w-full h-48 relative">
        {image ? (
          <MediaRenderer
            file={image}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isLoading ? "opacity-0" : "opacity-100"
            }`}
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
            <ImageOff className="w-4 h-4" />
          </div>
        )}
        {isLoading && (
          <div className="absolute inset-0 animate-pulse bg-gray-200"></div>
        )}
      </div>
      <div className="flex flex-col flex-grow p-5 gap-y-2">
        <h5 className="text-xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h5>
        {children}
      </div>
    </Link>
  );
}
