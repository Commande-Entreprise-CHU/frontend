import api from "../utils/api";

export interface Patient {
  id: string;
  name: string;
  prenom: string;
  ipp?: string;
  dob: string;
  sexe: string;
  consultations?: Record<string, any>; // Map slug -> data
  createdAt: string;
  updatedAt: string;
}

export const fetchPatient = async (id: string): Promise<Patient> => {
  const { data } = await api.get(`/api/patient/${id}`);
  return data;
};

export const searchPatients = async (params: {
  name?: string;
  sexe?: string;
  ipp?: string;
  q?: string;
}): Promise<Patient[]> => {
  const { data } = await api.get(`/api/search`, {
    params,
  });
  return data;
};

export interface CreatePatientResult {
  patient: Patient;
  duplicate: boolean;
}

export const createPatient = async (
  patientData: any
): Promise<CreatePatientResult> => {
  const { data } = await api.post(`/api/patient`, patientData);
  if (!data.success && !data.duplicate) {
    throw new Error(data.message || "Error creating patient");
  }
  return {
    patient: data.patient,
    duplicate: data.duplicate || false,
  };
};

export const updateSection = async ({
  id,
  values,
  consultationTypeId,
}: {
  id: string;
  values: any;
  consultationTypeId: string;
}): Promise<Patient> => {
  const { data } = await api.put(`/api/patient/${id}`, {
    values,
    consultationTypeId,
  });
  if (!data.success) throw new Error(data.message || "Error updating section");
  return data.patient;
};

export const updatePatientCore = async (
  id: string,
  data: Partial<Patient>
): Promise<Patient> => {
  const response = await api.put(`/api/patient/${id}/core`, data);
  if (!response.data.success) {
    throw new Error(response.data.message || "Error updating patient");
  }
  return response.data.patient;
};

export const deletePatient = async (id: string): Promise<void> => {
  const { data } = await api.delete(`/api/patient/${id}`);
  if (!data.success) throw new Error(data.message || "Error deleting patient");
};
