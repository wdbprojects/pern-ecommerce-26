import { Env, getEnv } from "../config/env";
import { StreamChat } from "stream-chat";

const ENV = getEnv();

export const streamChatDisplayName = (
  role: any,
  displayName: string | null,
  email: string,
): string => {
  const base = displayName ?? email.split("@")[0];
  if (role === "admin") return `Admin - ${base}`;
  if (role === "support") return `Support - ${base}`;
  return base;
};

export const getStreamChatServer = () => {
  return StreamChat.getInstance(ENV.STREAM_API_KEY, ENV.STREAM_API_SECRET);
};

export const streamUserId = (userId: string) => {
  return `betterauth_${userId}`;
};
