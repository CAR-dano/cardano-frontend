import React from "react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import Rating from "./Rating";
import { useTheme } from "../../contexts/ThemeContext";

interface FormPenilaianSummaryProps {
  label: string;
  inputFor: string;
  value?: string;
  section?: string;
  onChange?: (value: string) => void;
}

function FormPenilaianSummmary({
  label,
  inputFor,
  value,
  section,
  onChange,
}: FormPenilaianSummaryProps) {
  const { isDarkModeEnabled } = useTheme();
  return (
    <div>
      <Label htmlFor={inputFor} className="dark:text-gray-200">
        {label}
      </Label>
      <Rating label={label} selected={parseInt(value || "0")} />
    </div>
  );
}

export default FormPenilaianSummmary;
