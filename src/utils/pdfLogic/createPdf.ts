import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import type { FormConfig, FormData } from "../../types";

interface CreatePdfParams {
  config: FormConfig;
  formData: FormData;
}

export async function createPdf(params: CreatePdfParams) {
  const { config, formData } = params;
  console.log("Creating PDF with config:", config);
  console.log("Form data:", formData);

  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  let currentPage = pdfDoc.addPage();
  const { width, height } = currentPage.getSize();
  let y = height - 60;

  // Helper function to check if we need a new page
  const checkNewPage = (spaceNeeded: number) => {
    if (y - spaceNeeded < 80) {
      currentPage = pdfDoc.addPage();
      y = height - 60;
      return true;
    }
    return false;
  };

  // Helper function to draw text with word wrap
  const drawText = (
    text: string,
    x: number,
    size: number,
    color = rgb(0, 0, 0),
    useBold = false,
    maxWidth = width - 100
  ) => {
    const selectedFont = useBold ? fontBold : font;
    const words = text.split(" ");
    let line = "";
    const lines: string[] = [];

    words.forEach((word) => {
      const testLine = line + (line ? " " : "") + word;
      const testWidth = selectedFont.widthOfTextAtSize(testLine, size);

      if (testWidth > maxWidth && line) {
        lines.push(line);
        line = word;
      } else {
        line = testLine;
      }
    });
    if (line) lines.push(line);

    lines.forEach((textLine, index) => {
      if (index > 0) {
        checkNewPage(size + 5);
        y -= size + 5;
      }
      currentPage.drawText(textLine, {
        x,
        y,
        size,
        font: selectedFont,
        color,
      });
    });

    return lines.length;
  };

  // Draw header with decorative line
  drawText(config.metadata.description, 50, 24, rgb(0.2, 0.4, 0.8), true);
  y -= 30;
  currentPage.drawLine({
    start: { x: 50, y },
    end: { x: width - 50, y },
    thickness: 2,
    color: rgb(0.2, 0.4, 0.8),
  });
  y -= 30;

  // Draw date
  const currentDate = new Date().toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  drawText(`Date: ${currentDate}`, 50, 10, rgb(0.4, 0.4, 0.4));
  y -= 25;

  // Process each section
  config.sections.forEach((section, sectionIndex) => {
    checkNewPage(60);

    // Section header with background - draw rectangle first
    currentPage.drawRectangle({
      x: 40,
      y: y - 9,
      width: width - 80,
      height: 22,
      color: rgb(0.9, 0.9, 0.95),
    });

    // Then draw the text on top of it
    drawText(section.title, 50, 14, rgb(0.2, 0.4, 0.8), true);
    y -= 35;

    // Process each field in the section
    section.fields.forEach((field) => {
      checkNewPage(40);

      const fieldValue = formData[field.name];
      let displayValue = "";

      // Format the value based on field type
      switch (field.type) {
        case "Input":
          if (field.inputType === "date" && fieldValue) {
            const date = new Date(fieldValue as string);
            displayValue = date.toLocaleDateString("fr-FR");
          } else {
            displayValue = fieldValue ? String(fieldValue) : "Non renseigné";
          }
          break;

        case "Radio":
          if (fieldValue) {
            const option = field.options?.find(
              (opt) => opt.value === fieldValue
            );
            displayValue = option?.label || String(fieldValue);
          } else {
            const defaultOption = field.options?.find((opt) => opt.default);
            displayValue = defaultOption?.label || "Non renseigné";
          }
          break;

        case "Range":
          if (fieldValue !== undefined && field.steps) {
            const index =
              typeof fieldValue === "number"
                ? fieldValue
                : parseInt(String(fieldValue), 10);
            displayValue = field.steps[index] || String(fieldValue);
          } else {
            displayValue = "Non renseigné";
          }
          break;

        case "RevealRadio": {
          // Check if the reveal radio is activated
          const optionSelected = formData[field.name];
          console.log(
            "RevealRadio field:",
            field.name,
            "Value:",
            optionSelected
          );
          displayValue = optionSelected?.toString() || "Non renseigné";

          if (optionSelected) {
            if (field.options) {
              const selectedOption = field.options.find(
                (opt) => opt.value === optionSelected
              );
              if (selectedOption && selectedOption.fields)
                selectedOption.fields.forEach((revealedField) => {
                  const revealedValue = formData[revealedField.name];
                  if (revealedValue) {
                    displayValue += ` - ${revealedField.label}: ${revealedValue}`;
                  }
                });
            }
          }
          break;
        }

        default:
          displayValue = fieldValue ? String(fieldValue) : "Non renseigné";
      }

      // Draw field label in bold
      drawText(field.pdfName || field.label, 60, 11, rgb(0.3, 0.3, 0.3), true);
      y -= 18;

      // Draw field value
      const linesDrawn = drawText(displayValue, 70, 10, rgb(0, 0, 0), false);
      y -= linesDrawn > 1 ? 5 : 15;
    });

    // Add spacing between sections
    if (sectionIndex < config.sections.length - 1) {
      y -= 15;
    }
  });

  // Add footer to all pages
  const pages = pdfDoc.getPages();
  pages.forEach((page, index) => {
    const { width } = page.getSize();

    // Footer line
    page.drawLine({
      start: { x: 50, y: 40 },
      end: { x: width - 50, y: 40 },
      thickness: 1,
      color: rgb(0.7, 0.7, 0.7),
    });

    // Page number
    page.drawText(`Page ${index + 1} / ${pages.length}`, {
      x: width - 100,
      y: 25,
      size: 9,
      font,
      color: rgb(0.5, 0.5, 0.5),
    });

    // Document name
    page.drawText(config.metadata.name, {
      x: 50,
      y: 25,
      size: 9,
      font,
      color: rgb(0.5, 0.5, 0.5),
    });
  });

  // Download the PDF
  downloadPDF(pdfDoc, config);
}

async function downloadPDF(pdfDoc: PDFDocument, config: FormConfig) {
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes as unknown as BlobPart], {
    type: "application/pdf",
  });
  const fileUrl = window.URL.createObjectURL(blob);
  const alink = document.createElement("a");
  alink.href = fileUrl;

  // Generate filename with date
  const date = new Date().toISOString().split("T")[0];
  alink.download = `${config.metadata.name}_${date}.pdf`;

  alink.click();

  // Clean up
  window.URL.revokeObjectURL(fileUrl);
}
