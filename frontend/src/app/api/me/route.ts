import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  const cookieStore = (await cookies()).toString();
  const cookieHeader = cookieStore.toString();
  const res = await fetch("http://localhost:5000/api/me", {
    method: "GET",
    headers: {
      cookie: cookieHeader,
    },
    credentials: "include",
  });

  const data = await res.json();
  return NextResponse.json(data);
};
