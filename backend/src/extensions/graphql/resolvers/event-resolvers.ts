export const eventResolvers = {
  Query: {
    event: async (_parent, args, _ctx) => {
      const [entry] = await strapi.entityService.findMany("api::event.event", {
        filters: { slug: args.slug },
        populate: "*",
        limit: 1,
      });

      return entry;
    },
  },
};
