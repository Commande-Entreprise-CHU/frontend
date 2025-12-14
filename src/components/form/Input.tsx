import { type FC, type ChangeEvent, type ReactNode } from "react";

interface InputProps {
  label?: string;
  value?: string | number | null;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  className?: string;
  optional?: boolean;
  name: string;
  setFormData?: (data: { name: string; value: string | null }) => void;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  icon?: ReactNode;
  size?: "xs" | "sm" | "md" | "lg";
}

const Input: FC<InputProps> = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  className = "",
  optional = false,
  name,
  setFormData,
  required = false,
  disabled = false,
  error,
  helperText,
  icon,
  size = "md",
}) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    if (onChange) {
      onChange(e);
    }

    if (setFormData) {
      const { name, value } = e.target;
      if (type === "number" && value === "") {
        setFormData({ name, value: null }); // Send null for empty number inputs
      } else {
        setFormData({ name, value });
      }
    }
  };

  const hasLabel = label && label.trim() !== "";

  return (
    <div className={`form-control w-full ${className}`}>
      {hasLabel && (
        <label className="label">
          <span
            className={`label-text font-medium ${disabled ? "opacity-50" : ""}`}
          >
            {label}
            {required && <span className="text-error ml-1">*</span>}
            {optional && (
              <span className="text-xs text-base-content/50 ml-2">
                (Optionnel)
              </span>
            )}
          </span>
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
            {icon}
          </div>
        )}
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          className={`input input-bordered w-full ${icon ? "pl-10" : ""} ${
            error ? "input-error" : ""
          } ${disabled ? "opacity-50 cursor-not-allowed" : ""} input-${size}`}
          value={value === null ? "" : value}
          onChange={handleInputChange}
          required={required}
          disabled={disabled}
        />
      </div>

      {(error || helperText) && (
        <label className="label">
          {error && <span className="label-text-alt text-error">{error}</span>}
          {helperText && !error && (
            <span className="label-text-alt text-base-content/60">
              {helperText}
            </span>
          )}
        </label>
      )}
    </div>
  );
};

export default Input;
