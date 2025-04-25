"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { List, Bookmark, BarChart, GraduationCap, Clock, ChevronDown, AlertCircle, CheckCircle, Zap, Award, TrendingUp } from 'lucide-react';
import { useParams } from "next/navigation";
import { useState } from "react";
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function CourseDetails() {
    const [activeTab, setActiveTab] = useState('exercises');
    const [expandedChapter, setExpandedChapter] = useState(null);
    const { id } = useParams();

    // داده‌های نمونه
    const course = {
        id: 1,
        title: 'دوره جامع ری‌اکت پیشرفته',
        progress: 75,
        duration: '۳۲ ساعت',
        lessons: 28,
        status: 'در حال یادگیری',
        grade: 18.5,
        image: '/images/blog-1.png',
        instructor: 'امیرحسین عباسی',
        rating: 4.8
    };

    const exercises = [...Array(5)].map((_, i) => ({
        id: i + 1,
        title: `تمرین ${i + 1}: پروژه پیشرفته`,
        status: i % 2 === 0 ? 'تکمیل شده' : 'در انتظار تصحیح',
        grade: i % 2 === 0 ? (19 - i * 0.5) : null,
        dueDate: '۱۴۰۳/۰۳/' + (20 + i),
        submitted: i % 2 === 0,
        difficulty: ['آسان', 'متوسط', 'سخت'][i % 3]
    }));

    const chapters = [...Array(6)].map((_, i) => ({
        id: i + 1,
        title: `فصل ${i + 1}: مباحث پیشرفته`,
        duration: `${(i + 2) * 45} دقیقه`,
        lessons: i + 4,
        exercises: i + 2,
        completed: i < 3,
        topics: [...Array(4)].map((_, j) => `مبحث ${j + 1}`)
    }));

    // داده‌های نمودار
    const chartData = {
        labels: ['هفته ۱', 'هفته ۲', 'هفته ۳', 'هفته ۴', 'هفته ۵'],
        datasets: [{
            label: 'پیشرفت دوره',
            data: [10, 35, 60, 75, 90],
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            tension: 0.4,
            pointRadius: 6,
            pointHoverRadius: 8
        }]
    };

    return (
        <div className="max-w-7xl mx-auto p-4 lg:p-8">
            {/* هدر دوره */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative bg-gradient-to-r from-emerald-600 to-green-500 rounded-2xl p-8 text-white shadow-2xl overflow-hidden"
            >
                <div className="absolute inset-0 bg-noise opacity-10" />
                <div className="relative flex items-center gap-6">
                    <div className="flex-1 space-y-6">
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-bold">{course.title}</h1>
                            <div className="px-3 py-1 bg-white/10 rounded-full text-sm">
                                {course.rating} ★
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl">
                                <GraduationCap className="w-5 h-5" />
                                <span>مدرس: {course.instructor}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl">
                                <Clock className="w-5 h-5" />
                                <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl">
                                <TrendingUp className="w-5 h-5" />
                                <span>پیشرفت: {course.progress}%</span>
                            </div>
                        </div>
                    </div>

                    <motion.div
                        className="hidden lg:block relative"
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 8 }}
                    >
                        <div className="w-40 h-40 bg-white/10 rounded-2xl backdrop-blur-sm flex items-center justify-center">
                            <Award className="w-16 h-16 text-white/30" />
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* تب‌های دوره */}
            <div className="mt-8 relative">
                <div className="flex items-center gap-4 border-b border-gray-200">
                    {[
                        { id: 'exercises', icon: <List />, title: 'تمرینات' },
                        { id: 'syllabus', icon: <Bookmark />, title: 'سرفصل‌ها' },
                        { id: 'grades', icon: <BarChart />, title: 'نمرات' },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className="relative px-6 py-4 flex items-center gap-2 group"
                        >
                            <span className={`transition-colors ${activeTab === tab.id ? 'text-emerald-600' : 'text-gray-500'}`}>
                                {tab.icon}
                            </span>
                            <span className={`font-medium ${activeTab === tab.id ? 'text-emerald-600' : 'text-gray-600'}`}>
                                {tab.title}
                            </span>

                            {activeTab === tab.id && (
                                <motion.div
                                    className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500"
                                    layoutId="tabIndicator"
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* محتوای تب‌ها */}
            <div className="mt-8">
                <AnimatePresence mode='wait'>
                    {/* بخش تمرینات */}
                    {activeTab === 'exercises' && (
                        <motion.div
                            key="exercises"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="grid gap-4"
                        >
                            {exercises.map((exercise, index) => (
                                <motion.div
                                    key={exercise.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl border border-gray-100 transition-all"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1 space-y-3">
                                            <div className="flex items-center gap-3">
                                                <h3 className="text-lg font-medium">{exercise.title}</h3>
                                                <span className={`px-2 py-1 text-sm rounded-full ${exercise.difficulty === 'آسان' ? 'bg-emerald-100 text-emerald-600' :
                                                    exercise.difficulty === 'متوسط' ? 'bg-amber-100 text-amber-600' :
                                                        'bg-rose-100 text-rose-600'
                                                    }`}>
                                                    {exercise.difficulty}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-4 text-sm">
                                                <div className="flex items-center gap-2 text-gray-500">
                                                    <Clock className="w-4 h-4" />
                                                    <span>مهلت: {exercise.dueDate}</span>
                                                </div>
                                                <div className={`flex items-center gap-2 ${exercise.submitted ? 'text-emerald-600' : 'text-rose-600'
                                                    }`}>
                                                    {exercise.submitted ? (
                                                        <CheckCircle className="w-4 h-4" />
                                                    ) : (
                                                        <AlertCircle className="w-4 h-4" />
                                                    )}
                                                    <span>{exercise.submitted ? 'ارسال شده' : 'ارسال نشده'}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-right min-w-[100px]">
                                            {exercise.grade ? (
                                                <div className="space-y-1">
                                                    <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
                                                        {exercise.grade}
                                                    </div>
                                                    <div className="text-xs text-gray-500">از ۲۰ نمره</div>
                                                </div>
                                            ) : (
                                                <div className="text-gray-300 text-2xl font-bold">--</div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}

                    {/* بخش سرفصل‌ها */}
                    {activeTab === 'syllabus' && (
                        <motion.div
                            key="syllabus"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-4"
                        >
                            {chapters.map((chapter, index) => (
                                <motion.div
                                    key={chapter.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
                                >
                                    <div
                                        className="flex items-center justify-between p-6 cursor-pointer"
                                        onClick={() => setExpandedChapter(expandedChapter === chapter.id ? null : chapter.id)}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${chapter.completed ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100'
                                                }`}>
                                                {chapter.completed ? (
                                                    <CheckCircle className="w-6 h-6" />
                                                ) : (
                                                    <span className="font-bold">{index + 1}</span>
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="font-medium">{chapter.title}</h3>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    {chapter.lessons} جلسه · {chapter.exercises} تمرین
                                                </p>
                                            </div>
                                        </div>
                                        <ChevronDown className={`transition-transform ${expandedChapter === chapter.id ? 'rotate-180' : ''
                                            }`} />
                                    </div>

                                    <AnimatePresence>
                                        {expandedChapter === chapter.id && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="px-6 pb-6 pt-2 border-t border-gray-100"
                                            >
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-4 text-sm">
                                                        <div className="flex items-center gap-2 text-emerald-600">
                                                            <Clock className="w-4 h-4" />
                                                            <span>{chapter.duration}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-amber-600">
                                                            <Zap className="w-4 h-4" />
                                                            <span>{chapter.exercises} تمرین عملی</span>
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-4">
                                                        {chapter.topics.map((topic, i) => (
                                                            <div key={i} className="flex items-center gap-2 text-gray-600">
                                                                <span className="text-emerald-500">•</span>
                                                                {topic}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}

                    {/* بخش نمرات */}
                    {activeTab === 'grades' && (
                        <motion.div
                            key="grades"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
                        >
                            <div className="p-8 grid lg:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-xl font-semibold mb-6">نمودار پیشرفت هفتگی</h3>
                                    <div className="h-80">
                                        <Line
                                            data={chartData}
                                            options={{
                                                responsive: true,
                                                plugins: {
                                                    legend: { display: false },
                                                    tooltip: {
                                                        backgroundColor: '#059669',
                                                        bodyColor: '#fff',
                                                        titleColor: '#fff'
                                                    }
                                                },
                                                scales: {
                                                    y: {
                                                        grid: { color: '#f3f4f6' },
                                                        ticks: { color: '#6b7280' }
                                                    },
                                                    x: {
                                                        grid: { color: '#f3f4f6' },
                                                        ticks: { color: '#6b7280' }
                                                    }
                                                }
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-xl font-semibold mb-6">آمار کلی</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <StatCard
                                                title="میانگین نمرات"
                                                value="۱۸.۷"
                                                color="bg-emerald-100"
                                                icon={<TrendingUp className="w-6 h-6 text-emerald-600" />}
                                            />
                                            <StatCard
                                                title="بالاترین نمره"
                                                value="۲۰"
                                                color="bg-amber-100"
                                                icon={<Award className="w-6 h-6 text-amber-600" />}
                                            />
                                            <StatCard
                                                title="تکمیل دوره"
                                                value="۸۵%"
                                                color="bg-blue-100"
                                                icon={<CheckCircle className="w-6 h-6 text-blue-600" />}
                                            />
                                            <StatCard
                                                title="جلسات باقیمانده"
                                                value="۴"
                                                color="bg-purple-100"
                                                icon={<Bookmark className="w-6 h-6 text-purple-600" />}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold mb-4">دستاوردها</h3>
                                        <div className="flex flex-wrap gap-4">
                                            <div className="px-4 py-2 bg-emerald-100 text-emerald-600 rounded-full flex items-center gap-2">
                                                <Award className="w-4 h-4" />
                                                <span>تکمیل ۵ تمرین متوالی</span>
                                            </div>
                                            <div className="px-4 py-2 bg-amber-100 text-amber-600 rounded-full flex items-center gap-2">
                                                <Zap className="w-4 h-4" />
                                                <span>دانشجوی برتر هفته</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

const StatCard = ({ title, value, color, icon }) => (
    <div className={`${color} p-4 rounded-xl flex items-center justify-between`}>
        <div>
            <div className="text-2xl font-bold mb-1">{value}</div>
            <div className="text-sm text-gray-600">{title}</div>
        </div>
        {icon}
    </div>
);