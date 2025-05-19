"use client";
import Loading from "@/components/Loading";
import TableInspectionReviewer from "@/components/Table/TableInspectionReviewer";
import { toast } from "@/components/ui/use-toast";
import { getDataForReviewer } from "@/lib/features/inspection/inspectionSlice";

import { AppDispatch, RootState } from "@/lib/store";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  return (
    <div className="flex justify-between items-center mb-5">
      <h1 className="text-xl font-semibold">Draft Reviewer</h1>
    </div>
  );
};

const SearchBar = ({ setQuery, setFilter }: any) => {
  const [keyword, setKeyword] = useState("");

  const handleKeyword = (e: any) => {
    e.preventDefault();
    setQuery({ keyword, page: 1 });
  };

  return (
    <div className="mt-2">
      <p className="text-sm mb-2">Cari UMKM</p>
      <div className="flex gap-2">
        <form
          className="flex-grow relative hidden md:block"
          onSubmit={handleKeyword}
        >
          <div className="absolute inset-y-0 text-gray-500 start-0 flex items-center ps-3 pointer-events-none">
            <IoIosSearch />
          </div>
          <input
            type="text"
            id="search-navbar"
            className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search..."
            onChange={(e) => setKeyword(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
};

const Database: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [data, setData] = useState<any>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const { isLoading } = useSelector((state: RootState) => state.inspection);

  const filterData = (data: any[]) => {
    const allowedStatuses = ["APPROVED", "ARCHIVING", "ARCHIVED"];
    return data.filter((item) => allowedStatuses.includes(item.status));
  };

  useEffect(() => {
    setHasMounted(true);
    dispatch(getDataForReviewer())
      .unwrap()
      .then((response) => {
        if (response) {
          const filteredData = filterData(response.data);
          setData(filteredData);
        }
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: "Failed to fetch data",
          variant: "destructive",
        });
      });
  }, [dispatch]);

  if (!hasMounted) return null; // Hindari render di server

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <Header />
      {isLoading ? (
        <Loading />
      ) : data ? (
        <TableInspectionReviewer isDatabase={true} data={data} />
      ) : (
        <p>No data</p>
      )}
    </>
  );
};

export default Database;
