interface CheckboxProps {
  label: string;
  name: string;
  setFormData: (data: { name: string; value: boolean }) => void;
  required?: boolean;
  checked?: boolean;
  disabled?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  name,
  setFormData,
  required = false,
  checked = false,
  disabled = false,
}) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    const { name, checked } = e.target;
    setFormData({ name, value: checked });
  };

  return (
    <label
      className={`flex items-center py-0.5 transition-opacity ${
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      }`}
    >
      <input
        type="checkbox"
        name={name}
        className="checkbox checkbox-primary checkbox-sm"
        defaultChecked={checked}
        onChange={handleCheckboxChange}
        required={required}
        disabled={disabled}
      />

      <span className="label-text text-sm ml-2">
        {label}
        {required && <span className="text-error ml-1">*</span>}
      </span>
    </label>
  );
};

export default Checkbox;
