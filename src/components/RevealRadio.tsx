import React, { useState } from "react";
import type { FormOption, AnyFormField } from "../types";

interface RevealRadioProps {
  label?: string;
  className?: string;
  name: string;
  options: FormOption[];
  setFormData?: (data: {
    name: string;
    value: string | number | boolean;
  }) => void;
  required?: boolean;
  renderField?: (field: AnyFormField) => React.ReactNode;
}

const RevealRadio: React.FC<RevealRadioProps> = ({
  label,
  className,
  name,
  options,
  setFormData,
  required = false,
  renderField,
}) => {
  const defaultOption = options.find((opt) => opt.default) || options[0];
  const [selectedValue, setSelectedValue] = useState<string | number>(
    defaultOption?.value || ""
  );

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedValue(value);

    if (setFormData) {
      setFormData({ name, value });
    }
  };

  const selectedOption = options.find(
    (opt) => String(opt.value) === String(selectedValue)
  );
  const nestedFields =
    selectedOption?.fields && selectedOption.fields.length > 0
      ? selectedOption.fields
      : [];

  return (
    <div className={`w-full space-y-2 ${className || ""}`}>
      <div className="text-sm font-semibold text-primary opacity-80">
        {label}
        {required && <span className="text-error ml-1">*</span>}
      </div>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => (
          <label
            key={String(option.value)}
            className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
          >
            <input
              type="radio"
              name={name}
              value={String(option.value)}
              onChange={handleRadioChange}
              className="radio radio-primary radio-sm"
              defaultChecked={
                String(option.value) === String(defaultOption?.value)
              }
              required={required}
            />
            <span className="label-text text-sm ml-2">{option.label}</span>
          </label>
        ))}
      </div>
      {nestedFields.length > 0 && renderField && (
        <div className="pl-3 border-l-2 border-primary/40 space-y-2">
          {nestedFields.map((nestedField) =>
            renderField(nestedField as AnyFormField)
          )}
        </div>
      )}
    </div>
  );
};

export default RevealRadio;
