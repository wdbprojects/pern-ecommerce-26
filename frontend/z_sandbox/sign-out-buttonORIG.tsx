"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Loader2, LogOut } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { routes } from "@/config/routes";
import { useQueryClient } from "@tanstack/react-query";

const SignOutButton = () => {
  const [pendingLogout, startLogoutTransition] = useTransition();
  const router = useRouter();
  const queryClient = useQueryClient();

  /*   const handleLogout = () => {
    startLogoutTransition(async () => {
      await signOut({
        fetchOptions: {
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
          onSuccess: () => {
            toast.info("User signed out successfully");
            router.push(routes.home);
            router.refresh();
          },
        },
      });
    });
  }; */

  const handleSignOut = () => {
    startLogoutTransition(async () => {
      await authClient.signOut();
      queryClient.clear();
      router.push(routes.login);
      router.refresh();
      toast.info("User signed out successfully");
    });
  };

  return (
    <Button
      variant="destructive"
      size="sm"
      className=""
      // onClick={handleLogout}
      onClick={handleSignOut}
      disabled={pendingLogout}
    >
      {pendingLogout ? (
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="size-3.5 animate-spin" />
          <span>Pending...</span>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2">
          <LogOut className="size-3.5" />
          <span>Log out</span>
        </div>
      )}
    </Button>
  );
};

export default SignOutButton;
