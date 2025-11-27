import Handlebars from "handlebars";
import type { FormConfig } from "../../types";
const template = Handlebars.compile("Name: {{name}}");
console.log(template({ name: "Nils" }));

interface CreateTxtParams {
  config: FormConfig;
  formData: FormData;
}

export function createTxt(params: CreateTxtParams) {
  const { config, formData } = params;
  console.log("Creating TXT with config:", config);
  console.log("Form data:", formData);
  const template = Handlebars.compile("Name: {{name}}");
  const txtContent = template(formData);
  return txtContent;
}
