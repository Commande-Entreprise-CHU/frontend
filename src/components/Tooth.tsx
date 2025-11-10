import React from "react";
import ToothDropdown from "./ToothDropdown";
import type { ToothState } from "../types/teethTypes";
import { TOOTH_STATE_COLORS } from "../types/teethTypes";

interface ToothProps {
  toothId: string;
  ToothComponent: React.ComponentType<{ className?: string }>;
  currentState: ToothState;
  onStateChange: (toothId: string, state: ToothState) => void;
  mirrored?: boolean;
}

const Tooth: React.FC<ToothProps> = ({
  toothId,
  ToothComponent,
  currentState,
  onStateChange,
  mirrored = false,
}) => {
  const className = `${TOOTH_STATE_COLORS[currentState]} ${
    mirrored ? "scale-x-[-1]" : ""
  } w-fit h-20 transition-all duration-100`;

  return (
    <ToothDropdown
      toothId={toothId}
      currentState={currentState}
      onStateChange={onStateChange}
      trigger={<ToothComponent className={className} />}
    />
  );
};

export default Tooth;
