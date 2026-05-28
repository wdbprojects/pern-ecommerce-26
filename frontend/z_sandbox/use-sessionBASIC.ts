import { useQuery, useQueryClient } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";

export const sessionKeys = {
  all: ["session"] as const,
  user: () => [...sessionKeys.all, "user"] as const,
};

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified?: boolean;
  image?: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
  banned?: boolean;
  banReason?: string;
  banExpires?: Date;
}

export interface Session {
  user: User;
  session: {
    id: string;
    expiresAt: Date;
  };
}

export const useSession = () => {
  const queryClient = useQueryClient();

  const { data: session, isLoading } = useQuery({
    queryKey: sessionKeys.user(),
    queryFn: async () => {
      const { data: session, error } = await authClient.getSession();
      if (error) throw new Error(error.message);
      return session;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    retry: 1,
    retryDelay: 1000,
  });

  const refetchSession = () => {
    queryClient.invalidateQueries({ queryKey: sessionKeys.user() });
  };

  return {
    session: session,
    isLoading: isLoading,
    refetchSession: refetchSession,
    isAuthenticated: !!session,
  };
};

export const useUser = () => {
  const { session, isLoading } = useSession();
  return {
    user: session?.user,
    isLoading: isLoading,
    isAuthenticated: !!session?.user,
  };
};
