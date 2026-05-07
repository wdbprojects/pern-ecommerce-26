import { createAuthClient } from "better-auth/react";
// import { polarClient } from "@polar-sh/better-auth/client";

interface IOptions {
  httpOnly: boolean;
  secure: boolean;
  sameSite: string;
  path: string;
}

export const authClient = createAuthClient({
  // baseURL: process.env.NEXT_PUBLIC_API_URL,
  baseURL: "http://localhost:5000",
  fetch: (url: string, options: IOptions) =>
    fetch(url, {
      ...options,
      credentials: "include", // Required for cookies
    }),

  // plugins: [polarClient()]
});

export const { signIn, signUp, useSession, signOut } = authClient;
