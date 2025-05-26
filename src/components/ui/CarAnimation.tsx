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

  // Increased circle size from 50 to 100 (radius)
  const circleRadius = 100;
  // Consistent blur amount
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
        <Image
          src="/assets/car-illustration.svg"
          width={640}
          height={500}
          alt="Illustration of a car"
          priority
          className="w-auto mx-auto max-w-[90%] md:max-w-[640px]"
          style={{
            filter: isHovering ? `url('#blur-mask')` : `blur(${blurAmount}px)`,
            transition: "filter 0.3s ease-out",
          }}
        />

        {isHovering && (
          <svg
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            style={{
              zIndex: 1,
              opacity: isHovering ? 1 : 0,
            }}
          >
            <defs>
              <filter id="blur-mask">
                <feGaussianBlur stdDeviation={blurAmount + 1} result="blur" />
                <feComponentTransfer>
                  <feFuncA type="linear" slope="1" />
                </feComponentTransfer>
                <feImage
                  href="#circle-mask"
                  x={mousePosition.x - circleRadius}
                  y={mousePosition.y - circleRadius}
                  width={circleRadius * 2}
                  height={circleRadius * 2}
                  result="mask"
                />
                <feComposite
                  operator="in"
                  in="SourceGraphic"
                  in2="mask"
                  result="masked-source"
                />
                <feComposite operator="over" in="masked-source" in2="blur" />
              </filter>

              {/* Blurred circle mask definition */}
              <radialGradient
                id="blurred-circle-gradient"
                cx="50%"
                cy="50%"
                r="50%"
                fx="50%"
                fy="50%"
              >
                <stop offset="0%" stopColor="white" stopOpacity="1" />
                <stop offset="70%" stopColor="white" stopOpacity="0.8" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </radialGradient>
              <circle
                id="circle-mask"
                cx={circleRadius}
                cy={circleRadius}
                r={circleRadius}
                fill="url(#blurred-circle-gradient)"
              />
            </defs>
          </svg>
        )}
      </div>
    </motion.div>
  );
};

export default CarComponent;
