import { OrganizerInfo } from "../../types/content-types";
import PeopleTeaser from "../PeopleTeaser";

interface Props {
  organizers?: OrganizerInfo[];
}

export default function CardOrganizers({ organizers }: Props) {
  if (!organizers || organizers.length === 0) return null;

  return (
    <PeopleTeaser people={organizers.flatMap((org) => org.people ?? [])} />
  );
}
