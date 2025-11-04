import { createPdf } from "../utils/pdfLogic/createPdf";
import Radio from "./Radio";
import Button from "./Button";
import Input from "./Input";
import Range from "./Range";
import RevealRadio from "./RevealRadio";
import RevealCheckBox from "./RevealCheckBox";
import Checkbox from "./Checkbox";
import { useState } from "react";
import type { AnyFormField, DynamicFormProps } from "../types";

const DynamicForm = ({ config }: DynamicFormProps) => {
  const [formData, setFormData] = useState({});

  const handleInputChange = (data: {
    name: string;
    value: string | number | boolean;
  }) => {
    const { name, value } = data;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createPdf({ config, formData });
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
            />
          </div>
        );

      case "RevealCheckBox":
        return (
          <div key={field.name} className="col-span-full">
            <RevealCheckBox
              label={field.label}
              categoryLabel={field.categoryLabel}
              name={field.name}
              setFormData={handleInputChange}
            >
              <div className="flex flex-col gap-2 ml-4 ">
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
            />
          </div>
        );

      case "RevealRadio":
        return (
          <div key={field.name} className={gridClass}>
            <RevealRadio
              name={field.name}
              categoryLabel={field.categoryLabel || ""}
              label={field.label}
              options={field.options || []}
              setFormData={handleInputChange}
              required={field.required}
              renderField={renderField}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full p-4 flex flex-col items-center">
      <h1 className=" text-primary w-full text-center">
        {config.metadata.description}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center"
      >
        {config.sections.map((section, sectionIndex) => (
          <fieldset
            key={sectionIndex}
            className={`fieldset w-full border-base-300 rounded-box border p-4`}
          >
            <legend className="fieldset-legend  text-primary">
              {section.title}
            </legend>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-min">
              {section.fields.map((field) => renderField(field))}
            </div>
          </fieldset>
        ))}

        <Button className="m-4" type="submit">
          Créer le PDF
        </Button>
      </form>
    </div>
  );
};

export default DynamicForm;
