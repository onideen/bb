const sanitizePerson = (person: any) => {
  if (!person?.has_consented_to_share_information) {
    const { phone_number, email, ...rest } = person;
    return rest;
  }

  return person;
};

export const personResolvers = {
  Query: {
    people: async (_parent, _args, _ctx) => {
      const people = await strapi.entityService.findMany("api::person.person", {
        populate: "*",
      });

      return people.map(sanitizePerson);
    },

    person: async (_parent, args, _ctx) => {
      const entry = await strapi.entityService.findOne(
        "api::person.person",
        args.id,
        {
          populate: "*",
        }
      );

      return sanitizePerson(entry);
    },
  },
};
