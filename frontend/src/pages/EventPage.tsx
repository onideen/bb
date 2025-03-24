import { formatDateTimeRange } from "../utils/date"; // lag egen
import { Link } from "react-router-dom";
import { Event } from "../types/content-types";

const EventPage = ({ event }: { event: Event }) => {
  if (!event) return <p>Ingen event å vise</p>;

  return (
    <article className="container mx-auto px-4 py-12 max-w-3xl text-gray-800">
      {/* Cover-bilde */}
      {event.cover && (
        <img
          src={event.cover.url}
          alt={event.cover.alternativeText || event.title}
          className="rounded-lg w-full mb-6 object-cover max-h-96"
        />
      )}

      {/* Tittel */}
      <h1 className="text-4xl font-bold mb-4">{event.title}</h1>

      {/* Metadata */}
      <div className="text-sm text-gray-500 mb-6 space-y-1">
        {event.start_time && (
          <p>📅 {formatDateTimeRange(event.start_time, event.end_time)}</p>
        )}
        {event.location?.name && <p>📍 {event.location.name}</p>}
        {/* event.categories?.length > 0 && (
          <p>🏷️ {event.categories.join(", ")}</p>
        )*/}
        {event.event_state && <p>📌 Status: {event.event_state}</p>}
      </div>

      {/* Beskrivelse */}
      {/*event.description && (
        <p className="text-lg font-light leading-relaxed mb-8">
          {event.description}
        </p>
      )*/}

      {/* Påmelding */}
      {event.requires_registration && event.registration_link && (
        <div className="mb-10">
          <Link
            to={event.registration_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md"
          >
            Meld deg på arrangementet
          </Link>
        </div>
      )}

      {/* Dynamiske blokker */}
      <div className="space-y-8">
        {/*event.blocks?.map((block, index) => (
          <EventBlockRenderer key={index} block={block} />
        ))*/}
      </div>
    </article>
  );
};

export default EventPage;
