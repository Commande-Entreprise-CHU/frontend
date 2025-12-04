import axios from "axios";

const SERVER_URL =
  (import.meta.env.VITE_SERVER_URL as string) || "http://localhost:5001";
console.log("SERVER_URL:", SERVER_URL);
//const BASE_URL = "http://localhost:5001";
//const BASE_URL = "http://zs0cg84g0g4okgc4skw0c0oo.37.59.112.252.sslip.io";
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
  const { data } = await axios.get(`${SERVER_URL}/api/patient/${id}`);
  return data;
};

export const searchPatients = async (query: string): Promise<Patient[]> => {
  const { data } = await axios.get(`${SERVER_URL}/api/search`, {
    params: { q: query },
  });
  return data;
};

export const createPatient = async (patientData: any): Promise<Patient> => {
  const { data } = await axios.post(`${SERVER_URL}/api/patient`, patientData);
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
  const { data } = await axios.put(`${SERVER_URL}/api/patient/${id}`, {
    section,
    values,
  });
  if (!data.success) throw new Error(data.message || "Error updating section");
  return data.patient;
};
