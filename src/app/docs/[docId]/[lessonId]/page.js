"use client";
import { BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { renderInlineSnippets } from "../../../../components/inline/utils/renderUtils";
import LessonSkeleton from "../../../../components/docs/doc/lesson/LessonSkeleton";
import VideoCourseAd from "../../../../components/docs/doc/VideoCourseAd";
import VideoCourseAdEnd from "../../../../components/docs/doc/VideoCourseAdEnd";
import { SP_fetch } from "../../../../api/utils/api";
export default function Lesson() {
  const [openAccordion, setOpenAccordion] = useState(0);
  const [lessonData, setLessonData] = useState(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const docId = params.docId;
  const lessonId = params.lessonId;

  console.log(docId, lessonId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        /*  const response = await fetch(`https://api.techa.me/api/Content`);
        const data = await response.json();
*/
        // const res = await SP_fetch("Report_Contents");
        const res = await SP_fetch("Form_Contents", {
          "@Id": lessonId,
        });
        const { Data, IsSuccess, Message, StatusCode } = res;
        const data = Data.Dataset;
        console.log(data)

        if (data) {
          // const filteredData = data.filter(
          //   (item) =>
          //     item.CourseId === parseInt(docId) &&
          //     item.Id === parseInt(lessonId)
          // );
          // console.log(filteredData);
          setLessonData(data[0]);
        } else {
          console.error("Invalid data format:", data);
          setLessonData(null);
        }
      } catch (error) {
        console.error("Error fetching content:", error);
        setLessonData(null);
      } finally {
        setLoading(false);
      }
    };

    if (docId && lessonId) {
      fetchData();
    }
  }, [docId, lessonId]);

  useEffect(() => {
    renderInlineSnippets();
  }, [lessonData]);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? -1 : index);
  };

  if (loading) {
    return <LessonSkeleton />;
  }

  if (!lessonData) {
    return <div>No lesson data available</div>;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-5 justify-between items-center">
        <h1 className=" font-bold text-[#042A1B] text-3xl">
          {lessonData.Title}
        </h1>
        {/* <div className="flex gap-4 items-center">
          <Link
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl py-2.5 px-6 transition-all duration-300 shadow-lg hover:shadow-xl"
            href={`/courses/${docId}/${lessonId}/exercises`}
          >
            <BookOpen className="w-6 h-6" />
            <p className="text-[18px] font-semibold">تمرین ها</p>
          </Link>
        </div> */}
      </div>
      <VideoCourseAd courseId={docId} />
      <div className="text-[17.5px] font-normal leading-7 text-justify mt-7 grid gap-5">
        <div
          className="
                    prose 
                    max-w-full 
                    prose-p:!text-[#2e2e2e] prose-p:!leading-relaxed prose-p:!text-justify prose-p:!font-sans prose-p:!text-base
                    prose-headings:!text-[#111111] prose-headings:!text-3xl prose-headings:!font-extrabold prose-headings:!mb-6 prose-headings:!mt-8
                    prose-code:!text-[#d6336c] prose-code:!bg-[#f8d7da] prose-code:!px-2 prose-code:!py-1 prose-code:!rounded-md prose-code:!font-mono prose-code:!text-sm
                    prose-a:!text-[#2563eb] prose-a:!underline prose-a:!decoration-2 prose-a:!decoration-[#2563eb] prose-a:!transition prose-a:!duration-300 prose-a:!hover:text-[#1e40af]
                    prose-blockquote:!border-l-4 prose-blockquote:!border-[#2563eb] prose-blockquote:!bg-[#e0e7ff] prose-blockquote:!italic prose-blockquote:!px-4 prose-blockquote:!py-2 prose-blockquote:!rounded-md
                    prose-ul:!list-disc prose-ul:!ml-6 prose-li:!mb-2
  "
          dangerouslySetInnerHTML={{ __html: lessonData.Description }}
        ></div>

      </div>
      <div className="flex gap-4 items-center mt-10 justify-between">
        <Link
          className="flex items-center gap-1.5 border border-[#D0DDD1] rounded-xl py-2.5 px-5"
          href=""
        >
          <span className="w-4 h-4 flex justify-center items-center border border-[#042A1B] rounded-md">
            <ChevronRight />
          </span>
          <p className="text-[#042A1B] text-[16px] font-medium">قبلی</p>
        </Link>
        <Link
          className="flex items-center gap-1.5 border border-[#D0DDD1] rounded-xl py-2.5 px-5"
          href=""
        >
          <p className="text-[#042A1B] text-[16px] font-medium">بعدی</p>
          <span className="w-4 h-4 flex justify-center items-center border border-[#042A1B] rounded-md">
            <ChevronLeft />
          </span>
        </Link>
      </div>
      <VideoCourseAdEnd courseId={docId} />
    </div>
  );
}
