"use client";
import { motion, stagger, useAnimate } from 'framer-motion';
import { BookOpen, CheckCircle, Clock, AlertTriangle, ArrowRight, ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';

export default function Dashboard() {
    const courses = [
        {
            id: 1,
            title: 'دوره React پیشرفته',
            progress: 65,
            totalExercises: 5,
            completedExercises: 3,
            finalExam: { date: '۱۴۰۳/۰۵/۱۵', link: '/courses/react/exam' },
            link: '/courses/react',
        },
        {
            id: 2,
            title: 'آموزش Next.js',
            progress: 30,
            totalExercises: 4,
            completedExercises: 1,
            finalExam: { date: '۱۴۰۳/۰۵/۲۰', link: '/courses/next/exam' },
            link: '/courses/next',
        },
        {
            id: 3,
            title: 'دوره TypeScript',
            progress: 50,
            totalExercises: 6,
            completedExercises: 3,
            finalExam: { date: '۱۴۰۳/۰۶/۰۱', link: '/courses/typescript/exam' },
            link: '/courses/typescript',
        },
        {
            id: 4,
            title: 'آموزش GraphQL',
            progress: 20,
            totalExercises: 4,
            completedExercises: 1,
            finalExam: { date: '۱۴۰۳/۰۶/۰۵', link: '/courses/graphql/exam' },
            link: '/courses/graphql',
        },
        {
            id: 5,
            title: 'دوره Redux پیشرفته',
            progress: 75,
            totalExercises: 8,
            completedExercises: 6,
            finalExam: { date: '۱۴۰۳/۰۶/۱۰', link: '/courses/redux/exam' },
            link: '/courses/redux',
        },
        {
            id: 6,
            title: 'آموزش HTML و CSS',
            progress: 90,
            totalExercises: 10,
            completedExercises: 9,
            finalExam: { date: '۱۴۰۳/۰۶/۱۵', link: '/courses/html-css/exam' },
            link: '/courses/html-css',
        },
    ];


    // const [scope, animate] = useAnimate();

    useEffect(() => {
        // animate(
        //     ".course-card",
        //     { opacity: 1, y: 0 },
        //     { delay: stagger(0.2), duration: 0.8, ease: "anticipate" }
        // );
    }, []);

    const getProgressColor = (progress) => {
        if (progress < 30) return 'bg-red-500';
        if (progress < 70) return 'bg-yellow-400';
        return 'bg-green-500';
    };

    return (
        <div className="pb-20 px-5 sm:px-10"
        //  ref={scope}
        >
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl sm:text-4xl font-bold text-green-900 mb-12 text-center drop-shadow-md"
            >
                🚀 دوره‌های ثبت‌نامی شما
            </motion.h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {courses.map((course) => (
                    <motion.div
                        key={course.id}
                        className="course-card opacity-0 translate-y-10"
                        whileHover={{
                            y: -5,
                            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
                        }}
                    >
                        <div className="relative bg-white rounded-2xl p-6 shadow-xl h-full border-2 border-green-100 hover:border-green-200 transition-all">
                            {/* Header with Glow Effect */}
                            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-green-400 to-cyan-400 rounded-t-2xl" />

                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-800">
                                        {course.title}
                                        {course.progress === 100 && (
                                            <CheckCircle className="w-6 h-6 text-green-500 ml-2 inline" />
                                        )}
                                    </h3>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
                                            ⏳ {course.totalExercises} تمرین
                                        </span>
                                    </div>
                                </div>
                                <motion.div whileHover={{ rotate: 15 }}>
                                    <BookOpen className="w-12 h-12 text-green-600 p-2 bg-green-50 rounded-xl" />
                                </motion.div>
                            </div>

                            {/* Animated Progress Bar */}
                            <div className="mb-8">
                                <div className="flex justify-between text-sm mb-3 font-medium">
                                    <span className="text-gray-600">پیشرفت دوره:</span>
                                    <span className={`${getProgressColor(course.progress).replace('bg', 'text')}`}>
                                        {course.progress}%
                                    </span>
                                </div>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${course.progress}%` }}
                                    transition={{ duration: 1 }}
                                    className={`h-3 rounded-full ${getProgressColor(course.progress)} relative overflow-hidden`}
                                >
                                    <div className="absolute inset-0 bg-white/30 animate-pulse" />
                                </motion.div>
                            </div>

                            {/* Exercises Status */}
                            <div className="bg-green-50 p-4 rounded-xl mb-6">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center 
                      ${course.completedExercises === course.totalExercises
                                                ? 'bg-green-100 text-green-600'
                                                : 'bg-amber-100 text-amber-600'}`}>
                                            {course.completedExercises === course.totalExercises ? (
                                                <CheckCircle className="w-5 h-5" />
                                            ) : (
                                                <Clock className="w-5 h-5" />
                                            )}
                                        </div>
                                        <span className="font-medium">
                                            {course.completedExercises}/{course.totalExercises} تمرین
                                        </span>
                                    </div>
                                    <motion.a
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        href={course.link + "?tab=1"}
                                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
                                    >
                                        ادامه دوره
                                        <ArrowLeft className="w-4 h-4 mt-0.5" />
                                    </motion.a>
                                </div>
                            </div>

                            {/* Exam Card */}
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="bg-white border-2 border-dashed border-green-200 p-4 rounded-xl relative"
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h4 className="font-semibold text-green-900 mb-1 flex items-center gap-2">
                                            <Clock className="w-5 h-5" />
                                            آزمون نهایی
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            {course.finalExam.date}
                                        </p>
                                    </div>
                                    <motion.a
                                        whileHover={{ scale: 1.1 }}
                                        href={course.finalExam.link}
                                        className="bg-gradient-to-br from-green-500 to-cyan-500 text-white p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                                    >
                                        <AlertTriangle className="w-6 h-6" />
                                    </motion.a>
                                </div>

                                {/* Deadline Indicator */}
                                <div className="absolute -top-3 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs">
                                    مهلت باقی‌مانده: 15 روز
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                ))}
            </div>

        </div>
    );
}