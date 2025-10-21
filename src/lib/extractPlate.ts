/**
 * Main Plate Extractor
 * Extracts vehicle license plate numbers from PDF documents
 * Privacy-first: All processing done client-side
 */

import { extractTextFromFirstPage, isPdfFile } from "./pdfTextExtractor";
import { renderPdfToCanvas } from "./pdfToCanvasOcr";
import { performOcrWithProgress } from "./ocr";

export interface PlateResult {
  found: boolean;
  raw?: string;
  normalized?: string;
  source?: "text" | "ocr";
  page: number;
  confidence?: number;
  processingTimeMs: number;
  error?: string;
}

export interface ExtractOptions {
  ocr?: boolean;
  ocrTimeoutMs?: number;
  regexStrict?: boolean;
  maxSearchChars?: number;
  normalizeSpacing?: boolean;
  validateIndonesiaFormat?: boolean;
  onProgress?: (
    stage: "extracting" | "ocr" | "matching",
    percent?: number
  ) => void;
}

/**
 * Primary regex: More permissive, captures various formats
 * Matches: AAA 1234 AAA, AAA1234AAA, AA1234AA, B 2022 SYJ, etc.
 * Also matches after common keywords like "Plat Nomor", "No Polisi", etc.
 */
const PRIMARY_PLATE_REGEX =
  /(?:plat\s*nomor|no\s*polisi|police\s*number|nomor\s*polisi|plate\s*number|license\s*plate)?\s*:?\s*([A-Z]{1,3})\s*[\-\.]?\s*(\d{1,4})\s*[\-\.]?\s*([A-Z]{1,3})/gi;

/**
 * Secondary regex: Stricter with word boundaries, specifically for Indonesian plate format
 * Use when regexStrict = true
 * Matches: B 2022 SYJ, AA 1234 ZZ, etc.
 */
const STRICT_PLATE_REGEX = /\b([A-Z]{1,3})\s+(\d{1,4})\s+([A-Z]{1,3})\b/g;

/**
 * Extract license plate from PDF file
 * @param file - PDF file to process
 * @param options - Extraction options
 * @returns Plate extraction result
 */
export async function extractPlateFromPdf(
  file: File,
  options: ExtractOptions = {}
): Promise<PlateResult> {
  const startTime = performance.now();
  const {
    ocr = true,
    ocrTimeoutMs = 30000,
    regexStrict = false,
    maxSearchChars = 5000,
    normalizeSpacing = true,
    validateIndonesiaFormat = false,
    onProgress,
  } = options;

  try {
    // Validate file type
    if (!isPdfFile(file)) {
      return {
        found: false,
        page: 1,
        processingTimeMs: performance.now() - startTime,
        error: "File is not a valid PDF",
      };
    }

    // Step 1: Try text extraction from PDF
    onProgress?.("extracting", 0);
    const textResult = await extractTextFromFirstPage(file);

    if (textResult.success && textResult.text.length > 0) {
      onProgress?.("matching", 50);

      // Limit search text length
      const searchText = textResult.text.substring(0, maxSearchChars);

      // Try to extract plate number section specifically
      const plateKeywords = [
        "plat nomor",
        "plat no",
        "no polisi",
        "nomor polisi",
        "plate number",
        "license plate",
        "police number",
      ];

      // Look for plate number section
      for (const keyword of plateKeywords) {
        const keywordIndex = searchText.toLowerCase().indexOf(keyword);
        if (keywordIndex !== -1) {
          // Extract 50 characters after the keyword
          const relevantText = searchText.substring(
            keywordIndex,
            keywordIndex + 100
          );
          const plateFromKeyword = findPlateInText(
            relevantText,
            false,
            validateIndonesiaFormat
          );

          if (plateFromKeyword) {
            const normalized = normalizeSpacing
              ? normalizePlate(plateFromKeyword)
              : plateFromKeyword;

            return {
              found: true,
              raw: plateFromKeyword,
              normalized,
              source: "text",
              page: 1,
              confidence: 98, // Very high confidence when found near keyword
              processingTimeMs: performance.now() - startTime,
            };
          }
        }
      }

      // Try to find plate in full extracted text
      const plateFromText = findPlateInText(
        searchText,
        regexStrict,
        validateIndonesiaFormat
      );

      if (plateFromText) {
        const normalized = normalizeSpacing
          ? normalizePlate(plateFromText)
          : plateFromText;

        return {
          found: true,
          raw: plateFromText,
          normalized,
          source: "text",
          page: 1,
          confidence: 95, // High confidence for text layer
          processingTimeMs: performance.now() - startTime,
        };
      }
    }

    // Step 2: Fallback to OCR if text extraction didn't find plate
    if (ocr) {
      onProgress?.("ocr", 0);

      // Render PDF to canvas
      const canvasResult = await renderPdfToCanvas(file, 2.5);

      if (!canvasResult.success) {
        return {
          found: false,
          page: 1,
          processingTimeMs: performance.now() - startTime,
          error: `Canvas render failed: ${canvasResult.error}`,
        };
      }

      // Perform OCR
      const ocrResult = await performOcrWithProgress(canvasResult.canvas, {
        lang: "eng",
        timeout: ocrTimeoutMs,
        onProgress: (percent) => onProgress?.("ocr", percent),
      });

      if (!ocrResult.success || !ocrResult.text) {
        return {
          found: false,
          page: 1,
          processingTimeMs: performance.now() - startTime,
          error: `OCR failed: ${ocrResult.error}`,
        };
      }

      onProgress?.("matching", 90);

      // Try to find plate in OCR text
      const plateFromOcr = findPlateInText(
        ocrResult.text,
        regexStrict,
        validateIndonesiaFormat
      );

      if (plateFromOcr) {
        const normalized = normalizeSpacing
          ? normalizePlate(plateFromOcr)
          : plateFromOcr;

        return {
          found: true,
          raw: plateFromOcr,
          normalized,
          source: "ocr",
          page: 1,
          confidence: Math.min(ocrResult.confidence, 85), // OCR confidence
          processingTimeMs: performance.now() - startTime,
        };
      }
    }

    // No plate found
    return {
      found: false,
      page: 1,
      processingTimeMs: performance.now() - startTime,
      error: "No license plate pattern found",
    };
  } catch (error) {
    return {
      found: false,
      page: 1,
      processingTimeMs: performance.now() - startTime,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

/**
 * Find license plate pattern in text
 */
function findPlateInText(
  text: string,
  strict: boolean = false,
  validateFormat: boolean = false
): string | null {
  // Clean text: remove extra spaces and normalize
  const cleanText = text.replace(/\s+/g, " ").trim();

  // Try multiple regex patterns
  const patterns = strict
    ? [STRICT_PLATE_REGEX]
    : [PRIMARY_PLATE_REGEX, STRICT_PLATE_REGEX];

  for (const regex of patterns) {
    // Reset regex index
    regex.lastIndex = 0;

    const matches = cleanText.matchAll(regex);

    for (const match of matches) {
      let prefix = match[1];
      let number = match[2];
      let suffix = match[3];

      // Handle case where regex captures with optional prefix text
      // Extract just the plate components
      if (match[0].includes(":")) {
        // If match contains ":", extract everything after it
        const parts = match[0].split(":");
        if (parts.length > 1) {
          const platePart = parts[1].trim();
          const plateMatch = platePart.match(
            /([A-Z]{1,3})\s*(\d{1,4})\s*([A-Z]{1,3})/i
          );
          if (plateMatch) {
            prefix = plateMatch[1];
            number = plateMatch[2];
            suffix = plateMatch[3];
          }
        }
      }

      // Validate match
      if (isValidPlate(prefix, number, suffix, validateFormat)) {
        // Return the clean plate format
        return `${prefix} ${number} ${suffix}`;
      }
    }
  }

  // Fallback: Try to find pattern like "B 2022 SYJ" or "B2022SYJ" directly
  const fallbackRegex = /\b([A-Z]{1,2})\s*(\d{3,4})\s*([A-Z]{2,3})\b/gi;
  fallbackRegex.lastIndex = 0;
  const fallbackMatches = cleanText.matchAll(fallbackRegex);

  for (const match of fallbackMatches) {
    const prefix = match[1];
    const number = match[2];
    const suffix = match[3];

    if (isValidPlate(prefix, number, suffix, validateFormat)) {
      return `${prefix} ${number} ${suffix}`;
    }
  }

  return null;
}

/**
 * Validate if plate components are valid
 */
function isValidPlate(
  prefix: string,
  number: string,
  suffix: string,
  strictFormat: boolean
): boolean {
  // Basic validation
  if (!prefix || !number) return false;
  if (!/^[A-Z]{1,3}$/i.test(prefix)) return false;
  if (!/^\d{1,4}$/.test(number)) return false;

  // Suffix is required for Indonesian plates
  if (!suffix || suffix.length === 0) return false;
  if (!/^[A-Z]{1,3}$/i.test(suffix)) return false;

  // Indonesian format validation
  if (strictFormat) {
    // Common Indonesian formats:
    // B 2022 SYJ (1-4-3), AA 1234 ZZ (2-4-2), etc.
    const prefixLen = prefix.length;
    const numberLen = number.length;
    const suffixLen = suffix.length;

    // Number should be 1-4 digits (typically 3-4 for newer plates)
    if (numberLen < 1 || numberLen > 4) return false;

    // Prefix should be 1-2 letters (area code)
    if (prefixLen < 1 || prefixLen > 2) return false;

    // Suffix should be 1-3 letters (series)
    if (suffixLen < 1 || suffixLen > 3) return false;

    // Prefix + suffix should be reasonable (2-5 letters total)
    const totalLetters = prefixLen + suffixLen;
    if (totalLetters < 2 || totalLetters > 5) return false;
  }

  return true;
}

/**
 * Normalize license plate format
 * Converts: AAA1234AAA → AAA 1234 AAA
 */
export function normalizePlate(raw: string): string {
  // Remove all non-alphanumeric characters
  const clean = raw.toUpperCase().replace(/[^A-Z0-9]/g, "");

  // Extract components using regex
  const match = clean.match(/^([A-Z]+)(\d+)([A-Z]*)$/);

  if (!match) return clean;

  const [, prefix, number, suffix] = match;

  // Build normalized format with spaces
  if (suffix) {
    return `${prefix} ${number} ${suffix}`;
  } else {
    return `${prefix} ${number}`;
  }
}

/**
 * Batch process multiple PDFs (if needed)
 */
export async function extractPlatesFromMultiplePdfs(
  files: File[],
  options: ExtractOptions = {}
): Promise<PlateResult[]> {
  const results: PlateResult[] = [];

  for (const file of files) {
    const result = await extractPlateFromPdf(file, options);
    results.push(result);
  }

  return results;
}
