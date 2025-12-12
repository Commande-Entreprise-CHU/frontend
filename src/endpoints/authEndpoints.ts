import api from "../utils/api";

export interface LoginResponse {
  success: boolean;
  token: string;
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

export const register = async (userData: any): Promise<RegisterResponse> => {
  const { data } = await api.post("/api/auth/register", userData);
  return data;
};
