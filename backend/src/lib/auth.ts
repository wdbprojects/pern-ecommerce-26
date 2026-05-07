import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../drizzle/db";
import { admin } from "better-auth/plugins";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 8,
  },
  baseUrl: "http://localhost:5000",
  trustedOrigins: ["http://localhost:3000"],
  cookies: {
    session: {
      attributes: {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        path: "/",
      },
    },
  },
  plugins: [
    admin({
      defaultRole: "customer",
    }),
  ],
});
