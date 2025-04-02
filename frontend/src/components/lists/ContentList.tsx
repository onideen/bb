import React, { JSX, ReactElement } from "react";

interface Props<T extends JSX.IntrinsicAttributes> {
  title: string;
  items: T[];
  cardComponent: (props: T) => ReactElement;
}

function ContentList<T>({
  title,
  items,
  cardComponent: CardComponent,
}: Props<T>) {
  return (
    <>
      <div className="py-6">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        {items && items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {items.map((item, index) => (
              <div className="h-full" key={index}>
                {<CardComponent {...item} />}{" "}
              </div>
            ))}
          </div>
        ) : (
          <p>Ingen elementer å vise.</p>
        )}
      </div>
    </>
  );
}

export default ContentList;
