import React from "react";
import { Label } from "../ui/label";

interface FormEstimasiPerbaikanProps {
  data: {
    name: string;
    harga: number;
  }[];
  onChange: (value: string) => void;
  label: string;
}

function FormEstimasiPerbaikan({
  data,
  onChange,
  label,
}: FormEstimasiPerbaikanProps) {
  const handleNameChange = (index: number, newName: string) => {
    const updated = data.map((item, i) =>
      i === index ? { ...item, name: newName } : item
    );
    onChange(JSON.stringify(updated));
  };

  const handleHargaChange = (index: number, newHarga: number) => {
    const updated = data.map((item, i) =>
      i === index ? { ...item, harga: newHarga } : item
    );
    onChange(JSON.stringify(updated));
  };

  const handleAddItem = () => {
    const updated = [...data, { name: "", harga: 0 }];
    onChange(JSON.stringify(updated));
  };

  return (
    <div>
      <Label htmlFor="estimasi-perbaikan" className="text-base font-medium">
        {label}
      </Label>
      <div className="flex flex-col gap-2 mt-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              id={`estimasi-perbaikan-nama-${index}`}
              value={item.name}
              onChange={(e) => handleNameChange(index, e.target.value)}
              className="w-40 border rounded-md p-1"
              placeholder="Nama item"
            />
            <input
              type="number"
              id={`estimasi-perbaikan-harga-${index}`}
              value={item.harga}
              onChange={(e) => handleHargaChange(index, Number(e.target.value))}
              className="w-32 border rounded-md p-1"
              placeholder="Harga"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={handleAddItem}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Tambah Item
        </button>
      </div>
    </div>
  );
}

export default FormEstimasiPerbaikan;
