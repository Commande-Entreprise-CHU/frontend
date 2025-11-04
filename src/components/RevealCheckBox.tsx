import React, { useRef, useState } from "react";

interface RevealCheckBoxProps {
  label?: string;
  categoryLabel?: string;
  children?: React.ReactNode;
  className?: string;
  name?: string;
  setFormData?: (data: { name: string; value: boolean }) => void;
}

const RevealCheckBox: React.FC<RevealCheckBoxProps> = ({
  label,
  categoryLabel,
  children,
  className,
  name,
  setFormData,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const checkboxRef = useRef<HTMLInputElement>(null);

  const handleCheckboxChange = () => {
    const checked = checkboxRef.current?.checked || false;
    setIsChecked(checked);
    if (name && setFormData) {
      setFormData({ name, value: checked });
    }
  };

  const hasCategoryLabel = categoryLabel && categoryLabel.trim() !== "";
  console.log(hasCategoryLabel, "hasCategoryLabel", categoryLabel);
  return (
    <fieldset
      className={`fieldset bg-base-100 h-fit border-base-300${
        hasCategoryLabel && "border p-4"
      } rounded-box   ${className}`}
    >
      {hasCategoryLabel && (
        <legend className="fieldset-legend">{categoryLabel}</legend>
      )}
      <label className="flex items-center">
        <input
          type="checkbox"
          onChange={handleCheckboxChange}
          className="checkbox"
          ref={checkboxRef}
          name={name}
        />
        <span className="label-text ml-2">{label}</span>
      </label>
      {isChecked && children}
    </fieldset>
  );
};

export default RevealCheckBox;
