import axios from "axios";
const BASE_URL = "http://localhost:5000";

/* ====================================
    Crear o actualizar un paciente
   ==================================== */
export async function savePatient(formValues: any, id?: string) {
  try {
    let res;

    if (!id) {
      // Crear paciente
      res = await axios.post(`${BASE_URL}/api/patient`, formValues);
    } else {
      // Actualizar preConsult de paciente existente
      res = await axios.put(`${BASE_URL}/api/patient/${id}/preconsult`, formValues);
    }

    return res.data;
  } catch (err) {
    console.error("Error guardando paciente:", err);
    return { success: false };
  }
}
