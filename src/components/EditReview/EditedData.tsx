"use client";
import {
  deleteEditedData,
  getDataEdited,
} from "@/lib/features/inspection/inspectionSlice";
import { AppDispatch, useAppSelector } from "@/lib/store";
import React, { use, useEffect } from "react";

import { GiCancel } from "react-icons/gi";
import { useDispatch } from "react-redux";
import Button from "../Button/Button";

interface EditedItem {
  cancelEdit: (before: string, part: string, section: string) => void;
  id?: string;
  updateData: (data: any) => void;
}

function EditedData({ updateData, cancelEdit, id }: EditedItem) {
  const [status, setStatus] = React.useState(true);

  // Ambil semua item dengan id yang sama, hasilnya array (atau kosong jika tidak ada)
  const editedItems = useAppSelector((state) => state.inspection.edited).filter(
    (item) => item.inspectionId === id
  );

  const dispatch = useDispatch<AppDispatch>();

  const handleCancelEdit = (index: number) => {
    const item = editedItems[index];
    cancelEdit(
      item.oldValue ?? "",
      item.subFieldName ?? "",
      item.fieldName ?? ""
    );
    dispatch(deleteEditedData({ inspectionId: item.inspectionId }));
  };

  function formatPart(input: any) {
    if (!input) return "";
    const result = input
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/^./, (str: any) => str.toUpperCase());
    return result;
  }

  const getChangeData = (id: string) => {
    dispatch(getDataEdited(id))
      .unwrap()
      .then((res) => {
        if (res) {
          updateData(res);
        }
        setStatus(false);
      });
  };

  const checkIfArray = (value: any) => {
    if (Array.isArray(value)) {
      return value.map((item) => item.namaPart).join(", ");
    }
    return value;
  };

  useEffect(() => {
    console.log("editedItems", editedItems);
  }, [editedItems]);

  useEffect(() => {
    if (id && status) {
      if (id !== "review") {
        getChangeData(id);
      }
    }
  }, [id, status]);

  return (
    <div className="p-6 w-full mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Perubahan Data</h1>

      {editedItems.length === 0 ? (
        <p className="text-gray-500 text-center">Belum ada data yang diubah</p>
      ) : (
        <div className="w-full flex flex-col gap-4">
          <div className="w-full relative border rounded-xl px-4 py-2  shadow-md hover:shadow-lg transition flex justify-between items-center">
            <div className="w-[20%] flex items-center justify-center">
              <span className="font-medium text-black">FieldName</span>
            </div>
            <div className="w-[20%] flex items-center justify-center">
              <h2 className=" font-semibold">SubFieldName</h2>
            </div>
            <div className="w-[20%] flex items-center justify-center">
              <span className="font-medium text-black">Sebelumnya</span>
            </div>
            <div className="w-[20%] flex items-center justify-center">
              <span className="font-medium text-black">Sekarang</span>
            </div>
            <div className="w-[20%] flex items-center justify-center">
              <span className="font-medium text-black">Action</span>
            </div>
          </div>
          {editedItems.map((item: any, index: number) => (
            <div
              key={index}
              className="w-full relative border rounded-xl p-4 shadow-md hover:shadow-lg transition flex justify-between items-center"
            >
              <div className="w-[20%] flex items-center justify-center">
                {formatPart(item.fieldName)}
              </div>

              {item.subFieldName ? (
                <div className="w-[20%] flex items-center justify-center">
                  {formatPart(item.subFieldName)}
                </div>
              ) : (
                <div className="w-[20%] flex items-center justify-center">
                  {formatPart(item.fieldName)}
                </div>
              )}
              <div className="w-[20%] flex items-center justify-center">
                <span className="text-red-500">
                  {typeof item.oldValue === "boolean"
                    ? item.oldValue
                      ? "Ada"
                      : "Tidak Ada"
                    : checkIfArray(item.oldValue)}
                </span>
              </div>
              <div className="w-[20%] flex items-center justify-center">
                <span className="text-blue-500">
                  {typeof item.newValue === "boolean"
                    ? item.newValue
                      ? "Ada"
                      : "Tidak Ada"
                    : checkIfArray(item.newValue)}
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
