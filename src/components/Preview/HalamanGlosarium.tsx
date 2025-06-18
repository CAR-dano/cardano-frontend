import React from "react";
import Image from "next/image";

const HalamanGlosarium = () => {
  return (
    <div
      className="page-break-after"
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        src="/assets/glosarium.svg"
        alt="Glosarium"
        width={800}
        height={600}
        objectFit="contain"
      />
    </div>
  );
};

export default HalamanGlosarium;
