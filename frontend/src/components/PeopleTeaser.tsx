import { UserCog } from "lucide-react";
import { PersonWithRole } from "../types/content-types";

interface Props {
  people?: PersonWithRole[];
}

const PeopleTeaser = ({ people }: Props) => {
  const visiblePeople = people?.filter((p) => p.show_in_preview);
  if (visiblePeople === undefined || visiblePeople.length === 0) return null;

  const names = visiblePeople.map((p) => p.person.name);

  return (
    <div className="text-sm text-gray-600 flex items-center gap-1">
      <UserCog className="w-4 h-4 text-gray-500" />
      <span className="font-medium">{names.join(", ")}</span>
    </div>
  );
};

export default PeopleTeaser;
