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
  trustedOrigins: [ENV.FRONTEND_URL, "https://pern-ecommerce-26.vercel.app"],
  // cross-domain cookies
  advanced: {
    cookiePrefix: "ecommerce26",
    crossSubDomainCookies: { enabled: false },
    defaultCookies: {
      session_token: {
        name: "auth_session",
        options: {
          httpOnly: true,
          secure: ENV.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          domain: ENV.NODE_ENV === "production" ? "onrender.com" : undefined,
        },
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 8,
  },

  // cookies: {
  //   session: {
  //     attributes: {
  //       httpOnly: true,
  //       sameSite: "lax",
  //       secure: false,
  //       path: "/",
  //     },
  //   },
  // },
  plugins: [
    admin({
      defaultRole: "customer",
    }),
  ],
});
