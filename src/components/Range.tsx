import React, { useMemo, useEffect } from "react";

interface RangeProps {
  steps: string[];
  setFormData?: (data: { name: string; value: string }) => void;
  onChange?: (value: string) => void;
  name: string;
  label?: string;
  required?: boolean;
  initialValue?: string;
  value?: string | number;
  disabled?: boolean;
}

const Range: React.FC<RangeProps> = ({
  steps,
  setFormData,
  onChange,
  name,
  label,
  required = false,
  initialValue,
  value = 0,
  disabled = false,
}) => {
  const [sliderValue, setSliderValue] = React.useState(value);

  const stepSize = useMemo(() => {
    return steps.length > 1
      ? Math.floor((100 / (steps.length - 1)) * 1000) / 1000
      : 100;
  }, [steps.length]);

  const valueToStep = useMemo(() => {
    const valuetostep: Record<number, string> = {};
    for (let i = 0; i < steps.length; i++) {
      valuetostep[i * stepSize] = steps[i];
    }
    return valuetostep;
  }, [steps, stepSize]);

  useEffect(() => {
    if (initialValue) {
      const index = steps.indexOf(initialValue);
      if (index !== -1) {
        const sliderPos = index * stepSize;
        setSliderValue(sliderPos);
      }
    }
  }, [initialValue, steps, stepSize]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    const numValue = Number(event.target.value);
    setSliderValue(numValue);

    const stepValue = valueToStep[numValue] || steps[steps.length - 1];

    if (onChange) {
      onChange(stepValue);
    } else if (setFormData) {
      setFormData({
        name: name,
        value: stepValue,
      });
    }
  };

  return (
    <div className="form-control w-full space-y-4">
      <label className="label">
        <span
          className={`label-text font-medium ${disabled ? "opacity-50" : ""}`}
        >
          {label || "Sévérité"}
          {required && <span className="text-error ml-1">*</span>}
        </span>
        <span className="label-text-alt font-bold text-primary">
          {valueToStep[Number(sliderValue)] || steps[0]}
        </span>
      </label>

      <div className="px-2">
        <input
          type="range"
          name={name}
          min={0}
          max={100}
          value={sliderValue}
          onChange={handleChange}
          className={`range range-primary range-sm ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          step={stepSize}
          disabled={disabled}
        />
        <div className="w-full flex justify-between text-xs px-2 mt-2 text-base-content/50">
          {steps.map((step, index) => (
            <span key={index} className="flex flex-col items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-base-content/20"></span>
              <span className="hidden sm:block">{step}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Range;
