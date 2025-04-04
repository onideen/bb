import { Category, Location, OrganizerInfo } from "../../types/content-types";
import { MediaAttributes } from "../MediaRenderer";
import CardBase from "./CardBase";
import CardHeader from "./CardHeader";
import CardTags from "./CardTags";
import CardOrganizers from "./CardOrganizers";
import EventFooter from "./EventFooter";
import { Calendar } from "lucide-react";

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
    <CardBase
      title={title}
      url={url}
      image={image}
      imageFallback={
        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
          <Calendar className="w-8 h-8" />
        </div>
      }
      footer={<EventFooter time={time} location={location} />}
    >
      <CardHeader title={title} />
      <CardTags tags={tags} />
      <CardOrganizers organizers={organizers} />
    </CardBase>
  );
}
