import { useEffect, useState, type FC, type ChangeEvent } from "react";

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

const Range: FC<RangeProps> = ({
  steps,
  setFormData,
  onChange,
  name,
  label,
  required = false,
  initialValue,
  value,
  disabled = false,
}) => {
  // Use index as the internal slider value (0 to steps.length - 1)
  const [sliderIndex, setSliderIndex] = useState(0);

  // Sync internal state with external value prop
  useEffect(() => {
    let targetValue = value !== undefined ? value : initialValue;
    
    // Handle case where value might be 0 (number) which is falsy but valid
    if (targetValue === undefined || targetValue === "") {
        setSliderIndex(0); 
        return;
    }

    const strValue = String(targetValue);
    const index = steps.indexOf(strValue);
    
    if (index !== -1) {
      setSliderIndex(index);
    } else {
        // Fallback: try to match by converting step to string in case steps are numbers
        const indexAlt = steps.findIndex(s => String(s) === strValue);
        if (indexAlt !== -1) setSliderIndex(indexAlt);
    }
  }, [value, initialValue, steps]);


  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    const newIndex = Number(event.target.value);
    setSliderIndex(newIndex);

    const stepValue = steps[newIndex];

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
          {steps[sliderIndex]}
        </span>
      </label>

      <div className="px-2">
        <input
          type="range"
          name={name}
          min={0}
          max={steps.length - 1}
          value={sliderIndex}
          onChange={handleChange}
          className={`range w-full range-primary range-sm ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          step={1}
          disabled={disabled}
        />
        <div className="relative w-full h-8 mt-2 text-xs text-base-content/50">
          {steps.map((step, index) => (
            <span
              key={index}
              className="absolute top-0 flex flex-col items-center transform -translate-x-1/2"
              style={{ left: `${(index / (steps.length - 1)) * 100}%` }}
            >
              <span className="w-1 h-1 rounded-full bg-base-content/20 mb-1"></span>
              <span className="hidden sm:block whitespace-nowrap">{step}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Range;
