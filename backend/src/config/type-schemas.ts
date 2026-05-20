import z from "zod";
import { ChannelData } from "stream-chat";

export const productCreateSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  category: z.string().min(1).default("General"),
  description: z.string().default(""),
  priceCents: z.number().int().positive(),
  currency: z.string().min(1).default("usd"),
  imageUrl: z
    .union([z.string().url(), z.literal("")])
    .optional()
    .nullable(),
  imageKitFileId: z
    .union([z.string().min(1), z.literal(""), z.null()])
    .optional(),
  active: z.boolean().default(true),
});

export const productUpdateSchema = productCreateSchema.partial();

export type ExtendedChannelData = ChannelData & {
  name: string;
};
