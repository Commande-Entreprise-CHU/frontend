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
    <fieldset className="fieldset flex  flex-row  flex-wrap">
      <legend className="fieldset-legend">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </legend>
      {options.map((option) => (
        <label key={String(option.value)} className="flex items-center mr-4">
          <input
            type="radio"
            name={name}
            value={String(option.value)}
            className="radio"
            defaultChecked={option.default}
            onChange={handleInputChange}
            required={required}
          />
          <span className="label-text ml-2">{option.label}</span>
        </label>
      ))}
    </fieldset>
  );
};

export default Radio;
