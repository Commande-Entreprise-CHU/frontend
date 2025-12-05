import React from "react";

interface CheckboxProps {
  label: string;
  name: string;
  setFormData?: (data: { name: string; value: boolean }) => void;
  onChange?: (checked: boolean) => void;
  required?: boolean;
  checked?: boolean;
  disabled?: boolean;
  error?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  name,
  setFormData,
  onChange,
  required = false,
  checked = false,
  disabled = false,
  error,
}) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    const { checked } = e.target;
    if (onChange) {
      onChange(checked);
    } else if (setFormData) {
      setFormData({ name, value: checked });
    }
  };

  return (
    <div className="form-control w-fit">
      <label
        className={`label cursor-pointer justify-start gap-3 ${
          disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
        }`}
      >
        <input
          type="checkbox"
          name={name}
          className={`checkbox checkbox-primary checkbox-sm ${
            error ? "checkbox-error" : ""
          }`}
          checked={checked}
          onChange={handleCheckboxChange}
          required={required}
          disabled={disabled}
        />
        <span className={`label-text font-medium ${error ? "text-error" : ""}`}>
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </span>
      </label>
      {error && (
        <label className="label py-0">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
};

export default Checkbox;
