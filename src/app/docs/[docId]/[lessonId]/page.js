"use client";

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Clock,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef, useMemo } from "react";
import { useParams } from "next/navigation";
import { renderInlineSnippets } from "../../../../components/inline/utils/renderUtils";
import LessonSkeleton from "../../../../components/docs/doc/lesson/LessonSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { completeContent, fetchContentById, fetchContents } from "../../../../features/main/contents/contentsActions";
import { toast } from "react-toastify";

export default function Lesson() {
  const [prevLesson, setPrevLesson] = useState(null);
  const [nextLesson, setNextLesson] = useState(null);
  const [lessonIndexInfo, setLessonIndexInfo] = useState({
    index: 0,
    total: 0,
  });

  const contentRef = useRef(null);
  const { loading, singleContent: content, contents } = useSelector(state => state.contents);

  const params = useParams();
  const dispatch = useDispatch();

  const docId = params.docId;
  const lessonId = params.lessonId;

  // 1. فچ کردن دیتا
  useEffect(() => {
    dispatch(fetchContentById({ Id: lessonId, UserId: 9 }));
    dispatch(fetchContents({ Take: 1000, CourseId: docId }));
  }, [docId, lessonId, dispatch]);

  // 2. منطق محاسبه درس قبلی و بعدی
  useEffect(() => {
    if (!content || contents.length === 0) return;

    const chapters = contents
      .filter((i) => i.ParentId === null)
      .sort((a, b) => a.SortIndex - b.SortIndex);

    let allLessonsSorted = [];

    chapters.forEach(chapter => {
      const chapterLessons = contents
        .filter(c => c.ParentId === chapter.Id)
        .sort((a, b) => a.SortIndex - b.SortIndex);

      allLessonsSorted = [...allLessonsSorted, ...chapterLessons];
    });

    const currentIndex = allLessonsSorted.findIndex(
      (l) => Number(l.Id) === Number(content.Id)
    );

    if (currentIndex !== -1) {
      setLessonIndexInfo({
        index: currentIndex + 1,
        total: allLessonsSorted.length,
      });

      setPrevLesson(allLessonsSorted[currentIndex - 1] || null);
      setNextLesson(allLessonsSorted[currentIndex + 1] || null);
    }

  }, [content, contents]);

  // 3. رندر اسنیپت‌های کد
  useEffect(() => {
    if (!content) return;
    const timer = setTimeout(() => {
      renderInlineSnippets();
    }, 50);
    return () => clearTimeout(timer);
  }, [content]);

  // 4. تغییر وضعیت خواندن
  const toggleCompletionStatus = async () => {
    try {
      await dispatch(completeContent({
        Id: lessonId,
        UserId: 9,
      })).unwrap();
      toast.success("جلسه با موفقیت علامت‌گذاری شد");

      dispatch(fetchContentById({ Id: lessonId, UserId: 9 }));
      dispatch(fetchContents({ Take: 1000, CourseId: docId }));
    } catch (err) {
      toast.error(err.message || "خطایی رخ داد");
    }
  };

  if (!content && !loading) return <div className="text-center py-10">جلسه یافت نشد</div>;
  if (loading) return <LessonSkeleton />;

  return (
    <div className="relative w-full max-w-full">

      {/* هدر */}
      <div className="pb-6 border-b border-gray-200 space-y-5">

        {/* ================= TITLE + INDEX ================= */}
        <div className="flex items-center justify-between gap-3">

          <h1 className="font-black text-2xl md:text-3xl leading-snug">
            {content.Title}
          </h1>

          {lessonIndexInfo.total > 0 && (
            <span className="px-3 py-1.5 rounded-lg w-fit bg-gray-100 text-gray-700 text-sm font-semibold whitespace-nowrap">
              درس {lessonIndexInfo.index} از {lessonIndexInfo.total}
            </span>
          )}
        </div>


        {/* ================= TOOLBAR ================= */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          {/* ---------- RIGHT : Navigation + Meta ---------- */}
          <div className="flex flex-wrap items-center gap-3">

            {/* بازگشت به دوره */}
            <Link
              href={`/docs/${docId}`}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border
        bg-white text-gray-700 border-gray-300 hover:bg-gray-50 transition text-sm"
            >
              <ArrowRight className="w-4 h-4" />
              بازگشت به دوره
            </Link>

            {/* زمان مطالعه */}
            {content.EstimatedReadTime > 0 && (
              <div className="flex items-center gap-2 bg-teal-50 px-3 py-2 rounded-lg text-sm">
                <Clock className="w-4 h-4 text-teal-700" />
                <span className="text-teal-700">مدت:</span>
                <span className="font-bold text-teal-800">
                  {content.EstimatedReadTime} دقیقه
                </span>
              </div>
            )}

          </div>


          {/* ---------- LEFT : Actions ---------- */}
          <div className="flex flex-wrap items-center gap-3">

            {/* پرسش سوال */}
            <Link
              href={`/docs/${docId}/${lessonId}/questions`}
              className="flex items-center gap-2 px-4 py-2 rounded-lg
        bg-amber-500 text-white hover:bg-amber-600 transition text-sm font-medium shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              پرسش سوال
            </Link>

            {/* وضعیت درس */}
            {content.Status === 3 ? (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg border
        bg-green-50 text-green-700 border-green-200 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500" />
                خوانده شده
              </div>

            ) : content.HasExercise === 1 ? (
              <Link
                href={`/docs/${docId}/exercises/${content.Id}`}
                className="flex items-center gap-2 px-4 py-2 rounded-lg
          bg-blue-500 text-white hover:bg-blue-600 transition text-sm font-medium shadow-sm"
              >
                <CheckCircle className="w-4 h-4" />
                تمرینات
              </Link>

            ) : (
              <button
                onClick={toggleCompletionStatus}
                className="flex items-center gap-2 px-4 py-2 rounded-lg
          bg-gray-900 text-white hover:bg-black transition text-sm font-medium shadow-sm"
              >
                <CheckCircle className="w-4 h-4" />
                علامت‌گذاری به عنوان خوانده شده
              </button>
            )}

          </div>

        </div>

      </div>


      {/* محتوای متن */}
      <div
        ref={contentRef}
        className="w-full pb-5 border-b-2 border-[#2ECC71] mt-8"
      >
        <div className="lesson-content w-full max-w-none">
          <div
            className="
                prose 
                prose-lg 
                max-w-none 
                prose-p:text-[17px] md:prose-p:text-[19px] 
                prose-p:leading-8 md:prose-p:leading-9 
                prose-p:text-justify 
                prose-h1:text-2xl md:prose-h1:text-3xl
                prose-img:rounded-xl prose-img:mx-auto prose-img:shadow-lg
                prose-pre:bg-[#282c34] prose-pre:text-white prose-pre:dir-ltr prose-pre:text-left
                prose-code:text-emerald-600 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:font-mono
                
                [&_*]:break-words [&_*]:whitespace-normal
                [&_pre]:!whitespace-pre [&_pre]:!overflow-x-auto [&_pre]:!max-w-full
                [&_table]:!block [&_table]:!overflow-x-auto [&_table]:!whitespace-nowrap md:[&_table]:!whitespace-normal
            "
            dangerouslySetInnerHTML={{ __html: content.Description }}
          />
        </div>
      </div>

      {/* دکمه‌های قبل/بعد */}
      <div className="flex justify-between items-center mt-8 pb-10">
        <Link
          href={prevLesson ? `/docs/${docId}/${prevLesson.Id}` : "#"}
          className={`flex items-center gap-2 px-4 py-3 bg-[#2ECC71] text-white rounded-lg hover:bg-[#27ae60] transition-colors shadow-md ${!prevLesson ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
            }`}
          aria-disabled={!prevLesson}
        >
          <ArrowRight className="w-5 h-5" />
          <span className="text-sm font-medium">درس قبلی</span>
        </Link>

        <Link
          href={nextLesson ? `/docs/${docId}/${nextLesson.Id}` : "#"}
          className={`flex items-center gap-2 px-4 py-3 bg-[#2ECC71] text-white rounded-lg hover:bg-[#27ae60] transition-colors shadow-md ${!nextLesson ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
            }`}
          aria-disabled={!nextLesson}
        >
          <span className="text-sm font-medium">درس بعدی</span>
          <ArrowLeft className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}