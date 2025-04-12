import { createSlugIfNeeded } from "../../../../plugins/slugify/server/services";
export default {
  async beforeCreate(page) {
    await createSlugIfNeeded(page, "title", "api::page.page");
  },
  async beforeUpdate(page) {
    await createSlugIfNeeded(page, "title", "api::page.page");
  },
};
