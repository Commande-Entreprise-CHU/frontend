import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DynamicForm from "../../components/DynamicForm";
import PremConsultJson from "../../utils/json/PremConsult.json" with { type: "json" };
import { getPatientById } from "../../utils/api/patientApi";
import { savePatient } from "../../utils/api/savePatient";
import type { FormConfig } from "../../types";

const PremConsultConfig = PremConsultJson as FormConfig;

export default function PremConsult() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState<any | null>(null);

  /* ===============================
      🟣 Charger données patient si ID
     =============================== */
  useEffect(() => {
    async function load() {
      if (!id) return;

      const patient = await getPatientById(id);
      if (!patient) return;

      setInitialData(patient.preConsult || {});
    }

    load();
  }, [id]);

  /* ===============================
      🟢 Sauvegarder patient
     =============================== */
  const handleSubmit = async (formValues: any) => {
    const saved = await savePatient(formValues, id);

    // ❌ Doublon → avertir et arrêter
    if (saved.duplicate) {
      alert("⚠️ Ce patient existe déjà. Impossible de le créer une deuxième fois.");
      return;
    }

    // ❌ Erreur inattendue
    if (!saved.success) {
      alert("❌ Erreur lors de l’enregistrement des données.");
      return;
    }

    // 🟢 Succès : création ou mise à jour
    const patientId = saved.patient.id;

    if (!id) {
      alert("Patient créé avec succès !");
      navigate(`/patient/${patientId}`);
    } else {
      alert("Pré-consultation mise à jour avec succès !");
      navigate(`/patient/${patientId}`);
    }
  };

  return (
    <DynamicForm
      config={PremConsultConfig}
      initialData={initialData}
      onSubmit={handleSubmit}
    />
  );
}
