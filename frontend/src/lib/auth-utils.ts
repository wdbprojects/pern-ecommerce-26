import { routes } from "@/config/routes";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

// GET SESSION
export const getSession = async () => {
  const cookieStore = cookies();
  const cookieHeader = (await cookieStore)
    .getAll()
    .map((cookie) => {
      return `${cookie.name}=${cookie.value}`;
    })
    .join("; ");
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/me`, {
    cache: "no-store",
    headers: {
      cookie: cookieHeader,
    },
  });
  if (!res.ok) return null;
  return res.json();
};

// REQUIRE AUTH
export const requireAuth = async () => {
  const session = await getSession();
  if (!session) {
    redirect(routes.login);
  }
  return session;
};

// REQUIRE UNAUTH
export const requireUnauth = async (path: keyof typeof routes) => {
  const session = await getSession();
  if (session) {
    redirect(routes[path]);
  }
  return session;
};

const base = process.env.NEXT_PUBLIC_API_URL;

// API FETCH
/* export const apiFetch = async (
  path: string,
  opts: { method?: string; body?: FormData } = {},
) => {
  const { method = "GET", body } = opts;
  const headers = { "Content-Type": "application/json" };

  try {
    const res = await fetch(`${base}${path}`, {
      method: method,
      headers: headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) {
      console.log(`!res.ok: ${res}}`);
      return null;
    }
    return res.json();
  } catch (error) {
    console.error(error);
  }
}; */
