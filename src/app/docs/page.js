"use client";
import { useEffect, useState } from "react";
import DocCard from "../../components/docs/DocCard";
import DocsSkeleton from "../../components/common/DocsSkeleton";
import { SP_fetch } from "../../api/utils/api";
import { useDispatch, useSelector } from "react-redux";
import { fetchDocs } from "../../features/main/docs/docsActions";

export default function Docs() {

  const { loading, docs } = useSelector(state => state.docs);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDocs({ "Mode": "CoursesList", "Disabled": false }));
  }, []);

  return (
    <div className="pt-32">
      <div className="container px-5 xl:px-20 mx-auto">
        <h1 className="font-extrabold text-[#042A1B] text-3xl">مستندات ما</h1>
        {loading ? (
          <DocsSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
            {docs.map((doc, index) => (
              <DocCard key={index} index={index} doc={doc} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}