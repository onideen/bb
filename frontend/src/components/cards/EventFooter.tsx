import { Calendar, MapPin } from "lucide-react";
import { Location } from "../../types/content-types";

interface Props {
  time?: string;
  location?: Location;
}

export default function EventFooter({ time, location }: Props) {
  if (!time && !location) return null;

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
    </div>
  );
}
