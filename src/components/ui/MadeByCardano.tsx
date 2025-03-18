import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

function MadeByCardano() {
  return (
    <motion.div
      className="px-5 mt-[50px] lg:mt-[100px] flex flex-col items-center justify-center gap-0 lg:gap-10"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <div className="flex flex-col items-start justify-center gap-0 lg:gap-5">
        <h1 className="text-2xl font-light mb-5">Made possible by</h1>
        <Image
          src="/assets/logo/cardano-vertical-blue.svg"
          alt="Next.js Logo"
          width={600}
          height={100}
          className="w-[300px] md:w-[600px] object-contain"
        />
      </div>
    </motion.div>
  );
}

export default MadeByCardano;
