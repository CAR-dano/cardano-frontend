import React, { useEffect, useState } from "react";
import { PieChartComponent } from "./PieChart";
import { ChartConfig } from "../../components/ui/chart";

// data = {
//   total:              100,
//   totalChange:        "+100%"
//   branchDistribution: [
//     { branch: "Branch A", percentage: 40, count: 40, change: "+10%" },
//     { branch: "Branch B", percentage: 30, count: 30, change: "+5%" },
//     { branch: "Branch C", percentage: 20, count: 20, change: "-2%" },
//     { branch: "Branch D", percentage: 10, count: 10, change: "+3%" }
//   ]
// }

function BranchDistribution({ data }: any) {
  const [chartData, setChartData] = useState<
    { name: string; value: number; fill: string }[]
  >([]);
  const [chartConfig, setChartConfig] = useState<ChartConfig>({});

  // Predefined color palette for branches (distinct pastel colors)
  const branchColorPalette = [
    "#F9A8D4", // pink-300
    "#86EFAC", // green-300
    "#93C5FD", // blue-300
    "#FDE047", // yellow-300
    "#FCA5A5", // red-300
    "#D8B4FE", // purple-300
    "#FED7AA", // orange-300
    "#67E8F9", // cyan-300
    "#A5B4FC", // indigo-300
    "#7DD3FC", // sky-300
    "#D9F99D", // lime-300
    "#FDBA74", // amber-300
  ];

  // Memoized color assignment to ensure each branch gets a unique color
  const [branchColorAssignments, setBranchColorAssignments] = useState<{
    [key: string]: string;
  }>({});

  // Get or assign color for a branch (ensures uniqueness)
  const getBranchColor = (branchName: string): string => {
    if (branchColorAssignments[branchName]) {
      return branchColorAssignments[branchName];
    }

    // Find the first unused color
    const usedColors = new Set(Object.values(branchColorAssignments));
    const availableColor =
      branchColorPalette.find((color) => !usedColors.has(color)) ||
      branchColorPalette[0]; // Fallback to first color if all used

    return availableColor;
  };

  useEffect(() => {
    if (data && data.branchDistribution) {
      // First, build color assignments for all branches
      const newColorAssignments: { [key: string]: string } = {};
      const usedColors = new Set<string>();

      data.branchDistribution.forEach(
        (item: { branch: string; count: number }) => {
          if (!newColorAssignments[item.branch]) {
            // Find first available color
            const availableColor =
              branchColorPalette.find((color) => !usedColors.has(color)) ||
              branchColorPalette[0];
            newColorAssignments[item.branch] = availableColor;
            usedColors.add(availableColor);
          }
        }
      );

      setBranchColorAssignments(newColorAssignments);

      const newChartData = data.branchDistribution.map(
        (item: { branch: string; count: number }) => ({
          name: item.branch,
          value: item.count,
          fill: newColorAssignments[item.branch],
        })
      );

      const newChartConfig: ChartConfig = {
        count: {
          label: "Count",
        },
      };
      data.branchDistribution.forEach((item: { branch: string }) => {
        newChartConfig[item.branch.toLowerCase().replace(/\s/g, "")] = {
          label: item.branch,
          color: newColorAssignments[item.branch],
        };
      });

      setChartData(newChartData);
      setChartConfig(newChartConfig);
    }
  }, [data]);

  return (
    <div className="font-inter bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 h-[600px] overflow-y-auto mb-6">
      {/* pie chart */}
      <div className="flex  items-center border-none">
        {chartData.length > 0 && (
          <PieChartComponent
            data={chartData}
            config={chartConfig}
            dataKey="value"
            nameKey="name"
            total={data.total}
            totalChanges={data.totalChange}
          />
        )}

        <div className="ml-6 w-[60%]">
          <h1 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
            Inspeksi Berdasarkan Cabang
          </h1>
          {data.branchDistribution.map(
            (branch: {
              branch: string;
              percentage: number;
              count: number;
              change: string;
            }) => (
              <div
                key={branch.branch}
                className="flex flex-col items-start justify-between mb-5"
              >
                <div className="flex items-center text-lg font-normal text-gray-900 dark:text-white mb-0">
                  {/* circle */}
                  <div
                    className="w-4 h-4 rounded-full mr-2"
                    style={{
                      backgroundColor:
                        branchColorAssignments[branch.branch] ||
                        branchColorPalette[0],
                    }}
                  ></div>
                  <p>{branch.branch}</p>
                </div>
                {/* data */}
                <div className="flex flex-col w-full">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <p className="w-[30%] text-left">Pesanan</p>
                    <p className="w-[35%] text-left">% dari Total</p>
                    <p className="w-[35%] text-left">% Perubahan</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="w-[30%] text-left text-2xl font-bold text-gray-900 dark:text-white leading-none">
                      {branch.count}
                    </p>
                    <p className="w-[35%] text-left text-2xl font-semibold text-purple-400 dark:text-white leading-none">
                      {branch.percentage}
                    </p>
                    <p className="w-[35%] text-left text-2xl font-light text-green-600 dark:text-white leading-none">
                      {branch.change}
                    </p>
                  </div>
                </div>
              </div>
            )
          )}
          {data.branchDistribution.length === 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Tidak ada data inspeksi untuk cabang ini.
            </p>
          )}
        </div>
      </div>

      {/* stats per branch */}
      <div></div>
    </div>
  );
}

export default BranchDistribution;
