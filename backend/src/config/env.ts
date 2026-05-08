import { z } from "zod";
import dotenv from "dotenv";
dotenv.config({ quiet: true });

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().default(5000),
  DATABASE_URL: z.string(),
  BETTER_AUTH_URL: z.string(),
  BASE_URL: z.string(),
  FRONTEND_URL: z.string(),
  POLAR_ACCESS_TOKEN: z.string().optional(),
  POLAR_WEBHOOK_SECRET: z.string().optional(),
  POLAR_API_BASE: z.string().optional(),
  POLAR_CHECKOUT_PRODUCT_ID: z.string().optional(),
  SENTRY_DSN: z.string().url().optional(),
  STREAM_API_KEY: z.string().min(1),
  STREAM_API_SECRET: z.string().min(1),
  IMAGEKIT_PUBLIC_KEY: z.string().min(1),
  IMAGEKIT_PRIVATE_KEY: z.string().min(1),
  IMAGEKIT_ID: z.string().min(1),
  IMAGEKIT_URL_ENDPOINT: z.string(),
});
export type Env = z.infer<typeof envSchema>;

export function loadEnv() {
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    console.error(parsed.error.flatten().fieldErrors);
    throw new Error("Invalid environment variables");
  }
  return parsed.data;
}

let cachedEnv: Env | null = null;
export function getEnv() {
  if (!cachedEnv) {
    cachedEnv = loadEnv();
  }
  return cachedEnv;
}
