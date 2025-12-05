import React from "react";
import Radio from "./Radio";
import type { FormOption, AnyFormField } from "../types";

interface RevealRadioProps {
  name: string;
  label?: string;
  options: FormOption[];
  value?: string | number;
  onChange: (value: string | number) => void;
  setFormData?: (name: string, value: any) => void;
  renderField?: (field: AnyFormField) => React.ReactNode;
  disabled?: boolean;
  className?: string;
  required?: boolean;
  formData?: Record<string, any>;
  error?: string;
}

const RevealRadio: React.FC<RevealRadioProps> = ({
  name,
  label,
  options,
  value,
  onChange,
  renderField,
  disabled = false,
  className,
  required,
  error,
}) => {
  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className={`space-y-3 ${className || ""}`}>
      <Radio
        name={name}
        label={label || ""}
        options={options}
        value={value}
        onChange={(val) => onChange(val as string | number)}
        disabled={disabled}
        required={required}
        error={error}
      />

      {selectedOption?.fields &&
        selectedOption.fields.length > 0 &&
        renderField && (
          <div className="ml-6 pl-4 border-l-2 border-base-300 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
            {selectedOption.fields.map((field) => (
              <div key={field.name}>{renderField(field)}</div>
            ))}
          </div>
        )}
    </div>
  );
};

export default RevealRadio;
