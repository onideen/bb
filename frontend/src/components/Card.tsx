import { Link } from "react-router-dom";
import MediaRenderer, { MediaAttributes } from "./MediaRenderer";
import { useState } from "react";
import { Location } from "../types/content-types";
import { formatDate } from "../utils/date";

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
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <Link to={url}>
        {/*( !image || isLoading || hasError) && ( //Todo: legges inn i MediaRenderer i steden?
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-300">
                        <span className="text-gray-500">Laster bilde...</span>
                    </div>                   
                )*/}
        <MediaRenderer
          file={image}
          className={`rounded-t-lg w-full h-48 object-cover transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            //                        setHasError(true);
          }}
        />
      </Link>
      <div className="p-5">
        <Link to={url}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </Link>

        {when && (
          <p className="text-sm text-gray-500 mb-1">📅 {formatDate(when)}</p>
        )}
        {where && <p className="text-sm text-gray-500 mb-2">📍 {where.name}</p>}

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

        {shortText && (
          <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
            {shortText}
          </p>
        )}
      </div>
    </div>
  );
}
