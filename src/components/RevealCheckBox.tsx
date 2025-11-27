import React, { useRef, useState } from "react";

interface RevealCheckBoxProps {
  label?: string;
  children?: React.ReactNode;
  className?: string;
  name?: string;
  setFormData?: (data: { name: string; value: boolean }) => void;
}

const RevealCheckBox: React.FC<RevealCheckBoxProps> = ({
  label,
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

  return (
    <div className={`w-full space-y-2 ${className || ""}`}>
      <label className="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
        <input
          type="checkbox"
          onChange={handleCheckboxChange}
          className="checkbox checkbox-primary checkbox-sm"
          ref={checkboxRef}
          name={name}
        />
        <span className="label-text text-sm ml-2">{label}</span>
      </label>
      {isChecked && (
        <div className="pl-3 border-l-2 border-primary/40 space-y-2">
          {children}
        </div>
      )}
    </div>
  );
};

export default RevealCheckBox;
