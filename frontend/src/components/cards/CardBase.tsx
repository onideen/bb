import { Link } from "react-router-dom";
import { ReactNode, useEffect, useState } from "react";
import { ImageOff } from "lucide-react";
import MediaRenderer, { MediaAttributes } from "../MediaRenderer";

interface CardBaseProps {
  image?: MediaAttributes;
  url: string;
  title: string;
  imageHeight?: string; // f.eks. "h-48", "h-64", "h-72"
  children?: ReactNode;
}

export default function CardBase({
  image,
  url,
  title,
  imageHeight,
  children,
}: CardBaseProps) {
  const [isLoading, setIsLoading] = useState(!!image);
  const resolvedImageHeight = imageHeight ?? "h-48";

  useEffect(() => {
    if (!image) setIsLoading(false);
  }, [image]);

  const CardWrapper = url
    ? (props: { children: ReactNode }) => (
        <Link
          to={url}
          aria-label={`Åpne ${title}`}
          className={`flex flex-col ${resolvedImageHeight} h-full bg-white border border-gray-200 
        rounded-md shadow-sm overflow-hidden transition-shadow duration-300 hover:shadow-md dark:bg-gray-800 dark:border-gray-700`}
        >
          {props.children}
        </Link>
      )
    : (props: { children: ReactNode }) => <div>{props.children}</div>;

  return (
    <CardWrapper>
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
      <div className="flex flex-col flex-grow p-5 gap-y-2">{children}</div>
    </CardWrapper>
  );
}
