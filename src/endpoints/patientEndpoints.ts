import axios from "axios";

const SERVER_URL =
  (import.meta.env.VITE_SERVER_URL as string) || "http://localhost:5001";

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
  const { data } = await axios.get(`${SERVER_URL}/api/patient/${id}`);
  return data;
};

export const searchPatients = async (params: {
  name?: string;
  sexe?: string;
  ipp?: string;
  q?: string;
}): Promise<Patient[]> => {
  const { data } = await axios.get(`${SERVER_URL}/api/search`, {
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
  const { data } = await axios.post(`${SERVER_URL}/api/patient`, patientData);
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
  const { data } = await axios.put(`${SERVER_URL}/api/patient/${id}`, {
    values,
    consultationTypeId,
  });
  if (!data.success) throw new Error(data.message || "Error updating section");
  return data.patient;
};
