import { MediaAttributes } from "./MediaRenderer";
import MediaRenderer from "./MediaRenderer";
import { RikTekst } from "./RikTekst";

export interface MediaBlock {
  id: number;
  __component: "delt.media";
  file: MediaAttributes;
}

export interface DynamicContentProps {
  dynamicContent: DynamicContent;
}

export type DynamicContent = RikTekst | MediaBlock;

export default function RenderDynamicContent({
  dynamicContent,
  ...props
}: DynamicContentProps) {
  switch (dynamicContent.__component) {
    case "delt.rik-tekst": {
      return <RikTekst innhold={dynamicContent.innhold} {...props} />;
    }
    case "delt.media":
      return <MediaRenderer file={dynamicContent.file} />;

    default:
      return <div>NOT IMPLEMENTED</div>;
  }
}
