"use client";
import React from "react";

import { format, parseISO } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { Label } from "../ui/label";
import { useTheme } from "../../contexts/ThemeContext";

interface FormDateInputProps {
  label: string;
  inputFor: string;
  value?: string; // Change type to string
  section?: string;
  onChange?: (date: string) => void; // Change type to string
}

function FormDateInput({
  label,
  inputFor,
  value, // Remove default new Date()
  onChange,
  section,
}: FormDateInputProps) {
  return (
    <div className="flex flex-col gap-2 font-rubik z-10">
      <Label htmlFor={inputFor} className="dark:text-gray-200">
        {label}
      </Label>
      <DatePickerDemo value={value} onChange={onChange} />
    </div>
  );
}

export default FormDateInput;

function DatePickerDemo({
  value,
  onChange,
}: {
  value?: string; // Change type to string
  onChange?: (date: string) => void; // Change type to string
}) {
  // Parse the incoming string value to a Date object for internal state,
  // ensuring it represents the local midnight of the intended date.
  const [date, setDate] = React.useState<Date | undefined>(
    value
      ? (() => {
        const parsed = parseISO(value);
        // Create a Date object representing UTC midnight of the parsed date's UTC day
        return new Date(
          Date.UTC(
            parsed.getUTCFullYear(),
            parsed.getUTCMonth(),
            parsed.getUTCDate()
          )
        );
      })()
      : undefined
  );
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false); // State to control popover open/close
  const { isDarkModeEnabled } = useTheme();

  React.useEffect(() => {
    // Update internal date state when the external value prop changes,
    // ensuring it represents the local midnight of the intended date.
    setDate(
      value
        ? (() => {
          const parsed = parseISO(value);
          // Create a Date object representing UTC midnight of the parsed date's UTC day
          return new Date(
            Date.UTC(
              parsed.getUTCFullYear(),
              parsed.getUTCMonth(),
              parsed.getUTCDate()
            )
          );
        })()
        : undefined
    );
  }, [value]);

  function handleSelect(selectedDate: Date | undefined) {
    if (!selectedDate) {
      setDate(undefined); // Clear date if no date is selected
      if (onChange) onChange(""); // Send empty string if no date
      setIsPopoverOpen(false); // Close popover
      return;
    }
    setDate(selectedDate);
    // Format the date to 'yyyy-MM-dd' string before sending to onChange to avoid timezone issues
    if (onChange) onChange(format(selectedDate, "yyyy-MM-dd"));
    setIsPopoverOpen(false); // Close popover after selection
  }

  return (
    <Popover modal={true} open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal py-2 mt-2 h-12",
            !date && "text-muted-foreground",
            isDarkModeEnabled &&
            "dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date && !isNaN(date.getTime()) // Directly use 'date' state and check validity
            ? format(date, "PPP") // Changed to human-readable format for display
            : "No date selected"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 z-[100000] dark:bg-gray-800 dark:border-gray-700">
        <Calendar mode="single" selected={date} onSelect={handleSelect} />
      </PopoverContent>
    </Popover>
  );
}
