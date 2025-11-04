import React, { useState } from "react";
import type { FormOption, AnyFormField } from "../types";

interface RevealRadioProps {
  label?: string;
  categoryLabel?: string;
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
  categoryLabel,
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
    <fieldset
      className={`fieldset flex  flex-row  flex-wrap bg-base-100 border-base-300 rounded-box w-64 border p-4 ${className}`}
    >
      <legend className="fieldset-legend">
        {categoryLabel}
        {required && <span className="text-red-500 ml-1">*</span>}
      </legend>
      {label && <div className="mb-2 font-medium">{label}</div>}
      <div className="flex gap-4">
        {options.map((option) => (
          <label key={String(option.value)} className="flex items-center mr-4">
            <input
              type="radio"
              name={name}
              value={String(option.value)}
              onChange={handleRadioChange}
              className="radio"
              defaultChecked={
                String(option.value) === String(defaultOption?.value)
              }
              required={required}
            />
            <span className="label-text ml-2">{option.label}</span>
          </label>
        ))}
      </div>
      {nestedFields.length > 0 && renderField && (
        <div>
          {nestedFields.map((nestedField) =>
            renderField(nestedField as AnyFormField)
          )}
        </div>
      )}
    </fieldset>
  );
};

export default RevealRadio;
