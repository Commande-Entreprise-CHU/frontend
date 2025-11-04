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
  setFormData: (data: any) => void;
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
    <fieldset className="fieldset ">
      {hasLabel && (
        <legend className="fieldset-legend">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </legend>
      )}
      <input
        name={name}
        type={type}
        className={`input ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        required={required}
      />
      {optional && <p className="label">Optional</p>}
    </fieldset>
  );
};

export default Input;
