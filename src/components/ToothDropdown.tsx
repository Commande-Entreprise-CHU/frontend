import React, { useRef, useEffect } from "react";
import type { ReactNode } from "react";
import type { ToothState } from "../types/teethTypes";
import type { ToothOption } from "./TeethSelector";

interface ToothDropdownProps {
  position?: string;
  align?: string;
  className?: string;
  dropdownClassName?: string;
  trigger: ReactNode;
  toothId: string;
  currentState: ToothState;
  onStateChange: (toothId: string, state: ToothState) => void;
  options: ToothOption[];
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
  options,
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
        <div className="p-3 bg-base-200 rounded-lg shadow-lg min-w-[220px]">
          <p className="text-sm font-semibold mb-2 text-base-content px-1">
            Dent {toothId}
          </p>
          <div className="space-y-1">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleStateSelect(option.value)}
                className={`btn btn-sm w-full justify-start flex-nowrap h-auto py-2 ${
                  currentState === option.value ? "btn-active" : "btn-ghost"
                }`}
              >
                <svg
                  className={`w-4 h-4 mr-3 flex-shrink-0 ${option.color} stroke-base-content/20`}
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                </svg>
                <span className="text-left whitespace-normal leading-tight">
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </details>
  );
};

export default ToothDropdown;
