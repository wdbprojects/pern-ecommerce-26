import { NextFunction, Request, Response } from "express";
import { db } from "../drizzle/db";
import { product } from "../drizzle/schema";
import { desc, eq, and } from "drizzle-orm";

/* GET ALL PRODUCTS */
export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const cat =
      typeof req.query.category === "string" ? req.query.category.trim() : "";
    const activeOnly = eq(product.active, true);
    const whereClause = cat
      ? and(activeOnly, eq(product.category, cat))
      : activeOnly;
    const rows = await db
      .select()
      .from(product)
      .where(whereClause)
      .orderBy(desc(product.createdAt));
    res.json({ products: rows });
  } catch (error) {
    next(error);
  }
};

/* GET CATEGORIES SORTED */
export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const rows = await db
      .select({ category: product.category })
      .from(product)
      .where(eq(product.active, true));
    const categories = [
      ...new Set(
        rows.map((row) => {
          return row.category;
        }),
      ),
    ].sort((a, b) => {
      return a.localeCompare(b);
    });
    res.json({ categories: categories });
  } catch (event) {
    next(event);
  }
};

/* GET PRODUCT BY SLUG */
export const getProductBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const [row] = await db
      .select()
      .from(product)
      .where(eq(product.slug, req.params.slug as string))
      .limit(1);
    if (!row || !row.active) {
      return res.status(404).json({ error: "Not found" });
    }
    res.json({ product: row });
  } catch (event) {
    next(event);
  }
};
