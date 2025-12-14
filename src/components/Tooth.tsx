import { type FC, type ComponentType } from "react";
import ToothDropdown from "./ToothDropdown";
import type { ToothState } from "../types/teethTypes";
import type { ToothOption } from "./TeethSelector";

interface ToothProps {
  toothId: string;
  ToothComponent: ComponentType<{ className?: string }>;
  currentState: ToothState;
  onStateChange: (toothId: string, state: ToothState) => void;
  mirrored?: boolean;
  options: ToothOption[];
  colorMap: Record<string, string>;
}

const Tooth: FC<ToothProps> = ({
  toothId,
  ToothComponent,
  currentState,
  onStateChange,
  mirrored = false,
  options,
  colorMap,
}) => {
  const colorClass = colorMap[currentState] || "fill-base-300";
  const className = `${colorClass} ${
    mirrored ? "scale-x-[-1]" : ""
  } w-fit h-20 transition-all duration-100`;

  return (
    <ToothDropdown
      toothId={toothId}
      currentState={currentState}
      onStateChange={onStateChange}
      trigger={<ToothComponent className={className} />}
      options={options}
    />
  );
};

export default Tooth;
