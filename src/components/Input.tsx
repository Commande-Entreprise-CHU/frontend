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
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ name, value });
  };

  const hasLabel = label && label.trim() !== "";

  return (
    <div className="w-full space-y-2">
      {hasLabel && (
        <div className="text-sm font-semibold text-primary opacity-80">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </div>
      )}
      <input
        name={name}
        type={type}
        className={`input input-bordered input-sm w-full ${className || ""}`}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        required={required}
      />
      {optional && <p className="text-xs opacity-70">Optionnel</p>}
    </div>
  );
};

export default Input;
