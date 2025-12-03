import { useParams, useNavigate } from "react-router-dom";
import DynamicForm from "../../components/DynamicForm";
import PostOP6Json from "../../utils/json/PostOp6.json" with { type: "json" };
import { usePatient, useUpdatePatientSection } from "../../hooks/patientHooks";
import type { FormConfig } from "../../types";

const PostOP6Config = PostOP6Json as unknown as FormConfig;

export default function PostOp6() {
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
      section: "postOp6",
      values: formValues
    }, {
      onSuccess: () => {
        alert("Post-opératoire 6 mois mis à jour avec succès !");
        navigate(`/patient/${id}`);
      },
      onError: () => {
        alert("Erreur lors de l’enregistrement des données.");
      }
    });
  };

  return (
    <DynamicForm 
      config={PostOP6Config} 
      initialData={patient.postOp6 || {}}
      onSubmit={handleSubmit}
    />
  );
}
