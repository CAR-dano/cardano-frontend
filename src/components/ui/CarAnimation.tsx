"use client";
import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const CarComponent = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  // Animasi paralaks untuk mobil
  const { scrollYProgress } = useScroll();

  const xPos = useTransform(scrollYProgress, [0, 1], ["0%", "500%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  // Circle size and blur settings
  const circleRadius = 100;
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

        {/* Clear overlay layer that reveals on hover */}
        {isHovering && (
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              maskImage: `radial-gradient(circle ${circleRadius}px at ${mousePosition.x}px ${mousePosition.y}px, white 0%, white 60%, transparent 80%, transparent 100%)`,
              WebkitMaskImage: `radial-gradient(circle ${circleRadius}px at ${mousePosition.x}px ${mousePosition.y}px, white 0%, white 60%, transparent 80%, transparent 100%)`,
              transition: "mask-image 0.1s ease-out, -webkit-mask-image 0.1s ease-out",
            }}
          >
            <Image
              src="/assets/car-illustration.svg"
              width={640}
              height={500}
              alt="Illustration of a car"
              priority
              className="w-auto mx-auto max-w-[90%] md:max-w-[640px]"
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CarComponent;
