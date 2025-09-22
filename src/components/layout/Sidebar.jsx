"use client";
import React, { useState, useEffect } from "react";
import { PanelTopOpen, BookOpen, Circle } from "lucide-react";
import { useParams } from "next/navigation";
import Accordion from "../../components/sidebar/Accordion";
import SidebarSkeleton from "../../components/common/SidebarSkeleton";
import Link from "next/link";
import { CheckIcon } from "../Icons/Icons";
import { SP_fetch } from "../../api/utils/api";

const Sidebar = () => {
  const [openAccordion, setOpenAccordion] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [topPosition, setTopPosition] = useState(72);
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const docId = params.docId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await SP_fetch("Report_Contents", {
          "@CourseId": docId,
          "@GetAll": true,
          // "@UserId": 1, // شناسه کاربر را از context یا auth دریافت کنید
        });
        const { Data } = res;
        const raw = Data.Dataset;
        if (raw && Array.isArray(raw)) {
          setContents(raw);
        } else {
          setContents([]);
        }
      } catch (error) {
        console.error("Error fetching content:", error);
        setContents([]);
      } finally {
        setLoading(false);
      }
    };

    if (docId) fetchData();
  }, [docId]);

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

  // تابع محاسبه وضعیت فصل
  const getChapterStatus = (chapter) => {
    if (!chapter.children || chapter.children.length === 0) return { status: 0, progress: 0 };

    const statuses = chapter.children.map(c => c.SessionStatus ?? 0);
    const completedCount = statuses.filter(s => s === 2).length;
    const total = statuses.length;

    if (completedCount === total) return { status: 2, progress: 100 }; // همه تکمیل شده
    if (completedCount > 0) return { status: 1, progress: Math.round((completedCount / total) * 100) }; // حداقل یکی تکمیل شده
    if (statuses.some(s => s === 1)) return { status: 1, progress: 0 }; // در حال مطالعه اما هیچ‌کدوم تکمیل نشده
    return { status: 0, progress: 0 }; // همه شروع نشده
  };



  // تابع تعیین آیکون برای جلسه
  const getSessionIcon = (status) => {
    const s = status ?? 0;
    switch (s) {
      case 2: // تکمیل شده
        return <CheckIcon className="text-green-500 w-6 h-6" />;
      case 1: // در حال مطالعه
        return <BookOpen className="text-yellow-400 w-6 h-6" />;
      case 0: // شروع نشده
      default:
        return <Circle className="text-[#D0DDD1] w-6 h-6" strokeWidth={2} />;
    }
  };

  // تابع تعیین آیکون برای فصل
  const getChapterIcon = (chapter) => {
    const { status, progress } = getChapterStatus(chapter);

    switch (status) {
      case 2: // همه جلسات تکمیل شده
        return (
          <div className="relative w-12 h-12 flex items-center justify-center">
            <CheckIcon className="text-green-500 w-12 h-12" />
          </div>
        );
      // case 1: // در حال مطالعه
      //   return (
      //     <div className="relative w-12 h-12 flex items-center justify-center">
      //       <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 20 20">
      //         <circle
      //           cx="10"
      //           cy="10"
      //           r="9"
      //           fill="none"
      //           stroke="white"
      //           strokeWidth="2"
      //         />
      //         <circle
      //           cx="10"
      //           cy="10"
      //           r="9"
      //           fill="none"
      //           stroke="#FBBF24"
      //           strokeWidth="2"
      //           strokeDasharray={2 * Math.PI * 9}
      //           strokeDashoffset={2 * Math.PI * 9 * (1 - progress / 100)}
      //         />
      //       </svg>
      //       <span className="absolute text-xs font-medium text-yellow-700">
      //         {progress}%
      //       </span>
      //     </div>
      //   );
      case 1:
      case 0: // شروع نشده
      default:
        return (
          <div className="relative w-12 h-12 flex items-center justify-center">
            <Circle className="!text-[#D0DDD1] w-12 h-12" strokeWidth={1} />
            <span className="absolute text-xs font-medium text-yellow-700">
              {progress}%
            </span>
          </div>
        );
    }
  };

  return (
    <aside
      className={`minw-10 maw-10 fixe12 lg:static z-30 lg:z-0 bg-[#042A1B] lg:bg-transparent shadow-xl lg:shadow-none bottom-0 py-10 lg:py-0 px-5 transition-all duration-200 ${isSidebarOpen ? "right-0" : "-right-96"}`}
      style={{ top: `${topPosition}px` }}
    >
      <h1 className="font-bold text-white lg:text-[#042A1B] text-3xl">سرفصل‌ها</h1>

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
                            {getSessionIcon(child.SessionStatus)}
                          </span>
                          <p className="font-medium text-lg ">{child.Title}</p>
                        </div>
                        <span className="text-white lg:text-[#042A1B] opacity-50 font-light">
                          {child.EstimatedReadTime} دقیقه
                        </span>
                      </Link>
                      {content.children.indexOf(child) !== content.children.length - 1 && (
                        <span className="absolute right-8 top-14 border-r-2 border-dashed h-7 border-gray-300"></span>
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
        className="w-12 h-12 lg:hidden absolute -left-9 top-16 flex justify-center items-center bg-[#042A1B] rounded-l-lg cursor-pointer"
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