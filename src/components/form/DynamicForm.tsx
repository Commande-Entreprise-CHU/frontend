import { useState, useMemo, useEffect, useCallback } from "react";
import { Copy, FileText, Save, RefreshCw, AlertCircle } from "lucide-react";
import Radio from "./Radio";
import Input from "./Input";
import Range from "./Range";
import RevealRadio from "./RevealRadio";
import RevealCheckBox from "./RevealCheckBox";
import Checkbox from "./Checkbox";
import CheckboxGroup from "./CheckboxGroup";
import ContinuousRange from "./ContinuousRange";
import TeethSelector from "./TeethSelector";
import Button from "../Button";
import type { AnyFormField, FormConfig } from "../../types";
import { createTxt } from "../../utils/textLogic/createTxt";
import { useToast } from "../../context/ToastContext";

interface DynamicFormProps {
  config: FormConfig;
  templateString?: string;
  initialData?: Record<string, any>;
  readOnly?: boolean;
  onSubmit?: (formValues: any) => void;
  onChange?: (formValues: any) => void;
  showTextGeneration?: boolean;
  submitButtonText?: string;
}

const DynamicForm = ({
  config,
  templateString = "",
  initialData,
  readOnly = false,
  onSubmit,
  onChange,
  showTextGeneration = true,
  submitButtonText = "Sauvegarder",
}: DynamicFormProps) => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState<Record<string, any>>(() => {
    const data: Record<string, any> = {};

    // Process defaults from config first
    const processFields = (fields: AnyFormField[]) => {
      if (!fields || !Array.isArray(fields)) return;

      fields.forEach((field) => {
        if (field.type === "Input") {
          if (
            (field as any).default === "now" &&
            (field as any).inputType === "date"
          ) {
            data[field.name] = new Date().toISOString().split("T")[0];
          } else if ((field as any).default !== undefined) {
            data[field.name] = (field as any).default;
          }
        } else if (field.type === "Radio" || field.type === "RevealRadio") {
          const defaultOpt = field.options?.find((opt) => (opt as any).default);
          if (defaultOpt) {
            data[field.name] = defaultOpt.value;
          }
        } else if (field.type === "CheckboxGroup") {
          const defaultOpts = field.options
            ?.filter((opt) => (opt as any).default)
            .map((opt) => opt.value);
          if (defaultOpts && defaultOpts.length > 0) {
            data[field.name] = defaultOpts;
          }
        } else if (
          field.type === "Checkbox" ||
          field.type === "RevealCheckBox"
        ) {
          if ((field as any).default === true) {
            data[field.name] = true;
          }
        } else if (field.type === "ContinuousRange") {
           if ((field as any).default !== undefined) {
             data[field.name] = (field as any).default;
           }
        }
      });
    };

    if (config && config.sections) {
      config.sections.forEach((section) => {
        processFields(section.fields);
      });
    }

    // Override with initialData if provided
    if (initialData) {
      return { ...data, ...initialData };
    }

    return data;
  });

  const [generatedText, setGeneratedText] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [missingFields, setMissingFields] = useState<string[]>([]);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const handleFieldChange = (name: string, value: any) => {
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };
      if (onChange) {
        onChange(newData);
      }
      return newData;
    });

    // Clear error for this field if it exists
    if (missingFields.includes(name)) {
      setMissingFields((prev) => prev.filter((f) => f !== name));
    }
  };

  // Generate text whenever formData changes
  useMemo(() => {
    if (showTextGeneration && templateString) {
      const text = createTxt({
        config,
        formData,
        template: templateString,
      });
      setGeneratedText(text);
    }
  }, [formData, templateString, showTextGeneration, config]);



  const validateFields = useCallback((sections: any[], data: any): string[] => {
    let missing: string[] = [];

    const checkFields = (fields: AnyFormField[]) => {
      fields.forEach((field) => {
        // Check if field is required
        if (field.required) {
          const value = data[field.name];
          if (
            value === undefined ||
            value === null ||
            value === "" ||
            (Array.isArray(value) && value.length === 0)
          ) {
            missing.push(field.name);
          }
        }

        // Check nested fields
        if (field.type === "RevealRadio") {
          const value = data[field.name];
          const selectedOption = field.options?.find(
            (opt: any) => opt.value === value
          );
          if (selectedOption && selectedOption.fields) {
            checkFields(selectedOption.fields);
          }
        } else if (field.type === "RevealCheckBox") {
          if (data[field.name]) {
            if ((field as any).subFields) {
              checkFields((field as any).subFields);
            }
          }
        }
      });
    };

    sections.forEach((section) => {
      if (section.fields) checkFields(section.fields);
    });

    return missing;
  }, []);

  // Only validate after user has attempted to submit
  useEffect(() => {
    if (hasAttemptedSubmit) {
      const missing = validateFields(config.sections || [], formData);
      setMissingFields(missing);
    }
  }, [formData, config, validateFields, hasAttemptedSubmit]);

  const handleCopy = async () => {
    const missing = validateFields(config.sections || [], formData);
    
    if (missing.length > 0) {
      setMissingFields(missing);
      setHasAttemptedSubmit(true);
      
      showToast("Veuillez remplir les champs manquants avant de copier le texte.", "error");

      // Scroll to first missing field
      const firstMissing = document.getElementsByName(missing[0])[0];
      if (firstMissing) {
        firstMissing.scrollIntoView({ behavior: "smooth", block: "center" });
        firstMissing.focus();
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(generatedText);
      setIsCopied(true);
      showToast("Texte copié dans le presse-papier !", "success");
      
      if (onSubmit) {
        onSubmit(formData);
      }

      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      showToast("Erreur lors de la copie du texte.", "error");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);

    const missing = validateFields(config.sections || [], formData);
    setMissingFields(missing);

    if (missing.length > 0) {
      // Scroll to first missing field
      const firstMissing = document.getElementsByName(missing[0])[0];
      if (firstMissing) {
        firstMissing.scrollIntoView({ behavior: "smooth", block: "center" });
        firstMissing.focus();
      }
      return;
    }

    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const renderField = (field: AnyFormField) => {
    const commonProps = {
      disabled: readOnly,
    };

    const isError = missingFields.includes(field.name);
    const errorMessage = isError ? "Ce champ est requis" : undefined;

    switch (field.type) {
      case "Input":
        return (
          <Input
            key={field.name}
            {...commonProps}
            name={field.name}
            label={field.label}
            type={(field as any).inputType || "text"}
            required={field.required}
            value={formData[field.name] || ""}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={(field as any).placeholder}
            error={errorMessage}
            size="sm"
          />
        );
      case "Radio":
        return (
          <Radio
            key={field.name}
            {...commonProps}
            name={field.name}
            label={field.label}
            options={field.options || []}
            value={formData[field.name]}
            onChange={(val) => handleFieldChange(field.name, val)}
            required={field.required}
            error={errorMessage}
          />
        );
      case "Checkbox":
        return (
          <Checkbox
            key={field.name}
            {...commonProps}
            name={field.name}
            label={field.label}
            checked={!!formData[field.name]}
            onChange={(checked) => handleFieldChange(field.name, checked)}
            error={errorMessage}
            image={(field as any).image}
            svg={(field as any).svg}
          />
        );
      case "CheckboxGroup":
        return (
          <CheckboxGroup
            key={field.name}
            {...commonProps}
            name={field.name}
            label={field.label}
            options={field.options || []}
            value={formData[field.name] || []}
            onChange={(val) => handleFieldChange(field.name, val)}
            error={errorMessage}
          />
        );
      case "Range":
        return (
          <Range
            key={field.name}
            {...commonProps}
            name={field.name}
            label={field.label}
            steps={(field as any).steps || []}
            value={formData[field.name]}
            onChange={(val) => handleFieldChange(field.name, val)}
          />
        );
      case "ContinuousRange":
        return (
          <ContinuousRange
            key={field.name}
            {...commonProps}
            name={field.name}
            label={field.label}
            min={(field as any).min}
            max={(field as any).max}
            step={(field as any).step}
            unit={(field as any).unit}
            value={formData[field.name]}
            onChange={(val) => handleFieldChange(field.name, val)}
            required={field.required}
          />
        );
      case "RevealRadio":
        return (
          <RevealRadio
            key={field.name}
            {...commonProps}
            name={field.name}
            label={field.label}
            options={field.options || []}
            value={formData[field.name]}
            onChange={(val) => handleFieldChange(field.name, val)}
            setFormData={handleFieldChange}
            formData={formData}
            renderField={renderField}
            required={field.required}
            error={errorMessage}
          />
        );
      case "RevealCheckBox":
        return (
          <RevealCheckBox
            key={field.name}
            {...commonProps}
            name={field.name}
            label={field.label}
            checked={!!formData[field.name]}
            onChange={(checked) => handleFieldChange(field.name, checked)}
            subFields={(field as any).fields || []}
            renderField={renderField}
            error={errorMessage}
          />
        );
      case "TeethSelector":
        return (
          <TeethSelector
            key={field.name}
            {...commonProps}
            name={field.name}
            label={field.label}
            options={field.options}
            value={formData[field.name]}
            setFormData={({ name, value }) => handleFieldChange(name, value)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Form Section */}
      <div className="w-full flex flex-col">
        <div className="bg-base-100 rounded-xl shadow-sm border border-base-200 flex flex-col h-full overflow-hidden">
          <div className="p-4 border-b border-base-200 bg-base-100/50 backdrop-blur-sm sticky top-0 z-10 flex justify-between items-center">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Formulaire
            </h2>
            {!readOnly && (
              <Button
                variant="primary"
                size="sm"
                onClick={handleSubmit}
                icon={Save}
              >
                {submitButtonText}
              </Button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {config.sections?.map((section, idx) => (
                <div key={idx} className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">
                    {section.title}
                  </h3>
                  {section.fields.map((field) => (
                    <div
                      key={field.name}
                      id={field.name}
                      className="animate-in fade-in slide-in-from-bottom-4 duration-500 scroll-mt-24"
                    >
                      {renderField(field)}
                    </div>
                  ))}
                </div>
              ))}
            </form>
            {!readOnly && (
              <div className="mt-6 flex justify-end">
                <Button
                  variant="primary"
                  onClick={handleSubmit}
                  icon={Save}
                  className="w-full sm:w-auto"
                >
                  {submitButtonText}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Missing Fields Summary */}
      {missingFields.length > 0 && (
        <div className="w-full bg-error/10 border border-error/20 rounded-xl p-4 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-error mt-0.5 shrink-0" />
            <div className="flex-1">
              <h3 className="font-bold text-error mb-1">
                {missingFields.length} champ
                {missingFields.length > 1 ? "s" : ""} requis manquant
                {missingFields.length > 1 ? "s" : ""}
              </h3>
              <p className="text-sm text-base-content/70 mb-3">
                Le texte ne peut pas être généré tant que ces champs ne sont pas
                remplis :
              </p>
              <div className="flex flex-wrap gap-2">
                {missingFields.map((fieldName) => {
                  const fieldLabel =
                    config.sections
                      .flatMap((s) => s.fields)
                      .find((f) => f.name === fieldName)?.label || fieldName;

                  return (
                    <button
                      key={fieldName}
                      onClick={() => {
                        const element = document.getElementById(fieldName);
                        if (element) {
                          element.scrollIntoView({
                            behavior: "smooth",
                            block: "center",
                          });
                          element.classList.add(
                            "ring-2",
                            "ring-error",
                            "ring-offset-2",
                            "rounded-lg"
                          );
                          setTimeout(() => {
                            element.classList.remove(
                              "ring-2",
                              "ring-error",
                              "ring-offset-2",
                              "rounded-lg"
                            );
                          }, 2000);
                        }
                      }}
                      className="badge badge-error gap-1 hover:bg-error/80 cursor-pointer transition-colors py-3 h-auto text-white border-none"
                    >
                      {fieldLabel}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Generated Text Section */}
      {showTextGeneration && (
        <div className="w-full flex flex-col">
          <div className="bg-base-100 rounded-xl shadow-sm border border-base-200 flex flex-col h-full overflow-hidden">
            <div className="p-4 border-b border-base-200 bg-base-100/50 backdrop-blur-sm flex justify-between items-center">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-secondary" />
                Aperçu du texte
              </h2>
              <Button
                variant={isCopied ? "success" : "outline"}
                size="sm"
                onClick={handleCopy}
                icon={isCopied ? undefined : Copy}
              >
                {isCopied ? "Copié !" : "Copier"}
              </Button>
            </div>

            <div className="flex-1 p-0 relative">
              <textarea
                className="w-full min-h-[300px] p-6 resize-y bg-base-100 focus:outline-none font-mono text-sm leading-relaxed"
                value={generatedText}
                readOnly
                placeholder="Le texte généré apparaîtra ici..."
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DynamicForm;
