import { useState, useCallback, useMemo, useEffect, type FC } from "react";
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

const TeethSelector: FC<TeethSelectorProps> = ({
  name,
  label,
  options = DEFAULT_OPTIONS,
  value,
  setFormData,
  disabled,
}) => {
  const [teethData, setTeethData] = useState<TeethData>(() => {
    const initialData: TeethData = {};
    TOOTH_IDS.forEach((id) => {
      initialData[id] = "Normal";
    });
    return initialData;
  });

  useEffect(() => {
    if (value) {
      if (typeof value === "string") {
        try {
          const parsed = JSON.parse(value);
          setTeethData((prev) => ({ ...prev, ...parsed }));
        } catch (e) {
          console.error("Failed to parse teeth data", e);
        }
      } else {
        setTeethData((prev) => ({ ...prev, ...value }));
      }
    }
  }, [value]);

  const setToothState = useCallback(
    (toothId: string, newState: string) => {
      if (disabled) return;

      setTeethData((prev) => {
        const newData = { ...prev, [toothId]: newState };
        setFormData({ name, value: JSON.stringify(newData) });
        return newData;
      });
    },
    [name, setFormData, disabled]
  );

  const colorMap = useMemo(() => {
    const map: Record<string, string> = {};
    options.forEach((opt) => {
      map[opt.value] = opt.color;
    });
    return map;
  }, [options]);

  return (
    <div className="flex flex-col items-center gap-8 p-6 bg-base-100 rounded-xl shadow-sm border border-base-200">
      <div className="w-full flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <span className="w-2 h-6 bg-primary rounded-full"></span>
          {label || "Schéma Dentaire"}
        </h3>
      </div>

      <div className="relative bg-base-200/30 p-8 rounded-3xl border border-base-200">
        {/* Upper Jaw */}
        <div className="flex gap-1 justify-center mb-1">
          {/* Quadrant 1 (Right Upper) */}
          <div className="flex gap-0.5">
            {[
              { id: "18", Comp: H8 },
              { id: "17", Comp: H7 },
              { id: "16", Comp: H6 },
              { id: "15", Comp: H5 },
              { id: "14", Comp: H4 },
              { id: "13", Comp: H3 },
              { id: "12", Comp: H2 },
              { id: "11", Comp: H1 },
            ].map(({ id, Comp }) => (
              <Tooth
                key={id}
                toothId={id}
                ToothComponent={Comp}
                currentState={teethData[id]}
                onStateChange={setToothState}
                options={options}
                colorMap={colorMap}
              />
            ))}
          </div>

          {/* Quadrant 2 (Left Upper) */}
          <div className="flex gap-0.5">
            {[
              { id: "21", Comp: H1 },
              { id: "22", Comp: H2 },
              { id: "23", Comp: H3 },
              { id: "24", Comp: H4 },
              { id: "25", Comp: H5 },
              { id: "26", Comp: H6 },
              { id: "27", Comp: H7 },
              { id: "28", Comp: H8 },
            ].map(({ id, Comp }) => (
              <Tooth
                key={id}
                toothId={id}
                ToothComponent={Comp}
                currentState={teethData[id]}
                onStateChange={setToothState}
                mirrored
                options={options}
                colorMap={colorMap}
              />
            ))}
          </div>
        </div>

        {/* Lower Jaw */}
        <div className="flex gap-1 justify-center">
          {/* Quadrant 4 (Right Lower) */}
          <div className="flex gap-0.5">
            {[
              { id: "48", Comp: B8 },
              { id: "47", Comp: B7 },
              { id: "46", Comp: B6 },
              { id: "45", Comp: B5 },
              { id: "44", Comp: B4 },
              { id: "43", Comp: B3 },
              { id: "42", Comp: B2 },
              { id: "41", Comp: B1 },
            ].map(({ id, Comp }) => (
              <Tooth
                key={id}
                toothId={id}
                ToothComponent={Comp}
                currentState={teethData[id]}
                onStateChange={setToothState}
                options={options}
                colorMap={colorMap}
              />
            ))}
          </div>

          {/* Quadrant 3 (Left Lower) */}
          <div className="flex gap-0.5">
            {[
              { id: "31", Comp: B1 },
              { id: "32", Comp: B2 },
              { id: "33", Comp: B3 },
              { id: "34", Comp: B4 },
              { id: "35", Comp: B5 },
              { id: "36", Comp: B6 },
              { id: "37", Comp: B7 },
              { id: "38", Comp: B8 },
            ].map(({ id, Comp }) => (
              <Tooth
                key={id}
                toothId={id}
                ToothComponent={Comp}
                currentState={teethData[id]}
                onStateChange={setToothState}
                mirrored
                options={options}
                colorMap={colorMap}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="w-full mt-4">
        <TeethSummary teethData={teethData} options={options} />
      </div>
    </div>
  );
};

export default TeethSelector;
