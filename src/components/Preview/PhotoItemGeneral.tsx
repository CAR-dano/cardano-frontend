import React, { useRef, useEffect, useState } from "react";

interface PhotoItemGeneralProps {
  item: any; // Assuming item has path and label
  formatPath: (path: string) => string;
}

const PhotoItemGeneral: React.FC<PhotoItemGeneralProps> = ({
  item,
  formatPath,
}) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [currentFontSize, setCurrentFontSize] = useState(16); // Initial font size

  useEffect(() => {
    if (textRef.current) {
      const textWidth = textRef.current.scrollWidth;
      const containerWidth = 220; // Assuming photo width is 220px

      if (textWidth > containerWidth) {
        const newSize = (containerWidth / textWidth) * 16 * 0.9;
        setCurrentFontSize(Math.max(newSize, 10)); // Ensure minimum font size of 10px
      } else {
        setCurrentFontSize(16); // Reset if it fits
      }
    }
  }, [item.label]); // Recalculate when label changes

  return (
    <div className=" flex items-center justify-center flex-col">
      <img
        src={
          item.path ? formatPath(item.path) : "/assets/placeholder-photo.png"
        }
        alt={item.label}
        className="w-full max-h-[300px] object-cover"
      />
      {/* <p
        ref={textRef}
        className="text-center font-semibold mt-2"
        style={{ fontSize: `${currentFontSize}px` }}
      >
        {item.label}
      </p> */}
    </div>
  );
};

export default PhotoItemGeneral;
