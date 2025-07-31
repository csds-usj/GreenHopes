import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const trees = sqliteTable("trees", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  number: integer("number").notNull(), // Original tree number
  name: text("name").notNull(), // Temporary/common name
  scientificName: text("scientific_name"),
  group: text("group"),
  family: text("family"),
  descriptionMd: text("description_md"), // Markdown description
  imageUrl: text("image_url"), // R2 URL
  category: text("category", {
    enum: ["native", "endemic", "exotic", "poisonous"],
  }).notNull(),
});
