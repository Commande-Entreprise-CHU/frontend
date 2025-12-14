import { createContext, useContext, useMemo, type FC, type ReactNode } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutRequest } from "../endpoints/authEndpoints";
import { useMe } from "../hooks/useAuthQueries";

// User roles in the system
export type UserRole = "master_admin" | "chu_admin" | "doctor";

interface User {
  id: string;
  email: string;
  nom: string;
  prenom: string;
  role: UserRole;
  chuId?: string | null;
  chu?: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
  // Role helper methods
  isMasterAdmin: boolean;
  isChuAdmin: boolean;
  isAdmin: boolean;
  canManageUsers: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const queryClient = useQueryClient();

  const meQuery = useMe();

  const user =
    meQuery.data && meQuery.data.success ? (meQuery.data.user as User) : null;
  const loading = meQuery.isLoading;

  const logoutMutation = useMutation({
    mutationFn: logoutRequest,
    onSettled: () => {
      queryClient.setQueryData(["auth", "me"], { success: false });
    },
  });

  const login = (newUser: User) => {
    queryClient.setQueryData(["auth", "me"], { success: true, user: newUser });
  };

  const logout = () => {
    logoutMutation.mutate();
  };

  // Role helper values
  const roleHelpers = useMemo(() => ({
    isMasterAdmin: user?.role === "master_admin",
    isChuAdmin: user?.role === "chu_admin",
    isAdmin: user?.role === "master_admin" || user?.role === "chu_admin",
    canManageUsers: user?.role === "master_admin" || user?.role === "chu_admin",
  }), [user?.role]);

  return (
    <AuthContext.Provider
      value={{ 
        user, 
        login, 
        logout, 
        isAuthenticated: !!user, 
        loading,
        ...roleHelpers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
