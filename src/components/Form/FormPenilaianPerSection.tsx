import React from "react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import Rating from "./Rating";

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
  return (
    <div>
      <Label htmlFor={inputFor}>{label}</Label>
      <Rating label={label} selected={parseInt(value || "0")} />
    </div>
  );
}

export default FormPenilaianSummmary;
