"use client";
import React, { useState, useEffect } from "react";
import { PanelTopOpen, BookOpen, Circle, Check } from "lucide-react";
import { useParams } from "next/navigation";
import Accordion from "../../components/sidebar/Accordion";
import SidebarSkeleton from "../../components/common/SidebarSkeleton";
import Link from "next/link";
import { CheckIcon } from "../Icons/Icons";
import { SP_fetch } from "../../api/utils/api";
import { useDispatch, useSelector } from "react-redux";
import { fetchContents } from "../../features/main/contents/contentsActions";

const Sidebar = () => {
  const [openAccordion, setOpenAccordion] = useState();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [topPosition, setTopPosition] = useState(72);

  const params = useParams();
  const { docId, lessonId } = params;

  const { loading, contents } = useSelector(state => state.contents);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContents({ "Take": 1000, CourseId: docId }));
  }, []);
  // console.log(contents)

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? -1 : index);
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleScroll = () => {
    setTopPosition(window.scrollY > 50 ? 56 : 72);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
  }, [isSidebarOpen]);
  useEffect(() => {
    if (contents && contents.length > 0) {
      // پیدا کردن فصلی که جلسه‌ی جاری داخلشه
      const parentIndex = groupedArray.findIndex(content =>
        content.children.some(child => String(child.Id) === String(lessonId))

      );
      console.log(groupedArray)

      console.log(parentIndex)
      if (parentIndex !== -1) {
        setOpenAccordion(parentIndex);
      }
    }

  }, [contents, docId]);


  // گروه‌بندی داده‌ها بر اساس ParentId
  const groupedContents = new Map();
  (contents || []).forEach(content => {
    if (!content.ParentId) groupedContents.set(content.Id, { ...content, children: [] });
  });
  (contents || []).forEach(content => {
    if (content.ParentId && groupedContents.has(content.ParentId)) {
      groupedContents.get(content.ParentId).children.push(content);
    }
  });
  const groupedArray = Array.from(groupedContents.values());

  // تابع تعیین آیکون برای جلسه
  const getSessionIcon = (status) => {
    const s = status ?? 0;
    switch (s) {
      case 3: // تکمیل شده
        return <Check className="text-green-500 w-6 h-6" />;
      case 2: // در حال مطالعه
        return <BookOpen className="text-yellow-400 w-6 h-6" />;
      case 1: // شروع نشده
      default:
        return <Circle className="text-[#D0DDD1] w-6 h-6" strokeWidth={2} />;
    }
  };

  // تابع تعیین آیکون برای فصل
  const getChapterIcon = (chapter) => {
    // console.log(object)
    const { Status: status, ProgressPercent: progress } = chapter;
    // console.log(chapter, status, progress)
    switch (status) {
      case 3: // همه جلسات تکمیل شده
        return (
          <div className="relative w-12 h-12 flex items-center justify-center">
            <Check className="text-green-500 w-9 h-9" />
          </div>
        );
      case 2: // در حال مطالعه
        return (
          <div className="relative w-12 h-12 flex items-center justify-center">
            <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 20 20">
              <circle
                cx="10"
                cy="10"
                r="9"
                fill="none"
                stroke="#eee"
                strokeWidth="2"
              />
              <circle
                cx="10"
                cy="10"
                r="9"
                fill="none"
                stroke="#7AE36A"
                strokeWidth="2"
                strokeDasharray={2 * Math.PI * 9}
                strokeDashoffset={2 * Math.PI * 9 * (1 - progress / 100)}
              />
            </svg>
            <span className="absolute text-[15px] font-medium text-white lg:text-black">
              {progress}%
            </span>
          </div>
        );
      case 1:
      default:
        return (
          <div className="relative w-12 h-12 flex items-center justify-center">
            <Circle className="!text-[#D0DDD1] w-12 h-12" strokeWidth={1} />
            <span className="absolute text-xs font-medium text-[#7AE36A]">
              {progress}%
            </span>
          </div>
        );
    }
  };

  return (
    <aside
      className={`min-w-[330px] max-w-[330px] lg:min-w-96 lg:max-w-96 px-4 fixed lg:static z-30 lg:z-0 bg-[#042A1B] lg:bg-transparent shadow-xl lg:shadow-none bottom-0 py-10 lg:py-0 transition-all duration-200 ${isSidebarOpen ? "right-0" : "-right-[330px]"}`}
      style={{ top: `${topPosition}px` }}
    >
      <h1 className="font-bold text-white lg:text-[#042A1B] text-3xl">سر فصل های دوره</h1>

      <div className="mt-8 overflow-y-auto no-scrollbar" style={{ maxHeight: "calc(100vh - 72px)" }}>
        {loading ? (
          <SidebarSkeleton />
        ) : (
          groupedArray.map((content, index) => (
            <Accordion
              key={content.Id}
              title={`فصل ${index + 1}`}
              subtitle={content.Title}
              icon={getChapterIcon(content)}
              content={
                <ul className="flex flex-col gap-3">
                  {content.children.map((child) => (
                    <li className="relative" key={child.Id}>
                      <Link
                        className="flex items-center justify-between gap-3 hover:bg-[#D0DDD110] p-2 rounded-lg transition-colors duration-200"
                        href={`/docs/${docId}/${child.Id}`}
                        onClick={() => setIsSidebarOpen(false)}
                      >
                        <div className="flex items-center">
                          <span className="w-12 h-12 flex justify-center items-center">
                            {getSessionIcon(child.Status)}
                          </span>
                          <p className="font-medium text-lg ">{child.Title}</p>
                        </div>
                        <span className="text-white lg:text-[#042A1B]  font-light">
                          {child.EstimatedReadTime} دقیقه
                        </span>
                      </Link>
                      {content.children.indexOf(child) !== content.children.length - 1 && (
                        <span className="absolute right-8 top-14 border-r-2 border-dashed h-7 border-white lg:border-gray-300"></span>
                      )}
                    </li>
                  ))}
                </ul>
              }
              isOpen={openAccordion === index}
              onClick={() => toggleAccordion(index)}
            />
          ))
        )}
      </div>

      <div
        className="w-10 h-10 lg:hidden absolute -left-10 top-4 flex justify-center items-center bg-[#042A1B] rounded-l-lg cursor-pointer"
        onClick={toggleSidebar}
      >
        <PanelTopOpen
          className={`transition-transform duration-200 ${isSidebarOpen ? "-rotate-90" : "rotate-90"} text-[#7AE36A]`}
        />
      </div>
    </aside>
  );
};

export default Sidebar;