import { strapi } from "@strapi/client";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:1337/api";


export const client = strapi({
    baseURL: API_URL, // Bytt ut med din Strapi-URL
    
});
