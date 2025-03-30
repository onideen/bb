import { formatDateTimeRange } from "../utils/date"; // lag egen
import { Link, useParams } from "react-router-dom";
import { Event } from "../types/content-types";
import { useEffect, useState } from "react";
import { api } from "../utils/api";
import SectionRenderer from "../components/SectionRenderer";
import CategoryTag from "../components/CategoryTag";

function EventPage() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event>();

  useEffect(() => {
    if (!id) return; // Sjekk at slug faktisk finnes
    api
      .get(`/events/${id}`, {
        params: {
          populate: {
            cover: { populate: "*" },
            content: { populate: "*" },
            organizers: {
              populate: {
                organizer: { populate: "*" },
                people: { populate: "*" },
              },
            },
            categories: { populate: "*" },
          },
        },
      })
      .then((res) => setEvent(res.data.data))
      .catch((err) => console.error("Error fetching data:", err));
  }, [id]);

  if (!event) return <p>Ingen arrangement å vise</p>;

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
        {/* Hovedinnhold */}
        <div className="lg:col-span-2">
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
            {event.categories
              ?.filter((cat) => cat.show_as_tag)
              .map((cat) => (
                <CategoryTag key={cat.id} category={cat} />
              ))}

            {event.event_state && <p>📌 Status: {event.event_state}</p>}
          </div>

          {/* Beskrivelse */}
          {event.content && (
            <div className="text-lg font-light leading-relaxed mb-8">
              <SectionRenderer sections={event.content} />
            </div>
          )}
        </div>
        {/* Sidepanel */}
        <aside className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4 text-sm text-gray-800">
          {event.people?.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Personer involvert
              </h3>
              <ul className="space-y-1">
                {event.people.map((personRole, index) => (
                  <li key={index}>
                    <span className="font-medium">
                      {personRole.person?.name}
                    </span>
                    {personRole.role && (
                      <span className="text-gray-500">
                        {" "}
                        – {personRole.role}
                      </span>
                    )}
                    {personRole.person?.email && (
                      <div>
                        <a
                          href={`mailto:${personRole.person.email}`}
                          className="text-blue-600 hover:underline"
                        >
                          {personRole.person.email}
                        </a>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

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
        </aside>
      </div>
    </section>
  );
}

export default EventPage;
