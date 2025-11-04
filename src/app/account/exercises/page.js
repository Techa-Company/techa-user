"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, GraduationCap, Clock, CheckCircle, AlertCircle, ChevronRight, BarChart, List, Bookmark, Search, Star, Zap } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDocs } from '../../../features/main/docs/docsActions';
import { formatDuration } from '../../../helper';
import { RiDatabase2Fill, RiDatabaseFill, RiHtml5Fill, RiJavascriptFill, RiReactjsFill, RiTailwindCssFill } from 'react-icons/ri';

const courses = [
    {
        id: 1,
        title: 'دوره جامع ری‌اکت پیشرفته',
        progress: 75,
        duration: '۳۲ ساعت',
        lessons: 28,
        status: 'در حال یادگیری',
        grade: 18.5,
        image: '/images/blog-1.png',
        difficulty: 'پیشرفته',
        favorite: true
    },
    {
        id: 2,
        title: 'آموزش Node.js و Express',
        progress: 90,
        duration: '۲۴ ساعت',
        lessons: 20,
        status: 'تکمیل شده',
        grade: 19.2,
        image: '/images/blog-1.png',
        difficulty: 'متوسط',
        favorite: false
    },
    // بقیه دوره‌ها...
];
const levelMap = {
    Beginner: "مبتدی",
    Intermediate: "متوسط",
    Advanced: "پیشرفته",
};

const iconStyles = [
    { el: <RiHtml5Fill className="w-10 h-10 text-[#E44D26]" />, bg: "bg-orange-100" },
    { el: <RiJavascriptFill className="w-10 h-10 text-[#F0DB4F]" />, bg: "bg-gray-800" },
    { el: <RiTailwindCssFill className="w-10 h-10 text-[#38B2AC]" />, bg: "bg-gray-900" },
    { el: <RiReactjsFill className="w-10 h-10 text-[#61DAFB]" />, bg: "bg-gray-900" },
    { el: <RiDatabase2Fill className="w-10 h-10 text-[#4479A1]" />, bg: "bg-slate-100" },
    { el: <RiDatabaseFill className="w-10 h-10 text-[#6E5494]" />, bg: "bg-slate-100" },
];

const DocCard = ({ doc }) => {
    let score = Math.floor(Math.random() * 20);
    return (
        <Link href={`/account/exercises/${doc?.Id}`}>
            <motion.div
                whileHover={{ y: -5 }}
                className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 overflow-hidden cursor-pointer group transition-all duration-300"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
            >
                {/* نشانگر وضعیت ویژه */}
                {/* {doc.favorite && (
                <div className="absolute top-4 right-4 bg-amber-100 text-amber-700 px-3 py-1 rounded-full flex items-center gap-1 text-sm z-10">
                    <Star className="w-4 h-4 fill-current" />
                    <span>پیشنهاد ویژه</span>
                </div>
            )} */}

                {/* <div className="relative h-48 overflow-hidden">
                <motion.img
                    src={doc.image}
                    alt={doc.Title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

                </div> */}

                <div className="p-4 space-y-4">
                    <div className="flex items-center justify-between pb-5">
                        <div className={`p-2 rounded-xl shadow-md ${iconStyles[0].bg}`}>
                            {iconStyles[0].el}
                        </div>

                        <div className="absolute top-4 left-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm">
                            {levelMap[doc.Level] || "نامشخص"}
                        </div>
                    </div>
                    <div className="flex items-start justify-between">
                        <h3 className="text-xl font-semibold text-gray-800 leading-tight">دوره {doc.Title}</h3>
                        <div className="bg-purple-100 text-purple-700 px-2 py-1 rounded-md text-sm">
                            نمره: {doc.AverageScore + score}/20
                        </div>
                    </div>
                    <hr />

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-emerald-600">
                            <BookOpen className="w-5 h-5" />
                            <span className="font-medium">{doc.Lessons} جلسه</span>
                        </div>
                        <div className="flex items-center gap-2 text-amber-600">
                            <Clock className="w-5 h-5" />
                            <span className="font-medium text-sm">{formatDuration(doc.Duration)}</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">میزان پیشرفت:</span>
                            <span className="font-medium text-emerald-600">{score * 5}%</span>
                        </div>
                        <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full relative"
                                style={{ width: `${score * 5}%` }}
                                initial={{ width: 0 }}
                                animate={{ width: `${score * 5}%` }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="absolute inset-0 bg-white/10 animate-pulse" />
                            </motion.div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                            {doc.CourseStatus === 'تکمیل شده' ? (
                                <div className="flex items-center gap-2 text-emerald-600">
                                    <CheckCircle className="w-5 h-5" />
                                    <span className="font-medium">{doc.CourseStatus}</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 text-amber-600">
                                    <Zap className="w-5 h-5 animate-pulse" />
                                    <span className="font-medium">{doc.CourseStatus}در حال یادگیری</span>
                                </div>
                            )}
                        </div>
                        <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-emerald-500 transition-all transform group-hover:translate-x-1" />
                    </div>
                </div>
            </motion.div>
        </Link>
    )
};

export default function CoursesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('all');

    const stats = [
        { title: 'کل دوره‌ها', value: '۲۴', icon: <Bookmark className="w-6 h-6" />, color: 'bg-blue-100 text-blue-600' },
        { title: 'در حال یادگیری', value: '۱۵', icon: <GraduationCap className="w-6 h-6" />, color: 'bg-purple-100 text-purple-600' },
        { title: 'تکمیل شده', value: '۹', icon: <CheckCircle className="w-6 h-6" />, color: 'bg-emerald-100 text-emerald-600' },
        { title: 'میانگین نمرات', value: '۱۸.۲', icon: <BarChart className="w-6 h-6" />, color: 'bg-amber-100 text-amber-600' },
    ];

    const dispatch = useDispatch();
    const { docs } = useSelector(state => state.docs);

    useEffect(() => {
        dispatch(fetchDocs({ "Disabled": false, "Mode": "DashboardExercises" }))
    }, []);

    // console.log(docs)

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto p-4 lg:p-8">
                {/* بخش آمار */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className={`${stat.color} p-6 rounded-2xl flex items-center justify-between shadow-sm`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div>
                                <h3 className="text-2xl font-bold mb-2">{stat.value}</h3>
                                <p className="text-sm font-medium">{stat.title}</p>
                            </div>
                            <div className="p-3 rounded-lg bg-white/20">
                                {stat.icon}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* هدر و فیلترها */}
                <div className="mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                        <GraduationCap className="w-8 h-8 text-emerald-600" />
                        دوره های من
                    </h1>

                    <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                        <div className="relative w-full md:w-72">
                            <input
                                type="text"
                                placeholder="جستجو در دوره‌ها..."
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none transition-all"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Search className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                        </div>

                        <select
                            className="w-full md:w-48 px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value="all">همه دوره‌ها</option>
                            <option value="completed">تکمیل شده</option>
                            <option value="in-progress">در حال یادگیری</option>
                        </select>
                    </div>
                </div>

                {/* لیست دوره‌ها */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    layout
                >
                    <AnimatePresence>
                        {docs.map(doc => (
                            <DocCard key={doc.Id} doc={doc} />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* حالت خالی */}
                {docs.length === 0 && (
                    <motion.div
                        className="flex flex-col items-center justify-center py-24 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <BookOpen className="w-24 h-24 text-gray-300 mb-6" />
                        <h3 className="text-2xl font-bold text-gray-500 mb-2">دوره فعالی ندارید!</h3>
                        <p className="text-gray-500 mb-6">همین حالا اولین دوره یادگیری خود را شروع کنید</p>
                        <button className="bg-emerald-500 text-white px-8 py-3 rounded-xl hover:bg-emerald-600 transition-all flex items-center gap-2">
                            <Zap className="w-5 h-5" />
                            مشاهده دوره‌ها
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}