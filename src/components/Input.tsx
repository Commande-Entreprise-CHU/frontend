import React from "react";

interface InputProps {
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  className?: string;
  optional?: boolean;
}
const Input: React.FC<InputProps> = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  className,
  optional = false,
}) => {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">{label}</legend>
      <input
        type={type}
        className={`input ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {optional && <p className="label">Optional</p>}
    </fieldset>
  );
};

export default Input;
