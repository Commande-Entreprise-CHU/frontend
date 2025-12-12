import api from "../utils/api";

export interface User {
  id: string;
  email: string;
  nom: string;
  prenom: string;
  role: string;
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
