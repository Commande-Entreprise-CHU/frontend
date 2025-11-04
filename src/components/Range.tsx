import React, { useMemo } from "react";

interface RangeProps {
  steps: string[];
  setFormData: (data: any) => void;
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
    <fieldset className="fieldset w-full max-w-xs">
      <legend className="fieldset-legend">
        {label || "Sévérité de la douleur"}
        {required && <span className="text-red-500 ml-1">*</span>}
      </legend>
      <input
        type="range"
        name={name}
        min={0}
        max={100}
        value={value}
        onChange={(e) => {
          handleChange(e);
        }}
        className="range range-primary"
        step={stepSize}
        required={required}
      />
      <div className="flex justify-between px-2.5 mt-2 ">
        {steps.map((step, index) => (
          <span className="relative" key={step + index + "|"}>
            |
            <span
              key={step + index}
              className="absolute -left-5 top-5 text-center "
            >
              {step}
            </span>
          </span>
        ))}
      </div>
      <div className="flex justify-center mt-2  h-7"></div>
    </fieldset>
  );
};

export default Range;
