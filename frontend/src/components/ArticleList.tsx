
import { Article } from "../types/content-types"
import Card from "./Card"

interface ArticleListProps {
    title: string,
    articles: Article[]
}

const ArticleList = ({ title, articles }: ArticleListProps) => {
    if (!articles || articles.length === 0) {
        return <p>Ingen artikler tilgjengelig.</p>
    }

    return (
        <>
            <div className="py-6">
                <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {articles.map((article) => (

                            <Card 
                              key={article.id} 
                              title={article.title} 
                              shortText={article.description} 
                              url={"/article/" + article.documentId}
                              image={article.cover} 
                            />
                          
                        ))}
                      </div>
            </div>
        </>
    )
}

export default ArticleList