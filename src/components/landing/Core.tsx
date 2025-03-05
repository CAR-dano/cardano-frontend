import Image from "next/image";
import React from "react";

function Core() {
  return (
    <div className="w-full font-rubik px-6 md:px-24 mb-20">
      <div className="flex flex-col md:flex-row justify-between items-center gap-10 md:gap-0">
        {/* Core 1 */}
        <div className="flex flex-col items-center justify-center gap-10 relative">
          <Image src={"/assets/Core1.svg"} alt="" width={134} height={150} />
          <div className="mt-5 md:mt-10 flex flex-col items-center justify-center relative">
            <div className="absolute -top-6 md:-top-8 w-12 md:w-16 aspect-square rounded-full bg-purple-400 border-[3px] border-purple-300 flex justify-center items-center">
              <p className="text-2xl md:text-4xl text-white font-bold">1</p>
            </div>
            <div className="px-2 flex flex-col gap-3 rounded-2xl justify-center w-full max-w-xs md:w-[350px] h-[150px] md:h-[200px] bg-white card-core-shadow">
              <p className="text-center text-lg md:text-xl text-orange-600 font-semibold">
                Main Point 1
              </p>
              <p className="text-center text-sm md:text-lg text-neutral-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </div>
        </div>

        {/* Core 2 */}
        <div className="mt-0 md:-mt-10 md:-mt-20 flex flex-col items-center justify-center gap-10">
          <Image src={"/assets/Core2.svg"} alt="" width={150} height={150} />
          <div className="mt-5 md:mt-10 flex flex-col items-center justify-center relative">
            <div className="absolute -top-6 md:-top-8 w-12 md:w-16 aspect-square rounded-full bg-purple-400 border-[3px] border-purple-300 flex justify-center items-center">
              <p className="text-2xl md:text-4xl text-white font-bold">2</p>
            </div>
            <div className="px-2 flex flex-col gap-3 rounded-2xl justify-center w-full max-w-xs md:w-[350px] h-[150px] md:h-[200px] bg-white card-core-shadow">
              <p className="text-center text-lg md:text-xl text-orange-600 font-semibold">
                Main Point 2
              </p>
              <p className="text-center text-sm md:text-lg text-neutral-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </div>
        </div>

        {/* Core 3 */}
        <div className="flex flex-col items-center justify-center gap-10">
          <Image src={"/assets/Core3.svg"} alt="" width={150} height={150} />
          <div className="mt-5 md:mt-10 flex flex-col items-center justify-center relative">
            <div className="absolute -top-6 md:-top-8 w-12 md:w-16 aspect-square rounded-full bg-purple-400 border-[3px] border-purple-300 flex justify-center items-center">
              <p className="text-2xl md:text-4xl text-white font-bold">3</p>
            </div>
            <div className="px-2 flex flex-col gap-3 rounded-2xl justify-center w-full max-w-xs md:w-[350px] h-[150px] md:h-[200px] bg-white card-core-shadow">
              <p className="text-center text-lg md:text-xl text-orange-600 font-semibold">
                Main Point 3
              </p>
              <p className="text-center text-sm md:text-lg text-neutral-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Core;
