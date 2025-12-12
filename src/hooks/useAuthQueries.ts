import { useMutation, useQuery } from "@tanstack/react-query";
import { login, register, me } from "../endpoints/authEndpoints";

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
  });
};

export const useMe = () => {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: me,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
