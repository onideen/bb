import { Mail, MapPin, Phone, User } from "lucide-react";
import { PersonWithRole } from "../../types/content-types";
import CardBase from "./CardBase";
import CardHeader from "./CardHeader";

interface Props {
  person: PersonWithRole;
}

export default function ContactCard({ person }: Props) {
  const p = person.person;

  const shouldShowFooter =
    !!p.area ||
    (person.show_contact_info &&
      p.has_consented_to_share_information &&
      (p.phone_number || p.email));

  const footer = shouldShowFooter ? (
    <div className="space-y-1 text-sm text-gray-600">
      {p.area && (
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span>{p.area}</span>
        </div>
      )}
      {person.show_contact_info &&
        p.has_consented_to_share_information &&
        p.phone_number && (
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>{p.phone_number}</span>
          </div>
        )}
      {person.show_contact_info &&
        p.has_consented_to_share_information &&
        p.email && (
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <span>{p.email}</span>
          </div>
        )}
    </div>
  ) : null;

  const fallback = (
    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
      <User className="w-20 h-20" />
    </div>
  );

  return (
    <CardBase
      title={p.name}
      footer={footer}
      image={p.image}
      imageHeight="h-64"
      imageFallback={fallback}
    >
      <CardHeader title={p.name} />

      {person.show_role && (
        <div className="text-sm text-gray-500 italic">{person.role}</div>
      )}

      {person.show_contact_info && p.has_consented_to_share_information && (
        <div className="text-sm text-gray-700 mt-2 space-y-1">
          {p.phone_number && (
            <div>
              <Phone /> {p.phone_number}
            </div>
          )}
          {p.email && (
            <div>
              <Mail /> {p.email}
            </div>
          )}
        </div>
      )}

      {/*person.show_description && p.description && (
          <p className="text-sm text-gray-600 mt-3">{p.description}</p>
        ) */}
    </CardBase>
  );
}
