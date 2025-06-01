import React from "react";

interface PhotoItemWithDynamicTextProps {
  item: any; // Assuming item has path and label
  formatPath: (path: string) => string;
}

const PhotoItemWithDynamicText: React.FC<PhotoItemWithDynamicTextProps> = ({
  item,
  formatPath,
}) => {
  const capitalizeWords = (str: string) => {
    if (!str) return "";
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const capitalizedLabel = capitalizeWords(item.label);

  return (
    <div className="flex items-center justify-center flex-col h-[206px]">
      <img
        src={
          item.path ? formatPath(item.path) : "/assets/placeholder-photo.png"
        }
        alt={capitalizedLabel}
        className="w-[220px] h-[150px] object-cover"
      />
      <p className="w-[220px] h-[48px] overflow-hidden text-center font-semibold mt-2 text-base break-words">
        {capitalizedLabel}
      </p>
    </div>
  );
};

export default PhotoItemWithDynamicText;
