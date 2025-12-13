import { useQuery } from "@tanstack/react-query";
import { fetchStats, fetchRecentActivity } from "../endpoints/statsEndpoints";

export const useStats = () => {
  return useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: fetchStats,
    staleTime: 60000, // 1 minute
  });
};

export const useRecentActivity = () => {
  return useQuery({
    queryKey: ["dashboard", "activity"],
    queryFn: fetchRecentActivity,
    refetchInterval: 30000,
  });
};
