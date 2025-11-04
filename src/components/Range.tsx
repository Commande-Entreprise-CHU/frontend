import React, { useMemo } from "react";

interface RangeProps {
  steps: string[];
  setFormData: (data: { name: string; value: string }) => void;
  name: string;
  label?: string;
  required?: boolean;
}

const Range: React.FC<RangeProps> = ({
  steps,
  setFormData,
  name,
  label,
  required = false,
}) => {
  const [value, setValue] = React.useState(0);

  const stepSize = useMemo(() => {
    return Math.round(steps.length > 1 ? 100 / (steps.length - 1) : 100);
  }, [steps.length]);

  const valueToStep = useMemo(() => {
    const valuetostep: Record<number, string> = {};
    for (let i = 0; i < steps.length; i++) {
      valuetostep[Math.round(i * stepSize)] = steps[i];
    }
    return valuetostep;
  }, [steps, stepSize]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = Number(event.target.value);
    setValue(numValue);
    setFormData({
      name: name,
      value: valueToStep[numValue] || steps[steps.length - 1],
    });
  };

  return (
    <fieldset className="fieldset w-full">
      <legend className="fieldset-legend text-sm font-medium mb-2">
        {label || "Sévérité de la douleur"}
        {required && <span className="text-error ml-1">*</span>}
      </legend>
      <div className="w-full max-w-md">
        <input
          type="range"
          name={name}
          min={0}
          max={100}
          value={value}
          onChange={(e) => {
            handleChange(e);
          }}
          className="range range-primary range-sm w-full"
          step={stepSize}
          required={required}
        />
        <div className="flex justify-between px-1 mt-2">
          {steps.map((step, index) => (
            <div className="flex flex-col items-center" key={step + index}>
              <span className="text-xs opacity-60">|</span>
              <span className="text-xs mt-0.5 text-center w-14">{step}</span>
            </div>
          ))}
        </div>
      </div>
    </fieldset>
  );
};

export default Range;
