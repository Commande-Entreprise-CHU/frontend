import React from "react";

interface RadioProps {
  label: string;
  options: {
    value: string | number | boolean;
    label: string;
    default?: boolean;
  }[];
  setFormData?: (data: {
    name: string;
    value: string | number | boolean;
  }) => void;
  onChange?: (value: string | number | boolean) => void;
  name: string;
  required?: boolean;
  value?: string | number | boolean;
  disabled?: boolean;
  error?: string;
}

const Radio: React.FC<RadioProps> = ({
  label,
  options,
  setFormData,
  onChange,
  name,
  required = false,
  value,
  disabled = false,
  error,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const val = e.target.value;
    // Try to preserve type if possible (boolean/number)
    // This is a simple heuristic, might need refinement based on options
    let typedVal: string | number | boolean = val;
    if (val === "true") typedVal = true;
    else if (val === "false") typedVal = false;
    else if (!isNaN(Number(val)) && val !== "") typedVal = Number(val);

    if (onChange) {
      onChange(typedVal);
    } else if (setFormData) {
      setFormData({ name, value: typedVal });
    }
  };

  return (
    <div className="form-control w-full space-y-2">
      <label className="label">
        <span
          className={`label-text font-medium ${disabled ? "opacity-50" : ""} ${
            error ? "text-error" : ""
          }`}
        >
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </span>
      </label>

      <div className="flex flex-wrap gap-4">
        {options.map((option) => {
          const isChecked = String(value) === String(option.value);
          return (
            <label
              key={String(option.value)}
              className={`
                cursor-pointer flex items-center gap-2
                ${disabled ? "opacity-50 cursor-not-allowed" : ""}
              `}
            >
              <input
                type="radio"
                name={name}
                value={String(option.value)}
                checked={isChecked}
                onChange={handleInputChange}
                className={`radio radio-primary radio-sm ${
                  error ? "radio-error" : ""
                }`}
                required={required}
                disabled={disabled}
              />
              <span className={`label-text ${error ? "text-error" : ""}`}>
                {option.label}
              </span>
            </label>
          );
        })}
      </div>
      {error && (
        <label className="label">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
};

export default Radio;
