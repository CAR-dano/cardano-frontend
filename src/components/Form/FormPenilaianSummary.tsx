import React from "react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import Rating from "./Rating";
import { useTheme } from "../../contexts/ThemeContext";

interface FormPenilaianSummaryProps {
  label: string;
  inputFor: string;
  value?: string;
  catatan?: string[];
  onChange?: (value: string) => void;
}

function FormPenilaianSummmary({
  label,
  inputFor,
  value,
  catatan,
  onChange,
}: FormPenilaianSummaryProps) {
  const [nilai, setNilai] = React.useState<string>(value || "0");
  const { isDarkModeEnabled } = useTheme();

  const handleChange = (newValue: number | null) => {
    if (onChange) onChange((newValue ?? 0).toString());
    setNilai((newValue ?? 0).toString());
  };

  return (
    <div>
      <Label htmlFor={inputFor} className="dark:text-gray-200">
        Penilaian Keseluruhan dari {label}
      </Label>
      <Rating
        label={label}
        selected={parseInt(nilai || "0")}
        onChange={handleChange}
      />
      {/* <Label htmlFor={inputFor}>Keterangan {label}</Label>
      <Textarea
        placeholder="Type your message here."
        id="message"
        value={catatan}
        onChange={(e) => onChange && onChange(e.target.value)}
        className="mt-1 block w-full rounded-md border-purple-500  sm:text-sm"
      /> */}
    </div>
  );
}

export default FormPenilaianSummmary;
