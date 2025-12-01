import axios from "axios";

const BASE_URL = "http://localhost:5000";

export async function getPatientById(id: string) {
  try {
    const res = await axios.get(`${BASE_URL}/api/patient/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error obteniendo paciente:", err);
    return null;
  }
}

