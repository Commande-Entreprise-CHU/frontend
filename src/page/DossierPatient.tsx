import { useState } from "react";
import { useParams } from "react-router-dom";
import { usePatient, useUpdatePatientSection } from "../hooks/patientHooks";

import DynamicForm from "../components/DynamicForm";

import PremConsultJson from "../utils/json/PremConsult.json" with { type: "json" };
import PreOpJson from "../utils/json/PreOp.json" with { type: "json" };
import Post3Json from "../utils/json/PostOp3.json" with { type: "json" };
import Post6Json from "../utils/json/PostOp6.json" with { type: "json" };


import type { FormConfig } from "../types";

import { formatDate } from "../utils/date";

const premConfig = PremConsultJson as FormConfig;
const preOpConfig = PreOpJson as FormConfig;
const post3Config = Post3Json as FormConfig;
const post6Config = Post6Json as FormConfig;

const TABS = ["preConsult", "preOp", "postOp3", "postOp6"] as const;

export default function DossierPatient() {
  const { id } = useParams();
  const { data: patient, isLoading, error } = usePatient(id || "");
  const updateSectionMutation = useUpdatePatientSection();
  const [activeTab, setActiveTab] = useState<"preConsult" | "preOp" | "postOp3" | "postOp6">("preConsult");

  if (isLoading) return <p className="text-center mt-10">Chargement...</p>;
  if (error || !patient) return <p className="text-center mt-10 text-error">Erreur lors du chargement du patient.</p>;

  const isCompleted = (key: string) => !!patient[key as keyof typeof patient];
  const canOpen = (key: string) => {
    if (key === "preConsult") return true;
    if (key === "preOp") return isCompleted("preConsult");
    if (key === "postOp3") return isCompleted("preOp");
    if (key === "postOp6") return isCompleted("postOp3");
    return false;
  };

  const getConfig = () => {
    if (activeTab === "preConsult") return premConfig;
    if (activeTab === "preOp") return preOpConfig;
    if (activeTab === "postOp3") return post3Config;
    return post6Config;
  };

  const getInitialData = () => {
    const data = patient[activeTab] || {};
    
    // If preConsult, merge with patient demographics
    if (activeTab === "preConsult") {
      return {
        ...data,
        name: patient.name,
        prenom: patient.prenom,
        dob: patient.dob,
        ipp: patient.ipp,
        sexe: patient.sexe
      };
    }
    
    return data;
  };

  const isReadOnly = isCompleted(activeTab);
  
  const handleSave = (values: any) => {
    updateSectionMutation.mutate({
      id: patient.id,
      section: activeTab,
      values
    }, {
      onSuccess: () => {
        alert("Données enregistrées !");
      },
      onError: () => {
        alert("Erreur lors de la sauvegarde.");
      }
    });
  };


  return (
    <div className="max-w-6xl mx-auto py-6">

      <h1 className="text-3xl font-bold text-primary text-center mb-6">
        Dossier Patient – {patient.name} {patient.prenom}
      </h1>

      <div className="w-full bg-base-200 rounded-lg py-3 px-6 shadow-sm mb-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-1 gap-x-6 text-[15px] leading-tight">
            <p><strong>Nom:</strong> {patient.name}</p>
            <p><strong>Prénom:</strong> {patient.prenom}</p>
            <p><strong>IPP:</strong> {patient.ipp || "—"}</p>
            <p><strong>Sexe:</strong> {patient.sexe}</p>
            <p><strong>Date de naissance:</strong> {formatDate(patient.dob)}</p>
        </div>
      </div>


      <div className="flex gap-3 mb-6">
        {TABS.map((tab) => {
          const labelMap: Record<typeof tab, string> = {
            preConsult: "Pré-Consultation",
            preOp: "Pré-Opération",
            postOp3: "Post-Op 3 mois",
            postOp6: "Post-Op 6 mois",
          };

          const isActive = activeTab === tab;
          const completed = isCompleted(tab);
          const allowed = canOpen(tab);

          return (
            <button
              key={tab}
              onClick={() => allowed && setActiveTab(tab)}
              className={`
                relative flex-1 text-center py-3 rounded-xl font-semibold transition-all
                ${isActive ? "bg-primary text-primary-content scale-[1.05] shadow-lg" : ""}
                ${!isActive && completed ? "bg-primary/20 text-primary" : ""}
                ${!isActive && !completed && allowed ? "bg-primary/10 text-primary" : ""}
                ${!allowed ? "bg-base-200 text-base-content cursor-not-allowed" : ""}
              `}
            >
              {labelMap[tab]}

              <span
                className={`
                  absolute -top-1 -right-1 badge badge-xs
                  ${completed ? "badge-primary" : allowed ? "badge-outline" : "badge-neutral"}
                `}
              >
                {completed ? "✓" : allowed ? "○" : "—"}
              </span>
            </button>
          );
        })}
      </div>

      

      <DynamicForm
        config={getConfig()}
        initialData={getInitialData()}
        readOnly={isReadOnly}
        onSubmit={(values) => handleSave(values)}
        />

    </div>
  );
}
