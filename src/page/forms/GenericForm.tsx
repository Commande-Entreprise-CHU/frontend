import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DynamicForm from "../../components/form/DynamicForm";
import PageHeader from "../../components/PageHeader";
import { FileText } from "lucide-react";
import { usePatient, useUpdatePatientSection } from "../../hooks/patientHooks";
import { useActiveTemplateByType } from "../../hooks/templateHooks";
import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../context/AuthContext";
import type { FormConfig } from "../../types";

interface GenericFormProps {
  patientId?: string;
  formSlug?: string;
  onSuccess?: () => void;
  hideHeader?: boolean;
}

export default function GenericForm({
  patientId: propId,
  formSlug: propSlug,
  onSuccess,
  hideHeader = false,
}: GenericFormProps = {}) {
  const params = useParams();
  const navigate = useNavigate();

  const id = propId || params.id;
  const slug = propSlug || params.slug;

  const { data: patient, isLoading: patientLoading } = usePatient(id || "");
  const {
    data: activeTemplate,
    isLoading: templateLoading,
    error: templateError,
  } = useActiveTemplateByType(slug || "");
  const updateSectionMutation = useUpdatePatientSection();
  const { showToast } = useToast();
  const { user } = useAuth();

  const [config, setConfig] = useState<FormConfig | null>(null);
  const [templateString, setTemplateString] = useState<string>("");
  const [consultationTypeId, setConsultationTypeId] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (activeTemplate) {
      setConfig(activeTemplate.structure);
      setTemplateString(activeTemplate.template);
      setConsultationTypeId(activeTemplate.consultationTypeId);
    }
  }, [activeTemplate]);

  if (patientLoading || templateLoading)
    return <p className="text-center mt-10">Chargement...</p>;
  if (!patient)
    return <p className="text-center mt-10 text-error">Patient introuvable</p>;
  if (templateError)
    return (
      <p className="text-center mt-10 text-warning">
        Aucun modèle actif pour ce type de consultation ({slug}).
      </p>
    );
  if (!config)
    return (
      <p className="text-center mt-10 text-warning">
        Modèle de consultation en cours de construction.
      </p>
    );

  // Get existing data from patient.consultations map
  const existingData = patient.consultations?.[slug || ""] || {};

  const initialData = {
    ...existingData,
    // Always inject patient demographics
    nom: patient.name,
    prenom: patient.prenom,
    dateNaissance: patient.dob,
    ipp: patient.ipp,
    sexe: patient.sexe,
    // Inject surgeon info
    chirurgienNom: user?.nom || "",
    chirurgienPrenom: user?.prenom || "",
    chu: user?.chu || "",
  };



  const handleSubmit = (formValues: any) => {
    if (!id || !consultationTypeId) return;

    updateSectionMutation.mutate(
      {
        id,
        values: formValues,
        consultationTypeId,
      },
      {
        onSuccess: () => {
          showToast("Consultation enregistrée avec succès !", "success");
          if (onSuccess) {
            onSuccess();
          } else {
            // Default behavior if used as a page
            navigate(`/patient/${id}`);
          }
        },
        onError: () => {
          showToast("Erreur lors de l’enregistrement des données.", "error");
        },
      }
    );
  };

  return (
    <div className="w-full py-6 px-4">
      {!hideHeader && (
        <PageHeader
          icon={FileText}
          title="Consultation"
          subtitle={slug ? `Type: ${slug}` : "Détails de la consultation"}
        />
      )}
      <DynamicForm
        config={config}
        templateString={templateString}
        initialData={initialData}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
