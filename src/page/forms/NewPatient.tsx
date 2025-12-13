import { useNavigate } from "react-router-dom";
import DynamicForm from "../../components/DynamicForm";
import PatientJson from "../../utils/json/Patient.json" with { type: "json" };
import { useCreatePatient } from "../../hooks/patientHooks";
import { UserPlus } from "lucide-react";
import PageHeader from "../../components/PageHeader";
import Card from "../../components/Card";
import type { FormConfig } from "../../types";
import { useToast } from "../../context/ToastContext";

const PatientConfig = PatientJson as FormConfig;

export default function NewPatient() {
  const navigate = useNavigate();
  const createPatientMutation = useCreatePatient();

  const { showToast } = useToast();

  const handleSubmit = (formValues: any) => {
    createPatientMutation.mutate(formValues, {
      onSuccess: (result) => {
        if (result.duplicate) {
          const confirmGo = window.confirm(
            "Ce patient existe déjà dans la base de données. Voulez-vous accéder à son dossier ?"
          );
          if (confirmGo) {
            navigate(`/patient/${result.patient.id}`);
          }
        } else {
          showToast("Patient créé avec succès !", "success");
          navigate(`/patient/${result.patient.id}`);
        }
      },
      onError: (error: any) => {
        showToast(`Erreur lors de l'enregistrement des données: ${error.message}`, "error");
      }
    });
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl space-y-6">
      <PageHeader
        icon={UserPlus}
        title="Nouveau Patient"
        subtitle="Créer un dossier pour une première consultation"
      />
      <Card bodyClassName="p-6">
        <DynamicForm
          config={PatientConfig}
          initialData={{}}
          onSubmit={handleSubmit}
          showTextGeneration={false}
          submitButtonText="Créer Patient"
        />
      </Card>
    </div>
  );
}
