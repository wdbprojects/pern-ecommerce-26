import express from "express";
const app = express();
import { toNodeHandler, fromNodeHeaders } from "better-auth/node";
import { setCookieToHeader } from "better-auth/cookies";
import { ENV } from "./config/env";
import { auth } from "./lib/auth";
import cors from "cors";
import cookieParser from "cookie-parser";

/* MIDDLEWARES */
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    // methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);

/* BETTER AUTH */
app.all("api/auth/*splat", toNodeHandler(auth));

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
/* BETTER AUTH SIGN IN */
app.post("/api/auth/sign-in/email", async (req, res) => {
  try {
    const response = await auth.api.signInEmail({
      body: {
        email: req.body.email,
        password: req.body.password,
      },
      headers: fromNodeHeaders(req.headers),
      asResponse: true,
    });
    // forward any set-cookie headers to the client browser
    const setCookieHeader = response.headers.get("set-cookie");
    if (setCookieHeader) {
      res.setHeader("set-cookie", setCookieHeader);
    }
    // console.log({ setCookieHeader });

    const data = await response.json();

    return res.status(200).json({
      success: true,
      response: data,
      message: "User logged in successfully!!",
    });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ success: false, message: "Internal Server Error!!!" });
  }
});

/* BETTER AUTH SIGN OUT */
app.post("/api/auth/sign-out", async (req, res) => {
  try {
    const response = await auth.api.signOut({
      headers: fromNodeHeaders(req.headers),
      asResponse: true,
    });
    const setCookieHeader = response.headers.get("set-cookie");
    if (setCookieHeader) {
      res.setHeader("set-cookie", setCookieHeader);
    }
    const data = await response.json();
    return res.status(200).json({
      success: true,
      message: "User signed out successfully!!",
    });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ success: false, message: "Sign out failed!!!" });
  }
});

app.get("/api/me", async (req, res) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    // console.log("Incoming cookies:", req.headers.cookie); // for debugging
    if (!session) {
      return res.status(401).json({ error: "No active session!!!" });
    }

    return res.json(session);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get session!!!" });
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
