import { useState, useEffect } from "react";
import Tabs from "../components/Tabs";
import { useNavigate, useParams } from "react-router-dom";
import { usePatient, useDeletePatient } from "../hooks/patientHooks";
import { useConsultationTypes } from "../hooks/templateHooks";
import { useToast } from "../context/ToastContext";
import GenericForm from "./forms/GenericForm";
import Card from "../components/Card";
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import ConfirmationModal from "../components/ConfirmationModal";
import EditPatientModal from "../components/EditPatientModal";
import { formatDate } from "../utils/date";
import { User, Calendar, Activity, AlertCircle, Trash2, FileText, Pencil } from "lucide-react";

export default function DossierPatient() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { mutate: deletePatient, isPending: isDeleting } = useDeletePatient();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const {
    data: patient,
    isLoading: loadingPatient,
    error,
  } = usePatient(id || "");
  const { data: consultationTypes, isLoading: loadingTypes } =
    useConsultationTypes();
  
  const [activeTabSlug, setActiveTabSlug] = useState<string | null>(null);

  const handleDelete = () => {
    if (id) {
      deletePatient(id, {
        onSuccess: () => {
          showToast("Patient archivé avec succès", "success");
          setIsDeleteModalOpen(false);
          navigate("/");
        },
        onError: () => {
          showToast("Erreur lors de l'archivage du patient", "error");
          setIsDeleteModalOpen(false);
        },
      });
    }
  };

  // Set default active tab once types are loaded
  useEffect(() => {
    if (consultationTypes && consultationTypes.length > 0 && !activeTabSlug) {
      setActiveTabSlug(consultationTypes[0].slug);
    }
  }, [consultationTypes, activeTabSlug]);

  if (loadingPatient || loadingTypes)
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  if (error || !patient)
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-error gap-4">
        <AlertCircle size={48} />
        <p className="text-lg font-medium">
          Erreur lors du chargement du patient.
        </p>
      </div>
    );

  // Sort types by order
  const sortedTypes = [...(consultationTypes || [])].sort(
    (a, b) => a.order - b.order
  );

  const isCompleted = (slug: string) => {
    // Check if data exists in the dynamic map
    return !!patient.consultations?.[slug];
  };

  // Simple logic: allow access if previous one is completed, or if it's the first one
  const canOpen = (index: number) => {
    if (index === 0) return true;
    return true;
  };

  return (
    <div className="w-full mx-auto py-8 px-4 space-y-8">
      {/* Header Section */}
      <PageHeader
        icon={User}
        title={`${patient.name} ${patient.prenom}`}
        subtitle="Dossier médical informatisé"
        actions={
          <div className="flex items-center gap-3">
            <div className="badge badge-primary badge-lg p-4 font-mono">
              IPP: {patient.ipp || "—"}
            </div>
            <Button
              variant="ghost"
              onClick={() => setIsEditModalOpen(true)}
              className="btn-sm"
            >
              <Pencil size={16} className="mr-2" />
              Modifier
            </Button>
            <Button 
              variant="error" 
              onClick={() => setIsDeleteModalOpen(true)}
              className="btn-sm"
            >
              <Trash2 size={16} className="mr-2" />
              Archiver
            </Button>
          </div>
        }
      />
      
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Archiver le patient"
        message="Êtes-vous sûr de vouloir archiver ce patient ? Cette action supprimera l'accès au dossier mais les données seront conservées."
        confirmText="Archiver"
        variant="danger"
        isLoading={isDeleting}
      />

      {patient && (
        <EditPatientModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          patient={patient}
        />
      )}

      {/* Patient Info Card */}
      <Card
        title={
          <span className="text-sm uppercase tracking-wider text-base-content/50">
            Informations Administratives
          </span>
        }
        className="shadow-md"
        bodyClassName="p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <User size={20} />
            </div>
            <div>
              <p className="text-xs text-base-content/50">Sexe</p>
              <p className="font-medium">{patient.sexe}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-secondary/10 rounded-lg text-secondary">
              <Calendar size={20} />
            </div>
            <div>
              <p className="text-xs text-base-content/50">Date de naissance</p>
              <p className="font-medium">{formatDate(patient.dob)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent/10 rounded-lg text-accent">
              <Activity size={20} />
            </div>
            <div>
              <p className="text-xs text-base-content/50">Statut</p>
              <p className="font-medium">Actif</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Consultations Tabs */}
      <div className="space-y-6">
        <Tabs
          activeTab={activeTabSlug || ""}
          onChange={(slug) => {
             const type = sortedTypes.find(t => t.slug === slug);
             if (type) {
                const index = sortedTypes.indexOf(type);
                if (canOpen(index)) {
                  setActiveTabSlug(slug);
                }
             }
          }}
          tabs={sortedTypes.map((type, index) => ({
            id: type.slug,
            label: type.name,
            icon: type.slug === "prescription" ? FileText : undefined,
            disabled: !canOpen(index),
            completed: isCompleted(type.slug),
          }))}
        />

        {/* Active Tab Content */}
        <Card className="min-h-[400px] rounded-2xl" bodyClassName="p-6">
          {activeTabSlug && (
            <GenericForm
              key={activeTabSlug}
              patientId={id || ""}
              formSlug={activeTabSlug}
              hideHeader={true}
            />
          )}
        </Card>
      </div>
    </div>
  );
}
