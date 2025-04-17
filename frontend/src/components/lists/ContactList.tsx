import { PersonWithRole } from "../../types/content-types";
import { ContactCard } from "../cards";
import ContentList from "./ContentList";

interface EventListProps {
  title: string;
  contacts: PersonWithRole[];
}

const ContactList = ({ title, contacts }: EventListProps) => {
  return (
    <ContentList
      title={title}
      items={contacts.map((p) => ({ personWithRole: p }))}
      cardComponent={ContactCard}
    />
  );
};

export default ContactList;
