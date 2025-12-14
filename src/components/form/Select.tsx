import { type FC, type SelectHTMLAttributes } from "react";

interface Option {
  value: string | number;
  label: string;
}

interface SelectProps
  extends Omit<
    SelectHTMLAttributes<HTMLSelectElement>,
    "onChange" | "size"
  > {
  label?: string;
  options: Option[];
  value?: string | number;
  onChange?: (value: string) => void;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  placeholder?: string;
}

const Select: FC<SelectProps> = ({
  label,
  options,
  value,
  onChange,
  error,
  helperText,
  fullWidth = true,
  size = "md",
  className = "",
  placeholder,
  disabled,
  ...props
}) => {
  const sizeClass = `select-${size}`;
  const widthClass = fullWidth ? "w-full" : "";
  const errorClass = error ? "select-error" : "";

  return (
    <div className={`form-control ${widthClass}`}>
      {label && (
        <label className="label">
          <span className={`label-text ${error ? "text-error" : ""}`}>
            {label}
          </span>
        </label>
      )}
      <select
        className={`select select-bordered ${sizeClass} ${widthClass} ${errorClass} ${className}`}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        disabled={disabled}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {(error || helperText) && (
        <label className="label">
          <span className={`label-text-alt ${error ? "text-error" : ""}`}>
            {error || helperText}
          </span>
        </label>
      )}
    </div>
  );
};

export default Select;
