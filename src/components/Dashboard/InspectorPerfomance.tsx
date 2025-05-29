import React from "react";

function InspectorPerfomance({
  data = [],
}: {
  data?: { inspector: string; totalInspections: number }[];
}) {
  return (
    <div className="font-inter bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 ">
      <h1 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
        Inspeksi oleh Inspektor
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {data.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-[5px] whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {index}. {item.inspector}
                </td>
                <td className="px-6 py-[5px] whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {item.totalInspections}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InspectorPerfomance;
