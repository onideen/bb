import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer";

export interface RikTekst {
  __component?: "delt.rik-tekst";
  id?: number;
  innhold: BlocksContent;
}

export function RikTekst({ innhold, ...props }: RikTekst) {
  return <BlocksRenderer content={innhold} {...props} />;
}
