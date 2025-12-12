import React, { createContext, useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  logout as logoutRequest,
  me as meRequest,
} from "../endpoints/authEndpoints";

interface User {
  id: string;
  email: string;
  nom: string;
  prenom: string;
  role: string;
  chuId?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const queryClient = useQueryClient();

  const meQuery = useQuery({
    queryKey: ["auth", "me"],
    queryFn: meRequest,
    retry: false,
  });

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

  return (
    <AuthContext.Provider
      value={{ user, token: null, login, logout, isAuthenticated: !!user, loading }}
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
