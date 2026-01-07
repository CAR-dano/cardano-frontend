import React, { useEffect, useState } from "react";
import { PieChartComponent } from "./PieChart";
import { ChartConfig } from "../ui/chart";

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

  // User's specified colors and their mapping to branch names
  const branchColorMap: { [key: string]: string } = {
    Yogyakarta: "#F24091", // pink-600
    Semarang: "#8AD357", // green-500
    Solo: "#30B6ED", // blue-500
    // Add more branch-color mappings as needed, or a default for others
  };

  useEffect(() => {
    if (data && data.branchDistribution) {
      const newChartData = data.branchDistribution.map(
        (item: { branch: string; count: number }) => ({
          name: item.branch,
          value: item.count,
          fill: branchColorMap[item.branch] || "#cccccc", // Fallback to grey
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
          color: branchColorMap[item.branch] || "#cccccc", // Fallback to grey
        };
      });

      setChartData(newChartData);
      setChartConfig(newChartConfig);
    }
  }, [data]);

  return (
    <div className="font-inter bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
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
                        branchColorMap[branch.branch] || "#cccccc", // Fallback to grey
                    }}
                  ></div>
                  <p>{branch.branch}</p>
                </div>
                {/* data */}
                <div className="flex flex-col w-full">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <p className="w-[30%] text-left">Pesanan</p>
                    <p className="w-[40%] text-left">% dari Total</p>
                    <p className="w-[30%] text-left">% Perubahan</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="w-[30%] text-left text-[36px] font-bold text-gray-900 dark:text-white leading-none">
                      {branch.count}
                    </p>
                    <p className="w-[40%] text-left text-[36px] font-semibold text-purple-400 dark:text-white leading-none">
                      {branch.percentage}
                    </p>
                    <p className="w-[30%] text-left text-[36px] font-light text-green-600 dark:text-white leading-none">
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
