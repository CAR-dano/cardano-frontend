import React from "react";

interface PhotoItemWithDynamicTextProps {
  item: any; // Assuming item has path and label
  formatPath: (path: string) => string;
}

const PhotoItemWithDynamicText: React.FC<PhotoItemWithDynamicTextProps> = ({
  item,
  formatPath,
}) => {
  return (
    <div className="flex items-center justify-center flex-col h-[206px]">
      <img
        src={
          item.path ? formatPath(item.path) : "/assets/placeholder-photo.png"
        }
        alt={item.label}
        className="w-[220px] h-[150px] object-cover"
      />
      <p className="w-[220px] h-[48px] overflow-hidden text-center font-semibold mt-2 text-base break-words">
        {item.label}
      </p>
    </div>
  );
};

export default PhotoItemWithDynamicText;
