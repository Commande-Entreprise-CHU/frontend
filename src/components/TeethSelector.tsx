import React, { useState, useCallback } from "react";
import B1 from "./teeth/B1";
import B2 from "./teeth/B2";
import H5 from "./teeth/H5";
import H6 from "./teeth/H6";
import H4 from "./teeth/H4";
import H3 from "./teeth/H3";
import H7 from "./teeth/H7";
import H2 from "./teeth/H2";
import H1 from "./teeth/H1";
import B3 from "./teeth/B3";
import H8 from "./teeth/H8";
import B4 from "./teeth/B4";
import B5 from "./teeth/B5";
import B6 from "./teeth/B6";
import B8 from "./teeth/B8";
import B7 from "./teeth/B7";

import Tooth from "./Tooth";
import type { TeethData, ToothState } from "../types/teethTypes";
import { TOOTH_IDS } from "../types/teethTypes";

interface TeethSelectorProps {
  onTeethChange?: (teethData: TeethData) => void;
  setFormData: (data: { name: string; value: string }) => void;
  name: string;
  label?: string;
  required?: boolean;
}

const TeethSelector: React.FC<TeethSelectorProps> = ({
  onTeethChange,
  setFormData,
  name,
  label,
  required,
}) => {
  const [teethData, setTeethData] = useState<TeethData>(() => {
    const initialData: TeethData = {};
    TOOTH_IDS.forEach((id) => {
      initialData[id] = "Normal";
    });
    setFormData({ name, value: JSON.stringify(initialData) });
    return initialData;
  });

  const setToothState = useCallback(
    (toothId: string, state: ToothState) => {
      setTeethData((prev) => {
        const newData = { ...prev, [toothId]: state };
        onTeethChange?.(newData);
        setFormData({ name, value: JSON.stringify(newData) });
        return newData;
      });
    },
    [onTeethChange, setFormData, name]
  );

  return (
    <div className="flex flex-col items-center gap-4 h-fit">
      {label && (
        <label className="mb-2 font-semibold text-primary">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="flex gap-0.5 flex-row items-end">
        <Tooth
          toothId="18"
          ToothComponent={H8}
          currentState={teethData["18"]}
          onStateChange={setToothState}
        />
        <Tooth
          toothId="17"
          ToothComponent={H7}
          currentState={teethData["17"]}
          onStateChange={setToothState}
        />
        <Tooth
          toothId="16"
          ToothComponent={H6}
          currentState={teethData["16"]}
          onStateChange={setToothState}
        />
        <Tooth
          toothId="15"
          ToothComponent={H5}
          currentState={teethData["15"]}
          onStateChange={setToothState}
        />
        <Tooth
          toothId="14"
          ToothComponent={H4}
          currentState={teethData["14"]}
          onStateChange={setToothState}
        />
        <Tooth
          toothId="13"
          ToothComponent={H3}
          currentState={teethData["13"]}
          onStateChange={setToothState}
        />
        <Tooth
          toothId="12"
          ToothComponent={H2}
          currentState={teethData["12"]}
          onStateChange={setToothState}
        />
        <Tooth
          toothId="11"
          ToothComponent={H1}
          currentState={teethData["11"]}
          onStateChange={setToothState}
        />
        <Tooth
          toothId="21"
          ToothComponent={H1}
          currentState={teethData["21"]}
          onStateChange={setToothState}
          mirrored
        />
        <Tooth
          toothId="22"
          ToothComponent={H2}
          currentState={teethData["22"]}
          onStateChange={setToothState}
          mirrored
        />
        <Tooth
          toothId="23"
          ToothComponent={H3}
          currentState={teethData["23"]}
          onStateChange={setToothState}
          mirrored
        />
        <Tooth
          toothId="24"
          ToothComponent={H4}
          currentState={teethData["24"]}
          onStateChange={setToothState}
          mirrored
        />
        <Tooth
          toothId="25"
          ToothComponent={H5}
          currentState={teethData["25"]}
          onStateChange={setToothState}
          mirrored
        />
        <Tooth
          toothId="26"
          ToothComponent={H6}
          currentState={teethData["26"]}
          onStateChange={setToothState}
          mirrored
        />
        <Tooth
          toothId="27"
          ToothComponent={H7}
          currentState={teethData["27"]}
          onStateChange={setToothState}
          mirrored
        />
        <Tooth
          toothId="28"
          ToothComponent={H8}
          currentState={teethData["28"]}
          onStateChange={setToothState}
          mirrored
        />
      </div>

      <div className="flex gap-0.5 flex-row">
        <Tooth
          toothId="38"
          ToothComponent={B8}
          currentState={teethData["38"]}
          onStateChange={setToothState}
        />
        <Tooth
          toothId="37"
          ToothComponent={B7}
          currentState={teethData["37"]}
          onStateChange={setToothState}
        />
        <Tooth
          toothId="36"
          ToothComponent={B6}
          currentState={teethData["36"]}
          onStateChange={setToothState}
        />
        <Tooth
          toothId="35"
          ToothComponent={B5}
          currentState={teethData["35"]}
          onStateChange={setToothState}
        />
        <Tooth
          toothId="34"
          ToothComponent={B4}
          currentState={teethData["34"]}
          onStateChange={setToothState}
        />
        <Tooth
          toothId="33"
          ToothComponent={B3}
          currentState={teethData["33"]}
          onStateChange={setToothState}
        />
        <Tooth
          toothId="32"
          ToothComponent={B2}
          currentState={teethData["32"]}
          onStateChange={setToothState}
        />
        <Tooth
          toothId="31"
          ToothComponent={B1}
          currentState={teethData["31"]}
          onStateChange={setToothState}
        />
        <Tooth
          toothId="41"
          ToothComponent={B1}
          currentState={teethData["41"]}
          onStateChange={setToothState}
          mirrored
        />
        <Tooth
          toothId="42"
          ToothComponent={B2}
          currentState={teethData["42"]}
          onStateChange={setToothState}
          mirrored
        />
        <Tooth
          toothId="43"
          ToothComponent={B3}
          currentState={teethData["43"]}
          onStateChange={setToothState}
          mirrored
        />
        <Tooth
          toothId="44"
          ToothComponent={B4}
          currentState={teethData["44"]}
          onStateChange={setToothState}
          mirrored
        />
        <Tooth
          toothId="45"
          ToothComponent={B5}
          currentState={teethData["45"]}
          onStateChange={setToothState}
          mirrored
        />
        <Tooth
          toothId="46"
          ToothComponent={B6}
          currentState={teethData["46"]}
          onStateChange={setToothState}
          mirrored
        />
        <Tooth
          toothId="47"
          ToothComponent={B7}
          currentState={teethData["47"]}
          onStateChange={setToothState}
          mirrored
        />
        <Tooth
          toothId="48"
          ToothComponent={B8}
          currentState={teethData["48"]}
          onStateChange={setToothState}
          mirrored
        />
      </div>
    </div>
  );
};

export default TeethSelector;
