import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchChus,
  createChu,
  updateChu,
  deleteChu,
  type Chu,
} from "../endpoints/chuEndpoints";

export const useChus = () => {
  return useQuery({
    queryKey: ["chus"],
    queryFn: fetchChus,
  });
};

export const useCreateChu = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (chu: Omit<Chu, "id">) => createChu(chu),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chus"] });
    },
  });
};

export const useUpdateChu = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, chu }: { id: string; chu: Omit<Chu, "id"> }) =>
      updateChu(id, chu),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chus"] });
    },
  });
};

export const useDeleteChu = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteChu(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chus"] });
    },
  });
};
