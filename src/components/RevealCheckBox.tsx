import React, { useRef, useState, useEffect } from "react";

interface RevealCheckBoxProps {
  label?: string;
  children?: React.ReactNode;
  className?: string;
  name?: string;
  setFormData?: (data: { name: string; value: boolean }) => void;
  disabled?: boolean; // ⬅️ NUEVO
  checked?: boolean;  // ⬅️ Para soportar valores iniciales
}

const RevealCheckBox: React.FC<RevealCheckBoxProps> = ({
  label,
  children,
  className,
  name,
  setFormData,
  disabled = false,
  checked = false,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked);
  const checkboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleCheckboxChange = () => {
    if (disabled) return; // ⬅️ Evita cambios si está bloqueado

    const newValue = checkboxRef.current?.checked || false;
    setIsChecked(newValue);

    if (name && setFormData) {
      setFormData({ name, value: newValue });
    }
  };

  return (
    <div className={`w-full space-y-2 ${className || ""}`}>
      <label
        className={`flex items-center transition-opacity ${
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:opacity-80"
        }`}
      >
        <input
          type="checkbox"
          onChange={handleCheckboxChange}
          className="checkbox checkbox-primary checkbox-sm"
          ref={checkboxRef}
          name={name}
          checked={isChecked}
          disabled={disabled} // ⬅️ DESHABILITA EL INPUT
        />

        <span className="label-text text-sm ml-2">
          {label}
        </span>
      </label>

      {/* Solo mostrar children si está marcado y no está deshabilitado */}
      {!disabled && isChecked && (
        <div className="pl-3 border-l-2 border-primary/40 space-y-2">
          {children}
        </div>
      )}
    </div>
  );
};

export default RevealCheckBox;
