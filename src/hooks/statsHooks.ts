import { useQuery } from "@tanstack/react-query";
import { fetchStats, fetchRecentActivity, fetchMyRecentPatients } from "../endpoints/statsEndpoints";

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

export const useMyRecentPatients = () => {
  return useQuery({
    queryKey: ["dashboard", "my-recent-patients"],
    queryFn: fetchMyRecentPatients,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
