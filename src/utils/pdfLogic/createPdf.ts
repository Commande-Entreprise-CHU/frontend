import { PDFDocument } from "pdf-lib";

export async function createPdf() {
  console.log("Creating PDF...");
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  page.drawText("You can create PDFs!", { x: 50, y: 700 });
  page.drawText("It's so fun", { x: 50, y: 650 });
  downloadPDF(pdfDoc);
}

async function downloadPDF(pdfDoc: PDFDocument) {
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes as any]);
  const fileUrl = window.URL.createObjectURL(blob);
  let alink = document.createElement("a");
  alink.href = fileUrl;
  alink.download = "my_file.pdf";
  alink.click();
}
