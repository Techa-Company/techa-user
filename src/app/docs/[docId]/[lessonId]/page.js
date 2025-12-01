"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
  const [lessonIndexInfo, setLessonIndexInfo] = useState({ index: 0, total: 0 }); // ⭐ اضافه شد
  const [loading, setLoading] = useState(true);

  const contentRef = useRef(null);
  const isRenderingRef = useRef(false);
  const observerRef = useRef(null);

  const params = useParams();
  const docId = params.docId;
  const lessonId = params.lessonId;

  // ================================
  //  دریافت همه محتواها + جلسه فعلی
  // ================================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resAll = await SP_fetch("Report_Contents", {
          CourseId: docId,
          Take: 1000,
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

    if (docId && lessonId) fetchData();
  }, [docId, lessonId]);

  // ================================
  //  محاسبه جلسه قبل/بعد + شماره درس
  // ================================
  useEffect(() => {
    if (!lessonData || allContents.length === 0) return;

    const parentId = lessonData.ParentId;

    // فصل‌ها
    const chapters = allContents
      .filter((item) => item.ParentId === null)
      .sort((a, b) => a.SortIndex - b.SortIndex);

    // ---------------------------
    // اگر خود فصل هست
    // ---------------------------
    if (!parentId) {
      setLessonIndexInfo({ index: 1, total: 1 }); // فصل درس نیست
      return;
    }

    // ---------------------------
    // جلسات این فصل
    // ---------------------------
    const lessonsOfChapter = allContents
      .filter((item) => item.ParentId === parentId)
      .sort((a, b) => a.SortIndex - b.SortIndex);

    const currentIndex = lessonsOfChapter.findIndex(
      (l) => Number(l.Id) === Number(lessonData.Id)
    );

    // ⭐ ذخیره شماره درس
    setLessonIndexInfo({
      index: currentIndex + 1,
      total: lessonsOfChapter.length,
    });

    // ---------------------------
    // جلسه قبلی/بعدی
    // ---------------------------
    let prev = lessonsOfChapter[currentIndex - 1];
    let next = lessonsOfChapter[currentIndex + 1];

    const chapterIndex = chapters.findIndex((ch) => ch.Id === parentId);

    if (!prev && chapterIndex > 0) {
      const prevChapter = chapters[chapterIndex - 1];
      prev = allContents
        .filter((item) => item.ParentId === prevChapter.Id)
        .sort((a, b) => a.SortIndex - b.SortIndex)
        .at(-1);
    }

    if (!next && chapterIndex < chapters.length - 1) {
      const nextChapter = chapters[chapterIndex + 1];
      next = allContents
        .filter((item) => item.ParentId === nextChapter.Id)
        .sort((a, b) => a.SortIndex - b.SortIndex)
        .at(0);
    }

    setPrevLesson(prev || null);
    setNextLesson(next || null);
  }, [lessonData, allContents]);

  // ================================
  //  رندر Snippet‌ها
  // ================================
  useEffect(() => {
    renderInlineSnippets();
  }, [lessonData]);

  useEffect(() => {
    if (!lessonData || !contentRef.current) return;
    if (isRenderingRef.current) return;

    isRenderingRef.current = true;

    const renderSnippetsWithRetry = (attempt = 0) => {
      if (attempt > 5) {
        isRenderingRef.current = false;
        return;
      }

      setTimeout(() => {
        const hasPreElements = contentRef.current.querySelectorAll(
          "pre.language-jsx, pre.language-sql, pre.language-markup, pre.language-javascript"
        ).length > 0;

        if (hasPreElements) {
          renderInlineSnippets();
          isRenderingRef.current = false;
        } else {
          renderSnippetsWithRetry(attempt + 1);
        }
      }, 300 * (attempt + 1));
    };

    renderSnippetsWithRetry();
    return () => (isRenderingRef.current = false);
  }, [lessonData]);

  if (loading) return <LessonSkeleton />;
  if (!lessonData) return <div>جلسه یافت نشد</div>;

  return (
    <div>
      {/* ========================================================= */}
      {/*          عنوان + درس X از Y                               */}
      {/* ========================================================= */}
      <div className="flex gap-5 justify-between sm:items-center border-b-2 pb-5 border-[#2ECC71]">
        <h1 className="font-black text-[#042A1B] text-xl sm:text-3xl">{lessonData.Title}</h1>

        {lessonIndexInfo.total > 0 && (
          <span className="text-black text-xl sm:text-3xl font-black">
            درس {lessonIndexInfo.index} از {lessonIndexInfo.total}
          </span>
        )}
      </div>

      {/* محتوای جلسه */}
      <div
        ref={contentRef}
        className="text-[17.5px] font-normal leading-7 text-justify grid gap-5 pb-5 border-b-2 border-[#2ECC71]"
      >
        <div className="lesson-content">
          <div className="prose prose-p:!text-xl prose-p:!font-normal prose-p:!leading-9 prose-p:!text-justify  prose-strong:!font-semibold" dangerouslySetInnerHTML={{ __html: lessonData.Description }} />
        </div>
      </div>

      {/* دکمه قبلی/بعدی */}
      <div className="flex gap-4 items-center mt-5 justify-between">
        <Link
          href={prevLesson ? `/docs/${docId}/${prevLesson.Id}` : "#"}
          className={`w-11 h-11 flex items-center justify-center cursor-pointer bg-[#2ECC71] text-white rounded-[4px] transition-all duration-300 ${!prevLesson ? "opacity-40 pointer-events-none" : ""
            }`}
        >
          <ArrowRight className="w-[18px] h-[18px]" />
        </Link>

        <Link
          href={nextLesson ? `/docs/${docId}/${nextLesson.Id}` : "#"}
          className={`w-11 h-11 flex items-center justify-center cursor-pointer bg-[#2ECC71] text-white rounded-[4px] transition-all duration-300 ${!nextLesson ? "opacity-40 pointer-events-none" : ""
            }`}
        >
          <ArrowLeft className="w-[18px] h-[18px]" />
        </Link>
      </div>
    </div>
  );
}
