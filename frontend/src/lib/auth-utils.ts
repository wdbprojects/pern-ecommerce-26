import { routes } from "@/config/routes";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const requireAuth = async (role: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session || session.user.role !== role) {
    redirect(routes.login);
  }
  return session;
};

export const requireUnauth = async (path: keyof typeof routes) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session) {
    redirect(routes[path]);
  }
  return session;
};
