import { Event } from "../types/content-types";
import { mapEventToCardItem } from "../utils/mapToCardItem";
import ContentList from "./ContentList";

interface EventListProps {
  title: string;
  events: Event[];
}

const EventList = ({ title, events }: EventListProps) => {
  if (!events || events.length === 0) {
    return <p>Ingen artikler tilgjengelig.</p>;
  }

  return <ContentList title={title} items={events.map(mapEventToCardItem)} />;
};

export default EventList;
