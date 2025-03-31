import { Category, Location, OrganizerInfo } from "../../types/content-types";
import CategoryTag from "../CategoryTag";
import { MediaAttributes } from "../MediaRenderer";
import PeopleTeaser from "../PeopleTeaser";
import CardBase from "./CardBase";
import { Calendar, MapPin } from "lucide-react";

interface Props {
  title: string;
  url: string;
  image?: MediaAttributes;
  time?: string;
  location?: Location;
  tags?: Category[];
  organizers?: OrganizerInfo[];
}

export default function EventCard({
  title,
  url,
  image,
  time,
  location,
  tags,
  organizers,
}: Props) {
  return (
    <CardBase title={title} url={url} image={image}>
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags
            .filter((tag) => tag.show_as_tag)
            .map((tag) => (
              <CategoryTag key={tag.id} category={tag} />
            ))}
        </div>
      )}
      {organizers && (
        <PeopleTeaser people={organizers.flatMap((org) => org.people ?? [])} />
      )}
      {(time || location) && (
        <div className="mt-auto pt-4 border-t border-gray-100 space-y-1">
          {time && (
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Calendar className="w-4 h-4" />
              {time}
            </div>
          )}
          {location && (
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <MapPin className="w-4 h-4" />
              {location.name}
            </div>
          )}
        </div>
      )}
    </CardBase>
  );
}
