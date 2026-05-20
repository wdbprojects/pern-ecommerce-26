import { NextFunction, Request, Response } from "express";
import { orderItems, product } from "../drizzle/schema";
import { count, desc, eq } from "drizzle-orm";
import { db } from "../drizzle/db";
import {
  productCreateSchema,
  productUpdateSchema,
} from "../config/type-schemas";
import { buildProductUpdateSet, deleteImageKitAsset } from "../lib/utils";
import { getEnv } from "../config/env";
import ImageKit from "@imagekit/nodejs";

const ENV = getEnv();

/* IMAGE KIT AUTH ENDPOINT */
export const getImageKitAuth = (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const client = new ImageKit({ privateKey: ENV.IMAGEKIT_PRIVATE_KEY });
    const auth = client.helper.getAuthenticationParameters();
    res.json({
      ...auth,
      publicKey: ENV.IMAGEKIT_PUBLIC_KEY,
      urlEndpoint: ENV.IMAGEKIT_URL_ENDPOINT,
    });
  } catch (error) {
    next(error);
  }
};

/* LIST ALL PRODUCTS */
export const listAdminProducts = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const rows = await db
      .select()
      .from(product)
      .orderBy(desc(product.createdAt));
    res.json({ products: rows });
  } catch (error) {
    next(error);
  }
};

/* CREATE PRODUCT */
export const createAdminProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const parsed = productCreateSchema.safeParse(req.body);
    if (!parsed.success) {
      res
        .status(400)
        .json({ error: "Invalid body", details: parsed.error.flatten() });
      return;
    }
    const { imageUrl, imageKitFileId, ...rest } = parsed.data;
    const [row] = await db
      .insert(product)
      .values({
        ...rest,
        imageUrl: imageUrl || null,
        imageKitFileId: imageKitFileId || null,
      })
      .returning();
    res.status(201).json({ product: row });
  } catch (error) {
    next(error);
  }
};

/* UPDATE PRODUCT */
export const updateAdminProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const parsed = productUpdateSchema.safeParse(req.body);
    if (!parsed.success) {
      res
        .status(400)
        .json({ error: "Invalid body", details: parsed.error.flatten() });
      return;
    }
    const data = buildProductUpdateSet(parsed.data);
    if (Object.keys(data).length === 0) {
      res.status(400).json({ error: "No fields to update" });
      return;
    }
    const [row] = await db
      .update(product)
      .set(data)
      .where(eq(product.id, req.params.id as string))
      .returning();

    if (!row) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.status(201).json({
      message: "Product updated successfully!!",
      product: row,
    });
  } catch (error) {
    next(error);
  }
};

/* DELETE PRODUCT */
export const deleteAdminProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;
    const [existing] = await db
      .select()
      .from(product)
      .where(eq(product.id, id))
      .limit(1);
    if (!existing) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    const [countRow] = await db
      .select({ count: count() })
      .from(orderItems)
      .where(eq(orderItems.productId, id));
    if (Number(countRow?.count ?? 0) > 0) {
      res.status(409).json({
        error:
          "This product is on one or more orders and cannot be deleted. Deactivate it instead.",
      });
      return;
    }
    await deleteImageKitAsset(ENV, existing.imageKitFileId);
    await db.delete(product).where(eq(product.id, id));
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
