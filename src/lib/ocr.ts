/**
 * OCR Wrapper using Tesseract.js
 * Client-side OCR for extracting text from images
 */

import { createWorker, type Worker } from "tesseract.js";

export interface OcrResult {
  text: string;
  confidence: number;
  success: boolean;
  error?: string;
}

export interface OcrOptions {
  lang?: string;
  timeout?: number;
  onProgress?: (progress: number) => void;
}

let workerInstance: Worker | null = null;

/**
 * Initialize Tesseract worker (reusable)
 */
async function getWorker(lang: string = "eng"): Promise<Worker> {
  if (!workerInstance) {
    workerInstance = await createWorker(lang, 1, {
      logger: () => {}, // Suppress logs
    });
  }
  return workerInstance;
}

/**
 * Perform OCR on canvas or image
 * @param imageSource - Canvas or image element to process
 * @param options - OCR options
 * @returns OCR result with text and confidence
 */
export async function performOcr(
  imageSource: HTMLCanvasElement | HTMLImageElement | string,
  options: OcrOptions = {}
): Promise<OcrResult> {
  const { lang = "eng", timeout = 30000 } = options;

  try {
    const worker = await getWorker(lang);

    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      // Perform OCR
      const {
        data: { text, confidence },
      } = await worker.recognize(imageSource, {}, {
        signal: controller.signal,
      } as any);

      clearTimeout(timeoutId);

      return {
        text: text.trim(),
        confidence: confidence || 0,
        success: true,
      };
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  } catch (error) {
    return {
      text: "",
      confidence: 0,
      success: false,
      error: error instanceof Error ? error.message : "OCR failed",
    };
  }
}

/**
 * Cleanup OCR worker
 */
export async function terminateOcrWorker(): Promise<void> {
  if (workerInstance) {
    await workerInstance.terminate();
    workerInstance = null;
  }
}

/**
 * Perform OCR with progress tracking
 */
export async function performOcrWithProgress(
  imageSource: HTMLCanvasElement | HTMLImageElement | string,
  options: OcrOptions = {}
): Promise<OcrResult> {
  const { lang = "eng", timeout = 30000, onProgress } = options;

  try {
    const worker = await createWorker(lang, 1, {
      logger: (m: any) => {
        if (m.status === "recognizing text" && onProgress) {
          onProgress(Math.round(m.progress * 100));
        }
      },
    });

    const timeoutId = setTimeout(() => {
      worker.terminate();
    }, timeout);

    try {
      const {
        data: { text, confidence },
      } = await worker.recognize(imageSource);

      clearTimeout(timeoutId);
      await worker.terminate();

      return {
        text: text.trim(),
        confidence: confidence || 0,
        success: true,
      };
    } catch (error) {
      clearTimeout(timeoutId);
      await worker.terminate();
      throw error;
    }
  } catch (error) {
    return {
      text: "",
      confidence: 0,
      success: false,
      error: error instanceof Error ? error.message : "OCR failed",
    };
  }
}
