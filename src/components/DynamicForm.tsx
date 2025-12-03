import { useState, useMemo, useEffect } from "react";
import Radio from "./Radio";
import Input from "./Input";
import Range from "./Range";
import RevealRadio from "./RevealRadio";
import RevealCheckBox from "./RevealCheckBox";
import Checkbox from "./Checkbox";
import CheckboxGroup from "./CheckboxGroup";
import TeethSelector from "./TeethSelector";
import Button from "./Button";
import type { AnyFormField, FormConfig } from "../types";
import { createTxt } from "../utils/textLogic/createTxt";

interface DynamicFormProps {
  config: FormConfig;
  templateSrc?: string;
  initialData?: Record<string, any>;
  readOnly?: boolean;
  onSubmit?: (formValues: any) => void;
  showTextGeneration?: boolean;
  submitButtonText?: string;
}

const DynamicForm = ({
  config,
  templateSrc = "",
  initialData,
  readOnly = false,
  onSubmit,
  showTextGeneration = true,
  submitButtonText = "Sauvegarder",
}: DynamicFormProps) => {
  const [formData, setFormData] = useState<Record<string, any>>(() => {
    const data: Record<string, any> = {};

    // Process defaults from config first
    const processFields = (fields: AnyFormField[]) => {
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
          const defaultOpt = field.options?.find((opt) => opt.default);
          if (defaultOpt) {
            data[field.name] = defaultOpt.value;
            if (defaultOpt.fields) processFields(defaultOpt.fields);
          }
        } else if (field.type === "RevealCheckBox") {
          if ((field as any).default === true) {
            data[field.name] = true;
            if (field.fields) {
              processFields(field.fields);
            }
          } else if ((field as any).default !== undefined) {
            data[field.name] = (field as any).default;
          }
        } else if ((field as any).default !== undefined) {
          data[field.name] = (field as any).default;
        }
      });
    };

    (config as any).sections.forEach((section: any) => {
      processFields(section.fields);
    });

    // Then, merge initialData over the defaults
    if (initialData) {
      Object.assign(data, initialData);
    }

    return data;
  });
  const [templateText, setTemplateText] = useState<string>("");

  useEffect(() => {
    if (!templateSrc) {
      setTemplateText("");
      return;
    }
    fetch(templateSrc)
      .then((response) => response.text())
      .then((text) => setTemplateText(text))
      .catch((error) => {
        console.error("Error fetching template:", error);
        setTemplateText("");
      });
  }, [templateSrc]);

  const missingFields = useMemo(() => {
    const missing: { name: string; label: string }[] = [];

    const checkFields = (fields: AnyFormField[]) => {
      fields.forEach((field) => {
        if (field.required) {
          const val = formData[field.name];
          if (val === undefined || val === "" || val === null) {
            missing.push({ name: field.name, label: field.label });
          }
        }
        if (field.type === "RevealRadio") {
          const val = formData[field.name];
          const selectedOpt = field.options?.find((opt) => opt.value === val);
          if (selectedOpt?.fields) {
            checkFields(selectedOpt.fields);
          }
        }
        if (field.type === "RevealCheckBox") {
          const val = formData[field.name];
          if (val === true && field.fields) {
            checkFields(field.fields);
          }
        }
      });
    };

    (config as any).sections.forEach((section: any) =>
      checkFields(section.fields)
    );
    return missing;
  }, [config, formData]);

  const outputText = useMemo(() => {
    try {
      return createTxt({
        config: config as any,
        formData,
        template: templateText,
      });
    } catch (error) {
      console.error("createTxt error:", error);
      return "Erreur lors de la génération du texte.";
    }
  }, [config, formData, templateText]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
      // lightweight feedback
      void (window as any).alert?.("Copié dans le presse-papiers");
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  const downloadTxt = () => {
    try {
      const blob = new Blob([outputText], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${config.metadata?.name || "consultation"}.txt`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  const handleInputChange = (data: {
    name: string;
    value: string | number | boolean | string[] | null;
  }) => {
    const { name, value } = data;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const renderField = (field: AnyFormField) => {
    let needsFullRow =
      field.type === "RevealRadio" &&
      field.options?.some((opt) => opt.fields && opt.fields.length > 0);

    needsFullRow =
      needsFullRow || (field.type === "Radio" && field.options?.length > 3);
    const gridClass = needsFullRow ? "col-span-full" : "";

    switch (field.type) {
      case "Input":
        return (
          <div
            key={field.name}
            className={gridClass}
            id={`field-${field.name}`}
          >
            <Input
              label={field.label}
              name={field.name}
              placeholder={field.placeholder || ""}
              type={field.inputType}
              setFormData={handleInputChange}
              required={field.required}
              value={formData[field.name] || ""}
              disabled={readOnly}
            />
          </div>
        );

      case "Radio":
        return (
          <div
            key={field.name}
            className={gridClass}
            id={`field-${field.name}`}
          >
            <Radio
              label={field.label}
              name={field.name}
              options={field.options || []}
              setFormData={handleInputChange}
              required={field.required}
              value={formData[field.name]}
              disabled={readOnly}
            />
          </div>
        );

      case "Checkbox":
        return (
          <div key={field.name} id={`field-${field.name}`}>
            <Checkbox
              label={field.label}
              name={field.name}
              setFormData={handleInputChange}
              required={field.required}
              checked={formData[field.name] || false}
              disabled={readOnly}
            />
          </div>
        );
      
      case "CheckboxGroup":
        return (
          <div
            key={field.name}
            className="col-span-full"
            id={`field-${field.name}`}
          >
            <CheckboxGroup
              label={field.label}
              name={field.name}
              options={field.options || []}
              setFormData={handleInputChange}
              required={field.required}
              value={formData[field.name] || []}
              disabled={readOnly}
            />
          </div>
        );

      case "RevealCheckBox":
        return (
          <div
            key={field.name}
            className="col-span-full"
            id={`field-${field.name}`}
          >
            <RevealCheckBox
              label={field.label}
              name={field.name}
              setFormData={handleInputChange}
              disabled={readOnly}
            >
              <div className="space-y-2">
                {field.fields?.map((subField: AnyFormField) =>
                  renderField(subField)
                )}
              </div>
            </RevealCheckBox>
          </div>
        );

      case "Range":
        return (
          <div
            key={field.name}
            className={gridClass}
            id={`field-${field.name}`}
          >
            <Range
              name={field.name}
              steps={(field as any).steps || []}
              setFormData={handleInputChange}
              label={field.label}
              required={field.required}
              value={formData[field.name]}
              disabled={readOnly}
            />
          </div>
        );

      case "RevealRadio":
        return (
          <div
            key={field.name}
            className={gridClass}
            id={`field-${field.name}`}
          >
            <RevealRadio
              label={field.label}
              name={field.name}
              options={field.options || []}
              setFormData={handleInputChange}
              required={field.required}
              value={formData[field.name]} // Añadimos el valor para el autocompletado
              renderField={(subField: AnyFormField) => renderField(subField)}
              disabled={readOnly}
            />
          </div>
        );

      case "TeethSelector":
        return (
          <div
            key={field.name}
            className="col-span-full"
            id={`field-${field.name}`}
          >
            <TeethSelector
              name={field.name}
              label={field.label}
              setFormData={handleInputChange}
              required={field.required}
              value={formData[field.name]}
              disabled={readOnly}
              options={field.options}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full min-h-screen bg-base-100 px-3 py-4 sm:px-4 lg:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-4 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-1.5">
            {config.metadata.description}
          </h1>
        </div>

        {/* Form */}
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (onSubmit) {
              onSubmit(formData);
            }
          }}
        >
          {config.sections.map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              className="card bg-base-100 shadow border border-base-300"
            >
              <div className="card-body p-4">
                <h2 className="card-title text-xl text-primary mt-0 mb-3">
                  {section.title}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {section.fields.map((field) => renderField(field))}
                </div>
              </div>
            </div>
          ))}

          {/* Submit Button */}
          {!readOnly && (
            <div className="flex justify-center pt-2 pb-4">
              <Button className="btn-md min-w-40" type="submit">
                {submitButtonText}
              </Button>
            </div>
          )}
        </form>

        {/* Missing Fields Alert */}
        {missingFields.length > 0 && (
          <div className="card bg-warning/10 border border-warning text-warning-content mb-4">
            <div className="card-body p-4">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                Champs requis manquants ({missingFields.length})
              </h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {missingFields.map((field) => (
                  <button
                    key={field.name}
                    onClick={() => {
                      const el = document.getElementById(`field-${field.name}`);
                      if (el) {
                        el.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        });

                        el.classList.add(
                          "ring-2",
                          "ring-warning",
                          "ring-offset-2",
                          "rounded-lg",
                          "transition-all",
                          "duration-300"
                        );

                        setTimeout(() => {
                          el.classList.remove(
                            "ring-2",
                            "ring-warning",
                            "ring-offset-2",
                            "rounded-lg",
                            "transition-all",
                            "duration-300"
                          );
                        }, 2000);

                        const input = el.querySelector(
                          "input, select, textarea"
                        ) as HTMLElement;
                        if (input) input.focus();
                      }
                    }}
                    className="btn btn-xs btn-outline btn-warning"
                  >
                    {field.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Text Output */}
        {showTextGeneration && (
          <div className="card bg-base-100 shadow mt-4 border border-base-300">
            <div className="card-body p-4">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-semibold">Texte généré</h3>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={copyToClipboard}
                    className="btn btn-sm"
                  >
                    Copier
                  </button>
                  <button
                    type="button"
                    onClick={downloadTxt}
                    className="btn btn-sm btn-ghost"
                  >
                    Télécharger
                  </button>
                </div>
              </div>

              <textarea
                readOnly
                value={outputText}
                aria-label="Texte généré"
                className="w-full min-h-[200px] mt-3 p-3 rounded textarea textarea-bordered font-mono whitespace-pre-wrap"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DynamicForm;
