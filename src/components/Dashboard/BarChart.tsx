"use client";

import * as React from "react";
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  XAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../components/ui/chart";

import { AiOutlineLineChart } from "react-icons/ai";
import { IoBarChart } from "react-icons/io5";

export type TrendData = {
  date: string;
  count: number;
};

interface CustomBarChartProps {
  data: TrendData[];
  total: number; // Add total prop
  setActiveChartType?: (type: "bar" | "line") => void; // Optional prop for setting active chart type
  activeChartType?: string; // Optional prop for active chart type
}

const chartConfig = {
  count: {
    label: "Jumlah Inspeksi",
    color: "hsl(217.2 91.2% 59.8%)", // Equivalent to blue-500 in HSL
  },
} satisfies ChartConfig;

export function CustomBarChart({
  data,
  total,
  setActiveChartType,
  activeChartType,
}: CustomBarChartProps) {
  return (
    <Card className="py-0">
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row py-5">
        <div className="flex flex-1 flex-row justify-between gap-1 px-6 py-5 ">
          <div className=" flex flex-col justify-center gap-1">
            <CardTitle>Tren Inspeksi</CardTitle>
            <CardDescription>
              Menampilkan total inspeksi berdasarkan tanggal
            </CardDescription>
          </div>
          <div className="flex rounded-md mb-4">
            <button
              onClick={() => setActiveChartType && setActiveChartType("bar")}
              className={`p-2 rounded-l-md border border-gray-300 dark:border-gray-700 ${
                activeChartType === "bar"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200"
              }`}
              aria-label="Bar Chart"
            >
              <IoBarChart className="w-5 h-5" />
            </button>
            <button
              onClick={() => setActiveChartType && setActiveChartType("line")}
              className={`p-2 rounded-r-md border border-l-0 border-gray-300 dark:border-gray-700 ${
                activeChartType === "line"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200"
              }`}
              aria-label="Line Chart"
            >
              <AiOutlineLineChart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6 flex flex-col lg:flex-row items-center justify-between">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <RechartsBarChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="count"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar
              dataKey="count"
              fill="hsl(217.2 91.2% 59.8%)"
              radius={[4, 4, 0, 0]}
            />
          </RechartsBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
