"use client";

import DarkMode from "@/components/shared/dark-mode";
import SignOutButton from "../auth/sign-out-button";
import AppLogo from "@/components/shared/app-logo";
import LoginButton from "../auth/login-button";
import { Badge } from "@/components/ui/badge";
import { useSession } from "@/hooks/use-session";
import { Skeleton } from "@/components/ui/skeleton";
// import { getSession } from "@/lib/auth-utils";

const HeaderDashboard = () => {
  // const session = await getSession();
  const { session, isLoading } = useSession();

  if (isLoading) {
    return (
      <header className="bg-background fixed top-0 right-0 z-50 h-auto w-full border-b px-2 py-2">
        <div className="container mx-auto flex w-full items-center justify-between gap-1 sm:gap-2">
          {/* // MENU & LOGO  & NAV LINKS */}
          <AppLogo />
          <div className="flex shrink-0 items-center gap-4 p-1">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-background fixed top-0 right-0 z-50 h-auto w-full border-b px-2 py-2">
      <div className="container mx-auto flex w-full items-center justify-between gap-1 sm:gap-2">
        {/* // MENU & LOGO  & NAV LINKS */}
        <AppLogo />
        {/* // AUTH & BUTTONS */}
        <div className="flex shrink-0 items-center gap-4 p-1">
          {session && (
            <div>
              <span className="text-muted-foreground text-xs">Signed as: </span>
              <Badge variant="default">
                {session?.user?.role?.toUpperCase()}
              </Badge>
            </div>
          )}
          <DarkMode />
          {!session ? <LoginButton /> : <SignOutButton />}
        </div>
      </div>
    </header>
  );
};

export default HeaderDashboard;
