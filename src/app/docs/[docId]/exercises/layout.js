"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import ChapterItem from "../../../../components/courses/course/ChapterItem";
import ChapterSkeleton from "../../../../components/courses/course/ChapterSkeleton";
import { fetchContents } from "../../../../features/main/contents/contentsActions";
import { FiMenu, FiX } from "react-icons/fi";
import { fetchContentsWithExercises } from "../../../../features/main/exercises/exercisesActions";
import Link from "next/link";

export default function Layout({ children }) {
    const { docId, lessonId } = useParams();
    const router = useRouter();
    const dispatch = useDispatch();
    const { contents, loading, error } = useSelector((state) => state.exercises);

    const [chapters, setChapters] = useState([]);
    const [openChapterId, setOpenChapterId] = useState(null);
    const [selectedSessionId, setSelectedSessionId] = useState(lessonId ? parseInt(lessonId) : null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    console.log(contents)
    // بررسی سایز صفحه برای موبایل
    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 1024);
            if (window.innerWidth >= 1024) setSidebarOpen(false);
        };
        checkIsMobile();
        window.addEventListener("resize", checkIsMobile);
        return () => window.removeEventListener("resize", checkIsMobile);
    }, []);

    // دریافت محتوا
    useEffect(() => {
        dispatch(fetchContentsWithExercises({
            "@CourseId": docId,
            // "Take": 1000
        }));
    }, [dispatch, docId]);

    // مرتب‌سازی فصل‌ها و جلسات
    useEffect(() => {
        if (!contents || contents.length === 0) return;

        const chaptersMap = {};
        const sessionsMap = {};

        contents.forEach(item => {
            if (!item.ParentId) {
                chaptersMap[item.Id] = { ...item, Sessions: [], id: item.Id };
            } else {
                if (!sessionsMap[item.ParentId]) sessionsMap[item.ParentId] = [];
                sessionsMap[item.ParentId].push({ ...item, id: item.Id });
            }
        });

        Object.keys(sessionsMap).forEach(parentId => {
            if (chaptersMap[parentId]) {
                chaptersMap[parentId].Sessions = sessionsMap[parentId].sort((a, b) => a.SortIndex - b.SortIndex);
            }
        });

        const organizedChapters = Object.values(chaptersMap).sort((a, b) => a.SortIndex - b.SortIndex);
        setChapters(organizedChapters);

        // پیدا کردن فصل فعال بر اساس sessionId
        if (lessonId) {
            const foundChapter = organizedChapters.find(chapter =>
                chapter.Sessions.some(s => s.Id === parseInt(lessonId))
            );
            if (foundChapter) setOpenChapterId(foundChapter.Id);
        } else if (organizedChapters.length > 0 && !openChapterId) {
            setOpenChapterId(organizedChapters[0].Id);
        }
    }, [contents, lessonId]);

    const handleToggleChapter = (chapterId) => {
        setOpenChapterId(prev => (prev === chapterId ? null : chapterId));
    };

    const handleSelectSession = (sessionId, chapterId) => {
        setSelectedSessionId(sessionId);
        setOpenChapterId(chapterId);
        router.push(`/docs/${docId}/exercises/${sessionId}`);
        if (isMobile) setSidebarOpen(false); // بستن منو در موبایل
    };

    const toggleSidebar = () => setSidebarOpen(prev => !prev);
    const closeSidebar = () => setSidebarOpen(false);

    return (
        <div className="min-h-screen">
            <div className="flex flex-col lg:flex-row gap-10">

                {/* overlay موبایل */}
                {isMobile && sidebarOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={closeSidebar} />
                )}

                {/* سایدبار */}
                <div
                    className={`
    fixed lg:relative top-0 h-full 
    min-w-[350px] max-w-[350px] lg:min-w-[382px] lg:max-w-[382px] 
    bg-white shadow-lg z-50 lg:z-auto
    transform transition-transform duration-300 ease-in-out lg:transform-none
    ${sidebarOpen ? "translate-x-0 right-0" : "translate-x-full right-0 lg:translate-x-0 lg:right-auto"}
    lg:min-h-screen
  `}
                >


                    {isMobile && (
                        <button
                            onClick={toggleSidebar}
                            className="absolute top-24 -left-11 z-50 p-3 bg-green-600 text-white rounded-l-lg shadow-lg flex items-center justify-center"
                            aria-label="باز کردن منو"
                        >
                            {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                        </button>
                    )}
                    <div className="h-full flex flex-col overflow-hidden">

                        <div className="p-5 border-b border-gray-200 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-800">تمرینات دوره</h2>
                            <Link
                                href={`/docs/${docId}`}
                                className="bg-[#10B981] hover:bg-[#059669] text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-colors duration-200"
                            >
                                برگشت به دوره
                            </Link>
                        </div>


                        <div className="flex-1 overflow-y-auto p-5">
                            {loading ? (
                                [...Array(3)].map((_, index) => <ChapterSkeleton key={index} />)
                            ) : error ? (
                                <div className="text-center py-10">
                                    <p className="text-red-500">خطا در دریافت داده‌ها</p>
                                    <button
                                        onClick={() => dispatch(fetchContents({
                                            "@CourseId": docId,
                                            "@GetAll": true,
                                        }))}
                                        className="mt-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                                    >
                                        تلاش مجدد
                                    </button>
                                </div>
                            ) : chapters.length > 0 ? (
                                <div className="space-y-4">
                                    {chapters.map((chapter, index) => (
                                        <ChapterItem
                                            key={chapter.Id}
                                            index={chapter.SortIndex}
                                            chapter={chapter}
                                            selectedSessionId={selectedSessionId}
                                            isOpen={openChapterId === chapter.Id}
                                            onToggle={() => handleToggleChapter(chapter.Id)}
                                            onSelectSession={(sessionId) => handleSelectSession(sessionId, chapter.Id)}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-10 text-gray-500">
                                    هیچ فصلی یافت نشد
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* محتوای اصلی */}
                <main className="flex-1 min-h-screen">{children}</main>
            </div>
        </div>
    );
}
