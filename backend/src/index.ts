import type { Core } from "@strapi/strapi";
import { personResolvers } from "./extensions/graphql/resolvers/person-resolvers";
import { eventResolvers } from "./extensions/graphql/resolvers/event-resolvers";

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }: { strapi: Core.Strapi }) {
    strapi
      .plugin("graphql")
      .service("extension")
      .shadowCRUD("api::event.event");
    //.disableAction("findOne"); // (valgfritt)

    strapi
      .plugin("graphql")
      .service("extension")
      .use(() => ({
        typeDefs: `
            extend type Query {
              event(slug: String!): Event
            }
          `,
        resolvers: {
          ...personResolvers,
          ...eventResolvers,
        },
      }));
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/* { strapi }: { strapi: Core.Strapi } */) {},
};
