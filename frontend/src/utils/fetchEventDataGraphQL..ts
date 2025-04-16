const API_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1337";

export const fetchEventData = async (slug: string): Promise<Event | null> => {
  const query = `
query GetEventBySlug($slug: String!) {
  events(filters: { slug: { eq: $slug } }) {
    title
    slug
    start_time
    end_time
    requires_registration
    registration_link
    event_state

    location {
      name
    }
    cover {
      url
      alternativeText
    }
    categories {
      name
      show_as_tag
    }

    organizers {
      organizer {
        name
        website
        logo {
          url
        }
      }
      people {
        role
        show_contact_info
        show_description
        show_image
        show_role
        person {
          name
          email
          phone_number
          area
          has_consented_to_share_information
          profile_picture {
            url
            formats
          }
        }
      }
    }
    content {
      __typename
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
}`;

  try {
    const res = await fetch(API_URL + "/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
        variables: { slug: slug },
      }),
    });

    const json = await res.json();
    const raw = json?.data?.events?.[0];

    return raw || null;
  } catch (error) {
    console.error("Feil ved henting av side fra GraphQL:", error);
    return null;
  }
};
