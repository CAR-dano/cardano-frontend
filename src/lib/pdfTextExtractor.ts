/**
 * PDF Text Extractor
 * Extracts text content from the first page of a PDF using pdf.js
 */

import * as pdfjsLib from "pdfjs-dist";

// Set worker source - use local worker file from public directory
if (typeof window !== "undefined") {
  pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.mjs";
}

export interface TextExtractionResult {
  text: string;
  page: number;
  success: boolean;
  error?: string;
}

/**
 * Extract text content from the first page of a PDF file
 * @param file - PDF file to extract text from
 * @returns Text extraction result
 */
export async function extractTextFromFirstPage(
  file: File
): Promise<TextExtractionResult> {
  try {
    // Convert file to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();

    // Load PDF document
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    // Get first page
    const page = await pdf.getPage(1);

    // Extract text content
    const textContent = await page.getTextContent();

    // Combine all text items
    const text = textContent.items
      .map((item: any) => item.str)
      .join(" ")
      .trim();

    return {
      text,
      page: 1,
      success: true,
    };
  } catch (error) {
    return {
      text: "",
      page: 1,
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Validate if file is a PDF
 * @param file - File to validate
 * @returns True if file is PDF
 */
export function isPdfFile(file: File): boolean {
  return (
    file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")
  );
}
