import { deleteEditedData } from "@/lib/features/inspection/inspectionSlice";
import { AppDispatch, useAppSelector } from "@/lib/store";
import React from "react";

import { GiCancel } from "react-icons/gi";
import { useDispatch } from "react-redux";

interface EditedItem {
  cancelEdit: (before: string, part: string, section: string) => void;
}

function EditedData({ cancelEdit }: EditedItem) {
  const id = window.location.pathname.split("/").pop();
  const editedItems =
    useAppSelector((state) => state.inspection.edited).find(
      (item) => item.id === id
    )?.data ?? [];
  console.log("editedItems", editedItems);
  const dispatch = useDispatch<AppDispatch>();
  const handleCancelEdit = (index: number) => {
    cancelEdit(
      editedItems[index].before,
      editedItems[index].part,
      editedItems[index].section
    );
    const payload = {
      part: editedItems[index].part,
      id: id,
    };
    dispatch(deleteEditedData(payload));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Perubahan Data</h1>

      {editedItems.length === 0 ? (
        <p className="text-gray-500 text-center">Belum ada data yang diubah</p>
      ) : (
        <div className="flex flex-wrap gap-4 justify-center items-stretch">
          {editedItems.map((item: any, index: any) => (
            <div
              key={index}
              className="relative border rounded-xl p-4 shadow-md hover:shadow-lg transition w-64 flex flex-col justify-between"
            >
              <div
                onClick={() => handleCancelEdit(index)}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-500 cursor-pointer"
              >
                <GiCancel size={20} className="text-red-500" />
              </div>

              <div className="mb-2">
                <h2 className="text-lg font-semibold">Part: {item.part}</h2>
              </div>
              <div className="text-sm flex-1">
                {item.section !== "root" && (
                  <div>
                    <span className="font-medium text-black">Section:</span>{" "}
                    {item.section}
                  </div>
                )}
                <div>
                  <span className="font-medium text-black">Sebelumnya:</span>{" "}
                  <span className="text-orange-500">
                    {item.before}
                    {typeof item.before === "boolean" &&
                    item.before === true ? (
                      <span className=""> Ada</span>
                    ) : (
                      <span className=""> Tidak Ada</span>
                    )}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-black">Sekarang:</span>{" "}
                  <span className="text-blue-500">
                    {item.after}
                    {typeof item.after === "boolean" && item.after === true ? (
                      <span className=""> Ada</span>
                    ) : (
                      <span className=""> Tidak Ada</span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EditedData;
