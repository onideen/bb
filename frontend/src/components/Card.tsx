import { Link } from "react-router-dom";
import MediaRenderer, { MediaAttributes } from "./MediaRenderer";

interface Props {
    image?: MediaAttributes,
    url: string,
    title: string,
    shortText: string
}

export default function Card({image, url, title, shortText}: Props){

    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <Link to={url}>
                <MediaRenderer file={image} className="rounded-t-lg w-full object-cover" />
            </Link>
            <div className="p-5">
                <Link to={url}>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                </Link>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{shortText}</p>
            </div>
        </div>
);

}