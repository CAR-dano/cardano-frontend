import React from "react";
import { Label } from "../ui/label";
import { useTheme } from "@/contexts/ThemeContext";

interface FormEstimasiPerbaikanProps {
  value: {
    harga: number;
    namaPart: string;
  }[];
  onChange: (value: string) => void;
  label: string;
}

function FormEstimasiPerbaikan({
  value,
  onChange,
  label,
}: FormEstimasiPerbaikanProps) {
  const [data, setData] = React.useState(value);
  const { isDarkModeEnabled } = useTheme();

  const handleNameChange = (index: number, newName: string) => {
    const updated = data.map((item, i) =>
      i === index ? { ...item, namaPart: newName } : item
    );
    setData(updated);
    onChange(JSON.stringify(updated));
  };

  const handleHargaChange = (index: number, newHarga: number) => {
    const updated = data.map((item, i) =>
      i === index ? { ...item, harga: newHarga } : item
    );
    setData(updated);
    onChange(JSON.stringify(updated));
  };

  const handleAddItem = () => {
    const updated = [...data, { namaPart: "", harga: 0 }];
    setData(updated);
    onChange(JSON.stringify(updated));
  };

  const handleDeleteItem = (index: number) => {
    const updated = data.filter((_, i) => i !== index);
    setData(updated);
    onChange(JSON.stringify(updated));
  };

  return (
    <div>
      <Label
        htmlFor="estimasi-perbaikan"
        className="text-base font-medium dark:text-gray-200"
      >
        {label}
      </Label>
      <div className="flex flex-col gap-2 mt-2">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 rounded-lg p-2 shadow-sm border border-gray-200 dark:border-gray-600"
          >
            <input
              type="text"
              id={`estimasi-perbaikan-nama-${index}`}
              value={item.namaPart}
              onChange={(e) => handleNameChange(index, e.target.value)}
              className="w-40 border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
              placeholder="Nama item"
            />
            <input
              type="number"
              id={`estimasi-perbaikan-harga-${index}`}
              value={item.harga}
              onChange={(e) => handleHargaChange(index, Number(e.target.value))}
              className="w-32 border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
              placeholder="Harga"
            />
            <button
              type="button"
              onClick={() => handleDeleteItem(index)}
              className="ml-2 px-3 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition font-semibold shadow-sm dark:bg-red-700 dark:hover:bg-red-800"
              title="Hapus item"
            >
              Hapus
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={handleAddItem}
          className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition font-semibold shadow-md dark:bg-orange-700 dark:hover:bg-orange-800"
        >
          Tambah Item
        </button>
      </div>
    </div>
  );
}

export default FormEstimasiPerbaikan;
