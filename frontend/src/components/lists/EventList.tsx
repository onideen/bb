import { Event } from "../../types/content-types";
import { mapEventToCardItem } from "../../utils/mapToCardItem";
import { EventCard } from "../cards";
import ContentList from "./ContentList";

interface EventListProps {
  title: string;
  events: Event[];
}

const EventList = ({ title, events }: EventListProps) => {
  return (
    <ContentList
      title={title}
      items={events.map(mapEventToCardItem)}
      cardComponent={EventCard}
    />
  );
};

export default EventList;
