import { type FC, type ChangeEvent } from "react";

interface CheckboxProps {
  label: string;
  name: string;
  setFormData?: (data: { name: string; value: boolean }) => void;
  onChange?: (checked: boolean) => void;
  required?: boolean;
  checked?: boolean;
  disabled?: boolean;
  error?: string;
  image?: string;
  svg?: string;
}

const Checkbox: FC<CheckboxProps> = ({
  label,
  name,
  setFormData,
  onChange,
  required = false,
  checked = false,
  disabled = false,
  error,
  image,
  svg,
}) => {
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    const { checked } = e.target;
    if (onChange) {
      onChange(checked);
    } else if (setFormData) {
      setFormData({ name, value: checked });
    }
  };

  const isVisual = !!image || !!svg;

  return (
    <div className={`form-control ${isVisual ? "w-fit" : "w-fit"}`}>
       <label
        className={`
          cursor-pointer relative group
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          ${
            isVisual
              ? "flex flex-col items-center gap-2 p-2 rounded-xl border-2 transition-all hover:bg-base-200"
              : "label justify-start gap-3"
          }
          ${
            isVisual && checked
              ? "border-primary bg-primary/5 hover:bg-primary/10"
              : isVisual
              ? "border-transparent hover:border-base-300"
              : ""
          }
        `}
      >
        <input
          type="checkbox"
          name={name}
          className={isVisual ? "sr-only" : `checkbox checkbox-primary checkbox-sm ${error ? "checkbox-error" : ""}`}
          checked={checked}
          onChange={handleCheckboxChange}
          required={required}
          disabled={disabled}
        />

        {image && (
            <div className="w-24 h-24 rounded-lg overflow-hidden bg-base-100 border border-base-200">
              <img 
                src={image} 
                alt={label}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
        )}

        {svg && (
            <div 
              className={`w-24 h-24 rounded-lg flex items-center justify-center bg-base-100 border border-base-200 p-4 transition-colors ${checked ? "text-primary": "text-base-content"}`}
              dangerouslySetInnerHTML={{ __html: svg }}
            />
        )}

        <span className={`label-text font-medium ${error ? "text-error" : ""} ${isVisual ? "text-center text-sm" : ""}`}>
          {label}
          {required && !isVisual && <span className="text-error ml-1">*</span>}
        </span>
        
         {isVisual && checked && (
            <div className="absolute top-2 right-2 w-5 h-5 bg-primary text-primary-content rounded-full flex items-center justify-center shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
              </svg>
            </div>
          )}
      </label>
      {error && (
        <label className="label py-0">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
};

export default Checkbox;
