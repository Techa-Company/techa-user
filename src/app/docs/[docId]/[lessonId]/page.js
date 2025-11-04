"use client";
import { BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { renderInlineSnippets } from "../../../../components/inline/utils/renderUtils";
import LessonSkeleton from "../../../../components/docs/doc/lesson/LessonSkeleton";
import { SP_fetch } from "../../../../api/utils/api";

export default function Lesson() {
  const [lessonData, setLessonData] = useState(null);
  const [allContents, setAllContents] = useState([]);
  const [prevLesson, setPrevLesson] = useState(null);
  const [nextLesson, setNextLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const contentRef = useRef(null);
  const isRenderingRef = useRef(false);
  const observerRef = useRef(null);

  const params = useParams();
  const docId = params.docId;
  const lessonId = params.lessonId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resAll = await SP_fetch("Report_Contents", {
          "@GetAll": true,
          "@CourseId": docId
        });
        const all = resAll?.Data?.Dataset || [];

        const resLesson = await SP_fetch("Form_Contents", { "@Id": lessonId });
        const lesson = resLesson?.Data?.Dataset?.[0] || null;

        setAllContents(all);
        setLessonData(lesson);
      } catch (error) {
        console.error("Error fetching lesson:", error);
        setLessonData(null);
      } finally {
        setLoading(false);
      }
    };

    if (docId && lessonId) {
      fetchData();
    }
  }, [docId, lessonId]);

  // سایر useEffect ها مانند قبل...
  useEffect(() => {
    if (!lessonData || allContents.length === 0) return;

    const parentId = lessonData.ParentId;
    const currentSort = lessonData.SortIndex;

    // همه‌ی فصل‌ها (ParentId = null)
    const chapters = allContents
      .filter((item) => item.ParentId === null)
      .sort((a, b) => a.SortIndex - b.SortIndex);

    // اگر خود فصل هست
    if (!parentId) {
      const currentIndex = lessonsOfChapter.findIndex(
        (l) => Number(l.Id) === Number(lessonData.Id)
      );

      const prevChapter = chapters[currentIndex - 1];
      const nextChapter = chapters[currentIndex + 1];

      setPrevLesson(prevChapter || null);
      setNextLesson(nextChapter || null);

      return;
    }

    // لیست جلسات همین فصل
    const lessonsOfChapter = allContents
      .filter((item) => item.ParentId === parentId)
      .sort((a, b) => a.SortIndex - b.SortIndex);

    const currentIndex = lessonsOfChapter.findIndex(
      (l) => l.Id === lessonData.Id
    );
    console.log(lessonsOfChapter)
    let prev = lessonsOfChapter[currentIndex - 1];
    let next = lessonsOfChapter[currentIndex + 1];

    // اگر جلسه اول یا آخر فصل باشه، برو سراغ فصل قبلی یا بعدی
    const chapterIndex = chapters.findIndex((ch) => ch.Id === parentId);

    if (!prev && chapterIndex > 0) {
      const prevChapter = chapters[chapterIndex - 1];
      const lastLessonPrev = allContents
        .filter((item) => item.ParentId === prevChapter.Id)
        .sort((a, b) => a.SortIndex - b.SortIndex)
        .at(-1);
      prev = lastLessonPrev;
    }

    if (!next && chapterIndex < chapters.length - 1) {
      const nextChapter = chapters[chapterIndex + 1];
      const firstLessonNext = allContents
        .filter((item) => item.ParentId === nextChapter.Id)
        .sort((a, b) => a.SortIndex - b.SortIndex)
        .at(0);
      next = firstLessonNext;
    }

    setPrevLesson(prev || null);
    setNextLesson(next || null);
  }, [lessonData, allContents]);
  useEffect(() => {
    renderInlineSnippets();
  }, [lessonData]);

  // استفاده از یک useEffect مجزا برای رندر snippet ها
  useEffect(() => {
    if (!lessonData || !contentRef.current) return;

    // اگر در حال حاضر در حال رندر هستیم، خارج شو
    if (isRenderingRef.current) return;

    isRenderingRef.current = true;

    const renderSnippetsWithRetry = (attempt = 0) => {
      if (attempt > 5) { // حداکثر 5 بار تلاش
        isRenderingRef.current = false;
        return;
      }

      // کمی تاخیر برای اطمینان از رندر کامل DOM
      setTimeout(() => {
        const hasPreElements = contentRef.current.querySelectorAll(
          "pre.language-jsx, pre.language-sql, pre.language-markup, pre.language-javascript"
        ).length > 0;

        if (hasPreElements) {
          console.log(`رندر snippet ها - تلاش ${attempt + 1}`);
          renderInlineSnippets();
          isRenderingRef.current = false;
        } else if (attempt < 5) {
          // اگر المان‌ها هنوز پیدا نشدند، دوباره تلاش کن
          renderSnippetsWithRetry(attempt + 1);
        } else {
          isRenderingRef.current = false;
        }
      }, 300 * (attempt + 1)); // تاخیر افزایشی
    };

    renderSnippetsWithRetry();

    // پاک کردن flag وقتی کامپوننت unmount می‌شود
    return () => {
      isRenderingRef.current = false;
    };
  }, [lessonData]);

  // پاک کردن observer وقتی کامپوننت unmount می‌شود
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);


  // سایر کدها مانند قبل...
  if (loading) return <LessonSkeleton />;
  if (!lessonData) return <div>هیچ داده‌ای برای این جلسه یافت نشد.</div>;

  return (
    <div>
      {/* عنوان جلسه */}
      <div className="flex flex-col sm:flex-row gap-5 justify-between items-center">
        <h1 className="font-bold text-[#042A1B] text-3xl">{lessonData.Title}</h1>
      </div>

      {/* محتوای جلسه با ref */}
      <div
        ref={contentRef}
        className="text-[17.5px] font-normal leading-7 text-justify mt-7 grid gap-5"
      >
        <div
          className=" prose max-w-full prose-p:!text-[#2e2e2e] prose-p:!leading-relaxed prose-p:!text-justify prose-p:!text-lg prose-headings:!text-[#111111] prose-headings:!font-semibold prose-headings:!mt-8 prose-headings:!mb-4 prose-h1:!text-4xl prose-h2:!text-3xl prose-h3:!text-2xl prose-h4:!text-xl prose-h5:!text-lg prose-h6:!text-base prose-a:!text-[#2563eb] prose-a:!underline prose-a:!decoration-2 prose-a:!decoration-[#2563eb] prose-a:!transition prose-a:!duration-300 prose-a:!hover:text-[#1e40af] prose-code:!bg-gray-100 prose-code:!px-2 prose-code:!py-1 prose-code:!rounded-md prose-code:!font-mono prose-code:!text-sm prose-pre:!bg-gray-100 prose-pre:!p-4 prose-pre:!rounded-md prose-pre:!overflow-x-auto prose-pre:!text-sm prose-pre:!font-mono prose-blockquote:!border-l-4 prose-blockquote:!border-[#2563eb] prose-blockquote:!bg-[#e0e7ff] prose-blockquote:!italic prose-blockquote:!px-4 prose-blockquote:!py-2 prose-blockquote:!rounded-md prose-ul:!list-disc prose-ul:!ml-6 prose-li:!text-[#2e2e2e] prose-li:!mb-2 prose-ol:!list-decimal prose-ol:!ml-6 prose-table:!w-full prose-table:!border prose-table:!border-gray-300 prose-table:!rounded-md prose-th:!bg-gray-100 prose-th:!px-3 prose-th:!py-2 prose-th:!text-right prose-th:!font-semibold prose-td:!px-3 prose-td:!py-2 prose-td:!border prose-td:!border-gray-300 prose-td:!text-[#2e2e2e] prose-img:!rounded-md prose-img:!shadow-md prose-img:!my-4 prose-hr:!border-t-2 prose-hr:!border-gray-300 prose-hr:!my-6 prose-strong:!font-semibold prose-em:!italic prose-del:!line-through "
          dangerouslySetInnerHTML={{ __html: lessonData.Description }}
        />
      </div>

      {/* دکمه‌های قبلی / بعدی */}
      <div className="flex gap-4 items-center mt-10 justify-between">
        <Link
          href={prevLesson ? `/docs/${docId}/${prevLesson.Id}` : "#"}
          className={`flex items-center gap-1.5 border border-[#D0DDD1] rounded-xl py-2.5 px-5 transition-all duration-300 ${!prevLesson
            ? "opacity-40 pointer-events-none"
            : "hover:bg-[#E6F2E7]"
            }`}
        >
          <span className="w-4 h-4 flex justify-center items-center border border-[#042A1B] rounded-md">
            <ChevronRight />
          </span>
          <p className="text-[#042A1B] text-[16px] font-medium">قبلی</p>
        </Link>

        <Link
          href={nextLesson ? `/docs/${docId}/${nextLesson.Id}` : "#"}
          className={`flex items-center gap-1.5 border border-[#D0DDD1] rounded-xl py-2.5 px-5 transition-all duration-300 ${!nextLesson
            ? "opacity-40 pointer-events-none"
            : "hover:bg-[#E6F2E7]"
            }`}
        >
          <p className="text-[#042A1B] text-[16px] font-medium">بعدی</p>
          <span className="w-4 h-4 flex justify-center items-center border border-[#042A1B] rounded-md">
            <ChevronLeft />
          </span>
        </Link>
      </div>
    </div>
  );
}