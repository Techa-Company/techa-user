"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import ChapterItem from "../../../../components/courses/course/ChapterItem";
import ChapterSkeleton from "../../../../components/courses/course/ChapterSkeleton";
import { fetchContents } from "../../../../features/main/contents/contentsActions";
import { FiMenu, FiX, FiChevronRight } from "react-icons/fi";

export default function Layout({ children }) {
    const { docId, id } = useParams();
    const dispatch = useDispatch();

    const { contents, loading, error } = useSelector((state) => state.contents);

    const [chapters, setChapters] = useState([]);
    const [expandedChapters, setExpandedChapters] = useState({});
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // بررسی سایز صفحه برای تشخیص موبایل
    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 1024);
            if (window.innerWidth >= 1024) {
                setSidebarOpen(false);
            }
        };

        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);

        return () => {
            window.removeEventListener('resize', checkIsMobile);
        };
    }, []);

    // گرفتن دیتا
    useEffect(() => {
        dispatch(fetchContents({
            "@CourseId": docId,
            "@IncludeExercises": true,
            "@GetAll": true,
        }));
    }, [dispatch, docId]);
    console.log(contents)
    // مرتب کردن فصل‌ها و جلسات
    useEffect(() => {
        if (contents && contents.length > 0) {
            const chaptersMap = {};
            const sessionsMap = {};

            contents.forEach((item) => {
                if (!item.ParentId) {
                    // فصل
                    chaptersMap[item.Id] = { ...item, Sessions: [], id: item.Id };
                } else {
                    // جلسه
                    if (!sessionsMap[item.ParentId]) {
                        sessionsMap[item.ParentId] = [];
                    }
                    sessionsMap[item.ParentId].push({ ...item, id: item.Id });
                }
            });

            Object.keys(sessionsMap).forEach((parentId) => {
                if (chaptersMap[parentId]) {
                    chaptersMap[parentId].Sessions = sessionsMap[parentId].sort(
                        (a, b) => a.SortIndex - b.SortIndex
                    );
                }
            });

            const organizedChapters = Object.values(chaptersMap).sort(
                (a, b) => a.SortIndex - b.SortIndex
            );

            setChapters(organizedChapters);

            // پیدا کردن فصل فعال بر اساس sessionId
            if (organizedChapters.length > 0) {
                const newExpandedChapters = { ...expandedChapters };
                let foundActive = false;

                organizedChapters.forEach(chapter => {
                    if (chapter.Sessions.some(s => s.Id === parseInt(id))) {
                        newExpandedChapters[chapter.Id] = true;
                        foundActive = true;
                    }
                });

                if (foundActive) {
                    setExpandedChapters(newExpandedChapters);
                } else if (Object.keys(expandedChapters).length === 0) {
                    // اگر هیچ فصلی باز نیست، اولین فصل را باز کن
                    setExpandedChapters({ [organizedChapters[0].Id]: true });
                }
            }
        }
    }, [contents, id]);

    const toggleChapter = (chapterId) => {
        setExpandedChapters(prev => ({
            ...prev,
            [chapterId]: !prev[chapterId]
        }));
    };

    const toggleSidebar = () => {
        setSidebarOpen(prev => !prev);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    return (
        <div className=" min-h-screen">
            {/* دکمه منو در حالت موبایل */}

            <div className="flex flex-col lg:flex-row gap-10">
                {/* overlay برای بستن منو در موبایل */}
                {isMobile && sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                        onClick={closeSidebar}
                    />
                )}

                {/* سایدبار */}
                <div
                    className={`
                        fixed lg:relative top-0  h-full min-w-96 max-w-96 bg-white shadow-lg z-50 lg:z-auto
                        transform transition-all duration-300 ease-in-out lg:transform-none
                        ${sidebarOpen ? '-right-0 ' : '-right-96 lg:right-auto'} 
                        lg:min-h-screen
                        `}
                >
                    {isMobile && (
                        <button
                            onClick={toggleSidebar}
                            className="absolute top-4 -left-11 z-50 p-3 bg-green-600 text-white rounded-l-lg shadow-lg  flex items-center justify-center"
                            aria-label="باز کردن منو"
                        >
                            {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                        </button>
                    )}
                    <div className="h-full flex flex-col overflow-hidden">
                        <div className="p-5 border-b border-gray-200 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-800">فصل‌های دوره</h2>
                            {/* {isMobile && (
                                <button onClick={closeSidebar} className="p-1 text-gray-500 hover:text-gray-700">
                                    <FiX size={24} />
                                </button>
                            )} */}
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
                                    {chapters.map((chapter) => (
                                        <ChapterItem
                                            key={chapter.Id}
                                            index={chapter.SortIndex}
                                            chapter={chapter}
                                            selectedSessionId={id}
                                            isOpen={expandedChapters[chapter.Id]}
                                            onToggle={() => toggleChapter(chapter.Id)}
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
                <main className="flex-1 min-h-screen">
                    {children}
                </main>
            </div>
        </div>
    );
}