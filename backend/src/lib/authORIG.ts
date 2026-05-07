import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../drizzle/db";
import { admin } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 8,
  },
  trustedOrigins: [process.env.FRONTEND_URL!],
  cookies: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
    sessionToken: {
      name: "ecommerce26.session_token",
      options: {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
      },
    },
  },
  advanced: {
    cookiePrefix: "ecommerce26",
    useSecureCookies: false, // Set to false for localhost HTTP
    defaultCookieAttributes: {
      sameSite: "lax", // For development with same-domain
      secure: false, // Must match useSecureCookies
      httpOnly: true, // Better for security
    },
  },
  plugins: [
    admin({
      defaultRole: "customer",
    }),
  ],
});
