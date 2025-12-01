import { useState, useEffect } from "react";
import Radio from "./Radio";
import Button from "./Button";
import Input from "./Input";
import Range from "./Range";
import RevealRadio from "./RevealRadio";
import RevealCheckBox from "./RevealCheckBox";
import Checkbox from "./Checkbox";
import TeethSelector from "./TeethSelector";
import type { AnyFormField, DynamicFormProps } from "../types";

const DynamicForm = ({ 
  config, 
  initialData, 
  readOnly = false,
  onSubmit 
}: DynamicFormProps) => {

  const [formData, setFormData] = useState<Record<string, any>>({});

  function collectFieldNames(fields: any[], initialData: any, output: any) {
    fields.forEach((field) => {
      if (initialData[field.name] !== undefined) {
        output[field.name] = initialData[field.name];
      }

      if (field.type === "RevealRadio" && field.options) {
        field.options.forEach((opt: any) => {
          if (opt.fields) {
            collectFieldNames(opt.fields, initialData, output);
          }
        });
      }

      if (field.type === "RevealCheckBox" && field.fields) {
        collectFieldNames(field.fields, initialData, output);
      }

      if (field.type === "TeethSelector") {
        if (initialData[field.name]) {
          output[field.name] = initialData[field.name];
        }
      }
    });
  }

  useEffect(() => {
    if (initialData) {
      const initialFormData: Record<string, any> = {};

      config.sections.forEach((section) => {
        collectFieldNames(section.fields, initialData, initialFormData);
      });

      setFormData(initialFormData);
    }
  }, [initialData, config.sections]);


  const handleInputChange = (data: {
    name: string;
    value: string | number | boolean;
  }) => {
    const { name, value } = data;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (onSubmit) {
      onSubmit(formData);  // <-- ahora sí existe
    }
  };

  const renderField = (field: AnyFormField) => {
    let needsFullRow =
      field.type === "RevealRadio" &&
      field.options?.some((opt) => opt.fields && opt.fields.length > 0);

    needsFullRow =
      needsFullRow || (field.type == "Radio" && field.options.length > 3);
    const gridClass = needsFullRow ? "col-span-full" : "";

    switch (field.type) {
      case "Input":
        return (
          <div key={field.name} className={gridClass}>
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
          <div key={field.name} className={gridClass}>
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
          <div key={field.name}>
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

      case "RevealCheckBox":
        return (
          <div key={field.name} className="col-span-full">
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
        <div key={field.name} className={gridClass}>
          <Range
            name={field.name}
            steps={field.steps || []}
            setFormData={handleInputChange}
            label={field.label}
            required={field.required}
            initialValue={formData[field.name]} // Pasamos el valor inicial aquí
            value={formData[field.name]} // Aseguramos que el 'value' se pase también
            disabled={readOnly}
          />
        </div>
      );


      case "RevealRadio":
        return (
          <div key={field.name} className={gridClass}>
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
          <div key={field.name} className="col-span-full">
            <TeethSelector
              name={field.name}
              label={field.label}
              setFormData={handleInputChange}
              required={field.required}
              value={formData[field.name]}
              disabled={readOnly}
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
        <form onSubmit={handleSubmit} className="space-y-4">
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
              Guardar datos
            </Button>
          </div>
        )}

        </form>
      </div>
    </div>
  );
};

export default DynamicForm;
