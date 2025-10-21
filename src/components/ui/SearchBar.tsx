import React, { useRef, useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { useRouter } from "next/navigation";
import VerifyDocumentModal from "../Dialog/VerifyDocumentModal";

interface SearchBarProps {
  value: string;
}

function SearchBar({ value }: SearchBarProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Pisahkan ref untuk desktop dan mobile
  const desktopInputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Ambil nilai dari input yang terlihat
    const searchValue =
      desktopInputRef.current?.value.trim() ||
      mobileInputRef.current?.value.trim();

    if (searchValue) {
      router.push(`/result?platNomor=${encodeURIComponent(searchValue)}`);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-xs md:max-w-lg mt-6 mb-6"
      >
        {/* Input Pencarian untuk Desktop */}
        <div className="hidden lg:block relative">
          <IoSearch
            size={24}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500"
          />
          <input
            ref={desktopInputRef} // Ref khusus untuk desktop
            name="search"
            className="border-2 border-orange-500 rounded-xl py-3 pl-12 pr-5 w-full text-lg outline-none focus:ring-2 focus:ring-orange-300 placeholder:text-neutral-500 placeholder:font-semibold"
            type="text"
            placeholder="Cari berdasarkan plat nomor..."
            defaultValue={value ? value : ""}
          />
        </div>

        {/* Input Pencarian untuk Mobile */}
        <div className="lg:hidden block relative w-full max-w-xs mt-6 mb-6 search-box-shadow">
          <input
            ref={mobileInputRef} // Ref khusus untuk mobile
            name="search"
            className="border-2 border-orange-500 rounded-xl py-3 pl-5 pr-14 w-full text-lg outline-none focus:ring-2 focus:ring-orange-300 placeholder:text-neutral-500 placeholder:font-semibold"
            type="text"
            placeholder="Cari berdasarkan plat nomor..."
            defaultValue={value ? value : ""}
          />
          <button
            type="submit"
            className="h-full gradient-button flex items-center justify-center aspect-square bg-orange-500 rounded-xl absolute top-0 right-0"
          >
            <IoSearch size={28} className="text-white" />
          </button>
        </div>
      </form>

      {/* Separator */}
      <div className="flex items-center justify-center space-x-3 my-1">
        <div className="h-px bg-gray-300 dark:bg-gray-600 w-16"></div>
        <span className="text-gray-500 dark:text-gray-400 text-bold font-medium">
          ATAU
        </span>
        <div className="h-px bg-gray-300 dark:bg-gray-600 w-16"></div>
      </div>

      {/* Verify Document Link */}
      <div className="text-center">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="text-orange-600 dark:text-orange-400 font-bold text-lg hover:text-orange-700 dark:hover:text-orange-300 underline decoration-2 underline-offset-4 hover:decoration-orange-600 transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
        >
          <span>Verifikasi Laporanmu</span>
        </button>
      </div>

      {/* Modal */}
      <VerifyDocumentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

export default SearchBar;
