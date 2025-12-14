import Handlebars from "handlebars";
import type { FormConfig, FormData } from "../../types";

interface CreateTxtParams {
  config: FormConfig;
  formData: FormData;
  template?: string;
}

// Register all Handlebars helpers
function registerHelpers() {
  // Equality check
  Handlebars.registerHelper(
    "ifEgal",
    function (this: any, arg1: any, arg2: any, options: any) {
      return arg1 === arg2 ? options.fn(this) : options.inverse(this);
    }
  );

  // Uppercase
  Handlebars.registerHelper("maj", function (str: string) {
    if (typeof str !== "string") return "";
    return str.toUpperCase();
  });

  // Lowercase
  Handlebars.registerHelper("min", function (str: string) {
    if (typeof str !== "string") return "";
    return str.toLowerCase();
  });

  // Capitalize first letter
  Handlebars.registerHelper("capitalize", function (str: string) {
    if (typeof str !== "string") return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  });

  // Capitalize words (title case)
  Handlebars.registerHelper("titlecase", function (str: string) {
    if (typeof str !== "string") return "";
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  });

  // Check if value exists and is not empty
  Handlebars.registerHelper(
    "ifExists",
    function (this: any, value: any, options: any) {
      if (value && (typeof value !== "string" || value.trim() !== "")) {
        return options.fn(this);
      }
      return options.inverse(this);
    }
  );

  // Check if NOT equal
  Handlebars.registerHelper(
    "ifNotEgal",
    function (this: any, arg1: any, arg2: any, options: any) {
      return arg1 !== arg2 ? options.fn(this) : options.inverse(this);
    }
  );

  // Default value if empty
  Handlebars.registerHelper(
    "default",
    function (value: any, defaultValue: any) {
      return value && value.toString().trim() !== "" ? value : defaultValue;
    }
  );

  // Format date (basic)
  Handlebars.registerHelper("formatDate", function (dateStr: string) {
    if (!dateStr) return "";
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("fr-FR");
    } catch {
      return dateStr;
    }
  });

  // Pluralize helper
  Handlebars.registerHelper(
    "pluralize",
    function (count: number, singular: string, plural: string) {
      return count === 1 ? singular : plural;
    }
  );

  // Join array items with separator
  Handlebars.registerHelper("join", function (arr: any[], sep: string = ", ") {
    if (!Array.isArray(arr)) return "";
    return arr.join(sep);
  });

  // Include or exclude prefix/suffix
  Handlebars.registerHelper(
    "wrap",
    function (value: any, prefix: string, suffix: string) {
      if (!value) return "";
      return prefix + value + suffix;
    }
  );

  // Math operations
  Handlebars.registerHelper("add", function (a: number, b: number) {
    return (a || 0) + (b || 0);
  });

  Handlebars.registerHelper("subtract", function (a: number, b: number) {
    return (a || 0) - (b || 0);
  });

  // Check if contains substring
  Handlebars.registerHelper(
    "ifContains",
    function (this: any, str: any, search: string, options: any) {
      if (str && typeof str === "string" && str.includes(search)) {
        return options.fn(this);
      }
      return options.inverse(this);
    }
  );

  // Format teeth data
  Handlebars.registerHelper(
    "formatTeeth",
    function (teethDataStr: string | object) {
      if (!teethDataStr) return "";

      let teethData: Record<string, string>;
      try {
        if (typeof teethDataStr === "string") {
          teethData = JSON.parse(teethDataStr);
        } else {
          teethData = teethDataStr as Record<string, string>;
        }
      } catch (e) {
        return "Données dentaires invalides";
      }

      const abnormalTeethMap: Record<string, string[]> = {};

      for (const [toothId, state] of Object.entries(teethData)) {
        if (state && state !== "Normal") {
          if (!abnormalTeethMap[state]) {
            abnormalTeethMap[state] = [];
          }
          abnormalTeethMap[state].push(toothId);
        }
      }

      if (Object.keys(abnormalTeethMap).length === 0) {
        return "RAS";
      }

      return Object.entries(abnormalTeethMap)
        .map(([state, teeth]) => `${state}: ${teeth.join(", ")}`)
        .join("; ");
    }
  );
}

// Register helpers once on module load
registerHelpers();

export function createTxt(params: CreateTxtParams) {
  const { formData, template: templateString } = params;

  try {
    const template = Handlebars.compile(
      templateString || "Pas de template fourni"
    );
    const txtContent = template(formData);

    // 1. Normalize line endings to \n
    let cleanText = txtContent.replace(/\r\n/g, "\n");

    // 2. Remove lines that contain only whitespace (spaces/tabs)
    cleanText = cleanText.replace(/^[ \t]+$/gm, "");

    // 3. Collapse 3 or more consecutive newlines into 2
    // This ensures we never have more than one empty line between paragraphs
    cleanText = cleanText.replace(/\n{3,}/g, "\n\n");

    return cleanText.trim();
  } catch (error) {
    console.error("Handlebars template error:", error);
    return "Erreur lors de la compilation du template.";
  }
}
