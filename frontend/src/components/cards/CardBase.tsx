import { Link } from "react-router-dom";
import { ReactNode, useEffect, useState } from "react";
import { ImageOff } from "lucide-react";
import MediaRenderer, { MediaAttributes } from "../MediaRenderer";

interface CardBaseProps {
  image?: MediaAttributes;
  imageFallback?: ReactNode;
  imageHeight?: string;
  url?: string;
  title: string;
  children?: ReactNode;
  footer?: ReactNode;
}

export default function CardBase({
  image,
  imageFallback,
  imageHeight,
  url,
  title,
  children,
  footer,
}: CardBaseProps) {
  const [isLoading, setIsLoading] = useState(!!image);
  const resolvedImageHeight = imageHeight ?? "h-48";

  useEffect(() => {
    if (!image) setIsLoading(false);
  }, [image]);

  const wrapperClass = `flex flex-col ${resolvedImageHeight} h-full bg-white border border-gray-200 
  rounded-md shadow-sm overflow-hidden transition-shadow duration-300 hover:shadow-md dark:bg-gray-800 dark:border-gray-700`;

  const CardWrapper = url
    ? (props: { children: ReactNode }) => (
        <Link to={url} aria-label={`Åpne ${title}`} className={wrapperClass}>
          {props.children}
        </Link>
      )
    : (props: { children: ReactNode }) => (
        <div className={wrapperClass}>{props.children}</div>
      );

  return (
    <CardWrapper>
      <div className={`w-full ${resolvedImageHeight} relative`}>
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
          imageFallback ?? (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
              <ImageOff className="w-4 h-4" />
            </div>
          )
        )}
        {isLoading && (
          <div className="absolute inset-0 animate-pulse bg-gray-200"></div>
        )}
      </div>

      <div className="flex flex-col flex-grow p-5 gap-y-2">
        {children}
        {footer && (
          <div className="mt-auto pt-4 border-t border-gray-100">{footer}</div>
        )}
      </div>
    </CardWrapper>
  );
}
