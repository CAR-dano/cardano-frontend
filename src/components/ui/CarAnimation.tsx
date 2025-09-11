"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const CarComponent = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  // Animasi paralaks untuk mobil

  // const xPos = useTransform(scrollYProgress, [0, 1], ["0%", "500%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  // Circle size and blur settings for interior reveal effect
  const circleRadius = 100; // Larger for smoother experience
  const blurAmount = 6;

  return (
    <motion.div
      className="mt-10 w-full flex justify-center relative"
      initial={{ x: "-100vw" }}
      animate={{ x: "0%" }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div
        ref={imageRef}
        className="relative"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        style={{
          cursor: isHovering
            ? "none"
            : "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3ccircle cx='11' cy='11' r='8'/%3e%3cpath d='m21 21-4.35-4.35'/%3e%3c/svg%3e\") 12 12, auto",
        }}
      >
        {/* Blurred background layer */}
        <Image
          src="/assets/car-illustration.svg"
          width={640}
          height={500}
          alt="Illustration of a car"
          priority
          className="w-auto mx-auto max-w-[90%] md:max-w-[640px]"
          style={{
            filter: `blur(${blurAmount}px)`,
          }}
        />

        {/* Clear overlay layer that reveals interior on hover */}
        {isHovering && (
          <>
            {/* Interior reveal layer */}
            <div
              className="absolute top-0 left-0 w-full h-full"
              style={{
                maskImage: `radial-gradient(circle ${circleRadius}px at ${mousePosition.x}px ${mousePosition.y}px, white 0%, white 70%, rgba(255,255,255,0.3) 85%, transparent 100%)`,
                WebkitMaskImage: `radial-gradient(circle ${circleRadius}px at ${mousePosition.x}px ${mousePosition.y}px, white 0%, white 70%, rgba(255,255,255,0.3) 85%, transparent 100%)`,
                transition: "none", // Remove transition for instant responsiveness
              }}
            >
              <Image
                src="/assets/interior-car.svg"
                width={640}
                height={500}
                alt="Interior of a car"
                priority
                className="w-auto mx-auto max-w-[90%] md:max-w-[640px]"
              />
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default CarComponent;
