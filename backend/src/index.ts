import express from "express";
const app = express();
import { toNodeHandler, fromNodeHeaders } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";
import cookieParser from "cookie-parser";
import { getEnv } from "./config/env";
import cronJob from "./lib/cron";
import meRouter from "./routes/me.router";
import authRouter from "./routes/auth.router";
import productRouter from "./routes/product.router";
import streamRouter from "./routes/stream.router";
import checkoutRouter from "./routes/checkout.router";

const ENV = getEnv();
const rawJson = express.raw({ type: "application/json", limit: "1mb" });

/* WEBHOOKS */
app.post("/webhooks/polar", rawJson, (req, res) => {});

/* MIDDLEWARES */
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ENV.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

/* BETTER AUTH */
app.all("api/auth/*splat", toNodeHandler(auth));

/* ROUTES */
app.use("/api/me", meRouter);
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/stream", streamRouter);
app.use("/api/checkout", checkoutRouter);

/* CRON - FIX FOR RENDER IDLE ON FREE PLAN */
app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

/* API HEALTHY CHECK */
app.get("/", (req, res) => {
  res.json({
    message:
      "Welcome to Ecommerce26 API - Powered by PostgreSQL, Drizzle ORM & Better Auth",
  });
});

// TODO: add middleware to handle errors

/* SERVER LISTEN */
app.listen(ENV.PORT, () => {
  console.log(`Server is running on port ${ENV.PORT}`);
  if (ENV.NODE_ENV === "production") {
    cronJob.start();
  }
});
