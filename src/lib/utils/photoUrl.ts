function normalizeBaseUrl(baseUrl?: string) {
  if (!baseUrl) return "";
  return baseUrl.replace(/\/$/, "");
}

export function getInspectionPhotoUrl(
  path?: string | null,
  baseUrl?: string
): string {
  if (!path) return "";

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const normalizedBase = normalizeBaseUrl(baseUrl);
  if (!normalizedBase) {
    return `/uploads/inspection-photos/${path}`;
  }

  return `${normalizedBase}/uploads/inspection-photos/${path}`;
}
