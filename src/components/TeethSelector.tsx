import React, { useState, useCallback, useMemo, useEffect } from "react";
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

import Tooth from "./Tooth";
import TeethSummary from "./TeethSummary";
import type { TeethData } from "../types/teethTypes";
import { TOOTH_IDS } from "../types/teethTypes";

export interface ToothOption {
  value: string;
  label: string;
  color: string;
}

const DEFAULT_OPTIONS: ToothOption[] = [
  { value: "Normal", label: "Normal", color: "fill-base-300" },
  { value: "Missing", label: "Absente", color: "fill-error" },
  { value: "Implant", label: "Implant", color: "fill-warning" },
];

interface TeethSelectorProps {
  name: string;
  label?: string;
  required?: boolean;
  options?: ToothOption[];
  value?: string | TeethData;
  setFormData: (data: { name: string; value: string }) => void;
  disabled?: boolean;
}

const TeethSelector: React.FC<TeethSelectorProps> = ({
  name,
  label,
  required,
  options = DEFAULT_OPTIONS,
  value,
  setFormData,
  disabled = false,
}) => {
  const [teethData, setTeethData] = useState<TeethData>(() => {
    if (value) {
      if (typeof value === "string") {
        try {
          return JSON.parse(value);
        } catch {
          return {};
        }
      }
      return value;
    }
    const initialData: TeethData = {};
    TOOTH_IDS.forEach((id) => {
      initialData[id] = options[0].value; // Default to first option
    });
    return initialData;
  });

  // 🟩 2. AUTOCOMPLETADO — solo cargar, nunca subir al padre
  useEffect(() => {
    if (value) {
      // Cargar valores guardados
      if (typeof value === "string") {
        try {
          setTeethData(JSON.parse(value));
        } catch (e) {
          console.error("Error parsing teeth data", e);
        }
      } else {
        setTeethData(value);
      }
    } else {
      // Inicializar si no hay nada
      const initial: TeethData = {};
      TOOTH_IDS.forEach((id) => (initial[id] = options[0].value));
      setTeethData(initial);
    }
  }, [value, options]);

  // CAMBIO DEL ESTADO DE UN DIENTE
  const setToothState = useCallback(
    (toothId: string, state: string) => {
      if (disabled) return;
      setTeethData((prev) => {
        const updated = { ...prev, [toothId]: state };
        setFormData({ name, value: JSON.stringify(updated) });
        return updated;
      });
    },
    [disabled, name, setFormData]
  );

  const colorMap = useMemo(() => {
    return options.reduce((acc, opt) => {
      acc[opt.value] = opt.color;
      return acc;
    }, {} as Record<string, string>);
  }, [options]);

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
      <div className="flex gap-0.5 flex-row items-end">
        <Tooth
          toothId="18"
          ToothComponent={H8}
          currentState={teethData["18"]}
          onStateChange={setToothState}
          options={options}
          colorMap={colorMap}
        />
        <Tooth
          toothId="17"
          ToothComponent={H7}
          currentState={teethData["17"]}
          onStateChange={setToothState}
          options={options}
          colorMap={colorMap}
        />
        <Tooth
          toothId="16"
          ToothComponent={H6}
          currentState={teethData["16"]}
          onStateChange={setToothState}
          options={options}
          colorMap={colorMap}
        />
        <Tooth
          toothId="15"
          ToothComponent={H5}
          currentState={teethData["15"]}
          onStateChange={setToothState}
          options={options}
          colorMap={colorMap}
        />
        <Tooth
          toothId="14"
          ToothComponent={H4}
          currentState={teethData["14"]}
          onStateChange={setToothState}
          options={options}
          colorMap={colorMap}
        />
        <Tooth
          toothId="13"
          ToothComponent={H3}
          currentState={teethData["13"]}
          onStateChange={setToothState}
          options={options}
          colorMap={colorMap}
        />
        <Tooth
          toothId="12"
          ToothComponent={H2}
          currentState={teethData["12"]}
          onStateChange={setToothState}
          options={options}
          colorMap={colorMap}
        />
        <Tooth
          toothId="11"
          ToothComponent={H1}
          currentState={teethData["11"]}
          onStateChange={setToothState}
          options={options}
          colorMap={colorMap}
        />
        <Tooth
          toothId="21"
          ToothComponent={H1}
          currentState={teethData["21"]}
          onStateChange={setToothState}
          mirrored
          options={options}
          colorMap={colorMap}
        />
        <Tooth
          toothId="22"
          ToothComponent={H2}
          currentState={teethData["22"]}
          onStateChange={setToothState}
          mirrored
          options={options}
          colorMap={colorMap}
        />
        <Tooth
          toothId="23"
          ToothComponent={H3}
          currentState={teethData["23"]}
          onStateChange={setToothState}
          mirrored
          options={options}
          colorMap={colorMap}
        />
        <Tooth
          toothId="24"
          ToothComponent={H4}
          currentState={teethData["24"]}
          onStateChange={setToothState}
          mirrored
          options={options}
          colorMap={colorMap}
        />
        <Tooth
          toothId="25"
          ToothComponent={H5}
          currentState={teethData["25"]}
          onStateChange={setToothState}
          mirrored
          options={options}
          colorMap={colorMap}
        />
        <Tooth
          toothId="26"
          ToothComponent={H6}
          currentState={teethData["26"]}
          onStateChange={setToothState}
          mirrored
          options={options}
          colorMap={colorMap}
        />
        <Tooth
          toothId="27"
          ToothComponent={H7}
          currentState={teethData["27"]}
          onStateChange={setToothState}
          mirrored
          options={options}
          colorMap={colorMap}
        />
        <Tooth
          toothId="28"
          ToothComponent={H8}
          currentState={teethData["28"]}
          onStateChange={setToothState}
          mirrored
          options={options}
          colorMap={colorMap}
        />
      </div>

      <div className="flex gap-0.5 flex-row">
        <Tooth
          toothId="38"
          ToothComponent={B8}
          currentState={teethData["38"]}
          onStateChange={setToothState}
          options={options}
          colorMap={colorMap}
        />
        <Tooth
          toothId="37"
          ToothComponent={B7}
          currentState={teethData["37"]}
          onStateChange={setToothState}
          options={options}
          colorMap={colorMap}
        />
        <Tooth
          toothId="36"
          ToothComponent={B6}
          currentState={teethData["36"]}
          onStateChange={setToothState}
          options={options}
          colorMap={colorMap}
        />
        <Tooth
          toothId="35"
          ToothComponent={B5}
          currentState={teethData["35"]}
          onStateChange={setToothState}
          options={options}
          colorMap={colorMap}
        />
        <Tooth
          toothId="34"
          ToothComponent={B4}
          currentState={teethData["34"]}
          onStateChange={setToothState}
          options={options}
          colorMap={colorMap}
        />
        <Tooth
          toothId="33"
          ToothComponent={B3}
          currentState={teethData["33"]}
          onStateChange={setToothState}
          options={options}
          colorMap={colorMap}
        />
        <Tooth
          toothId="32"
          ToothComponent={B2}
          currentState={teethData["32"]}
          onStateChange={setToothState}
          options={options}
          colorMap={colorMap}
        />
        <Tooth
          toothId="31"
          ToothComponent={B1}
          currentState={teethData["31"]}
          onStateChange={setToothState}
          options={options}
          colorMap={colorMap}
        />
        <Tooth
          toothId="41"
          ToothComponent={B1}
          currentState={teethData["41"]}
          onStateChange={setToothState}
          mirrored
          options={options}
          colorMap={colorMap}
        />
        <Tooth
          toothId="42"
          ToothComponent={B2}
          currentState={teethData["42"]}
          onStateChange={setToothState}
          mirrored
          options={options}
          colorMap={colorMap}
        />
        <Tooth
          toothId="43"
          ToothComponent={B3}
          currentState={teethData["43"]}
          onStateChange={setToothState}
          mirrored
          options={options}
          colorMap={colorMap}
        />
        <Tooth
          toothId="44"
          ToothComponent={B4}
          currentState={teethData["44"]}
          onStateChange={setToothState}
          mirrored
          options={options}
          colorMap={colorMap}
        />
        <Tooth
          toothId="45"
          ToothComponent={B5}
          currentState={teethData["45"]}
          onStateChange={setToothState}
          mirrored
          options={options}
          colorMap={colorMap}
        />
        <Tooth
          toothId="46"
          ToothComponent={B6}
          currentState={teethData["46"]}
          onStateChange={setToothState}
          mirrored
          options={options}
          colorMap={colorMap}
        />
        <Tooth
          toothId="47"
          ToothComponent={B7}
          currentState={teethData["47"]}
          onStateChange={setToothState}
          mirrored
          options={options}
          colorMap={colorMap}
        />
        <Tooth
          toothId="48"
          ToothComponent={B8}
          currentState={teethData["48"]}
          onStateChange={setToothState}
          mirrored
          options={options}
          colorMap={colorMap}
        />
      </div>

      <TeethSummary teethData={teethData} options={options} />
    </div>
  );
};

export default TeethSelector;
