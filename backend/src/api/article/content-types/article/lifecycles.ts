import { createSlugIfNeeded } from "../../../../plugins/slugify/server/services";
export default {
  async beforeCreate(article) {
    await createSlugIfNeeded(article, "title", "api::article.article");
  },
  async beforeUpdate(article) {
    await createSlugIfNeeded(article, "title", "api::article.article");
  },
};
