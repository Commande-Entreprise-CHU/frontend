interface CheckboxProps {
  label: string;
  name: string;
  setFormData: (data: { name: string; value: boolean }) => void;
  required?: boolean;
  checked?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  name,
  setFormData,
  required = false,
  checked = false,
}) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({ name, value: checked });
  };

  return (
    <label className="flex items-center">
      <input
        type="checkbox"
        name={name}
        className="checkbox"
        defaultChecked={checked}
        onChange={handleCheckboxChange}
        required={required}
      />
      <span className="label-text ml-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </span>
    </label>
  );
};

export default Checkbox;
