"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDocs } from "../../features/main/docs/docsActions";
import DocCard from "../../components/docs/DocCard";
import DocsSkeleton from "../../components/common/DocsSkeleton";
import { AlertCircle, FileX } from "lucide-react";

export default function Docs() {
  const dispatch = useDispatch();
  const { loading, docs, error } = useSelector((state) => state.docs);

  useEffect(() => {
    dispatch(fetchDocs());
  }, [dispatch]);

  return (
    <div className="pt-32 min-h-screen">
      <div className="container px-5 xl:px-20 mx-auto pb-20">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="font-extrabold text-[#042A1B] text-3xl">مستندات ما</h1>
          {/* 🔎 محل آینده برای Search/Filter */}
        </div>

        {/* -------------------- حالت‌ها -------------------- */}

        {/* 1) Loading State */}
        {loading && (
          <div className="mt-10">
            <DocsSkeleton />
          </div>
        )}

        {/* 2) Error State */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-20 text-red-500 bg-red-50 rounded-2xl mt-10 border border-red-200">
            <AlertCircle size={48} className="mb-4" />
            <h3 className="text-xl font-bold">خطا در دریافت اطلاعات</h3>
            <p className="mt-2 text-gray-600">{error}</p>
            <button
              onClick={() => dispatch(fetchDocs())}
              className="mt-6 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              تلاش مجدد
            </button>
          </div>
        )}

        {/* 3) Empty List */}
        {!loading && !error && docs?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500 bg-gray-50 rounded-2xl mt-10 border border-gray-200">
            <FileX size={48} className="mb-4 opacity-50" />
            <p className="text-lg font-medium">هیچ مستندی یافت نشد.</p>
          </div>
        )}

        {/* 4) Success State */}
        {!loading && !error && docs?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
            {docs.map((doc, index) => (
              <DocCard key={doc.Id || index} index={index} doc={doc} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
