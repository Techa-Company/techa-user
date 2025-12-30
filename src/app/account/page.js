"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Activity, BookOpen, Clock, TrendingUp, Zap,
    MoreHorizontal, Calendar, ArrowUpRight, Flame,
    Trophy, Target, ChevronLeft, Bell, Search
} from 'lucide-react';
import { Line, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    Filler
} from 'chart.js';
import Link from 'next/link';

// ثبت کامپوننت‌های چارت
ChartJS.register(
    CategoryScale, LinearScale, PointElement, LineElement,
    Title, Tooltip, Legend, ArcElement, Filler
);

export default function DashboardPage() {
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('صبح بخیر');
        else if (hour < 18) setGreeting('ظهر بخیر');
        else setGreeting('شب بخیر');
    }, []);

    // داده‌های نمودار خطی (فعالیت)
    const lineChartData = {
        labels: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'],
        datasets: [{
            label: 'دقیقه مطالعه',
            data: [45, 60, 30, 90, 45, 120, 75],
            borderColor: '#10B981', // Emerald 500
            backgroundColor: (context) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                gradient.addColorStop(0, 'rgba(16, 185, 129, 0.4)');
                gradient.addColorStop(1, 'rgba(16, 185, 129, 0)');
                return gradient;
            },
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#fff',
            pointBorderColor: '#10B981',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6
        }]
    };

    const lineChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#1F2937',
                padding: 12,
                titleFont: { family: 'inherit', size: 13 },
                bodyFont: { family: 'inherit', size: 12 },
                cornerRadius: 8,
                displayColors: false,
            }
        },
        scales: {
            x: { grid: { display: false }, ticks: { font: { family: 'inherit' } } },
            y: { border: { display: false }, grid: { color: '#F3F4F6' }, ticks: { display: false } }
        }
    };

    // داده‌های فعالیت‌های اخیر
    const recentActivities = [
        { id: 1, title: "تکمیل فصل ۲: هوک‌ها", course: "React پیشرفته", time: "۱۰ دقیقه پیش", type: "finish" },
        { id: 2, title: "شرکت در آزمون Next.js", course: "نمره: ۸۵/۱۰۰", time: "۲ ساعت پیش", type: "exam" },
        { id: 3, title: "خرید دوره جدید", course: "جامع UI/UX", time: "دیروز", type: "buy" },
    ];

    return (
        <div className="min-h-screen bg-slate-50/50 pb-20 px-4 sm:px-8 font-sans text-slate-800" dir="rtl">

            {/* --- Header Section --- */}
            <header className="pt-8 pb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="flex items-center gap-2 text-slate-500 mb-1 text-sm">
                            <Calendar className="w-4 h-4" />
                            <span>۱۵ اسفند ۱۴۰۳</span>
                        </div>
                        <h1 className="text-3xl font-extrabold text-slate-800">
                            {greeting}، <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">رامین عزیز!</span> 👋
                        </h1>
                        <p className="text-slate-500 mt-2">امروز ۲ درس تا تکمیل هدف هفتگی فاصله داری. ادامه بده!</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex gap-4"
                    >
                        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-200">
                            <div className="bg-orange-100 p-1.5 rounded-lg text-orange-500">
                                <Flame className="w-5 h-5 fill-current" />
                            </div>
                            <div>
                                <span className="block text-sm font-bold text-slate-800">12 روز</span>
                                <span className="block text-[10px] text-slate-500">زنجیره مطالعه</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-200">
                            <div className="bg-indigo-100 p-1.5 rounded-lg text-indigo-500">
                                <Trophy className="w-5 h-5 fill-current" />
                            </div>
                            <div>
                                <span className="block text-sm font-bold text-slate-800">2,450</span>
                                <span className="block text-[10px] text-slate-500">امتیاز کل</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </header>

            {/* --- Bento Grid Layout --- */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                {/* 1. Main Stats Cards (Top Row) */}
                <div className="col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="دوره‌های فعال" value="4"
                        icon={BookOpen} color="indigo" trend="+1" trendUp={true}
                    />
                    <StatCard
                        title="ساعات یادگیری" value="32h"
                        icon={Clock} color="emerald" trend="+12%" trendUp={true}
                    />
                    <StatCard
                        title="تمرینات حل شده" value="18"
                        icon={Target} color="amber" trend="+3" trendUp={true}
                    />
                    <StatCard
                        title="میانگین نمرات" value="88%"
                        icon={Activity} color="rose" trend="-2%" trendUp={false}
                    />
                </div>

                {/* 2. Main Chart (Large Area) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="col-span-12 lg:col-span-8 bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100"
                >
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-slate-800">آمار یادگیری</h3>
                            <p className="text-xs text-slate-500">نمودار زمان مطالعه در هفته اخیر</p>
                        </div>
                        <select className="bg-slate-50 border-none text-xs rounded-lg px-3 py-2 text-slate-600 focus:ring-0 cursor-pointer hover:bg-slate-100 transition-colors">
                            <option>هفتگی</option>
                            <option>ماهانه</option>
                        </select>
                    </div>
                    <div className="h-[300px] w-full">
                        <Line data={lineChartData} options={lineChartOptions} />
                    </div>
                </motion.div>

                {/* 3. Daily Goal (Side Area) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="col-span-12 lg:col-span-4 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 text-white shadow-xl flex flex-col justify-between relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 blur-3xl rounded-full -mr-10 -mt-10"></div>

                    <div>
                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <div>
                                <h3 className="text-lg font-bold">هدف روزانه</h3>
                                <p className="text-xs text-slate-400">برنامه امروز شما</p>
                            </div>
                            <div className="bg-white/10 p-2 rounded-xl backdrop-blur-md">
                                <Target className="w-5 h-5 text-emerald-400" />
                            </div>
                        </div>

                        <div className="flex items-end gap-2 mb-2">
                            <span className="text-4xl font-bold">75</span>
                            <span className="text-sm text-slate-400 mb-1">/ 100 دقیقه</span>
                        </div>

                        {/* Custom Progress Bar */}
                        <div className="w-full bg-slate-700/50 rounded-full h-3 mb-6">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '75%' }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                            ></motion.div>
                        </div>
                    </div>

                    <div className="bg-white/5 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
                        <p className="text-xs text-slate-300 mb-3">ماموریت‌های امروز:</p>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2 text-sm text-emerald-300 line-through decoration-emerald-500/50 decoration-2">
                                <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center">✓</div>
                                تماشای ویدیو جلسه ۴
                            </li>
                            <li className="flex items-center gap-2 text-sm text-white">
                                <div className="w-4 h-4 rounded-full border border-slate-500"></div>
                                حل تمرین شماره ۲
                            </li>
                        </ul>
                    </div>
                </motion.div>

                {/* 4. Active Courses (Bottom Left) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="col-span-12 lg:col-span-7 bg-white rounded-3xl p-6 shadow-lg border border-slate-100"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-slate-800">دوره‌های در حال یادگیری</h3>
                        <Link href="/courses" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                            مشاهده همه <ArrowUpRight className="w-3 h-3" />
                        </Link>
                    </div>

                    <div className="space-y-4">
                        <CourseProgressRow
                            title="متخصص React و Next.js"
                            lesson="جلسه ۲۴: Server Actions"
                            progress={75}
                            color="bg-emerald-500"
                            icon="⚛️"
                        />
                        <CourseProgressRow
                            title="جامع UI/UX دیزاین"
                            lesson="جلسه ۸: اصول تایپوگرافی"
                            progress={45}
                            color="bg-indigo-500"
                            icon="🎨"
                        />
                        <CourseProgressRow
                            title="پایتون برای هوش مصنوعی"
                            lesson="جلسه ۱۰: کار با Pandas"
                            progress={20}
                            color="bg-amber-500"
                            icon="🐍"
                        />
                    </div>
                </motion.div>

                {/* 5. Recent Activity (Bottom Right) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="col-span-12 lg:col-span-5 bg-white rounded-3xl p-6 shadow-lg border border-slate-100"
                >
                    <h3 className="text-lg font-bold text-slate-800 mb-6">فعالیت‌های اخیر</h3>
                    <div className="relative border-r border-slate-200 mr-2 space-y-8">
                        {recentActivities.map((act, index) => (
                            <div key={act.id} className="relative pr-6">
                                <div className={`absolute -right-[5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-white ${act.type === 'finish' ? 'bg-emerald-500' :
                                        act.type === 'exam' ? 'bg-indigo-500' : 'bg-amber-500'
                                    }`}></div>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-800">{act.title}</h4>
                                        <p className="text-xs text-slate-500 mt-0.5">{act.course}</p>
                                    </div>
                                    <span className="text-[10px] text-slate-400 bg-slate-50 px-2 py-1 rounded-full">
                                        {act.time}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

            </div>
        </div>
    );
}

// --- Sub Components ---

const StatCard = ({ title, value, icon: Icon, color, trend, trendUp }) => {
    const colors = {
        indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600' },
        emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600' },
        amber: { bg: 'bg-amber-50', text: 'text-amber-600' },
        rose: { bg: 'bg-rose-50', text: 'text-rose-600' },
    };
    const t = colors[color];

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-5 rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/50 flex flex-col justify-between h-32"
        >
            <div className="flex justify-between items-start">
                <div className={`p-2.5 rounded-xl ${t.bg} ${t.text}`}>
                    <Icon className="w-5 h-5" />
                </div>
                <div className={`text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1 ${trendUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                    {trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingUp className="w-3 h-3 rotate-180" />}
                    {trend}
                </div>
            </div>
            <div>
                <h3 className="text-2xl font-extrabold text-slate-800">{value}</h3>
                <p className="text-xs text-slate-500 font-medium mt-1">{title}</p>
            </div>
        </motion.div>
    );
};

const CourseProgressRow = ({ title, lesson, progress, color, icon }) => (
    <div className="group flex items-center gap-4 p-3 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer border border-transparent hover:border-slate-100">
        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-xl shadow-sm group-hover:scale-105 transition-transform">
            {icon}
        </div>
        <div className="flex-1">
            <div className="flex justify-between mb-1">
                <h4 className="text-sm font-bold text-slate-800">{title}</h4>
                <span className="text-xs font-bold text-slate-500">{progress}%</span>
            </div>
            <p className="text-xs text-slate-400 mb-2">{lesson}</p>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full ${color} rounded-full`} style={{ width: `${progress}%` }}></div>
            </div>
        </div>
        <div className="hidden sm:block">
            <button className="p-2 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                <ArrowUpRight className="w-5 h-5" />
            </button>
        </div>
    </div>
);