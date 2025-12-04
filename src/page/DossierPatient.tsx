import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePatient } from "../hooks/patientHooks";
import { useConsultationTypes } from "../hooks/templateHooks";
import GenericForm from "./forms/GenericForm";
import { formatDate } from "../utils/date";

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
  }, [consultationTypes]);

  if (loadingPatient || loadingTypes)
    return <p className="text-center mt-10">Chargement...</p>;
  if (error || !patient)
    return (
      <p className="text-center mt-10 text-error">
        Erreur lors du chargement du patient.
      </p>
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
    <div className="max-w-6xl mx-auto py-6">
      <h1 className="text-3xl font-bold text-primary text-center mb-6">
        Dossier Patient – {patient.name} {patient.prenom}
      </h1>

      <div className="w-full bg-base-200 rounded-lg py-3 px-6 shadow-sm mb-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-1 gap-x-6 text-[15px] leading-tight">
          <p>
            <strong>Nom:</strong> {patient.name}
          </p>
          <p>
            <strong>Prénom:</strong> {patient.prenom}
          </p>
          <p>
            <strong>IPP:</strong> {patient.ipp || "—"}
          </p>
          <p>
            <strong>Sexe:</strong> {patient.sexe}
          </p>
          <p>
            <strong>Date de naissance:</strong> {formatDate(patient.dob)}
          </p>
        </div>
      </div>

      <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
        {sortedTypes.map((type, index) => {
          const isActive = activeTabSlug === type.slug;
          const completed = isCompleted(type.slug);
          const allowed = canOpen(index);

          return (
            <button
              key={type.id}
              onClick={() => allowed && setActiveTabSlug(type.slug)}
              className={`
                relative flex-1 min-w-[150px] text-center py-3 rounded-xl font-semibold transition-all
                ${
                  isActive
                    ? "bg-primary text-primary-content scale-[1.05] shadow-lg"
                    : ""
                }
                ${!isActive && completed ? "bg-primary/20 text-primary" : ""}
                ${
                  !isActive && !completed && allowed
                    ? "bg-primary/10 text-primary"
                    : ""
                }
                ${
                  !allowed
                    ? "bg-base-200 text-base-content cursor-not-allowed"
                    : ""
                }
              `}
            >
              {type.name}

              <span
                className={`
                  absolute -top-1 -right-1 badge badge-xs
                  ${
                    completed
                      ? "badge-primary"
                      : allowed
                      ? "badge-outline"
                      : "badge-neutral"
                  }
                `}
              >
                {completed ? "✓" : allowed ? "○" : "—"}
              </span>
            </button>
          );
        })}
      </div>

      {activeTabSlug && id && (
        <div key={activeTabSlug}>
          <GenericForm
            patientId={id}
            formSlug={activeTabSlug}
            onSuccess={() => {
              // Refresh patient data is handled by react-query invalidation in GenericForm
            }}
          />
        </div>
      )}
    </div>
  );
}
