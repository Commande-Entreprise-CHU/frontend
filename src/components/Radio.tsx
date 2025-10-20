interface RadioProps {
  label: string;
  options: { value: any; label: string; default?: boolean }[];
}
const Radio: React.FC<RadioProps> = ({ label, options }) => {
  return (
    <fieldset className="fieldset flex  flex-row ">
      <legend className="fieldset-legend">{label}</legend>
      {options.map((option) => (
        <label key={option.value} className="flex items-center mr-4">
          <input
            type="radio"
            name={label}
            value={option.value}
            className="radio"
            defaultChecked={option.default}
          />
          <span className="ml-2">{option.label}</span>
        </label>
      ))}
    </fieldset>
  );
};

export default Radio;
