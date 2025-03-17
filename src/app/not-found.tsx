import { Layout } from "@/components/layout";
import CustomButton from "@/components/ui/CustomButton";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full relative">
      <Layout>
        <div className="flex flex-col md:flex-row items-center justify-start mt-20 md:mt-0 md:justify-center h-[90vh] px-6 text-center">
          <Image
            src="/assets/error.png"
            alt="404"
            width={560}
            height={560}
            className="w-80 md:w-[560px]"
          />
          <div className="flex flex-col items-start justify-center gap-3 mt-6 md:mt-0">
            <p className="text-black font-rubik text-3xl md:text-[40px] font-light leading-tight">
              Walawee!
            </p>
            <h1 className="text-black font-rubik text-5xl md:text-[60px] font-bold leading-tight">
              404 Error
            </h1>
            <p className="text-black font-rubik text-2xl md:text-[40px] font-light leading-tight">
              Page not found
            </p>
            <p className="text-[#6D6D6D] text-left font-rubik text-lg md:text-[24px] font-light leading-normal md:leading-[40px]">
              This page doesn{"'"}t exist or was removed! <br />
              We suggest you go back home.
            </p>
            <CustomButton className="w-full md:w-auto z-10 text-white text-lg md:text-xl font-bold rounded-lg px-6 py-2 gradient-button-2">
              <Link href="/">Back to Home</Link>
            </CustomButton>
          </div>
        </div>
      </Layout>
    </div>
  );
}
