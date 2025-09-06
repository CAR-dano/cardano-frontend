import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Label } from "../ui/label";
import axios from "axios";
import { useTheme } from "../../contexts/ThemeContext";

interface FormDropdownInputProps {
  label: string;
  inputFor: string;
  value?: string;
  type?: string;
  section?: string;
  onChange?: (value: string) => void;
}

function FormDropdownInput({
  label,
  inputFor,
  value,
  onChange,
  type,
  section,
}: FormDropdownInputProps) {
  const [options, setOptions] = React.useState<any[]>([]);
  const [option, setOption] = React.useState<any>("");
  const { isDarkModeEnabled } = useTheme();

  const getData = async (type: string) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    let URL = "";
    if (type == "inspektor") {
      URL = `${API_URL}/public/users/inspectors`;
    } else if (type == "lokasi") {
      URL = `${API_URL}/inspection-branches`;
    }

    try {
      const response = await axios.get(URL);
      console.log("Response data:", response.data);
      const data = response.data;
      if (type == "inspektor") {
        const formattedData = data.map((item: any) => ({
          value: item.id,
          label: item.name,
        }));
        setOptions(formattedData);
        setOption("inspektor");
      } else if (type == "lokasi") {
        const formattedData = data.map((item: any) => ({
          value: item.id,
          label: item.city,
        }));
        setOptions(formattedData);
        setOption("lokasi");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  React.useEffect(() => {
    getData(type || "");
  }, [type]);

  const handleChange = (newValue: string) => {
    if (onChange) onChange(newValue);
  };

  return (
    <div className="font-rubik">
      <Label htmlFor={inputFor} className="dark:text-gray-200">
        {label}
      </Label>
      <br />
      <Label className="dark:text-gray-400">Pilihan sekarang: {value}</Label>

      <SelectDemo
        value={value}
        onValueChange={handleChange}
        options={options}
        option={option}
      />
    </div>
  );
}

export default FormDropdownInput;

export function SelectDemo(props: {
  value?: string;
  options?: { value: string; label: string }[];
  option?: string;
  onValueChange?: (value: string) => void;
}) {
  const [selectedValue, setSelectedValue] = React.useState<string | undefined>(
    props.value
  );
  const { isDarkModeEnabled } = useTheme();

  return (
    <Select
      onValueChange={(value) => {
        setSelectedValue(value);
        if (props.onValueChange) props.onValueChange(value);
      }}
      value={selectedValue}
    >
      <SelectTrigger className="w-full border-2 border-purple-500 rounded-[8px] py-5 mt-2 dark:bg-gray-700 dark:text-gray-100 dark:border-purple-800">
        <SelectValue placeholder="Piih" />
      </SelectTrigger>
      <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
        <SelectGroup>
          <SelectLabel className="dark:text-gray-400">
            Pilih {props.option}
          </SelectLabel>
          {props.options?.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="dark:text-gray-100 dark:hover:bg-gray-700"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
