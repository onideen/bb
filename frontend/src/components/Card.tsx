import { Link } from "react-router-dom";
import MediaRenderer, { MediaAttributes } from "./MediaRenderer";
import { useState } from "react";

interface Props {
    image?: MediaAttributes,
    url: string,
    title: string,
    shortText: string
}

export default function Card({image, url, title, shortText}: Props){

    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <Link to={url}>
                {/*( !image || isLoading || hasError) && ( //Todo: legges inn i MediaRenderer i steden?
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-300">
                        <span className="text-gray-500">Laster bilde...</span>
                    </div>                   
                )*/}
                <MediaRenderer 
                    file={image} 
                    className={`rounded-t-lg w-full h-48 object-cover transition-opacity duration-300 ${
                        isLoading ? "opacity-0" : "opacity-100"
                    }`}

                    onLoad={() => setIsLoading(false)}
                    onError={() => {
                        setIsLoading(false);
                        setHasError(true);
                    }}

                    />
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