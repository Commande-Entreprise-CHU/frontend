import api from "../utils/api";

export interface DashboardStats {
  patients: number;
  consultations: number;
  users: number;
}

export const fetchStats = async (): Promise<DashboardStats> => {
  const { data } = await api.get("/api/stats");
  return data.stats;
};

export interface AuditLog {
  id: string;
  action: string;
  resource: string;
  status: string;
  createdAt: string;
  details: any;
  userEmail?: string;
  userName?: string;
}

export const fetchRecentActivity = async (): Promise<AuditLog[]> => {
  const { data } = await api.get("/api/audit");
  // Assuming /api/audit returns { success: true, logs: [...] }
  return data.logs ? data.logs.slice(0, 10) : [];
};
