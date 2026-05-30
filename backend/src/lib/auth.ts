import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../drizzle/db";
import { admin } from "better-auth/plugins";
import { getEnv } from "../config/env";

const ENV = getEnv();

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  baseUrl: ENV.BETTER_AUTH_URL,
  secret: ENV.BETTER_AUTH_SECRET,
  trustedOrigins: [ENV.FRONTEND_URL],
  disableSecurePrefix: true,

  cookieOptions: {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  },
  // cross-domain cookies
  advanced: {
    cookiePrefix: "ecommerce26",
    defaultCookies: {
      session_token: {
        name: "better_auth_session",
        options: {
          httpOnly: true,
          // secure: ENV.NODE_ENV === "production" ? true : false,
          // sameSite: ENV.NODE_ENV === "production" ? "none" : "lax",
          secure: true,
          sameSite: "none",
          path: "/",
        },
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 8,
  },
  plugins: [
    admin({
      defaultRole: "customer",
    }),
  ],
});
