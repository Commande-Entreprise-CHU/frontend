import { useState, useEffect, type FC, type ChangeEvent } from "react";

interface ContinuousRangeProps {
  name: string;
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  value?: number | string;
  initialValue?: number | string;
  required?: boolean;
  disabled?: boolean;
  onChange?: (value: number) => void;
  setFormData?: (data: { name: string; value: number }) => void;
}

const ContinuousRange: FC<ContinuousRangeProps> = ({
  name,
  label,
  min = 0,
  max = 100,
  step = 1,
  unit = "",
  value,
  initialValue,
  required = false,
  disabled = false,
  onChange,
  setFormData,
}) => {
  const [currentValue, setCurrentValue] = useState<number>(() => {
    if (value !== undefined && value !== "") return Number(value);
    if (initialValue !== undefined && initialValue !== "") return Number(initialValue);
    return min;
  });

  useEffect(() => {
    if (value !== undefined && value !== "") {
      setCurrentValue(Number(value));
    }
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newVal = Number(e.target.value);
    setCurrentValue(newVal);

    if (onChange) {
      onChange(newVal);
    } else if (setFormData) {
      setFormData({ name, value: newVal });
    }
  };

  return (
    <div className="form-control w-full">
      <label className="label">
        <span className={`label-text font-medium ${disabled ? "opacity-50" : ""}`}>
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </span>
        <span className="label-text-alt font-bold text-primary">
          {currentValue} {unit}
        </span>
      </label>
      <div className="flex items-center gap-4">
        <span className="text-xs text-base-content/50 w-8 text-right">{min}</span>
        <input
          type="range"
          name={name}
          min={min}
          max={max}
          step={step}
          value={currentValue}
          onChange={handleChange}
          disabled={disabled}
          className={`range range-primary range-sm ${disabled ? "opacity-50" : ""}`}
        />
        <span className="text-xs text-base-content/50 w-8">{max}</span>
      </div>
    </div>
  );
};

export default ContinuousRange;
