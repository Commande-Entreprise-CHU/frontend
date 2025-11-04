interface RadioProps {
  label: string;
  options: {
    value: string | number | boolean;
    label: string;
    default?: boolean;
  }[];
  setFormData: (data: {
    name: string;
    value: string | number | boolean;
  }) => void;
  name: string;
  required?: boolean;
}
const Radio: React.FC<RadioProps> = ({
  label,
  options,
  setFormData,
  name,
  required = false,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ name, value });
  };
  return (
    <div className="w-full space-y-2">
      <div className="text-sm font-semibold text-primary opacity-80">
        {label}
        {required && <span className="text-error ml-1">*</span>}
      </div>
      <div className="flex flex-row flex-wrap gap-3">
        {options.map((option) => (
          <label
            key={String(option.value)}
            className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
          >
            <input
              type="radio"
              name={name}
              value={String(option.value)}
              className="radio radio-primary radio-sm"
              defaultChecked={option.default}
              onChange={handleInputChange}
              required={required}
            />
            <span className="label-text text-sm ml-2">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Radio;
