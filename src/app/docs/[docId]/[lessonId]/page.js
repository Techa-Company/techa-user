"use client";

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { renderInlineSnippets } from "../../../../components/inline/utils/renderUtils";
import LessonSkeleton from "../../../../components/docs/doc/lesson/LessonSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { completeContent, fetchContentById, fetchContents } from "../../../../features/main/contents/contentsActions";
import { Bounce, toast, ToastContainer } from "react-toastify";

export default function Lesson() {
  const [prevLesson, setPrevLesson] = useState(null);
  const [nextLesson, setNextLesson] = useState(null);
  const [lessonIndexInfo, setLessonIndexInfo] = useState({
    index: 0,
    total: 0,
  });
  // const [loading, setLoading] = useState(true);

  const contentRef = useRef(null);
  const isRenderingRef = useRef(false);

  const { loading, singleContent: content, contents } = useSelector(state => state.contents)

  const params = useParams();
  const dispatch = useDispatch();

  const docId = params.docId;
  const lessonId = params.lessonId;

  useEffect(() => {
    dispatch(fetchContentById({ Id: lessonId, UserId: 5, }))
    dispatch(fetchContents({ Take: 1000, CourseId: docId }));
  }, [docId, lessonId]);




  useEffect(() => {
    if (!content || contents.length === 0) return;

    const parentId = content.ParentId;

    const chapters = contents
      .filter((i) => i.ParentId === null)
      .sort((a, b) => a.SortIndex - b.SortIndex);

    if (!parentId) {
      setLessonIndexInfo({ index: 1, total: 1 });
      return;
    }

    const lessons = contents
      .filter((i) => i.ParentId === parentId)
      .sort((a, b) => a.SortIndex - b.SortIndex);

    const currentIndex = lessons.findIndex(
      (l) => Number(l.Id) === Number(content.Id)
    );

    setLessonIndexInfo({
      index: currentIndex + 1,
      total: lessons.length,
    });

    setPrevLesson(lessons[currentIndex - 1] || null);
    setNextLesson(lessons[currentIndex + 1] || null);
  }, [content, contents]);


  useEffect(() => {
    if (!content) return;

    // کمی تاخیر برای اینکه DOM آماده بشه
    setTimeout(() => {
      renderInlineSnippets();
      console.log("Editor loaded");
    }, 50);
  }, [content]);



  // ================================
  //  ثبت‌کردن جلسه به عنوان خوانده شده
  // ================================
  const toggleCompletionStatus = async () => {

    try {
      await dispatch(completeContent({
        Id: lessonId,
        UserId: 5,
      })).unwrap();
      toast.success("جلسه با موفقیت علامت‌گذاری شد");

      dispatch(fetchContentById({ Id: lessonId, UserId: 5, }))
      dispatch(fetchContents({ Take: 1000, CourseId: docId }));
    } catch (err) {
      toast.error(err);
    }
  };

  if (!content && !loading) return <div>جلسه یافت نشد</div>;
  if (loading) return <LessonSkeleton />;

  return (
    <div className="relative">

      {/* هدر */}
      <div className="flex flex-col gap-4 pb-5 border-b-2 border-[#2ECC71]">
        <div className="flex justify-between items-start">
          <h1 className="font-black text-3xl">{content.Title}</h1>

          {lessonIndexInfo.total > 0 && (
            <span className="text-2xl font-bold bg-gray-100 px-3 py-1 rounded-lg">
              درس {lessonIndexInfo.index} از {lessonIndexInfo.total}
            </span>
          )}
        </div>

        {/* متادیتا */}
        <div className="flex flex-wrap justify-between items-center gap-4 text-gray-600">
          {content.EstimatedReadTime > 0 && (
            <div className="flex items-center gap-2 bg-teal-50 px-3 py-1.5 rounded-lg">
              <Clock className="text-teal-700" />
              <span className="text-teal-700">زمان مطالعه:</span>
              <span className="font-bold text-teal-800">
                {content.EstimatedReadTime} دقیقه
              </span>
            </div>
          )}

          {content.Status === 3 ? (
            // حالت خوانده شده
            <button
              disabled
              className="flex items-center gap-2 px-3 py-2 rounded-lg border 
               bg-green-100 text-green-700 border-green-300 cursor-not-allowed"
            >
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium">خوانده شده</span>
            </button>
          ) : content.HasExercise === 1 ? (
            <Link
              href={`/docs/${docId}/exercises/${content.Id}`} // لینک به صفحه تمرینات
              className="flex items-center gap-2 px-3 py-2 rounded-lg border 
               bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200"
            >
              <CheckCircle className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium">مشاهده تمرینات</span>
            </Link>
          ) : (
            // حالت خوانده‌ام
            <button
              onClick={toggleCompletionStatus}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border 
               bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
            >
              <CheckCircle className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium">خوانده‌ام</span>
            </button>
          )}

        </div>
      </div>

      {/* محتوای متن */}
      <div
        ref={contentRef}
        className="text-[17.5px] leading-7 text-justify grid gap-5 pb-5 border-b-2 border-[#2ECC71] mt-5"
      >
        <div className="lesson-content">
          <div
            className="prose prose-p:!text-xl prose-p:!leading-10 prose-p:!text-justify"
            dangerouslySetInnerHTML={{ __html: content.Description }}
          />
        </div>
      </div>

      {/* دکمه‌های قبل/بعد */}
      <div className="flex justify-between items-center mt-5">
        <Link
          href={prevLesson ? `/docs/${docId}/${prevLesson.Id}` : "#"}
          className={`flex items-center gap-2 px-4 py-3 bg-[#2ECC71] text-white rounded-lg hover:bg-[#27ae60] ${!prevLesson ? "opacity-40 pointer-events-none" : ""
            }`}
        >
          <ArrowRight className="w-5 h-5" />
          <span className="text-sm font-medium">درس قبلی</span>
        </Link>

        <Link
          href={nextLesson ? `/docs/${docId}/${nextLesson.Id}` : "#"}
          className={`flex items-center gap-2 px-4 py-3 bg-[#2ECC71] text-white rounded-lg hover:bg-[#27ae60] ${!nextLesson ? "opacity-40 pointer-events-none" : ""
            }`}
        >
          <span className="text-sm font-medium">درس بعدی</span>
          <ArrowLeft className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
