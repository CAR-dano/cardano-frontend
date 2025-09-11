import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createWhatsAppLink(phoneNumber: string): string {
  // Remove any non-digit characters from the phone number
  const cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");

  // Check if the number already starts with "62"
  if (cleanedPhoneNumber.startsWith("62")) {
    return `https://wa.me/${cleanedPhoneNumber}`;
  }
  // Check if the number starts with "0" and replace it with "62"
  else if (cleanedPhoneNumber.startsWith("0")) {
    return `https://wa.me/62${cleanedPhoneNumber.substring(1)}`;
  }
  // Otherwise, prepend with "62"
  else {
    return `https://wa.me/62${cleanedPhoneNumber}`;
  }
}
