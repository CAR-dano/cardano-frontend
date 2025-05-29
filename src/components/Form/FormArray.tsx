import React from "react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useTheme } from "../../contexts/ThemeContext";

interface FormPenilaianSummaryProps {
  label: string;
  inputFor: string;
  value?: string[];
  section?: string;
  onChange?: (value: string[]) => void;
}

function FormArray({
  label,
  inputFor,
  value = [],
  onChange,
  section,
}: FormPenilaianSummaryProps) {
  const [data, setData] = React.useState<string[]>(value);
  const { isDarkModeEnabled } = useTheme();

  const handleChange = (index: number, newValue: string) => {
    const updated = [...data];
    updated[index] = newValue;
    console.log("Updated data:", updated);
    setData(updated);
    onChange?.(updated);
  };

  const handleAdd = () => {
    const updated = [...data, ""];
    setData(updated);
    onChange?.([...value, ""]);
  };

  const handleRemove = (index: number) => {
    const updated = data.filter((_, i) => i !== index);
    setData(updated);
    onChange?.(updated);
  };

  return (
    <div>
      <Label htmlFor={inputFor} className="dark:text-gray-200">
        {label} {section && `- ${section}`}
      </Label>
      <div className="space-y-3 mt-2">
        {data.map((val, index) => (
          <div key={index} className="relative">
            <Textarea
              value={val}
              onChange={(e) => handleChange(index, e.target.value)}
              placeholder={`Catatan ${index + 1}`}
              className="w-full pr-10 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 dark:placeholder-gray-400"
            />
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="absolute top-2 right-2 text-sm text-red-500 dark:text-red-300"
            >
              Hapus
            </button>
          </div>
        ))}
        <Button
          type="button"
          onClick={handleAdd}
          variant="outline"
          className="dark:border-gray-600 dark:text-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:hover:text-gray-100"
        >
          Tambah Catatan
        </Button>
      </div>
    </div>
  );
}

export default FormArray;
