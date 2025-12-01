import axios from "axios";

const BASE_URL = "http://localhost:5000";

export async function updatePatientSection(
  patientId: string,
  section: "preConsult" | "preOp" | "postOp3" | "postOp6",
  values: any
) {
  try {
    const res = await axios.put(`${BASE_URL}/api/patient/${patientId}`, {
      section,
      values
    });

    return res.data;
  } catch (error) {
    console.error("❌ Error al actualizar sección:", error);
    return { success: false };
  }
}
