import { Calendar, MapPin } from "lucide-react";
import { Location } from "../../types/content-types";

interface Props {
  time?: string;
  location?: Location;
  extraInfo?: string;
}

export default function CardFooter({ time, location, extraInfo }: Props) {
  if (!time && !location && !extraInfo) return null;

  return (
    <div className="mt-auto pt-4 border-t border-gray-100 space-y-1 text-sm text-gray-700">
      {time && (
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          {time}
        </div>
      )}
      {location && (
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          {location.name}
        </div>
      )}
      {extraInfo && (
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          {extraInfo}
        </div>
      )}
    </div>
  );
}
