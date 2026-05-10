import LoginButton from "@/modules/components/auth/login-button";
import SignOutButton from "../auth/sign-out-button";

import DarkMode from "@/components/shared/dark-mode";
import AppLogo from "@/components/shared/app-logo";
import { Badge } from "@/components/ui/badge";
import { getSession } from "@/lib/auth-utils";

const HeaderMain = async () => {
  const session = await getSession();

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

export default HeaderMain;
