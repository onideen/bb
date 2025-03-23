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
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {articles.map((event) => (
            <div key={event.id} className="h-full">
              <Card
                key={event.id}
                title={event.title}
                url={"/event/" + event.documentId}
                when={event.start_time}
                where={event.location}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default EventList;
