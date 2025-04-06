import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::person.person",
  ({ strapi }) => {
    const sanitizePerson = (entry) => {
      if (!entry.has_consented_to_share_information) {
        const { phone_number, email, ...rest } = entry;
        return rest;
      }
      return entry;
    };

    return {
      async find(ctx) {
        const { data, meta } = await super.find(ctx);

        const sanitizedData = data.map(sanitizePerson);

        return { data: sanitizedData, meta };
      },

      async findOne(ctx) {
        const { data } = await super.findOne(ctx);

        const sanitizedData = data ? sanitizePerson(data) : data;

        return { data: sanitizedData };
      },
    };
  }
);
