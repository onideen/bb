import { Category, Location, OrganizerInfo } from "../../types/content-types";
import { MediaAttributes } from "../MediaRenderer";
import PeopleTeaser from "../PeopleTeaser";
import CardBase from "./CardBase";
import { Calendar, MapPin } from "lucide-react";
import CardHeader from "./CardHeader";
import CardTags from "./CardTags";

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
      <CardHeader title={title} />
      <CardTags tags={tags} />
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
