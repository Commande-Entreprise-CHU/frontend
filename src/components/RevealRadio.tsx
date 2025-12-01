import React, { useState, useEffect } from "react";
import type { FormOption, AnyFormField } from "../types";

interface RevealRadioProps {
  label?: string;
  className?: string;
  name: string;
  options: FormOption[];
  setFormData: (data: { name: string; value: string | number }) => void;
  required?: boolean;
  renderField?: (field: AnyFormField) => React.ReactNode;
  value?: string | number;
  disabled?: boolean; // ⬅️ NUEVO
}

const RevealRadio: React.FC<RevealRadioProps> = ({
  label,
  className,
  name,
  options,
  setFormData,
  required = false,
  renderField,
  value,
  disabled = false, // ⬅️ NUEVO
}) => {
  const defaultOption =
    options.find((opt) => opt.default) || options[0];

  const [selectedValue, setSelectedValue] = useState<string | number>(
    value ??
      (defaultOption
        ? typeof defaultOption.value === "boolean"
          ? String(defaultOption.value)
          : defaultOption.value
        : "")
  );

  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return; // ⬅️ BLOQUEO TOTAL SI ESTÁ DESHABILITADO

    const newValue = event.target.value;
    setSelectedValue(newValue);

    setFormData({ name, value: newValue });
  };

  const selectedOption = options.find(
    (opt) => String(opt.value) === String(selectedValue)
  );
  const nestedFields = selectedOption?.fields || [];

  return (
    <div className={`w-full space-y-2 ${className || ""}`}>
      <div className="text-sm font-semibold text-primary opacity-80">
        {label}
        {required && <span className="text-error ml-1">*</span>}
      </div>

      <div
        className={`flex flex-wrap gap-3 ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {options.map((option) => (
          <label
            key={String(option.value)}
            className={`flex items-center transition-opacity ${
              disabled ? "cursor-not-allowed" : "cursor-pointer hover:opacity-80"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={String(option.value)}
              checked={String(selectedValue) === String(option.value)}
              onChange={handleRadioChange}
              className="radio radio-primary radio-sm"
              required={required}
              disabled={disabled} // ⬅️ DESHABILITA EL INPUT
            />
            <span className="label-text text-sm ml-2">
              {option.label}
            </span>
          </label>
        ))}
      </div>

      {/* Subcampos SOLO si está seleccionado y NO está disabled */}
      {!disabled &&
        nestedFields.length > 0 &&
        renderField && (
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
