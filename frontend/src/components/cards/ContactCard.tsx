import { PersonWithRole } from "../../types/content-types";
import Avatar from "../ui/Avatar";
import CardBase from "./CardBase";
import CardHeader from "./CardHeader";

interface Props {
  person: PersonWithRole;
}

export default function ContactCard({ person }: Props) {
  const p = person.person;

  const footer = p.area ? (
    <div className="text-sm text-emerald-700">
      Tar imot svermer i <strong>{p.area}</strong>
    </div>
  ) : null;

  return (
    <CardBase title={p.name} footer={footer}>
      {/* Bilde eller fallback */}
      {person.show_image && (
        <Avatar
          image={p.image}
          alt={p.name}
          className="w-full h-48 object-cover rounded-md"
        />
      )}

      <CardHeader title={p.name} />

      {person.show_role && (
        <div className="text-sm text-gray-500 italic">{person.role}</div>
      )}

      {person.show_contact_info && p.has_consent && (
        <div className="text-sm text-gray-700 mt-2 space-y-1">
          {p.phone_number && <div>📞 {p.phone_number}</div>}
          {p.email && <div>📧 {p.email}</div>}
        </div>
      )}

      {/*person.show_description && p.description && (
          <p className="text-sm text-gray-600 mt-3">{p.description}</p>
        ) */}
    </CardBase>
  );
}
