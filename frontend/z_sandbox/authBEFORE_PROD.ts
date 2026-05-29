/* import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../drizzle/db";
import { admin } from "better-auth/plugins";
import { getEnv } from "../config/env";

const ENV = getEnv();

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 8,
  },
  baseUrl: ENV.BASE_URL,
  trustedOrigins: [ENV.FRONTEND_URL],
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
 */
