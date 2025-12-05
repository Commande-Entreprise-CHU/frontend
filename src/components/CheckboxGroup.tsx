import React from "react";
import Checkbox from "./Checkbox";

interface CheckboxOption {
  value: string;
  label: string;
}

interface CheckboxGroupProps {
  name: string;
  label?: string;
  options: CheckboxOption[];
  value?: string[];
  onChange: (value: string[]) => void;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  setFormData?: (data: { name: string; value: string[] }) => void;
  error?: string;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  name,
  label,
  options,
  value = [],
  onChange,
  disabled = false,
  required = false,
  className,
  error,
}) => {
  const handleChange = (optionValue: string, checked: boolean) => {
    if (disabled) return;

    const newValue = checked
      ? [...value, optionValue]
      : value.filter((v) => v !== optionValue);

    onChange(newValue);
  };

  return (
    <div className={`form-control w-full ${className || ""}`}>
      {label && (
        <label className="label">
          <span
            className={`label-text font-medium text-base-content/80 ${
              error ? "text-error" : ""
            }`}
          >
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </span>
        </label>
      )}

      <div className="flex flex-wrap gap-4 mt-1">
        {options.map((option) => (
          <Checkbox
            key={option.value}
            name={`${name}-${option.value}`}
            label={option.label}
            checked={value.includes(option.value)}
            onChange={(checked) => handleChange(option.value, checked)}
            disabled={disabled}
          />
        ))}
      </div>
      {error && (
        <label className="label">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
};

export default CheckboxGroup;
