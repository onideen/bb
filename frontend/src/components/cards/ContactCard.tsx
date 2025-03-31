import { MediaAttributes } from "../MediaRenderer";
import CardBase from "./CardBase";

interface Props {
  title: string;
  url: string;
  image?: MediaAttributes;
  email?: string;
  phone?: string;
}

export default function ContactCard({
  title,
  url,
  image,
  email,
  phone,
}: Props) {
  return (
    <CardBase title={title} url={url} image={image}>
      <div className="text-sm text-gray-700 space-y-1">
        {email && <div>📧 {email}</div>}
        {phone && <div>📞 {phone}</div>}
      </div>
    </CardBase>
  );
}
