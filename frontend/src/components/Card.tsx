import { Link } from "react-router-dom";
import MediaRenderer, { MediaAttributes } from "./MediaRenderer";
import { useState } from "react";
import { Location } from "../types/content-types";

interface Props {
  image?: MediaAttributes;
  url: string;
  title: string;
  shortText?: string;
  when?: string;
  where?: Location;
  tags?: string[];
}

export default function Card({
  image,
  url,
  title,
  shortText,
  when,
  where,
  tags,
}: Props) {
  const [isLoading, setIsLoading] = useState(true);
  //    const [hasError, setHasError] = useState(false);

  return (
    <Link
      to={url}
      aria-label={`Gå til ${title}`}
      className="flex flex-col h-[420px] bg-white border border-gray-200 
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
            {/* valgfritt: Ikon eller tekst */}
            <span>Ingen bilde</span>
          </div>
        )}

        {/* Grå bakgrunn under lasting (overlapping fallback) */}
        {isLoading && (
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-400"></div>
        )}
      </div>
      {/* Innhold */}
      <div className="flex flex-col flex-grow p-5">
        {/* Tittel og tekst */}
        <div>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
          {shortText && (
            <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
              {shortText}
            </p>
          )}
        </div>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Når og hvor */}
        <div className="mt-auto pt-3 border-t border-gray-100 text-sm text-gray-700 dark:text-gray-300 space-y-1">
          {when && <p className="text-sm text-gray-500">📅 {when}</p>}
          {where && (
            <p className="text-sm text-gray-500 mb-2">📍 {where.name}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
