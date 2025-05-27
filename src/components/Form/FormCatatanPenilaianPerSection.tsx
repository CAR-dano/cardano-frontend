import React from "react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useTheme } from "../../contexts/ThemeContext";

interface FormPenilaianSummaryProps {
  label: string;
  inputFor: string;
  value?: string[];
  section?: string;
  onChange?: (value: string) => void;
}

function FormPenilaianSummmary({
  label,
  inputFor,
  value,
  onChange,
  section,
}: FormPenilaianSummaryProps) {
  const { isDarkModeEnabled } = useTheme();
  return (
    <div>
      <Label htmlFor={inputFor} className="dark:text-gray-200">
        Catatan {section}
      </Label>
      <Textarea
        placeholder="Type your message here."
        id="message"
        value={value?.join(", ")}
        onChange={(e) => onChange && onChange(e.target.value)}
        className="mt-1 block w-full rounded-md border-purple-500 sm:text-sm dark:bg-gray-700 dark:text-gray-100 dark:border-purple-800 dark:placeholder-gray-400"
      />
    </div>
  );
}

export default FormPenilaianSummmary;
