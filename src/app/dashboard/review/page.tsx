"use client";
import { ButtonDropdown } from "@/components/Button/ButtonDropDown";
import PrimaryButton from "@/components/Button/PrimaryButton";
import Loading from "@/components/Loading";
import TableInspectionReviewer from "@/components/Table/TableInspectionReviewer";
import { toast } from "@/components/ui/use-toast";
import { getDataForReviewer } from "@/lib/features/inspection/inspectionSlice";

import {
  AppDispatch,
  RootState,
  useAppDispatch,
  useAppSelector,
} from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <div className="flex justify-between items-center mb-5">
      <h1 className="text-xl font-semibold">Draft Reviewer</h1>
    </div>
  );
};

const SearchBar = ({ setQuery, setFilter }: any) => {
  const dispatch = useAppDispatch();
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

  const filterData = (data: any) => {
    const status = "NEED_REVIEW";
    const filteredData = data.filter((item: any) => {
      return item.status === status;
    });

    return filteredData;
  };

  return (
    <>
      <Header />
      {isLoading ? (
        <Loading />
      ) : data ? (
        <TableInspectionReviewer data={filterData(data)} isDatabase={false} />
      ) : (
        <p>No data</p>
      )}
    </>
  );
};

export default Article;
