import { formatDateTimeRange } from "../utils/date"; // lag egen
import { Link, useParams } from "react-router-dom";
import { Event } from "../types/content-types";
import { useEffect, useState } from "react";
import SectionRenderer from "../components/SectionRenderer";
import CategoryTag from "../components/CategoryTag";
import { Calendar, PinIcon } from "lucide-react";
import { fetchEventData } from "../utils/fetchEventDataGraphQL.";
import { ContactCard } from "../components/cards";

function EventPage() {
  const { slug } = useParams<{ slug: string }>();
  const [event, setEvent] = useState<Event>();

  useEffect(() => {
    const load = async () => {
      if (!slug) return; // Sjekk at slug faktisk finnes

      try {
        const event = await fetchEventData(slug);
        //if (!page) return setError("Fant ikke side");
        setEvent(event);
      } catch (err: unknown) {
        console.error("Error fetching event data:", err);
        //setError((err as Error).message);
      }
    };
    load();
  }, [slug]);

  if (!event) return <p>Ingen arrangement å vise</p>;

  console.log("Event data:", event);

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumbs */}
        <div className="mb-6 text-sm text-gray-500">
          <nav className="flex items-center gap-2" aria-label="Breadcrumb">
            <Link
              to="#/arrangementer"
              className="hover:underline text-gray-600 font-medium"
            >
              Arrangementer
            </Link>
            <span>/</span>
            <span className="text-gray-800 font-semibold truncate max-w-xs">
              {event.title}
            </span>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 gap-y-8">
          {/* Hovedinnhold */}
          <div className="lg:col-span-2">
            {/* Cover-bilde */}
            {event.cover && (
              <img
                src={event.cover.url}
                alt={event.cover.alternativeText || event.title}
                className="rounded-lg w-full mb-6 object-cover max-h-[400px] sm:max-h-[500px]"
              />
            )}

            {/* Tittel */}
            <h1 className="text-4xl font-bold mb-4">{event.title}</h1>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mb-6">
              {event.start_time && (
                <span className="inline-flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                  <Calendar />{" "}
                  {formatDateTimeRange(event.start_time, event.end_time)}
                </span>
              )}
              {event.location?.name && (
                <span className="inline-flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                  <PinIcon /> {event.location.name}
                </span>
              )}
            </div>

            {/* Kategorier */}
            {event.categories
              ?.filter((cat) => cat.show_as_tag)
              .map((cat) => (
                <CategoryTag key={cat.id} category={cat} />
              ))}

            {/* Innhold */}
            {event.content && (
              <div className="prose prose-gray max-w-none mb-8">
                <SectionRenderer sections={event.content} />
              </div>
            )}
          </div>

          <aside className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-6 text-sm text-gray-800">
            {event.organizers?.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">
                  Arrangører og kontaktpersoner
                </h3>

                {event.organizers.map((orgBlock, i) => (
                  <div
                    key={i}
                    className="mb-6 pb-4 border-b last:border-b-0 last:mb-0 last:pb-0"
                  >
                    {/* Arrangør */}
                    {orgBlock.organizer && (
                      <div className="flex items-center gap-3 mb-2">
                        {orgBlock.organizer.logo?.url && (
                          <img
                            src={orgBlock.organizer.logo.url}
                            alt={orgBlock.organizer.name}
                            className="w-10 h-10 rounded object-contain"
                          />
                        )}
                        <div>
                          <p className="font-semibold text-gray-800">
                            {orgBlock.organizer.name}
                          </p>
                          {orgBlock.organizer.website && (
                            <a
                              href={orgBlock.organizer.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline text-xs"
                            >
                              {orgBlock.organizer.website}
                            </a>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Kontaktpersoner */}
                    {orgBlock.people?.length > 0 && (
                      <ul className="space-y-4">
                        {orgBlock.people.map((personWithRole, j) => {
                          return (
                            <li key={j}>
                              <ContactCard personWithRole={personWithRole} />
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Påmelding */}
            {event.requires_registration && event.registration_link && (
              <div className="pt-4">
                <Link
                  to={event.registration_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition"
                >
                  Meld deg på arrangementet
                </Link>
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}

export default EventPage;
