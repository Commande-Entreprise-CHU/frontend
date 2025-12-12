import api from "../utils/api";

export interface LoginResponse {
  success: boolean;
  user: any;
  message?: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
}

export const login = async (credentials: any): Promise<LoginResponse> => {
  const { data } = await api.post("/api/auth/login", credentials);
  return data;
};

export interface MeResponse {
  success: boolean;
  user?: any;
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

export const register = async (userData: any): Promise<RegisterResponse> => {
  const { data } = await api.post("/api/auth/register", userData);
  return data;
};
