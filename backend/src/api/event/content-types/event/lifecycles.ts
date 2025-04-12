import { createSlugIfNeeded } from "../../../../plugins/slugify/server/services";

export default {
  async beforeCreate(event) {
    await createSlugIfNeeded(event, "title", "api::event.event");
  },
  async beforeUpdate(event) {
    await createSlugIfNeeded(event, "title", "api::event.event");
  },
};
