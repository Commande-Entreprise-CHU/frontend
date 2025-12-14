import api from "../utils/api";

// User roles in the system
export type UserRole = "master_admin" | "chu_admin" | "doctor";

export interface User {
  id: string;
  email: string;
  nom: string;
  prenom: string;
  role: UserRole;
  isActive: boolean;
  chuId: string | null;
  createdAt: string;
}

export const fetchUsers = async (): Promise<User[]> => {
  const { data } = await api.get("/api/admin/users");
  return data;
};

export const updateUserStatus = async (
  userId: string,
  isActive: boolean
): Promise<User> => {
  const { data } = await api.patch(`/api/admin/users/${userId}/status`, {
    isActive,
  });
  return data;
};

export const updateUserChu = async (
  userId: string,
  chuId: string
): Promise<User> => {
  const { data } = await api.patch(`/api/admin/users/${userId}/chu`, {
    chuId,
  });
  return data;
};

export const updateUserRole = async (
  userId: string,
  role: UserRole
): Promise<User> => {
  const { data } = await api.patch(`/api/admin/users/${userId}/role`, {
    role,
  });
  return data;
};

