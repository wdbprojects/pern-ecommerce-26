import { pgTable, text, timestamp, boolean, index } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { uuid } from "drizzle-orm/pg-core";
import { integer } from "drizzle-orm/pg-core";
import { user } from "./auth.schema";
import { orderItems } from "./orderItems.schema";

export const product = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  category: text("category").notNull().default("General"),
  description: text("description").notNull().default(""),
  priceCents: integer("price_cents").notNull(),
  currency: text("currency").notNull().default("usd"),
  imageUrl: text("image_url"),
  // ImageKit `fileId` for deletes
  imageKitFileId: text("image_kit_file_id"),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

/* RELATIONS */
export const productRelations = relations(product, ({ many }) => ({
  orderItems: many(orderItems),
}));
