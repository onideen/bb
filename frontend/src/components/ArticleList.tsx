import { Article } from "../types/content-types";
import { mapArticleToCardItem } from "../utils/mapToCardItem";
import ContentList from "./ContentList";

interface ArticleListProps {
  title: string;
  articles: Article[];
}

const ArticleList = ({ title, articles }: ArticleListProps) => {
  if (!articles || articles.length === 0) {
    return <p>Ingen artikler tilgjengelig.</p>;
  }

  return (
    <ContentList title={title} items={articles.map(mapArticleToCardItem)} />
  );
};

export default ArticleList;
