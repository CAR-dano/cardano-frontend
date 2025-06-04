"use client";

import * as React from "react";
import {
  addDays,
  format,
  subDays,
  startOfMonth,
  startOfYear,
  subMonths,
  subYears,
} from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerWithRangeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  initialDateRange?: DateRange;
  onDateChange: (dateRange: DateRange | undefined, label?: string) => void;
}

export function DatePickerWithRange({
  className,
  initialDateRange,
  onDateChange,
}: DatePickerWithRangeProps) {
  const [date, setDate] = React.useState<DateRange | undefined>(
    initialDateRange ||
      (() => {
        const today = new Date();
        const sevenDaysAgo = subDays(today, 7);
        return {
          from: sevenDaysAgo,
          to: today,
        };
      })
  );
  const [tempDate, setTempDate] = React.useState<DateRange | undefined>(date);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setTempDate(date);
  }, [date]);

  const handleApply = () => {
    setDate(tempDate);
    onDateChange(tempDate); // No label for custom range
    setOpen(false);
  };

  const handleCancel = () => {
    setTempDate(date); // Revert to the last applied date
    setOpen(false);
  };

  const handleQuickSelect = (newFrom: Date, newTo: Date, label: string) => {
    setTempDate({ from: newFrom, to: newTo });
    onDateChange({ from: newFrom, to: newTo }, label); // Pass label for quick select
    setOpen(false); // Close popover immediately on quick select
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal dark:bg-gray-800 dark:text-white dark:border-gray-600",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="dark:text-white" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="flex flex-col w-auto p-0 mr-10 dark:bg-gray-900 dark:text-white dark:border-gray-700"
          align="start"
        >
          <div className="flex">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={tempDate?.from}
              selected={tempDate}
              onSelect={setTempDate}
              numberOfMonths={2}
            />
            <div className="flex flex-col p-4 border-l items-start space-y-2">
              <Button
                variant="ghost"
                className="dark:hover:bg-gray-600 dark:hover:text-white dark:text-gray-300"
                onClick={() =>
                  handleQuickSelect(new Date(), new Date(), "Today")
                }
              >
                Today
              </Button>
              <Button
                variant="ghost"
                className="dark:hover:bg-gray-600 dark:hover:text-white dark:text-gray-300"
                onClick={() =>
                  handleQuickSelect(
                    subDays(new Date(), 6),
                    new Date(),
                    "Last 7 Days"
                  )
                }
              >
                Last 7 Days
              </Button>
              <Button
                variant="ghost"
                className="dark:hover:bg-gray-600 dark:hover:text-white dark:text-gray-300"
                onClick={() =>
                  handleQuickSelect(
                    subDays(new Date(), 29),
                    new Date(),
                    "Last 30 Days"
                  )
                }
              >
                Last 30 Days
              </Button>
              <Button
                variant="ghost"
                className="dark:hover:bg-gray-600 dark:hover:text-white dark:text-gray-300"
                onClick={() =>
                  handleQuickSelect(
                    startOfMonth(new Date()),
                    new Date(),
                    "Month to Date"
                  )
                }
              >
                Month to Date
              </Button>
              <Button
                variant="ghost"
                className="dark:hover:bg-gray-600 dark:hover:text-white dark:text-gray-300"
                onClick={() =>
                  handleQuickSelect(
                    subMonths(new Date(), 11),
                    new Date(),
                    "Last 12 Months"
                  )
                }
              >
                Last 12 Months
              </Button>
              <Button
                variant="ghost"
                className="dark:hover:bg-gray-600 dark:hover:text-white dark:text-gray-300"
                onClick={() =>
                  handleQuickSelect(
                    startOfYear(new Date()),
                    new Date(),
                    "Year to Date"
                  )
                }
              >
                Year to Date
              </Button>
              <Button
                variant="ghost"
                className="dark:hover:bg-gray-600 dark:hover:text-white dark:text-gray-300"
                onClick={() =>
                  handleQuickSelect(
                    subYears(new Date(), 2),
                    new Date(),
                    "Last 3 Years"
                  )
                }
              >
                Last 3 Years
              </Button>
            </div>
          </div>
          <div className="flex justify-end p-2 border-t gap-3">
            <Button
              variant="ghost"
              className="dark:hover:bg-gray-600 dark:hover:text-white dark:text-gray-300"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              className="bg-blue-400 hover:bg-blue-500 text-white"
              onClick={handleApply}
            >
              Apply
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
