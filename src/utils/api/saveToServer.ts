export async function saveToServer(formData: any) {
  try {
    const response = await fetch("http://localhost:5000/api/patient", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("❌ Error en saveToServer:", err);
    return { success: false };
  }
}
