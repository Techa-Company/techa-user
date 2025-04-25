"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, CheckSquare, Book, ShoppingCart, Ticket, Star, Zap, TrendingUp, AlertCircle, Clock, BookOpen, BarChart, ChevronLeft } from 'lucide-react';
import DashboardCard from '../../components/account/Card';
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
import Link from 'next/link';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function DashboardPage() {
    const activities = [
        { id: 1, title: 'تکمیل تمرین پروژه Todo List', time: '۲ ساعت پیش', icon: <CheckSquare className="w-5 h-5 text-green-500" /> },
        { id: 2, title: 'شروع دوره Node.js', time: '۵ ساعت پیش', icon: <BookOpen className="w-5 h-5 text-blue-500" /> },
        { id: 3, title: 'دریافت نمره آزمون ری‌اکت', time: '۱ روز پیش', icon: <Star className="w-5 h-5 text-yellow-500" /> },
    ];

    const chartData = {
        labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد'],
        datasets: [{
            label: 'فعالیت ماهانه',
            data: [65, 59, 80, 81, 56],
            borderColor: '#34D399', // رنگ سبز
            backgroundColor: 'rgba(52, 211, 153, 0.1)', // رنگ سبز ملایم
            tension: 0.4,
            pointRadius: 5,
            pointHoverRadius: 7
        }]
    };

    const courses = [
        {
            id: 1,
            title: 'ری‌اکت پیشرفته',
            progress: 75,
            nextLesson: 'مقدمات Hooks',
            // time: '۱۹:۰۰ امروز'
        },
        {
            id: 2,
            title: 'Node.js',
            progress: 40,
            nextLesson: 'راه‌اندازی سرور',
            // time: 'فردا ۱۰:۰۰'
        }
    ];

    return (
        <div className="space-y-8 px-5 sm:px-10">
            {/* بخش کارت‌های آماری */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
            >
                <DashboardCard
                    title="دوره‌های فعال"
                    count={3}
                    color="from-green-400 to-green-600"
                    icon={Book}
                    progress={75}
                    trend={{ value: 20, icon: Activity }}
                    badgeText="۲ دوره جدید"
                />

                <DashboardCard
                    title="تمرینات انجام شده"
                    count={5}
                    color="from-blue-400 to-blue-600"
                    icon={CheckSquare}
                    progress={60}
                    trend={{ value: 15, icon: TrendingUp }}
                    chartData={[65, 59, 80, 81, 56]}
                />

                <DashboardCard
                    title="پروژه‌های تکمیل شده"
                    count={10}
                    color="from-amber-400 to-amber-600"
                    icon={ShoppingCart}
                    progress={80}
                    trend={{ value: 10, icon: Zap }}
                    status="رتبه ۱ در کلاس"
                />

                <DashboardCard
                    title="تیکت‌های پاسخ داده شده"
                    count={2}
                    color="from-purple-400 to-purple-600"
                    icon={Ticket}
                    progress={30}
                    trend={{ value: -5, icon: AlertCircle }}
                    status="۲ تیکت باز"
                />
            </motion.div>

            {/* بخش نمودار و فعالیت‌ها */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-xl border border-gray-100"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold">نمودار فعالیت ماهانه</h2>
                        <div className="flex items-center gap-2 text-green-600">
                            <TrendingUp className="w-5 h-5" />
                            <span>۳۲% افزایش نسبت به ماه قبل</span>
                        </div>
                    </div>
                    <div className="h-80">
                        <Line
                            data={chartData}
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: { display: false },
                                    tooltip: {
                                        backgroundColor: '#34D399',
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
                </motion.div>

                {/* لیست فعالیت‌های اخیر */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100"
                >
                    <h2 className="text-xl font-bold mb-6">فعالیت‌های اخیر</h2>
                    <div className="space-y-6">
                        {activities.map((activity, index) => (
                            <motion.div
                                key={activity.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-start gap-4 group"
                            >
                                <div className="p-2 bg-gray-100 rounded-lg">
                                    {activity.icon}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-medium">{activity.title}</h3>
                                    <p className="text-sm text-gray-500 mt-1">{activity.time}</p>
                                </div>
                                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* بخش دوره‌های آینده */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100"
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">دوره‌های پیش رو</h2>
                    <Link href="/account/courses" className="flex items-center gap-2 text-green-600 hover:text-green-700">
                        <span>مشاهده همه</span>
                        <ChevronLeft className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {courses.map((course, index) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.2 }}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                        >
                            <div className="space-y-2">
                                <h3 className="font-medium">{course.title}</h3>
                                <div className="flex items-center gap-4 text-sm">
                                    {/* <div className="flex items-center gap-2 text-green-600">
                                        <Clock className="w-4 h-4" />
                                        <span>{course.time}</span>
                                    </div> */}
                                    <div className="flex items-center gap-2 text-blue-600">
                                        <BookOpen className="w-4 h-4" />
                                        <span>{course.nextLesson}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-24 h-2 bg-gray-200 rounded-full">
                                    <div
                                        className="h-full bg-green-500 rounded-full transition-all"
                                        style={{ width: `${course.progress}%` }}
                                    />
                                </div>
                                <span className="text-sm text-gray-500">{course.progress}%</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* بخش آمار مقایسه‌ای */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
                <div className="bg-gradient-to-br from-green-600 to-green-500 text-white p-6 rounded-2xl shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium">رتبه شما در کلاس</h3>
                        <BarChart className="w-8 h-8" />
                    </div>
                    <div className="text-4xl font-bold mb-2">اول</div>
                    <p className="text-sm opacity-90">بالاتر از ۹۸% شرکت‌کنندگان</p>
                </div>

                <div className="bg-gradient-to-br from-amber-600 to-amber-500 text-white p-6 rounded-2xl shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium">میانگین نمرات</h3>
                        <Star className="w-8 h-8" />
                    </div>
                    <div className="text-4xl font-bold mb-2">۱۸.۷</div>
                    <p className="text-sm opacity-90">۱۵% بهبود نسبت به ترم قبل</p>
                </div>

                <div className="bg-gradient-to-br from-blue-600 to-blue-500 text-white p-6 rounded-2xl shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium">ساعات مطالعه</h3>
                        <Clock className="w-8 h-8" />
                    </div>
                    <div className="text-4xl font-bold mb-2">45 ساعت</div>
                    <p className="text-sm opacity-90">۷ ساعت بیشتر از ماه گذشته</p>
                </div>
            </motion.div>
        </div>
    );
}