import { Link } from "react-router-dom";
import MediaRenderer, { MediaAttributes } from "./MediaRenderer";
import { useState } from "react";
import { Category, Location, OrganizerInfo } from "../types/content-types";
import CategoryTag from "./CategoryTag";
import PeopleTeaser from "./PeopleTeaser";

interface Props {
  image?: MediaAttributes;
  url: string;
  title: string;
  shortText?: string;
  time?: string;
  location?: Location;
  tags?: Category[];
  organizers?: OrganizerInfo[];
}

export default function Card({
  image,
  url,
  title,
  shortText,
  time: time,
  location: location,
  tags,
  organizers,
}: Props) {
  const [isLoading, setIsLoading] = useState(true);
  //    const [hasError, setHasError] = useState(false);

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
      <div className="flex flex-col flex-grow p-5 gap-y-2">
        {/* Tittel og tekst */}
        <h5 className="text-xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h5>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags
              ?.filter((tag) => tag.show_as_tag)
              .map((tag) => (
                <CategoryTag key={tag.id} category={tag} />
              ))}
          </div>
        )}
        {shortText && (
          <div>
            <p className="text-sm mt-1 font-normal text-gray-700 dark:text-gray-400">
              {shortText}
            </p>
          </div>
        )}

        {organizers && (
          <PeopleTeaser people={organizers.flatMap((org) => org.people)} />
        )}

        {/* Footer */}
        {(time || location) && (
          <div className="mt-auto pt-4 border-t border-gray-100 space-y-1">
            {time && (
              <div className="flex items-center gap-2 text-sm text-gray-700">
                📅 {time}
              </div>
            )}
            {location && (
              <div className="flex items-center gap-2 text-sm text-gray-700">
                📍 {location.name}
              </div>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
