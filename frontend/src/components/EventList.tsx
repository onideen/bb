import { Event } from "../types/content-types";
import { mapEventToCardItem } from "../utils/mapToCardItem";
import ContentList from "./ContentList";

interface EventListProps {
  title: string;
  events: Event[];
}

const EventList = ({ title, events }: EventListProps) => {
  return <ContentList title={title} items={events.map(mapEventToCardItem)} />;
};

export default EventList;
