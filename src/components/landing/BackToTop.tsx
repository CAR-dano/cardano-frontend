"use client";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";
import clsx from "clsx";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isFooter, setIsFooter] = useState(false);

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const toggleScrollState = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 200); // Show earlier on mobile

      // More accurate footer detection for mobile
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const footerThreshold = documentHeight - windowHeight - 100;

      setIsFooter(scrollY > footerThreshold);
    };

    window.addEventListener("scroll", toggleScrollState);
    return () => window.removeEventListener("scroll", toggleScrollState);
  }, []);

  const handleClick = () => {
    // Add haptic feedback for mobile devices
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    backToTop();
  };

  return (
    <button
      onClick={handleClick}
      className={clsx(
        "fixed transition-all ease-in-out duration-300 cursor-pointer z-[300] shadow-lg hover:shadow-xl active:scale-95",
        "flex items-center justify-center rounded-full",
        // Mobile-first responsive sizing
        "w-12 h-12 right-4 bottom-4", // Mobile default
        "sm:w-14 sm:h-14 sm:right-6 sm:bottom-6", // Small screens
        "md:w-16 md:h-16 md:right-8 md:bottom-8", // Medium screens and up
        // Visibility and positioning
        isVisible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-16 opacity-0 pointer-events-none",
        // Theme colors
        isFooter
          ? "text-white bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
          : "text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700",
        // Mobile touch improvements
        "touch-manipulation select-none",
        // Focus states for accessibility
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        isFooter ? "focus:ring-purple-500" : "focus:ring-orange-500"
      )}
      aria-label="Kembali ke atas"
      title="Kembali ke atas"
    >
      <FaArrowUp
        className={clsx(
          "transition-transform duration-200",
          // Responsive icon sizes
          "w-4 h-4", // Mobile
          "sm:w-5 sm:h-5", // Small screens
          "md:w-6 md:h-6", // Medium screens and up
          // Hover effects
          "group-hover:animate-bounce"
        )}
      />
    </button>
  );
}
