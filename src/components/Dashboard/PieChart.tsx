import * as React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import { Card, CardContent } from "../ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";

interface PieChartProps {
  data: { name: string; value: number; fill: string }[];
  config: ChartConfig;
  dataKey: string;
  nameKey: string;
  total: number;
  totalChanges: string;
}

export function PieChartComponent({
  data,
  config,
  dataKey,
  nameKey,
  total,
  totalChanges,
}: PieChartProps) {
  return (
    <Card className="flex flex-col w-1/2 border-none p-0 shadow-none bg-transparent">
      <CardContent className="flex-1 pb-0 border-none p-0">
        <ChartContainer
          config={config}
          className="mx-auto aspect-square max-h-[350px] "
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey={dataKey}
              nameKey={nameKey}
              innerRadius={80}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }: any) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    const { cx, cy } = viewBox;
                    const iconSize = 16; // Ukuran ikon (h-4 w-4 -> 1rem -> 16px)
                    const spaceBetweenIconAndText = 4; // Jarak antara ikon dan teks
                    const thirdLineY = (cy || 0) + 22; // Sesuaikan posisi Y untuk baris ketiga

                    // Perkirakan setengah lebar teks untuk penyesuaian posisi
                    // Ini adalah perkiraan kasar; untuk presisi, Anda mungkin memerlukan pengukuran teks yang lebih canggih
                    const estimatedHalfTextWidth = totalChanges.length * 3.5; // Sesuaikan pengali ini

                    const iconX =
                      cx -
                      estimatedHalfTextWidth -
                      iconSize / 2 -
                      spaceBetweenIconAndText / 2 -
                      5;
                    const textX =
                      cx -
                      estimatedHalfTextWidth +
                      iconSize / 2 +
                      spaceBetweenIconAndText / 2;

                    return (
                      <g>
                        <text
                          x={cx}
                          y={(cy || 0) - 30}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="fill-muted-foreground text-sm"
                        >
                          Total Pesanan
                        </text>
                        <text
                          x={cx}
                          y={cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="fill-foreground text-3xl font-bold"
                        >
                          {total.toLocaleString()}
                        </text>

                        {/* Icon */}
                        <g
                          transform={`translate(${iconX}, ${thirdLineY - iconSize / 2
                            })`}
                        >
                          {totalChanges.startsWith("+") ? (
                            <TrendingUp className="h-4 w-4 text-green-500" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-500" />
                          )}
                        </g>

                        {/* Text for totalChanges */}
                        <text
                          x={textX + estimatedHalfTextWidth - iconSize / 2 - 5} // Sesuaikan dengan textAnchor="start"
                          y={thirdLineY + 3}
                          textAnchor="start"
                          dominantBaseline="middle"
                          className="fill-muted-foreground text-sm"
                        >
                          {totalChanges}
                        </text>
                      </g>
                    );
                  }
                  return null;
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
