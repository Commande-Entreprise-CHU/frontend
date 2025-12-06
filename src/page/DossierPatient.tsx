import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePatient } from "../hooks/patientHooks";
import { useConsultationTypes } from "../hooks/templateHooks";
import GenericForm from "./forms/GenericForm";
import Card from "../components/Card";
import { formatDate } from "../utils/date";
import { User, Calendar, Activity, AlertCircle } from "lucide-react";

export default function DossierPatient() {
  const { id } = useParams();
  const {
    data: patient,
    isLoading: loadingPatient,
    error,
  } = usePatient(id || "");
  const { data: consultationTypes, isLoading: loadingTypes } =
    useConsultationTypes();

  const [activeTabSlug, setActiveTabSlug] = useState<string | null>(null);

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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-base-content flex items-center gap-3">
            <User className="text-primary" size={32} />
            {patient.name} {patient.prenom}
          </h1>
          <p className="text-base-content/60 mt-1 ml-11">
            Dossier médical informatisé
          </p>
        </div>
        <div className="badge badge-primary badge-lg p-4 font-mono">
          IPP: {patient.ipp || "—"}
        </div>
      </div>

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
        <div className="tabs tabs-boxed bg-base-200/50 p-1 gap-1 overflow-x-auto flex-nowrap justify-start">
          {sortedTypes.map((type, index) => {
            const isActive = activeTabSlug === type.slug;
            const completed = isCompleted(type.slug);
            const allowed = canOpen(index);

            return (
              <button
                key={type.id}
                type="button"
                onClick={() => allowed && setActiveTabSlug(type.slug)}
                className={`
                  tab tab-lg h-12 px-6 rounded-lg transition-all duration-200 flex-nowrap whitespace-nowrap gap-2
                  ${
                    isActive
                      ? "tab-active bg-base-100 shadow-sm text-primary font-bold border border-base-200"
                      : "hover:bg-base-200"
                  }
                  ${!isActive && completed ? "text-success" : ""}
                  ${
                    !allowed
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }
                `}
              >
                {completed && (
                  <span className="w-2 h-2 rounded-full bg-success"></span>
                )}
                {type.name}
              </button>
            );
          })}
        </div>

        {/* Active Tab Content */}
        <Card className="min-h-[400px] rounded-2xl" bodyClassName="p-6">
          {activeTabSlug && (
            <GenericForm
              key={activeTabSlug}
              patientId={id || ""}
              formSlug={activeTabSlug}
            />
          )}
        </Card>
      </div>
    </div>
  );
}
