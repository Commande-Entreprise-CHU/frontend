import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchPatient,
  searchPatients,
  createPatient,
  updateSection,
  deletePatient as deletePatientEndpoint,
  type Patient,
  type CreatePatientResult,
} from "../endpoints/patientEndpoints";

export type { Patient, CreatePatientResult };

// --- Hooks ---

export const usePatient = (id: string) => {
  return useQuery({
    queryKey: ["patient", id],
    queryFn: () => fetchPatient(id),
    enabled: !!id,
  });
};

export const useSearchPatients = (params: {
  name?: string;
  sexe?: string;
  ipp?: string;
  q?: string;
}) => {
  return useQuery({
    queryKey: ["patients", "search", params],
    queryFn: () => searchPatients(params),
  });
};

export const useCreatePatient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPatient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
  });
};

export const useUpdatePatientSection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSection,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["patient", data.id] });
    },
  });
};

export const useDeletePatient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePatientEndpoint,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
  });
};
