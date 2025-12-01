import React, { useState, useCallback, useMemo } from "react";
import B1 from "./teeth/B1";
import B2 from "./teeth/B2";
import B3 from "./teeth/B3";
import B4 from "./teeth/B4";
import B5 from "./teeth/B5";
import B6 from "./teeth/B6";
import B7 from "./teeth/B7";
import B8 from "./teeth/B8";

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
}

const COMPONENTS: Record<string, any> = {
  "11": H1,
  "12": H2,
  "13": H3,
  "14": H4,
  "15": H5,
  "16": H6,
  "17": H7,
  "18": H8,
  "21": H1,
  "22": H2,
  "23": H3,
  "24": H4,
  "25": H5,
  "26": H6,
  "27": H7,
  "28": H8,

  "31": B1,
  "32": B2,
  "33": B3,
  "34": B4,
  "35": B5,
  "36": B6,
  "37": B7,
  "38": B8,
  "41": B1,
  "42": B2,
  "43": B3,
  "44": B4,
  "45": B5,
  "46": B6,
  "47": B7,
  "48": B8,
};

const TeethSelector: React.FC<TeethSelectorProps> = ({
  name,
  label,
  required,
  options = DEFAULT_OPTIONS,
}) => {
  const [teethData, setTeethData] = useState<TeethData>(() => {
    const initialData: TeethData = {};
    TOOTH_IDS.forEach((id) => {
      initialData[id] = options[0].value; // Default to first option
    });
    setFormData({ name, value: JSON.stringify(initialData) });
    return initialData;
  });

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
    (toothId: string, state: string) => {
      setTeethData((prev) => {
        const updated = { ...prev, [toothId]: state };
        setFormData({ name, value: updated });
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
