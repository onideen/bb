import { MediaAttributes } from "../components/MediaRenderer";
import { PageSection } from "../types/graphql-types";

export interface RawPageResponse {
  documentId: string;
  title: string;
  path: string;
  cover?: MediaAttributes;
  sections: PageSection[]; // NB: med __component og alias
}

export const fetchPageData = async (
  path: string
): Promise<RawPageResponse | null> => {
  const query = `
    query GetPageByPath($path: String!) {
      pages(filters: { path: { eq: $path } }) {  
        documentId 
        title
        path
        cover {
              formats
              url
              alternativeText
            
          
        }
        sections {
          __typename
          ... on ComponentPageArticleList {
            __component: __typename
            id
            article_title: title
            article_filter_type: filter_type
            categories {
              id
              documentId
              name
            }
          }
          ... on ComponentPageEventList {
            __component: __typename
            id
            event_title: title
            __typename
            event_filter_type: filter_type
            limit
            categories {
              id
              documentId
              name
            }
          }
          ... on ComponentPageContactList {
            __component: __typename
            id
            title
            description
            contacts {
              id
              role
              show_contact_info
              show_description
              show_image
              show_role
              person {
                documentId
                name
                email
                phone_number
                area
                profile_picture {
                  url
                  alternativeText
                }
              }
            }
          }
          ... on ComponentSharedRichText {
            __component: __typename
            id
            innhold
          }
          ... on ComponentSharedMedia {
            __component: __typename
            id
            file {
              alternativeText
              documentId
              formats
              mime
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch("http://localhost:1337/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
        variables: { path: "/" + path },
      }),
    });

    const json = await res.json();
    const raw = json?.data?.pages?.[0];

    return raw || null;
  } catch (error) {
    console.error("Feil ved henting av side fra GraphQL:", error);
    return null;
  }
};
