import { useParams, useNavigate } from "react-router-dom";
import DynamicForm from "../../components/DynamicForm";
import PremConsultJson from "../../utils/json/PremConsult.json" with { type: "json" };
import { usePatient, useUpdatePatientSection } from "../../hooks/patientHooks";
import type { FormConfig } from "../../types";

const PremConsultConfig = PremConsultJson as FormConfig;

export default function PremConsult() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: patient, isLoading } = usePatient(id || "");
  const updateSectionMutation = useUpdatePatientSection();

  if (isLoading) return <p>Chargement...</p>;
  if (!patient) return <p>Patient introuvable</p>;

  const initialData = {
    ...(patient.preConsult || {}),
    name: patient.name,
    prenom: patient.prenom,
    dob: patient.dob,
    ipp: patient.ipp,
    sexe: patient.sexe
  };

  const handleSubmit = (formValues: any) => {
    if (!id) return;

    updateSectionMutation.mutate({
      id,
      section: "preConsult",
      values: formValues
    }, {
      onSuccess: () => {
        alert("Pré-consultation mise à jour avec succès !");
        navigate(`/patient/${id}`);
      },
      onError: () => {
        alert("Erreur lors de l’enregistrement des données.");
      }
    });
  };

  return (
    <DynamicForm
      config={PremConsultConfig}
      initialData={initialData}
      onSubmit={handleSubmit}
    />
  );
}
