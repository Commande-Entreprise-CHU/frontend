import React, { useState, useEffect, useCallback } from "react";
import Tooth from "./Tooth";
import { TOOTH_IDS } from "../types/teethTypes";
import type { TeethData, ToothState } from "../types/teethTypes";

import B1 from "./teeth/B1";
import B2 from "./teeth/B2";
import B3 from "./teeth/B3";
import B4 from "./teeth/B4";
import B5 from "./teeth/B5";
import B6 from "./teeth/B6";
import B7 from "./teeth/B7";
import B8 from "./teeth/B8";

import H1 from "./teeth/H1";
import H2 from "./teeth/H2";
import H3 from "./teeth/H3";
import H4 from "./teeth/H4";
import H5 from "./teeth/H5";
import H6 from "./teeth/H6";
import H7 from "./teeth/H7";
import H8 from "./teeth/H8";

interface TeethSelectorProps {
  name: string;
  label?: string;
  required?: boolean;
  setFormData: (data: { name: string; value: any }) => void;
  value?: TeethData;
  disabled?: boolean; // ⬅️ NUEVO
}

const COMPONENTS: Record<string, any> = {
  "11": H1, "12": H2, "13": H3, "14": H4, "15": H5, "16": H6, "17": H7, "18": H8,
  "21": H1, "22": H2, "23": H3, "24": H4, "25": H5, "26": H6, "27": H7, "28": H8,

  "31": B1, "32": B2, "33": B3, "34": B4, "35": B5, "36": B6, "37": B7, "38": B8,
  "41": B1, "42": B2, "43": B3, "44": B4, "45": B5, "46": B6, "47": B7, "48": B8,
};

const TeethSelector: React.FC<TeethSelectorProps> = ({
  name,
  label,
  required,
  setFormData,
  value,
  disabled = false, // ⬅️ NUEVO
}) => {

  const [teethData, setTeethData] = useState<TeethData>({});

// 🟩 2. AUTOCOMPLETADO — solo cargar, nunca subir al padre
useEffect(() => {
  if (value) {
    // Cargar valores guardados
    setTeethData(value);
  } else {
    // Inicializar si no hay nada
    const initial: TeethData = {};
    TOOTH_IDS.forEach((id) => (initial[id] = "Normal"));
    setTeethData(initial);
  }
}, [value]);

  // CAMBIO DEL ESTADO DE UN DIENTE
  const setToothState = useCallback(
    (toothId: string, state: ToothState) => {
      if (disabled) return; // ⬅️ NO PERMITE CAMBIOS

      setTeethData((prev) => {
        const updated = { ...prev, [toothId]: state };
        setFormData({ name, value: updated });
        return updated;
      });
    },
    [disabled, name, setFormData]
  );

  return (
    <div
      className={`flex flex-col items-center gap-4 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {label && (
        <label className="font-semibold text-primary">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* FILA SUPERIOR */}
      <div className="flex flex-row gap-1 items-end">
        {TOOTH_IDS.slice(0, 16).map((id) => {
          const Component = COMPONENTS[id];
          const mirrored = parseInt(id) > 20;

          return (
            <Tooth
              key={id}
              toothId={id}
              ToothComponent={Component}
              currentState={teethData[id]}
              onStateChange={setToothState}
              mirrored={mirrored}
              disabled={disabled} // ⬅️ SE PASA AL COMPONENTE
            />
          );
        })}
      </div>

      {/* FILA INFERIOR */}
      <div className="flex flex-row gap-1">
        {TOOTH_IDS.slice(16).map((id) => {
          const Component = COMPONENTS[id];
          const mirrored = parseInt(id) > 40;

          return (
            <Tooth
              key={id}
              toothId={id}
              ToothComponent={Component}
              currentState={teethData[id]}
              onStateChange={setToothState}
              mirrored={mirrored}
              disabled={disabled} // ⬅️ SE PASA AL COMPONENTE
            />
          );
        })}
      </div>
    </div>
  );
};

export default TeethSelector;
