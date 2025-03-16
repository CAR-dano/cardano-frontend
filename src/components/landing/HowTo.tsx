import Image from "next/image";
import React from "react";
import CustomButton from "../ui/CustomButton";

export default function HowTo() {
  const image = [
    "https://images.unsplash.com/photo-1612393266591-c32944e815c8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXZlbnRhZG9yfGVufDB8MHwwfHx8MA%3D%3D",
  ];

  return (
    <div className="relative flex flex-col gap-6 px-10 lg:px-20 font-rubik mb-20">
      {/* Decoration */}
      <div className="overflow-hidden">
        <Image
          src="/assets/pattern/dot2.svg"
          alt=""
          width={550}
          height={100}
          className="z-0 right-0 top-0 absolute transform -translate-y-1/2"
        />
        <Image
          src="/assets/pattern/dot1.svg"
          alt=""
          width={1100}
          height={100}
          className="z-0 left-0 bottom-0 absolute transform -translate-x-1/2 translate-y-1/2 "
        />
      </div>

      {/* Content */}
      <div className="w-full flex flex-col lg:flex-row items-stretch gap-10">
        {/* Left */}
        <div className="lg:w-1/2 w-full">
          <ol className="relative border-s-[10px] border-purple-100 px-5 z-10 flex-1">
            {/* Step 1 */}
            <li className="ms-4 mb-10">
              <div className="absolute w-5 h-5 bg-purple-100 rounded-full mt-1.5 start-[-15px] outline outline-[12px] outline-[#FF7D43] howto-shadow"></div>
              <h3 className="text-black text-xl md:text-2xl lg:text-4xl font-semibold ">
                Search
              </h3>
              <div className="mt-4 border-[#B175FF] rounded-md">
                <Image
                  src={"/assets/examplesearch.svg"}
                  alt=""
                  width={300}
                  height={56}
                  className="w-full max-w-xs md:max-w-sm"
                />
              </div>
            </li>
            {/* Step 2 */}
            <li className="ms-4 mb-10">
              <div className="absolute w-5 h-5 bg-purple-100 rounded-full mt-1.5 start-[-15px] outline outline-[12px] outline-[#e57f7f] howto-shadow"></div>
              <h3 className="text-black text-xl md:text-2xl lg:text-4xl font-semibold ">
                Check
              </h3>
              <div className="relative mt-4 border-[#B175FF] rounded-md">
                <Image
                  src={"/assets/lambo.png"}
                  alt=""
                  width={400}
                  height={400}
                  className="w-full aspect-[4/3] max-w-xs md:max-w-sm rounded-[20px]"
                />
                <div className="font-rubik w-full h-full absolute top-0 left-0 flex flex-col justify-between p-4">
                  <p className="text-white text-xl md:text-3xl font-bold ">
                    AB 1234 CD
                  </p>
                  <p className="text-white text-lg md:text-xl font-semibold ">
                    Lamborgini <br /> Aventador LP-400
                  </p>
                </div>
              </div>
            </li>
            {/* Step 3 */}
            <li className="ms-4">
              <div className="absolute w-5 h-5 bg-purple-100 rounded-full mt-1.5 start-[-15px] outline outline-[12px] outline-purple-500 howto-shadow"></div>
              <h3 className="text-black text-xl md:text-2xl lg:text-4xl font-semibold ">
                Found
              </h3>
            </li>
          </ol>
          <div className="z-10 ml-10 md:ml-16 flex flex-wrap justify-start items-center gap-3 sm:gap-5 mt-4 sm:mt-5">
            <Image
              src="/assets/logo/pdf.svg"
              alt="PDF Icon"
              width={65}
              height={65}
              className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain"
            />
            <CustomButton className="text-[clamp(16px,3vw,28px)] font-white font-light rounded-full gradient-details text-white">
              Get the details
            </CustomButton>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden lg:block w-[5px] min-h-full gradient-powered-by rounded-full my-10"></div>
        <div className="block lg:hidden h-[5px] min-w-full gradient-powered-by rounded-full my-10"></div>

        <div className="flex flex-col items-start justify-center w-full md:w-1/2 px-4 sm:px-6 md:pl-16 gap-10 md:gap-14">
          {/* Inspected */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Image
              src="/assets/logo/exp.svg"
              alt="Car Icon"
              width={80}
              height={80}
              className="w-14 h-14 sm:w-16 sm:h-16 md:w-[105px] md:h-[105px] object-contain"
            />
            <div className="flex flex-col  md:items-center items-start">
              <div className="relative">
                <h1 className="inline font-semibold text-black leading-none text-[clamp(36px,8vw,96px)]">
                  175
                </h1>
                <Image
                  src="/assets/logo/plus.svg"
                  alt="Plus Icon"
                  width={30}
                  height={30}
                  className="absolute top-[-8px] right-[-16px] md:top-[-10px] md:right-[-15px] w-5 h-5 md:w-7 md:h-7 object-contain"
                />
              </div>
              <p className="text-orange-600 font-medium text-[clamp(14px,4vw,24px)] -mt-2 sm:-mt-3">
                Titik Pengecekan
              </p>
            </div>
          </div>

          {/* Experience */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Image
              src="/assets/logo/car.svg"
              alt="Experience Icon"
              width={80}
              height={80}
              className="w-14 h-14 sm:w-16 sm:h-16 md:w-24 md:h-24 object-contain"
            />
            <div className="flex flex-col md:items-center items-start">
              <div className="relative">
                <h1 className="inline font-semibold text-black leading-none text-[clamp(36px,8vw,96px)]">
                  20
                </h1>
                <Image
                  src="/assets/logo/plus.svg"
                  alt="Plus Icon"
                  width={30}
                  height={30}
                  className="absolute top-[-8px] right-[-16px] md:top-[-10px] md:right-[-15px] w-5 h-5 md:w-7 md:h-7 object-contain"
                />
              </div>
              <p className="text-orange-600 font-medium text-[clamp(14px,4vw,24px)] -mt-2 sm:-mt-3">
                Merek Mobil
              </p>
            </div>
          </div>

          {/* Priority */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Image
              src="/assets/logo/no1.svg"
              alt="Priority Icon"
              width={80}
              height={80}
              className="w-14 h-14 sm:w-16 sm:h-16 md:w-24 md:h-24 object-contain"
            />
            <div className="flex flex-row items-center">
              <h1 className="inline font-semibold text-black leading-none text-[clamp(64px,10vw,110px)]">
                1
              </h1>
              <div className="flex flex-col items-start ml-3">
                <p className="text-orange-600 font-bold text-[clamp(20px,6vw,32px)]">
                  Priority
                </p>
                <div className="h-[2px] w-full bg-neutral-500"></div>
                <p className="text-purple-400 font-light text-[clamp(20px,6vw,32px)]">
                  You
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
