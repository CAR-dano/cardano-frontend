import React from "react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

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

  const handleChange = (index: number, newValue: string) => {
    const updated = [...data];
    updated[index] = newValue;
    setData(updated);
    onChange?.(data);
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
      <Label htmlFor={inputFor}>
        {label} {section && `- ${section}`}
      </Label>
      <div className="space-y-3 mt-2">
        {data.map((val, index) => (
          <div key={index} className="relative">
            <Textarea
              value={val}
              onChange={(e) => handleChange(index, e.target.value)}
              placeholder={`Catatan ${index + 1}`}
              className="w-full pr-10"
            />
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="absolute top-2 right-2 text-sm text-red-500"
            >
              Hapus
            </button>
          </div>
        ))}
        <Button type="button" onClick={handleAdd} variant="outline">
          Tambah Catatan
        </Button>
      </div>
    </div>
  );
}

export default FormArray;
