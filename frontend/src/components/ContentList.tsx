import { ContentItem } from "../types/content-types";
import Card from "./Card";

interface Props {
  title: string;
  items: ContentItem[];
}

const ContentList = ({ title, items }: Props) => {
  return (
    <>
      <div className="py-6">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        {items && items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div className="h-full" key={item.id}>
                <Card
                  title={item.title}
                  shortText={item.shortText}
                  url={item.url}
                  image={item.image}
                  when={item.when}
                  where={item.where}
                  tags={item.tags}
                />
              </div>
            ))}
          </div>
        ) : (
          <p>Ingen elementer å vise.</p>
        )}
      </div>
    </>
  );
};

export default ContentList;
