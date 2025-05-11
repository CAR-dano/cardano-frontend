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
        setIsVisible(scrollY > 300);
        setIsFooter(scrollY > document.body.offsetHeight - 1480);
      };

      window.addEventListener("scroll", toggleScrollState);
      return () => window.removeEventListener("scroll", toggleScrollState);
    }, []);

    return (
      <div onClick={backToTop}>
        <FaArrowUp
          className={clsx(
            " p-2 fixed right-[12px] transition-all ease-in-out duration-500 cursor-pointer z-[300]",
            isVisible
              ? "bottom-[12px] md:right-[26px] md:bottom-[26px] lg:w-[40px] lg:h-[40px] rounded-full"
              : "-bottom-14",
            isFooter ? "text-white bg-purple-400" : "text-white bg-orange-600"
          )}
        />
      </div>
    );
  }
