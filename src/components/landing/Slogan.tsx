import React from "react";

function Slogan() {
  return (
    <div className="w-full flex flex-col items-center justify-center my-10 px-4">
      <div className="relative text-[clamp(40px,5vw,64px)] font-pacifico text-center leading-snug max-w-[90%]">
        <span className="absolute -top-4 -left-6 md:-top-8 md:-left-16 text-[clamp(48px,8vw,128px)] text-[#F24822]">
          “
        </span>
        <p className="text-gradient-slogan px-2">
          Trust Every Deal <br /> with Blockchain
        </p>
        <span className="absolute -bottom-4 -right-6 md:-bottom-16 md:-right-12 text-[clamp(48px,8vw,128px)] text-[#9747FF] leading-none">
          ”
        </span>
      </div>
    </div>
  );
}

export default Slogan;
