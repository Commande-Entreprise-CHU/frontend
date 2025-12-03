import axios from "axios";

const BASE_URL = "http://localhost:5001";

export interface Patient {
  id: string;
  name: string;
  prenom: string;
  ipp?: string;
  dob: string;
  sexe: string;
  preConsult?: any;
  preOp?: any;
  postOp3?: any;
  postOp6?: any;
  createdAt: string;
  updatedAt: string;
}

export const fetchPatient = async (id: string): Promise<Patient> => {
  const { data } = await axios.get(`${BASE_URL}/api/patient/${id}`);
  return data;
};

export const searchPatients = async (query: string): Promise<Patient[]> => {
  const { data } = await axios.get(`${BASE_URL}/api/search`, {
    params: { q: query },
  });
  return data;
};

export const createPatient = async (patientData: any): Promise<Patient> => {
  const { data } = await axios.post(`${BASE_URL}/api/patient`, patientData);
  if (!data.success) throw new Error(data.message || "Error creating patient");
  return data.patient;
};

export const updateSection = async ({
  id,
  section,
  values,
}: {
  id: string;
  section: "preConsult" | "preOp" | "postOp3" | "postOp6";
  values: any;
}): Promise<Patient> => {
  const { data } = await axios.put(`${BASE_URL}/api/patient/${id}`, {
    section,
    values,
  });
  if (!data.success) throw new Error(data.message || "Error updating section");
  return data.patient;
};

