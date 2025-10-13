import React, { useRef, useState } from "react";

interface RevealCheckBoxProps {
  label?: string;
  categoryLabel?: string;
  children?: React.ReactNode;
  className?: string;
}

const RevealCheckBox: React.FC<RevealCheckBoxProps> = ({
  label,
  categoryLabel,
  children,
  className,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const checkboxRef = useRef<HTMLInputElement>(null);

  const handleCheckboxChange = () => {
    setIsChecked(checkboxRef.current?.checked || false);
  };

  return (
    <fieldset
      className={`fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4 ${className}`}
    >
      <legend className="fieldset-legend">{categoryLabel}</legend>
      <label className="label">
        <input
          type="checkbox"
          onChange={handleCheckboxChange}
          className="checkbox"
          ref={checkboxRef}
        />
        {label}
      </label>
      {isChecked && children}
    </fieldset>
  );
};

export default RevealCheckBox;
