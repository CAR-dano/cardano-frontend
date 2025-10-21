/**
 * PDF to Canvas Renderer
 * Renders the first page of a PDF to canvas for OCR processing
 */

import * as pdfjsLib from "pdfjs-dist";

// Set worker source - use local worker file from public directory
if (typeof window !== "undefined") {
  pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.mjs";
}

export interface CanvasRenderResult {
  canvas: HTMLCanvasElement;
  success: boolean;
  error?: string;
}

/**
 * Render first page of PDF to canvas with preprocessing for OCR
 * @param file - PDF file to render
 * @param scale - Scale factor for rendering (higher = better OCR, default 2.5)
 * @returns Canvas render result
 */
export async function renderPdfToCanvas(
  file: File,
  scale: number = 2.5
): Promise<CanvasRenderResult> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const page = await pdf.getPage(1);

    // Get viewport with scale
    const viewport = page.getViewport({ scale });

    // Create canvas
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Could not get canvas context");
    }

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    // Render PDF page to canvas
    const renderContext: any = {
      canvasContext: context,
      viewport: viewport,
    };
    await page.render(renderContext).promise;

    // Apply preprocessing for better OCR
    preprocessCanvas(canvas, context);

    return {
      canvas,
      success: true,
    };
  } catch (error) {
    const canvas = document.createElement("canvas");
    return {
      canvas,
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Preprocess canvas image for better OCR results
 * - Convert to grayscale
 * - Increase contrast
 * - Apply threshold
 */
function preprocessCanvas(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D
): void {
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  // Convert to grayscale and increase contrast
  for (let i = 0; i < data.length; i += 4) {
    // Grayscale conversion
    const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];

    // Increase contrast (simple linear contrast enhancement)
    const contrast = 1.5;
    const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
    let enhanced = factor * (gray - 128) + 128;

    // Apply threshold for better text detection
    const threshold = 128;
    enhanced = enhanced > threshold ? 255 : 0;

    // Set RGB to same value (grayscale)
    data[i] = enhanced;
    data[i + 1] = enhanced;
    data[i + 2] = enhanced;
    // Alpha channel remains unchanged
  }

  context.putImageData(imageData, 0, 0);
}

/**
 * Convert canvas to base64 data URL
 * @param canvas - Canvas to convert
 * @returns Base64 data URL
 */
export function canvasToDataUrl(canvas: HTMLCanvasElement): string {
  return canvas.toDataURL("image/png");
}
