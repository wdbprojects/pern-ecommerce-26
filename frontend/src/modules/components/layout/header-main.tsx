import LoginButton from "@/modules/components/auth/login-button";
import SignOutButton from "../auth/sign-out-button";

import DarkMode from "@/components/shared/dark-mode";
import AppLogo from "@/components/shared/app-logo";
import { Badge } from "@/components/ui/badge";
import { cookies } from "next/headers";

const getSession = async () => {
  const cookieStore = cookies();

  const cookieHeader = (await cookieStore)
    .getAll()
    .map((cookie) => {
      return `${cookie.name}=${cookie.value}`;
    })
    .join("; ");

  const res = await fetch("http://localhost:3000/api/me", {
    cache: "no-store",
    headers: {
      cookie: cookieHeader,
    },
  });
  if (!res.ok) return null;
  return res.json();
};

const HeaderMain = async () => {
  const session = await getSession();
  console.log(session);

  return (
    <header className="bg-background fixed top-0 right-0 z-50 h-auto w-full border-b px-2 py-2">
      <div className="container mx-auto flex w-full items-center justify-between gap-1 sm:gap-2">
        {/* // MENU & LOGO  & NAV LINKS */}
        <AppLogo />
        {/* // AUTH & BUTTONS */}
        <div className="flex shrink-0 items-center gap-4 p-1">
          <div>
            <span className="text-muted-foreground text-xs">Signed as: </span>
            <Badge variant="default">Hardcoded User</Badge>
          </div>

          <DarkMode />
          {session.error ? <LoginButton /> : <SignOutButton />}
        </div>
      </div>
    </header>
  );
};

export default HeaderMain;
