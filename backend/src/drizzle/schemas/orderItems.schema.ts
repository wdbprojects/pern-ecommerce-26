import { integer, pgTable, uuid } from "drizzle-orm/pg-core";
import { order } from "./order.schema";
import { product } from "./product.schema";
import { relations } from "drizzle-orm";

export const orderItems = pgTable("order_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  orderId: uuid("order_id")
    .notNull()
    .references(() => order.id, { onDelete: "cascade" }),
  productId: uuid("product_id")
    .notNull()
    .references(() => product.id, { onDelete: "restrict" }),
  quantity: integer("quantity").notNull(),
  unitPriceCents: integer("unit_price_cents").notNull(),
});

/* RELATIONS */
export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(order, { fields: [orderItems.orderId], references: [order.id] }),
  product: one(product, {
    fields: [orderItems.productId],
    references: [product.id],
  }),
}));
