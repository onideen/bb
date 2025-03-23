import { Event } from "../types/content-types";
import Card from "./Card";

interface EventListProps {
  title: string;
  events: Event[];
}

const EventList = ({ title, events: articles }: EventListProps) => {
  if (!articles || articles.length === 0) {
    return <p>Ingen artikler tilgjengelig.</p>;
  }

  return (
    <>
      <div className="py-6">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((event) => (
            <Card
              key={event.id}
              title={event.title}
              url={"/event/" + event.documentId}
              when={event.start_time}
              where={event.location}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default EventList;
