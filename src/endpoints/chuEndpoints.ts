import api from "../utils/api";

export interface Chu {
  id: string;
  name: string;
  city: string;
}

export const fetchChus = async (): Promise<Chu[]> => {
  const { data } = await api.get("/api/chus");
  return data;
};

export const createChu = async (chu: Omit<Chu, "id">): Promise<Chu> => {
  const { data } = await api.post("/api/chus", chu);
  return data;
};

export const updateChu = async (
  id: string,
  chu: Omit<Chu, "id">
): Promise<Chu> => {
  const { data } = await api.put(`/api/chus/${id}`, chu);
  return data;
};

export const deleteChu = async (id: string): Promise<void> => {
  await api.delete(`/api/chus/${id}`);
};
