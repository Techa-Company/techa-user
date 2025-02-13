"use client";
import { BookOpen, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { renderInlineSnippets } from "../../../../components/inline/utils/renderUtils";
import LessonSkeleton from "../../../../components/courses/course/lesson/LessonSkeleton"; // وارد کردن کامپوننت اسکلتون

export default function Lesson() {
  const [openAccordion, setOpenAccordion] = useState(0);
  const [lessonData, setLessonData] = useState(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const courseId = params.courseId;
  const lessonId = params.lessonId;

  console.log(courseId, lessonId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.techa.me/api/Content`);
        const data = await response.json();

        console.log(data);

        if (data.Data && Array.isArray(data.Data)) {
          const filteredData = data.Data.filter(
            (item) =>
              item.CourseId === parseInt(courseId) &&
              item.Id === parseInt(lessonId)
          );
          console.log(filteredData);
          setLessonData(filteredData[0]);
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

    if (courseId && lessonId) {
      fetchData();
    }
  }, [courseId, lessonId]);

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
    <div className="">
      <div className="flex flex-col sm:flex-row gap-5 justify-between items-center">
        <h1 className=" font-bold text-[#042A1B] text-3xl">
          {lessonData.Title}
        </h1>
        <div className="flex gap-4 items-center">
          <Link
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl py-2.5 px-6 transition-all duration-300 shadow-lg hover:shadow-xl"
            href={`/courses/${courseId}/${lessonId}/exercises`}
          >
            <BookOpen className="w-6 h-6" />
            <p className="text-[18px] font-semibold">تمرین ها</p>
          </Link>
        </div>
      </div>
      <div className="text-[17.5px] font-normal leading-7 text-justify mt-7 grid gap-5">
        <div
          className="prose prose-headings:text-3xl prose-headings:my-5 prose-p:text-secondary prose-p:leading-9 prose-p:text-justify prose-code:text-[#e83e8c] 
      prose-code:px-2 prose-code:py-1 prose-code:rounded-sm prose-code:bg-[#ebedf2] max-w-full"
          dangerouslySetInnerHTML={{ __html: lessonData.Description }}
        ></div>
        {/* <div className="bg-[#F3F6F3] rounded-2xl p-2">
          <div className="px-5 flex items-center justify-between py-2">
            <h3 className="text-[16px] font-bold text-[#042A1B]">مثال</h3>
            <button className="text-white font-bold text-sm px-6 py-2 rounded-md bg-[#042A1B]">
              خودت امتحان کن
            </button>
          </div>
          <div className="bg-white rounded-2xl h-60"></div>
        </div> */}
      </div>
      <div className="flex gap-4 items-center mt-10 justify-between">
        <Link
          className="flex items-center gap-1.5 border border-[#D0DDD1] rounded-xl py-2.5 px-5"
          href=""
        >
          <span className="w-4 h-4 flex justify-center items-center border border-[#042A1B] rounded-md">
            <ChevronRight className="" />
          </span>
          <p className="text-[#042A1B] text-[16px] font-medium">قبلی</p>
        </Link>
        <Link
          className="flex items-center gap-1.5 border border-[#D0DDD1] rounded-xl py-2.5 px-5"
          href=""
        >
          <p className="text-[#042A1B] text-[16px] font-medium">بعدی</p>
          <span className="w-4 h-4 flex justify-center items-center border border-[#042A1B] rounded-md">
            <ChevronLeft className="" />
          </span>
        </Link>
      </div>
    </div>
  );
}
