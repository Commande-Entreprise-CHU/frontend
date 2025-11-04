interface RadioProps {
  label: string;
  options: { value: any; label: string; default?: boolean }[];
  setFormData: (data: any) => void;
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
        <label key={option.value} className="flex items-center mr-4">
          <input
            type="radio"
            name={name}
            value={option.value}
            className="radio"
            defaultChecked={option.default}
            onChange={handleInputChange}
            required={required}
          />
          <span className="ml-2">{option.label}</span>
        </label>
      ))}
    </fieldset>
  );
};

export default Radio;
