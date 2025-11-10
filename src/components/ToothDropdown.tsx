import React, { useRef, useEffect } from "react";
import type { ReactNode } from "react";
import type { ToothState } from "../types/teethTypes";

interface ToothDropdownProps {
  position?: string;
  align?: string;
  className?: string;
  dropdownClassName?: string;
  trigger: ReactNode;
  toothId: string;
  currentState: ToothState;
  onStateChange: (toothId: string, state: ToothState) => void;
}

const ToothDropdown: React.FC<ToothDropdownProps> = ({
  position = "",
  align = "",
  className = "",
  dropdownClassName = "",
  trigger,
  toothId,
  currentState,
  onStateChange,
}) => {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        detailsRef.current &&
        !detailsRef.current.contains(event.target as Node)
      ) {
        detailsRef.current.open = false;
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleStateSelect = (state: ToothState) => {
    onStateChange(toothId, state);
    if (detailsRef.current) {
      detailsRef.current.open = false;
    }
  };

  return (
    <details
      className={`dropdown ${position} ${align} ${className}`}
      ref={detailsRef}
    >
      <summary className="cursor-pointer list-none" role="button">
        {trigger}
      </summary>
      <div className={`absolute dropdown-content z-[10] ${dropdownClassName}`}>
        <div className="p-3 bg-base-200 rounded-lg shadow-lg min-w-[150px]">
          <p className="text-sm font-semibold mb-2 text-base-content">
            Dent {toothId}
          </p>
          <div className="space-y-1">
            <button
              onClick={() => handleStateSelect("Normal")}
              className={`btn btn-sm w-full justify-start ${
                currentState === "Normal" ? "btn-primary" : "btn-ghost"
              }`}
            >
              <span className="w-3 h-3 rounded-full bg-base-300 mr-2"></span>
              Normal
            </button>
            <button
              onClick={() => handleStateSelect("Missing")}
              className={`btn btn-sm w-full justify-start ${
                currentState === "Missing" ? "btn-error" : "btn-ghost"
              }`}
            >
              <span className="w-3 h-3 rounded-full bg-error mr-2"></span>
              Absente
            </button>
            <button
              onClick={() => handleStateSelect("Implant")}
              className={`btn btn-sm w-full justify-start ${
                currentState === "Implant" ? "btn-warning" : "btn-ghost"
              }`}
            >
              <span className="w-3 h-3 rounded-full bg-warning mr-2"></span>
              Implant
            </button>
          </div>
        </div>
      </div>
    </details>
  );
};

export default ToothDropdown;
