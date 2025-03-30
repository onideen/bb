import { useEffect, useState } from "react";
import { api } from "../utils/api";
import { Article } from "../types/content-types";
import SectionRenderer from "../components/SectionRenderer";
import { useParams } from "react-router-dom";
import { formatDate } from "../utils/date";
import CategoryTag from "../components/CategoryTag";

function ArticlePage() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article>();

  useEffect(() => {
    if (!id) return; // Sjekk at slug faktisk finnes
    api
      .get(`/articles/${id}`, {
        params: {
          populate: {
            cover: { populate: "*" },
            blocks: { populate: "*" },
            authors: { populate: "*" },
            categories: { populate: "*" },
          },
        },
      })
      .then((res) => setArticle(res.data.data))
      .catch((err) => console.error("Error fetching data:", err));
  }, [id]);

  if (!article) {
    return <p>Ingen artikkel å vise</p>;
  }

  return (
    <section>
      <article className="container mx-auto max-w-3xl px-4">
        {/* Cover-bilde */}
        {article.cover && (
          <img
            src={article.cover.url}
            alt={article.cover.alternativeText || article.title}
            className="rounded-lg w-full mb-6 object-cover max-h-96"
          />
        )}

        {/* Tittel */}
        <h1 className="text-4xl font-bold mb-2">{article.title}</h1>

        {/* Metadata */}
        <div className="text-sm text-gray-500 mb-6 flex gap-4 flex-wrap">
          {article.publishedAt && (
            <span>🗓️ {formatDate(article.publishedAt)}</span>
          )}
          {article.categories
            ?.filter((cat) => cat.show_as_tag)
            .map((cat) => (
              <CategoryTag key={cat.id} category={cat} />
            ))}
          {article.authors?.length > 0 && (
            <div className="text-sm text-gray-600 mb-4">
              ✍️ Skrevet av{" "}
              {article.authors.map((author, i) => (
                <span key={i}>
                  {author.name}
                  {i < article.authors.length - 1 && ", "}
                </span>
              ))}
            </div>
          )}{" "}
        </div>

        {/* Ingress */}
        {article.description && (
          <p className="text-lg font-light leading-relaxed mb-8">
            {article.description}
          </p>
        )}

        {/* Innhold */}
        <SectionRenderer sections={article.blocks} />

        {/* Tilbake-lenke eller relaterte artikler? */}
      </article>
    </section>
  );
}

export default ArticlePage;
