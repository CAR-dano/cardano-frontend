import Image from "next/image";
import React from "react";
import CardFindCard from "../ui/Card/CardFindCard";

export default function HowTo() {
  const image = [
    "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  return (
    <div className="flex flex-col gap-6 px-6 md:px-20 lg:px-28 font-rubik mb-20">
      <ol className="relative border-s-[10px] border-purple-100 px-5">
        {/* Step 1 */}
        <li className="ms-4 mb-10">
          <div className="absolute w-5 h-5 bg-purple-100 rounded-full mt-1.5 start-[-15px] outline outline-[12px] outline-purple-500 howto-shadow"></div>
          <h3 className="text-[#F24822] text-2xl md:text-4xl font-semibold ">
            Cari
          </h3>
          <div className="mt-4 p-6 border-dashed border-2 border-[#B175FF] rounded-md">
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
          <div className="absolute w-5 h-5 bg-purple-100 rounded-full mt-1.5 start-[-15px] outline outline-[12px] outline-purple-500 howto-shadow"></div>

          <h3 className="text-[#F24822] text-2xl md:text-4xl font-semibold ">
            Cek
          </h3>
          <div className="mt-4 p-6 border-dashed border-2 border-[#B175FF] rounded-md">
            <div className="flex flex-col md:flex-row items-center gap-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="bg-neutral-100 p-3 rounded-lg">
                  <div className="relative">
                    <p className="absolute text-white font-rubik font-semibold text-xs bg-orange-500 px-2 py-1 top-2 left-2 rounded-[4px]">
                      Toyota
                    </p>
                    <Image
                      className="rounded-lg w-full max-w-xs"
                      src={image[0]}
                      alt=""
                      width={300}
                      height={56}
                    />
                  </div>
                  <p className="my-2 text-yellow-900">Lorem Ipsum</p>
                </div>
              ))}
            </div>
          </div>
        </li>

        {/* Step 3 */}
        <li className="ms-4">
          <div className="absolute w-5 h-5 bg-purple-100 rounded-full mt-1.5 start-[-15px] outline outline-[12px] outline-purple-500 howto-shadow"></div>

          <h3 className="text-[#F24822] text-2xl md:text-4xl font-semibold ">
            Temukan
          </h3>
        </li>
      </ol>
      <div className="ml-12 md:ml-11 mr-5 md:mr-5 p-6 border-dashed border-2 border-[#B175FF] rounded-md flex justify-center">
        <CardFindCard />
      </div>
    </div>
  );
}
