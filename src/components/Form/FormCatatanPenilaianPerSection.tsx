import React from "react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

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
  return (
    <div>
      <Label htmlFor={inputFor}>Catatan {section}</Label>
      <Textarea
        placeholder="Type your message here."
        id="message"
        value={value?.join(", ")}
        onChange={(e) => onChange && onChange(e.target.value)}
        className="mt-1 block w-full rounded-md border-purple-500  sm:text-sm"
      />
    </div>
  );
}

export default FormPenilaianSummmary;
