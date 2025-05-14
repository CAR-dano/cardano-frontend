import { deleteEditedData } from "@/lib/features/inspection/inspectionSlice";
import { AppDispatch, useAppSelector } from "@/lib/store";
import React from "react";

import { GiCancel } from "react-icons/gi";
import { useDispatch } from "react-redux";
import Button from "../Button/Button";

interface EditedItem {
  cancelEdit: (before: string, part: string, section: string) => void;
}

function EditedData({ cancelEdit }: EditedItem) {
  const id = window.location.pathname.split("/").pop();
  const editedItems =
    useAppSelector((state) => state.inspection.edited).find(
      (item) => item.id === id
    )?.data ?? [];
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

  function formatPart(input: any) {
    const result = input
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/^./, (str: any) => str.toUpperCase());

    return result;
  }

  return (
    <div className="p-6 w-full mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Perubahan Data</h1>

      {editedItems.length === 0 ? (
        <p className="text-gray-500 text-center">Belum ada data yang diubah</p>
      ) : (
        <div className="w-full flex flex-col gap-4">
          <div className="w-full relative border rounded-xl px-4 py-2  shadow-md hover:shadow-lg transition flex justify-between items-center">
            <div className="w-[20%] flex items-center justify-center">
              <span className="font-medium text-black">Section</span>{" "}
            </div>
            <div className="w-[20%] flex items-center justify-center">
              <h2 className=" font-semibold">Part</h2>
            </div>
            <div className="w-[20%] flex items-center justify-center">
              <span className="font-medium text-black">Sebelumnya</span>{" "}
            </div>
            <div className="w-[20%] flex items-center justify-center">
              <span className="font-medium text-black">Sekarang</span>{" "}
            </div>
            <div className="w-[20%] flex items-center justify-center">
              <span className="font-medium text-black">Action</span>{" "}
            </div>
          </div>
          {editedItems.map((item: any, index: any) => (
            <div
              key={index}
              className="w-full relative border rounded-xl p-4 shadow-md hover:shadow-lg transition flex justify-between items-center"
            >
              {item.section !== "root" ? (
                <div className="w-[20%] flex items-center justify-center">
                  {/* <span className="font-medium text-black">Section:</span>{" "} */}
                  {formatPart(item.section)}
                </div>
              ) : (
                <div className="w-[20%] flex items-center justify-center">
                  <span className="font-medium text-black">Root</span>{" "}
                </div>
              )}
              <div className="w-[20%] flex items-center justify-center">
                <h2 className="">{formatPart(item.part)}</h2>
              </div>
              <div className="w-[20%] flex items-center justify-center">
                <span className="text-red-500">
                  {typeof item.before === "boolean"
                    ? item.before
                      ? "Ada"
                      : "Tidak Ada"
                    : item.before}
                </span>
              </div>

              <div className="w-[20%] flex items-center justify-center">
                <span className="text-blue-500">
                  {typeof item.after === "boolean"
                    ? item.after
                      ? "Ada"
                      : "Tidak Ada"
                    : item.after}
                </span>
              </div>

              <Button
                onClick={() => handleCancelEdit(index)}
                className="flex text-gray-500 hover:text-red-500 cursor-pointer w-[20%] flex items-center justify-center gap-2"
              >
                <GiCancel size={20} />
                <span className="">Cancel</span>
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EditedData;
