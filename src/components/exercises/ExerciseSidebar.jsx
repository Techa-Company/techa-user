"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
    PanelRightOpen,
    PanelLeftClose,
    BookOpen,
    Circle,
    Check,
    ChevronRight,
    LayoutDashboard,
} from "lucide-react";
import { fetchContentsWithExercises } from "../../features/main/exercises/exercisesActions";
import SidebarSkeleton from "../common/SidebarSkeleton";

// Context برای اشتراک‌گذاری وضعیت باز بودن دسکتاپ با Layout
export const SidebarContext = React.createContext({
    isDesktopOpen: true,
    toggleDesktop: () => { },
});

const ExercisesSidebar = () => {
    const { docId, lessonId } = useParams();
    const router = useRouter();
    const dispatch = useDispatch();

    const { contents, loading, error } = useSelector((state) => state.exercises);
    console.log(contents);

    // وضعیت داخلی سایدبار
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isDesktopOpen, setIsDesktopOpen] = useState(true);
    const [openChapterId, setOpenChapterId] = useState(null);
    const [selectedSessionId, setSelectedSessionId] = useState(
        lessonId ? parseInt(lessonId) : null
    );

    // تشخیص موبایل (برای نمایش دکمه شناور)
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // قفل اسکرول در موبایل وقتی سایدبار باز است
    useEffect(() => {
        if (isMobileOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMobileOpen]);

    // دریافت داده‌ها
    useEffect(() => {
        dispatch(
            fetchContentsWithExercises({
                CourseId: docId,
                UserId: 9
            })
        );
    }, [dispatch, docId]);

    // گروه‌بندی و مرتب‌سازی فصل‌ها و جلسات
    const groupedChapters = useMemo(() => {
        if (!contents || contents.length === 0) return [];

        const chaptersMap = new Map();
        const sessionsMap = new Map();

        contents.forEach((item) => {
            if (!item.ParentId) {
                // این یک فصل است (ParentId = null)
                chaptersMap.set(item.Id, { ...item, Sessions: [] });
            } else {
                // این یک جلسه است
                if (!sessionsMap.has(item.ParentId)) {
                    sessionsMap.set(item.ParentId, []);
                }
                sessionsMap.get(item.ParentId).push(item);
            }
        });

        sessionsMap.forEach((sessions, parentId) => {
            const chapter = chaptersMap.get(parentId);
            if (chapter) {
                chapter.Sessions = sessions.sort((a, b) => a.SortIndex - b.SortIndex);
            }
        });

        return Array.from(chaptersMap.values()).sort(
            (a, b) => a.SortIndex - b.SortIndex
        );
    }, [contents]);

    // باز کردن فصل متناسب با lessonId
    useEffect(() => {
        if (groupedChapters.length > 0 && lessonId) {
            const foundChapter = groupedChapters.find((chapter) =>
                chapter.Sessions.some((s) => s.Id === parseInt(lessonId))
            );
            if (foundChapter) setOpenChapterId(foundChapter.Id);
        } else if (groupedChapters.length > 0 && !openChapterId) {
            setOpenChapterId(groupedChapters[0].Id);
        }
    }, [groupedChapters, lessonId]);

    const handleToggleChapter = (chapterId) => {
        setOpenChapterId((prev) => (prev === chapterId ? null : chapterId));
    };

    const handleSelectSession = (sessionId, chapterId) => {
        setSelectedSessionId(sessionId);
        setOpenChapterId(chapterId);
        router.push(`/docs/${docId}/exercises/${sessionId}`);
        if (isMobileOpen) setIsMobileOpen(false);
    };

    const toggleDesktop = () => setIsDesktopOpen((prev) => !prev);

    // آیکون وضعیت جلسه (بر اساس ExerciseStatus)
    const getSessionIcon = (status) => {
        switch (status) {
            case 3:
                return <Check className="text-emerald-500 w-5 h-5" />;
            case 2:
                return <BookOpen className="text-yellow-400 w-5 h-5" />;
            default:
                return <Circle className="text-slate-400 lg:text-slate-300 w-5 h-5" />;
        }
    };

    // آیکون فصل (دایره پیشرفت یا تیک کامل)
    const getChapterIcon = (chapter) => {
        const { ExerciseStatus: status, ChapterCompletionPercent: progress } = chapter;
        if (status === 3) {
            return (
                <div className="w-10 h-10 flex items-center justify-center bg-white/10 lg:bg-emerald-100 rounded-full">
                    <Check className="text-emerald-400 lg:text-emerald-600 w-6 h-6" strokeWidth={3} />
                </div>
            );
        }
        return (
            <div className="relative w-10 h-10 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                        className="text-white/10 lg:text-gray-200"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                    />
                    <path
                        className="text-emerald-500"
                        strokeDasharray={`${progress || 0}, 100`}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                    />
                </svg>
                <span className="absolute text-[10px] font-bold text-white lg:text-gray-700">
                    {progress}%
                </span>
            </div>
        );
    };

    // رندر دکمه شناور موبایل (با portal)
    const mobileButton = isMobile && !isMobileOpen &&
        createPortal(
            <button
                onClick={() => setIsMobileOpen(true)}
                className="fixed bottom-6 right-6 z-[60] flex items-center gap-2 bg-[#042A1B] text-white px-5 py-3 rounded-full shadow-xl shadow-emerald-900/30 hover:scale-105 transition-all active:scale-95 animate-in fade-in slide-in-from-bottom-4 duration-300 border border-white/10"
            >
                <PanelRightOpen size={20} />
                <span className="font-bold text-sm">فهرست تمرینات</span>
            </button>,
            document.body
        );

    // رندر بک‌دراپ موبایل (با portal)
    const mobileBackdrop = isMobile && isMobileOpen &&
        createPortal(
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[59] transition-opacity duration-300"
                onClick={() => setIsMobileOpen(false)}
            />,
            document.body
        );

    return (
        <>
            {mobileButton}
            {mobileBackdrop}

            {/* سایدبار */}
            <aside
                className={`
          transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
          
          /* موبایل (تیره) */
          bg-[#042A1B] border-l-0 text-white
          fixed inset-y-0 right-0 z-[60] shadow-2xl
          w-[350px] sm:w-[350px]
          ${isMobileOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}

          /* دسکتاپ (روشن) */
          lg:bg-transparent lg:text-gray-900 lg:border-l lg:border-gray-200 lg:shadow-none
          lg:static lg:sticky lg:top-24 lg:h-[calc(100vh-100px)]
          ${isDesktopOpen ? "lg:w-[350px] xl:w-[400px]" : "lg:w-0 lg:overflow-visible"}
        `}
            >
                {/* دکمه تا شدن دسکتاپ */}
                <button
                    onClick={toggleDesktop}
                    className={`
            hidden lg:flex items-center justify-center
            absolute top-0 -left-8 z-50
            w-8 h-8 rounded-lg
            bg-white border border-gray-200 shadow-sm text-gray-500
            hover:text-emerald-600 hover:border-emerald-300 hover:shadow-md
            transition-all duration-300
          `}
                    title={isDesktopOpen ? "بستن منو" : "باز کردن منو"}
                >
                    {isDesktopOpen ? <ChevronRight size={18} /> : <LayoutDashboard size={18} />}
                </button>

                {/* محتوای داخلی */}
                <div className={`
          h-full flex flex-col
          ${!isDesktopOpen && "lg:hidden"}
        `}>
                    {/* هدر */}
                    <div className="flex items-center justify-between p-5 lg:p-4 mb-2 lg:bg-white/60 lg:backdrop-blur-md lg:rounded-2xl lg:border border-gray-100 border-b border-white/10 lg:border-b-0">
                        <div className="flex items-center gap-2 text-white lg:text-[#042A1B]">
                            <LayoutDashboard className="w-5 h-5" />
                            <h1 className="font-bold text-lg">تمرینات دوره</h1>
                        </div>

                        <div className="flex items-center gap-2">
                            <Link
                                href={`/docs/${docId}`}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm px-3 py-1.5 rounded-lg transition-colors duration-200 lg:bg-emerald-500 lg:hover:bg-emerald-600"
                            >
                                برگشت به دوره
                            </Link>

                            {/* دکمه بستن در موبایل */}
                            {isMobile && (
                                <button
                                    onClick={() => setIsMobileOpen(false)}
                                    className="lg:hidden p-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors"
                                >
                                    <PanelLeftClose size={20} />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* لیست فصل‌ها */}
                    <div className="flex-1 overflow-y-auto px-4 lg:px-2 pb-20 lg:pb-0 custom-scrollbar">
                        {loading ? (
                            <SidebarSkeleton />
                        ) : error ? (
                            <div className="text-center py-10">
                                <p className="text-red-400">خطا در دریافت داده‌ها</p>
                                <button
                                    onClick={() =>
                                        dispatch(
                                            fetchContentsWithExercises({
                                                CourseId: docId,
                                                UserId: 9
                                            })
                                        )
                                    }
                                    className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                                >
                                    تلاش مجدد
                                </button>
                            </div>
                        ) : groupedChapters.length > 0 ? (
                            <div className="flex flex-col gap-3">
                                {groupedChapters.map((chapter, index) => {
                                    const isOpen = openChapterId === chapter.Id;
                                    return (
                                        <div key={chapter.Id} className="rounded-xl overflow-hidden">
                                            {/* سربرگ فصل */}
                                            <button
                                                onClick={() => handleToggleChapter(chapter.Id)}
                                                className="w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:bg-white/5 lg:hover:bg-gray-100"
                                            >
                                                {getChapterIcon(chapter)}
                                                <div className="flex-1 text-right">
                                                    <p className="text-sm text-white/60 lg:text-gray-500">فصل {index + 1}</p>
                                                    <p className="font-medium line-clamp-1">{chapter.Title}</p>
                                                </div>
                                                <ChevronRight
                                                    className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-90" : ""
                                                        }`}
                                                />
                                            </button>

                                            {/* جلسات */}
                                            {isOpen && (
                                                <div className="mt-2 mr-4 pr-3 border-r-2 border-white/20 lg:border-emerald-100">
                                                    {chapter.Sessions.map((session) => {
                                                        const isActive = session.Id === selectedSessionId;
                                                        return (
                                                            <button
                                                                key={session.Id}
                                                                onClick={() => handleSelectSession(session.Id, chapter.Id)}
                                                                className={`
                                  w-full flex items-center justify-between gap-2 py-3 px-3 rounded-xl transition-all duration-200 text-sm
                                  ${isActive
                                                                        ? "bg-emerald-500/20 text-emerald-300 lg:bg-emerald-50 lg:text-emerald-800 font-bold border border-emerald-500/30 lg:border-emerald-100 shadow-sm"
                                                                        : "text-gray-300 lg:text-gray-600 hover:bg-white/5 lg:hover:bg-gray-100 hover:text-white lg:hover:text-gray-900"
                                                                    }
                                `}
                                                            >
                                                                <div className="flex items-center gap-3 overflow-hidden">
                                                                    <span className="shrink-0">{getSessionIcon(session.ExerciseStatus)}</span>
                                                                    <p className="truncate leading-relaxed">{session.Title}</p>
                                                                </div>
                                                                <span
                                                                    className={`
                                    text-[11px] whitespace-nowrap px-1.5 py-0.5 rounded border
                                    ${isActive
                                                                            ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30 lg:bg-white lg:text-emerald-600 lg:border-emerald-100"
                                                                            : "bg-white/5 text-gray-400 border-white/10 lg:bg-white lg:text-gray-400 lg:border-gray-100"
                                                                        }
                                  `}
                                                                >
                                                                    {session.ExerciseCount} تمرین
                                                                </span>
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-10 text-gray-400 lg:text-gray-500">
                                هیچ تمرینی یافت نشد
                            </div>
                        )}
                    </div>
                </div>
            </aside>
        </>
    );
};

export default ExercisesSidebar;