import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white dark:bg-gray-900 bg-opacity-95 dark:bg-opacity-95 z-50">
      <div className="relative w-32 h-32 mb-6">
        <motion.div 
          animate={{ 
            rotateY: [0, 360],
            scale: [1, 1.05, 1],
          }}
          transition={{ 
            rotateY: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
          }}
          className="w-full h-full"
        >
          <Image 
            src="/assets/cardano-gold.svg" 
            alt="Car-Dano Loading" 
            fill
            className="object-contain"
          />
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <div className="text-center">
          <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
            {message}
          </h2>
          <div className="flex space-x-2 mt-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.9, repeat: Infinity, repeatDelay: 0.1 }}
              className="w-3 h-3 rounded-full bg-gradient-to-r from-[#FF7D43] to-[#A25DF9]"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.9, repeat: Infinity, repeatDelay: 0.2, delay: 0.1 }}
              className="w-3 h-3 rounded-full bg-gradient-to-r from-[#FF7D43] to-[#A25DF9]"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.9, repeat: Infinity, repeatDelay: 0.3, delay: 0.2 }}
              className="w-3 h-3 rounded-full bg-gradient-to-r from-[#FF7D43] to-[#A25DF9]"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
