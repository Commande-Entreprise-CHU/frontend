import { type FC, type ReactNode } from "react";
import Checkbox from "./Checkbox";
import type { AnyFormField } from "../../types";

interface RevealCheckBoxProps {
  name: string;
  label?: string;
  checked?: boolean;
  onChange: (checked: boolean) => void;
  subFields?: AnyFormField[];
  renderField?: (field: AnyFormField) => ReactNode;
  disabled?: boolean;
  className?: string;
  error?: string;
}

const RevealCheckBox: FC<RevealCheckBoxProps> = ({
  name,
  label,
  checked = false,
  onChange,
  subFields = [],
  renderField,
  disabled = false,
  className,
  error,
}) => {
  return (
    <div className={`space-y-3 ${className || ""}`}>
      <Checkbox
        name={name}
        label={label || ""}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        error={error}
      />

      {checked && subFields.length > 0 && renderField && (
        <div className="ml-6 pl-4 border-l-2 border-base-300 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          {subFields.map((field) => (
            <div key={field.name}>{renderField(field)}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RevealCheckBox;
