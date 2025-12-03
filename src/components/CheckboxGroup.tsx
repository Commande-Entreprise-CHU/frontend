import React from "react";

interface CheckboxGroupProps {
  label: string;
  options: {
    value: string;
    label: string;
  }[];
  setFormData: (data: { name: string; value: string[] }) => void;
  name: string;
  required?: boolean;
  value?: string[];
  disabled?: boolean;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  label,
  options,
  setFormData,
  name,
  required = false,
  value = [],
  disabled = false,
}) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const { value: optionValue, checked } = e.target;
    
    const newValue = checked
      ? [...value, optionValue]
      : value.filter((v) => v !== optionValue);
      
    setFormData({ name, value: newValue });
  };

  return (
    <div className="w-full space-y-2 opacity-100">
      <div className={`text-sm font-semibold text-primary opacity-80 ${disabled ? "opacity-50" : ""}`}>
        {label}
        {required && <span className="text-error ml-1">*</span>}
      </div>

      <div className="flex flex-row flex-wrap gap-3">
        {options.map((option) => (
          <label
            key={option.value}
            className={`flex items-center transition-opacity ${
              disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:opacity-80"
            }`}
          >
            <input
              type="checkbox"
              name={name}
              value={option.value}
              checked={value.includes(option.value)}
              onChange={handleCheckboxChange}
              className="checkbox checkbox-primary checkbox-sm"
              disabled={disabled}
            />
            <span className="label-text text-sm ml-2">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CheckboxGroup;
