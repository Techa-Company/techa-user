"use client";
import { useEffect, useState } from "react";
import DocCard from "../../components/docs/DocCard";
import DocsSkeleton from "../../components/common/DocsSkeleton";
import { SP_fetch } from "../../api/utils/api";

export default function Docs() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { Data, IsSuccess, Message, StatusCode } = await SP_fetch(
          "Report_Courses", {
          "@Disabled": false,
        });
        const docs = Data.Dataset;
        if (IsSuccess) setDocs(docs);
      } catch (error) {
        console.error("Error fetching docs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="pt-32">
      <div className="container px-5 xl:px-20 mx-auto">
        <h1 className="font-extrabold text-[#042A1B] text-3xl">مستندات ما</h1>
        {loading ? (
          <DocsSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10 lg:px-10">
            {docs.map((doc, index) => (
              <DocCard key={index} doc={doc} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}