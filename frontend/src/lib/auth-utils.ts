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

export const requireAuth = async () => {
  const session = await getSession();
  if (!session) {
    redirect(routes.login);
  }
  return session;
};

export const requireUnauth = async (path: keyof typeof routes) => {
  const session = await getSession();
  if (session) {
    redirect(routes[path]);
  }
  return session;
};
