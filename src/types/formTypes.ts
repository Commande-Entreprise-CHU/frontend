export interface FormOption {
  value: string | number;
  label: string;
  default?: boolean;
  fields?: AnyFormField[];
}

export interface FormField {
  type:
    | "Input"
    | "Radio"
    | "Range"
    | "RevealRadio"
    | "Select"
    | "Checkbox"
    | "RevealCheckBox"
    | "TeethSelector";
  label: string;
  name: string;
  pdfName: string;
  required?: boolean;
}

export interface InputField extends FormField {
  type: "Input";
  placeholder?: string;
  inputType?: "text" | "email" | "password" | "number" | "date" | "tel";
}

export interface RadioField extends FormField {
  type: "Radio";
  options: FormOption[];
}

export interface RangeField extends FormField {
  type: "Range";
  steps: string[];
}

export interface RevealRadioField extends FormField {
  type: "RevealRadio";
  categoryLabel: string;
  options: FormOption[];
}

export interface SelectField extends FormField {
  type: "Select";
  options: FormOption[];
  placeholder?: string;
}

export interface CheckboxField extends FormField {
  type: "Checkbox";
}

export interface RevealCheckBoxField extends FormField {
  type: "RevealCheckBox";
  categoryLabel?: string;
  fields?: AnyFormField[];
}

export interface TeethSelectorField extends FormField {
  type: "TeethSelector";
}

export type AnyFormField =
  | InputField
  | RadioField
  | RangeField
  | RevealRadioField
  | SelectField
  | CheckboxField
  | RevealCheckBoxField
  | TeethSelectorField;

export interface FormSection {
  title: string;
  fields: AnyFormField[];
}

export interface FormMetadata {
  name: string;
  description: string;
  version?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface FormConfig {
  metadata: FormMetadata;
  sections: FormSection[];
}

export interface FormData {
  [key: string]: string | number | boolean | undefined;
}

export interface InputChangeData {
  name: string;
  value: string | number | boolean;
}

export interface DynamicFormProps {
  config: FormConfig;
  initialData?: Record<string, any>; // datos pre-cargados opcionales
  readOnly?: boolean;  
  onSubmit?: (formValues: any) => void;  
}

export interface FormValidationError {
  fieldName: string;
  message: string;
}

export interface FormValidationResult {
  isValid: boolean;
  errors: FormValidationError[];
}

export interface CreatePdfParams {
  config: FormConfig;
  formData: FormData;
}
