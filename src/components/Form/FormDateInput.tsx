"use client";
import React from "react";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "../ui/label";

interface FormDateInputProps {
  label: string;
  inputFor: string;
  value?: Date;
  section?: string;
  onChange?: (date: Date) => void;
}

function FormDateInput({
  label,
  inputFor,
  value = new Date(),
  onChange,
  section,
}: FormDateInputProps) {
  return (
    <div className="flex flex-col gap-2 font-rubik z-10">
      <Label htmlFor={inputFor}>{label}</Label>
      <DatePickerDemo value={value} onChange={onChange} />
    </div>
  );
}

export default FormDateInput;

function DatePickerDemo({
  value,
  onChange,
}: {
  value?: Date;
  onChange?: (date: Date) => void;
}) {
  const [date, setDate] = React.useState<Date | undefined>(value);

  React.useEffect(() => {
    setDate(value);
  }, [value]);

  function handleSelect(selectedDate: Date | undefined) {
    if (!selectedDate) return;
    setDate(selectedDate);
    console.log("Selected date:", selectedDate);
    if (onChange) onChange(selectedDate);
  }

  return (
    <Popover modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal py-2 mt-2 h-12",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {(() => {
            const parsedDate = new Date(date as any);
            return parsedDate instanceof Date && !isNaN(parsedDate.getTime())
              ? format(parsedDate, "PPP")
              : "No date selected";
          })()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 z-[100000]">
        <Calendar mode="single" selected={date} onSelect={handleSelect} />
      </PopoverContent>
    </Popover>
  );
}
