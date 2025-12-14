import api from "../utils/api";
import type { UserRole } from "../context/AuthContext";

// User type matching backend UserPayload
export interface User {
  id: string;
  email: string;
  nom: string;
  prenom: string;
  role: UserRole;
  chuId?: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  nom: string;
  prenom: string;
  chuId: string;
}

export interface LoginResponse {
  success: boolean;
  user: User;
  message?: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
}

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const { data } = await api.post("/api/auth/login", credentials);
  return data;
};

export interface MeResponse {
  success: boolean;
  user?: User;
}

export const me = async (): Promise<MeResponse> => {
  try {
    const { data } = await api.get("/api/auth/me");
    return data;
  } catch {
    return { success: false };
  }
};

export const logout = async (): Promise<{ success: boolean }> => {
  const { data } = await api.post("/api/auth/logout");
  return data;
};

export const register = async (userData: RegisterData): Promise<RegisterResponse> => {
  const { data } = await api.post("/api/auth/register", userData);
  return data;
};
