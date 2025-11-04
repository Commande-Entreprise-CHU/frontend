import React, { useState } from "react";
import type { FormOption } from "../types";

interface RevealRadioProps {
  label?: string;
  categoryLabel?: string;
  children?: React.ReactNode;
  className?: string;
  name: string;
  options: FormOption[];
  setFormData?: (data: {
    name: string;
    value: string | number | boolean;
  }) => void;
  required?: boolean;
}

const RevealRadio: React.FC<RevealRadioProps> = ({
  label,
  categoryLabel,
  children,
  className,
  name,
  options,
  setFormData,
  required = false,
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
  const hasNestedFields =
    selectedOption?.fields && selectedOption.fields.length > 0;

  return (
    <fieldset
      className={`fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4 ${className}`}
    >
      <legend className="fieldset-legend">
        {categoryLabel}
        {required && <span className="text-red-500 ml-1">*</span>}
      </legend>
      {label && <div className="mb-2 font-medium">{label}</div>}
      <div className="flex gap-4">
        {options.map((option) => (
          <label key={String(option.value)} className="label cursor-pointer">
            <input
              type="radio"
              name={name}
              value={String(option.value)}
              onChange={handleRadioChange}
              className="radio"
              checked={String(selectedValue) === String(option.value)}
              required={required}
            />
            <span className="label-text ml-2">{option.label}</span>
          </label>
        ))}
      </div>
      {hasNestedFields && children}
    </fieldset>
  );
};

export default RevealRadio;
