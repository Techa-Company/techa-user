"use client";
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Book, Search, Filter, Hash, Clock, ArrowLeft,
    FileText, Zap, Layout, Layers, Box, Code2,
    Bookmark, ChevronLeft, Sparkles
} from 'lucide-react';

export default function DocumentationDashboard() {
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // داده‌های مستندات (بدون مدرس، متمرکز بر ورژن و تکنولوژی)
    const docs = [
        {
            id: 1,
            title: 'مستندات React.js',
            description: 'کتابخانه محبوب ساخت رابط کاربری. شامل هوک‌ها، کامپوننت‌ها و مدیریت حالت.',
            version: 'v18.3.0',
            category: 'Frontend',
            theme: 'cyan',
            progress: 75,
            totalTopics: 120,
            readTopics: 90,
            lastUpdated: '۲ روز پیش',
            link: '/docs/react',
            icon: Code2
        },
        {
            id: 2,
            title: 'راهنمای Next.js',
            description: 'فریم‌ورک React برای پروداکشن. روتینگ، رندرینگ سمت سرور و بهینه‌سازی.',
            version: 'v14.1',
            category: 'Framework',
            theme: 'slate',
            progress: 45,
            totalTopics: 85,
            readTopics: 38,
            lastUpdated: '۱ هفته پیش',
            link: '/docs/nextjs',
            icon: Layers
        },
        {
            id: 3,
            title: 'آموزش Tailwind CSS',
            description: 'فریم‌ورک CSS کاربردی برای طراحی سریع و مدرن بدون خروج از HTML.',
            version: 'v3.4',
            category: 'Styling',
            theme: 'sky',
            progress: 100,
            totalTopics: 50,
            readTopics: 50,
            lastUpdated: 'ماه گذشته',
            link: '/docs/tailwind',
            icon: Layout
        },
        {
            id: 4,
            title: 'داکیومنت TypeScript',
            description: 'جاوااسکریپت با سینتکس انواع داده (Types). ایمنی بیشتر در کدنویسی.',
            version: 'v5.3',
            category: 'Language',
            theme: 'blue',
            progress: 20,
            totalTopics: 60,
            readTopics: 12,
            lastUpdated: '۳ روز پیش',
            link: '/docs/typescript',
            icon: Box
        },
        {
            id: 5,
            title: 'مفاهیم Git & Github',
            description: 'کنترل نسخه توزیع شده. مدیریت ریپازیتوری‌ها، برنچ‌ها و پول‌ریکوئست‌ها.',
            version: 'Latest',
            category: 'DevOps',
            theme: 'orange',
            progress: 60,
            totalTopics: 30,
            readTopics: 18,
            lastUpdated: 'دیروز',
            link: '/docs/git',
            icon: Hash
        },
        {
            id: 6,
            title: 'اصول GraphQL',
            description: 'زبان کوئری برای APIها. دریافت دقیق داده‌های مورد نیاز.',
            version: 'Spec 2024',
            category: 'Backend',
            theme: 'pink',
            progress: 10,
            totalTopics: 45,
            readTopics: 4,
            lastUpdated: '۵ ساعت پیش',
            link: '/docs/graphql',
            icon: Zap
        },
    ];

    // محاسبات آماری
    const stats = useMemo(() => {
        const total = docs.length;
        const fullyRead = docs.filter(d => d.progress === 100).length;
        const totalTopics = docs.reduce((acc, curr) => acc + curr.totalTopics, 0);
        const readTopics = docs.reduce((acc, curr) => acc + curr.readTopics, 0);
        return { total, fullyRead, totalTopics, readTopics };
    }, [docs]);

    // فیلتر و جستجو
    const filteredDocs = docs.filter(doc => {
        const matchesFilter =
            filter === 'all' ? true :
                filter === 'completed' ? doc.progress === 100 :
                    filter === 'reading' ? doc.progress < 100 && doc.progress > 0 : true;

        const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doc.description.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    // سیستم رنگ‌بندی داینامیک
    const getThemeStyles = (theme) => {
        const themes = {
            cyan: { bg: 'bg-cyan-50', text: 'text-cyan-600', border: 'border-cyan-200', gradient: 'from-cyan-400 to-blue-500', shadow: 'shadow-cyan-100' },
            slate: { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-300', gradient: 'from-slate-700 to-black', shadow: 'shadow-slate-200' },
            sky: { bg: 'bg-sky-50', text: 'text-sky-600', border: 'border-sky-200', gradient: 'from-sky-400 to-cyan-400', shadow: 'shadow-sky-100' },
            blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', gradient: 'from-blue-500 to-indigo-600', shadow: 'shadow-blue-100' },
            orange: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200', gradient: 'from-orange-400 to-red-500', shadow: 'shadow-orange-100' },
            pink: { bg: 'bg-pink-50', text: 'text-pink-600', border: 'border-pink-200', gradient: 'from-pink-400 to-rose-500', shadow: 'shadow-pink-100' },
        };
        return themes[theme] || themes.slate;
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 pb-20" dir="rtl">

            {/* --- Hero Section --- */}
            <div className="bg-white border-b border-slate-200 pt-8 pb-12 px-4 sm:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                    >
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                                    <Sparkles className="w-3 h-3" />
                                    مستندات فنی
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                                مرکز دانش <span className="text-indigo-600">توسعه‌دهندگان</span>
                            </h1>
                            <p className="text-slate-500 mt-2 text-lg">مرجع کامل مستندات و راهنماهای کاربردی</p>
                        </div>

                        {/* Search Box */}
                        <div className="w-full md:w-auto relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-200"></div>
                            <div className="relative bg-white rounded-xl shadow-sm border border-slate-200 flex items-center p-1 focus-within:ring-2 focus-within:ring-indigo-100 focus-within:border-indigo-400 transition-all">
                                <Search className="w-5 h-5 text-slate-400 mr-3" />
                                <input
                                    type="text"
                                    placeholder="جستجو در مستندات..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full md:w-64 bg-transparent border-none focus:ring-0 text-sm py-2 px-2 placeholder:text-slate-400"
                                />
                                <div className="hidden sm:flex items-center gap-1 text-[10px] text-slate-400 bg-slate-100 px-2 py-1 rounded-lg ml-1 font-mono">
                                    CTRL + K
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
                        {[
                            { label: 'مستندات در دسترس', value: stats.total, icon: Book },
                            { label: 'مطالعه شده', value: stats.fullyRead, icon: Bookmark },
                            { label: 'سرفصل‌های خوانده شده', value: stats.readTopics, icon: FileText },
                            { label: 'کل مباحث', value: stats.totalTopics, icon: Layers },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-slate-50 border border-slate-200/60 p-4 rounded-2xl flex flex-col items-center sm:items-start text-center sm:text-right hover:bg-white hover:shadow-md transition-all duration-300"
                            >
                                <stat.icon className="w-6 h-6 text-slate-400 mb-2 sm:mb-0 sm:absolute sm:left-4 sm:top-4" />
                                <span className="text-2xl font-bold text-slate-800">{stat.value}</span>
                                <span className="text-xs text-slate-500 font-medium">{stat.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* --- Main Content --- */}
            <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-8">

                {/* Filters */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                        {['all', 'reading', 'completed'].map((t) => (
                            <button
                                key={t}
                                onClick={() => setFilter(t)}
                                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${filter === t
                                        ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'
                                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                                    }`}
                            >
                                {t === 'all' && 'همه مستندات'}
                                {t === 'reading' && 'در حال مطالعه'}
                                {t === 'completed' && 'تکمیل شده'}
                            </button>
                        ))}
                    </div>
                    <div className="hidden sm:flex items-center text-xs text-slate-500 gap-2">
                        <Filter className="w-4 h-4" />
                        مرتب‌سازی بر اساس اهمیت
                    </div>
                </div>

                {/* Grid */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {filteredDocs.map((doc) => {
                            const theme = getThemeStyles(doc.theme);
                            return (
                                <motion.div
                                    layout
                                    key={doc.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    whileHover={{ y: -5 }}
                                    className="group bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col h-full"
                                >
                                    {/* Card Header */}
                                    <div className="p-6 pb-4">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${theme.bg} ${theme.text} ${theme.border} border`}>
                                                <doc.icon className="w-7 h-7" />
                                            </div>
                                            <div className="flex flex-col items-end gap-2">
                                                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border bg-white ${theme.text} ${theme.border}`}>
                                                    {doc.version}
                                                </span>
                                                <span className="text-[10px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md">
                                                    بروزرسانی: {doc.lastUpdated}
                                                </span>
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">
                                            {doc.title}
                                        </h3>
                                        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
                                            {doc.description}
                                        </p>
                                    </div>

                                    {/* Progress & Meta */}
                                    <div className="p-6 pt-0 mt-auto">
                                        {/* Progress Bar */}
                                        <div className="mb-4">
                                            <div className="flex justify-between text-xs font-medium text-slate-500 mb-1.5">
                                                <span>میزان مطالعه</span>
                                                <span className={theme.text}>{doc.progress}%</span>
                                            </div>
                                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${doc.progress}%` }}
                                                    transition={{ duration: 1, ease: "easeOut" }}
                                                    className={`h-full rounded-full bg-gradient-to-r ${theme.gradient}`}
                                                />
                                            </div>
                                        </div>

                                        {/* Footer Info */}
                                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                            <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                                <FileText className="w-3.5 h-3.5" />
                                                <span>{doc.readTopics} / {doc.totalTopics} مبحث</span>
                                            </div>

                                            <a
                                                href={doc.link}
                                                className={`flex items-center gap-1 text-sm font-bold transition-transform group-hover:translate-x-[-4px] ${theme.text}`}
                                            >
                                                {doc.progress === 100 ? 'بازخوانی' : 'ادامه مطالعه'}
                                                <ChevronLeft className="w-4 h-4 mt-0.5" />
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>

                {filteredDocs.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
                            <Search className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-700">موردی یافت نشد</h3>
                        <p className="text-slate-500 text-sm mt-1">لطفاً کلمات کلیدی دیگری را جستجو کنید.</p>
                    </div>
                )}
            </div>
        </div>
    );
}