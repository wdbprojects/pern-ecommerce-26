import express from "express";
const app = express();
import { toNodeHandler, fromNodeHeaders } from "better-auth/node";
import { ENV } from "./config/env";
import { auth } from "./lib/auth";
import cors from "cors";

/* BETTER AUTH */
app.all("api/auth/*splat", toNodeHandler(auth));

/* MIDDLEWARES */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ENV.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

/* BETTER AUTH GET SESSION */
app.get("/api/me", async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  return res.json(session);
});
/* BETTER AUTH SIGN UP */
app.post("/api/auth/sign-up/email", async (req, res) => {
  try {
    const result = await auth.api.signUpEmail({
      body: {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
      },
    });
    return res.status(200).json({
      success: true,
      user: result,
      message: "User created successfully!!",
    });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ success: false, message: "Internal Server Error!!!" });
  }
});

/* API HEALTHY CHECK */
app.get("/", (req, res) => {
  res.json({
    message:
      "Welcome to Ecommerce26 API - Powered by PostgreSQL, Drizzle ORM & Better Auth",
    endpoints: {
      users: "/api/v1/users",
      products: "/api/v1/products",
      orders: "/api/v1/orders",
    },
  });
});

/* SERVER LISTEN */
app.listen(ENV.PORT, () => {
  console.log(`Server is running on port ${ENV.PORT}`);
});
