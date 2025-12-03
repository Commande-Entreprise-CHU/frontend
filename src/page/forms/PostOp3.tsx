import { useParams, useNavigate } from "react-router-dom";
import DynamicForm from "../../components/DynamicForm";
import PostOPJson from "../../utils/json/PostOp3.json" with { type: "json" };
import { usePatient, useUpdatePatientSection } from "../../hooks/patientHooks";
import type { FormConfig } from "../../types";

const PostOPConfig = PostOPJson as unknown as FormConfig;

export default function PostOp3() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: patient, isLoading } = usePatient(id || "");
  const updateSectionMutation = useUpdatePatientSection();

  if (isLoading) return <p>Chargement...</p>;
  if (!patient) return <p>Patient introuvable</p>;

  const handleSubmit = (formValues: any) => {
    if (!id) return;
    updateSectionMutation.mutate({
      id,
      section: "postOp3",
      values: formValues
    }, {
      onSuccess: () => {
        alert("Post-opératoire 3 mois mis à jour avec succès !");
        navigate(`/patient/${id}`);
      },
      onError: () => {
        alert("Erreur lors de l’enregistrement des données.");
      }
    });
  };

  return (
    <DynamicForm 
      config={PostOPConfig} 
      initialData={patient.postOp3 || {}}
      onSubmit={handleSubmit}
    />
  );
}
