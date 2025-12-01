import React from "react";

interface InputProps {
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  className?: string;
  optional?: boolean;
  name: string;
  setFormData: (data: { name: string; value: string }) => void;
  required?: boolean;
  disabled?: boolean;   // ✔️ AÑADIDO
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  type = "text",
  placeholder,
  className,
  optional = false,
  name,
  setFormData,
  required = false,
  disabled = false,    // ✔️ DEFAULT
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return; // ✔️ Si está deshabilitado, no cambia nada
    const { name, value } = e.target;
    setFormData({ name, value });
  };

  const hasLabel = label && label.trim() !== "";

  return (
    <div className="w-full space-y-2">
      {hasLabel && (
        <div
          className={`text-sm font-semibold ${
            disabled ? "opacity-50" : "text-primary opacity-80"
          }`}
        >
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </div>
      )}

      <input
        name={name}
        type={type}
        className={`input input-bordered input-sm w-full ${
          className || ""
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`} // ✔️ estilizado
        placeholder={placeholder}
        value={value ?? ""} // ✔️ evita undefined
        onChange={handleInputChange}
        required={required}
        disabled={disabled} // ✔️ AÑADIDO
      />

      {optional && <p className="text-xs opacity-70">Optionnel</p>}
    </div>
  );
};

export default Input;
