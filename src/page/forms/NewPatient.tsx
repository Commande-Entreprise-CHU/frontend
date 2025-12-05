import { useNavigate } from "react-router-dom";
import DynamicForm from "../../components/DynamicForm";
import PatientJson from "../../utils/json/Patient.json" with { type: "json" };
import { useCreatePatient } from "../../hooks/patientHooks";
import type { FormConfig } from "../../types";

const PatientConfig = PatientJson as FormConfig;

export default function NewPatient() {
  const navigate = useNavigate();
  const createPatientMutation = useCreatePatient();

  const handleSubmit = (formValues: any) => {
    createPatientMutation.mutate(formValues, {
      onSuccess: (patient) => {
        alert("Patient créé avec succès !");
        navigate(`/patient/${patient.id}`);
      },
      onError: (error: any) => {
        alert(`Erreur lors de l’enregistrement des données: ${error.message}`);
      }
    });
  };

  return (
    <div className="w-full p-4">
      <DynamicForm
        config={PatientConfig}
        initialData={{}}
        onSubmit={handleSubmit}
        showTextGeneration={false}
        submitButtonText="Créer Patient"
      />
    </div>
  );
}
