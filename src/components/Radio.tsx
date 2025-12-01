import React from "react";

interface RadioProps {
  label: string;
  options: {
    value: string | number | boolean;
    label: string;
    default?: boolean;
  }[];
  setFormData: (data: { name: string; value: string | number | boolean }) => void;
  name: string;
  required?: boolean;
  value?: string | number | boolean;
  disabled?: boolean;   // ⬅️ NUEVO
}

const Radio: React.FC<RadioProps> = ({
  label,
  options,
  setFormData,
  name,
  required = false,
  value,
  disabled = false,     // ⬅️ VALOR POR DEFECTO
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return; // ⬅️ NO PERMITIR CAMBIOS
    const { name, value } = e.target;
    setFormData({ name, value });
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
            key={String(option.value)}
            className={`flex items-center transition-opacity ${
              disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:opacity-80"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={String(option.value)}
              checked={String(value) === String(option.value)}
              onChange={handleInputChange}
              className="radio radio-primary radio-sm"
              required={required}
              disabled={disabled} // ⬅️ DESHABILITAR EL INPUT
            />
            <span className="label-text text-sm ml-2">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Radio;
