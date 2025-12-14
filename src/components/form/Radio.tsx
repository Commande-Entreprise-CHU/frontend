import { type FC, type ChangeEvent } from "react";

interface RadioProps {
  label: string;
  options: {
    value: string | number | boolean;
    label: string;
    default?: boolean;
    image?: string;
    svg?: string;
  }[];
  setFormData?: (data: {
    name: string;
    value: string | number | boolean;
  }) => void;
  onChange?: (value: string | number | boolean) => void;
  name: string;
  required?: boolean;
  value?: string | number | boolean;
  disabled?: boolean;
  error?: string;
}

const Radio: FC<RadioProps> = ({
  label,
  options,
  setFormData,
  onChange,
  name,
  required = false,
  value,
  disabled = false,
  error,
}) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const val = e.target.value;

    // Find the original option value to preserve type
    const selectedOption = options.find((opt) => String(opt.value) === val);
    const finalVal = selectedOption ? selectedOption.value : val;

    if (onChange) {
      onChange(finalVal);
    } else if (setFormData) {
      setFormData({ name, value: finalVal });
    }
  };

  return (
    <div className="form-control w-full space-y-2">
      <label className="label">
        <span
          className={`label-text font-medium ${disabled ? "opacity-50" : ""} ${
            error ? "text-error" : ""
          }`}
        >
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </span>
      </label>

      <div className="flex flex-wrap gap-4">
        {options.map((option) => {
          const isChecked = String(value) === String(option.value);
          const hasImage = !!option.image;
          const hasSvg = !!option.svg;
          const isVisual = hasImage || hasSvg;

          return (
            <label
              key={String(option.value)}
              className={`
                cursor-pointer relative group
                ${disabled ? "opacity-50 cursor-not-allowed" : ""}
                ${
                  isVisual
                    ? "flex flex-col items-center gap-2 p-2 rounded-xl border-2 transition-all hover:bg-base-200"
                    : "flex items-center gap-2"
                }
                ${
                  isVisual && isChecked
                    ? "border-primary bg-primary/5 hover:bg-primary/10"
                    : isVisual
                    ? "border-transparent hover:border-base-300"
                    : ""
                }
              `}
            >
              <input
                type="radio"
                name={name}
                value={String(option.value)}
                checked={isChecked}
                onChange={handleInputChange}
                className={isVisual ? "sr-only" : `radio radio-primary radio-sm ${error ? "radio-error" : ""}`}
                required={required}
                disabled={disabled}
              />
              
              {option.image && (
                <div className="w-24 h-24 rounded-lg overflow-hidden bg-base-100 border border-base-200">
                  <img 
                    src={option.image} 
                    alt={option.label}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              )}

              {option.svg && (
                <div 
                  className={`w-24 h-24 rounded-lg flex items-center justify-center bg-base-100 border border-base-200 p-4 transition-colors ${isChecked ? "text-primary": "text-base-content"}`}
                  dangerouslySetInnerHTML={{ __html: option.svg }}
                />
              )}

              <span className={`label-text font-medium ${error ? "text-error" : ""} ${isVisual ? "text-center text-sm" : ""}`}>
                {option.label}
              </span>
              
              {isVisual && isChecked && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-primary text-primary-content rounded-full flex items-center justify-center shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </label>
          );
        })}
      </div>
      {error && (
        <label className="label">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
};

export default Radio;
