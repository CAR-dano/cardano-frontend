import React, { useRef } from "react";
import { IoSearch } from "react-icons/io5";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";

function SearchBar({ value }: any) {
  const { scrollYProgress } = useScroll();
  const router = useRouter();

  // Pisahkan ref untuk desktop dan mobile
  const desktopInputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);

  // Animasi scroll untuk input pencarian
  const inputY = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);
  const inputOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Ambil nilai dari input yang terlihat
    const searchValue =
      desktopInputRef.current?.value.trim() ||
      mobileInputRef.current?.value.trim();

    console.log(searchValue); // Debugging untuk memastikan value terambil

    if (searchValue) {
      router.push(`/result?platNomor=${encodeURIComponent(searchValue)}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full max-w-xs md:max-w-lg mt-6 mb-6"
    >
      {/* Input Pencarian untuk Desktop */}
      <motion.div
        className="hidden lg:block relative"
        style={{ y: inputY, opacity: inputOpacity }}
      >
        <IoSearch
          size={24}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500"
        />
        <input
          ref={desktopInputRef} // Ref khusus untuk desktop
          name="search"
          className="border-2 border-orange-500 rounded-xl py-3 pl-12 pr-5 w-full text-lg outline-none focus:ring-2 focus:ring-orange-300 placeholder:text-neutral-500 placeholder:font-semibold"
          type="text"
          placeholder="Search here..."
          defaultValue={value ? value : ""}
        />
      </motion.div>

      {/* Input Pencarian untuk Mobile */}
      <motion.div
        className="lg:hidden block relative w-full max-w-xs mt-6 mb-6 search-box-shadow"
        style={{ y: inputY, opacity: inputOpacity }}
      >
        <input
          ref={mobileInputRef} // Ref khusus untuk mobile
          name="search"
          className="border-2 border-orange-500 rounded-xl py-3 pl-5 pr-14 w-full text-lg outline-none focus:ring-2 focus:ring-orange-300 placeholder:text-neutral-500 placeholder:font-semibold"
          type="text"
          placeholder="Search here..."
          defaultValue={value ? value : ""}
        />
        <button
          type="submit"
          className="h-full gradient-button flex items-center justify-center aspect-square bg-orange-500 rounded-xl absolute top-0 right-0"
        >
          <IoSearch size={28} className="text-white" />
        </button>
      </motion.div>
    </form>
  );
}

export default SearchBar;
