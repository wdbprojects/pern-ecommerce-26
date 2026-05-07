"use client";

import { buttonVariants } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { LogIn } from "lucide-react";
import Link from "next/link";
import React from "react";

const LoginButton = () => {
  return (
    <Link
      href={routes.login}
      className={buttonVariants({
        size: "sm",
        variant: "secondary",
        className: "flex items-center justify-center gap-2",
      })}
    >
      <LogIn className="size-3.5" />
      <span>Login</span>
    </Link>
  );
};

export default LoginButton;
