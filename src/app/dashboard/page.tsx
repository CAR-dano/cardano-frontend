"use client";
import Loading from "@/components/Loading";
import { getDataForReviewer } from "@/lib/features/inspection/inspectionSlice";

import { AppDispatch, RootState, useAppDispatch } from "@/lib/store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  return (
    <div className="flex justify-between items-center mb-5">
      <h1 className="text-xl font-semibold">Dashboard</h1>
    </div>
  );
};

// const SearchBar = ({ setQuery, setFilter }: any) => {
//   const [keyword, setKeyword] = useState("");

//   const handleKeyword = (e: any) => {
//     e.preventDefault();
//     setQuery({ keyword, page: 1 });
//   };

//   return (
//     <div className="mt-2">
//       <p className="text-sm mb-2">Cari UMKM</p>
//       <div className="flex gap-2">
//         <form
//           className="flex-grow relative hidden md:block"
//           onSubmit={handleKeyword}
//         >
//           <div className="absolute inset-y-0 text-gray-500 start-0 flex items-center ps-3 pointer-events-none">
//             <IoIosSearch />
//           </div>
//           <input
//             type="text"
//             id="search-navbar"
//             className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//             placeholder="Search..."
//             onChange={(e) => setKeyword(e.target.value)}
//           />
//         </form>
//       </div>
//     </div>
//   );
// };

const Article: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading } = useSelector(
    (state: RootState) => state.inspection
  );

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    dispatch(getDataForReviewer());
  }, [dispatch]);

  if (!hasMounted) return null; // Hindari render di server

  if (isLoading) return <p>Loading...</p>;

  // const countDataByStatus = (data: any) => {
  //   const statusCounts: { [key: string]: number } = {};

  //   data.forEach((item: any) => {
  //     const status = item.status;
  //     if (statusCounts[status]) {
  //       statusCounts[status]++;
  //     } else {
  //       statusCounts[status] = 1;
  //     }
  //   });

  //   return Object.entries(statusCounts).map(([status, count]) => ({
  //     status,
  //     count,
  //   }));
  // };

  const checkLink = (status: string): string => {
    switch (status) {
      case "NEED_REVIEW":
        return "/dashboard/review";
      case "APPROVED":
        return "/dashboard/database";
      case "REJECTED":
        return "/dashboard/rejected";
      default:
        return "/dashboard"; // Fallback URL
    }
  };

  return (
    <>
      <Header />
      {isLoading ? (
        <Loading />
      ) : data ? (
        <>
          <div className="flex flex-wrap gap-3 justify-center">
            {Object.entries(
              data.reduce((acc: Record<string, number>, item: any) => {
                acc[item.status] = (acc[item.status] || 0) + 1;
                return acc;
              }, {})
            ).map(([status, count]) => (
              <Link href={checkLink(status)} key={status}>
                <div className="bg-blue-500 text-white w-48 aspect-square border-[1px] rounded-lg flex flex-col items-center justify-center hover:scale-105 transition-transform">
                  <h1 className="text-5xl mb-2 font-rubik">{count}</h1>
                  <h1 className="text-xl font-rubik">{status}</h1>
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <p>No data</p>
      )}
    </>
  );
};

export default Article;
