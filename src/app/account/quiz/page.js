"use client";
import { motion, stagger, useAnimate } from 'framer-motion';
import { BookOpen, Clock, AlertTriangle, Zap, CheckCircle, XCircle, Rocket, Trophy } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ExamsPage() {
    const [exams, setExams] = useState([
        {
            id: 1,
            title: 'آزمون نهایی React پیشرفته',
            questions: 30,
            time: 90,
            passedScore: 80,
            attempts: [
                { date: '۱۴۰۳/۰۳/۱۵', score: 92, status: 'passed' },
                { date: '۱۴۰۳/۰۲/۲۰', score: 65, status: 'failed' }
            ]
        },
        {
            id: 2,
            title: 'آزمون میان‌ترم Next.js',
            questions: 20,
            time: 60,
            passedScore: 70,
            attempts: []
        },
        {
            id: 3,
            title: 'آزمون میان‌ترم Next.js',
            questions: 20,
            time: 60,
            passedScore: 70,
            attempts: []
        }
    ]);

    const [scope, animate] = useAnimate();
    const [selectedExam, setSelectedExam] = useState(null);
    const [showStartModal, setShowStartModal] = useState(false);

    useEffect(() => {
        animate(
            ".exam-card, .result-card",
            { opacity: 1, y: 0 },
            { delay: stagger(0.1), duration: 0.5 }
        );
    }, []);

    const startExam = (examId) => {
        setSelectedExam(exams.find(e => e.id === examId));
        setShowStartModal(true);
    };

    const getStatusColor = (status) => {
        return status === 'passed' ? 'bg-emerald-500' : 'bg-rose-500';
    };

    return (
        <div className=" p-8" ref={scope}>
            {/* هدر صفحه */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 text-center"
            >
                <h1 className="text-4xl font-bold text-emerald-800 mb-4 flex items-center justify-center gap-3">
                    <Trophy className="w-12 h-12" />
                    آزمون‌های من
                </h1>
                <p className="text-emerald-600">نتایج آخرین آزمون‌های انجام شده</p>
            </motion.div>

            {/* لیست آزمون‌ها */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                {exams.map((exam) => (
                    <motion.div
                        key={exam.id}
                        className="exam-card opacity-0 translate-y-10"
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-emerald-100">
                            {/* هدر کارت */}
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-emerald-800">{exam.title}</h3>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
                                            {exam.questions} سوال
                                        </span>
                                        <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">
                                            {exam.time} دقیقه
                                        </span>
                                    </div>
                                </div>
                                <BookOpen className="w-12 h-12 text-emerald-600 p-2 bg-emerald-50 rounded-xl" />
                            </div>

                            {/* اطلاعات آزمون */}
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">نمره قبولی:</span>
                                    <span className="font-bold text-emerald-700">{exam.passedScore}+</span>
                                </div>

                                {exam.attempts.length > 0 ? (
                                    <div className="bg-emerald-50 p-4 rounded-xl">
                                        <h4 className="font-semibold text-emerald-800 mb-3">آخرین نتیجه:</h4>
                                        {exam.attempts.slice(0, 1).map((attempt, idx) => (
                                            <div key={idx} className="flex justify-between items-center">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(attempt.status)}`}>
                                                        {attempt.status === 'passed' ? (
                                                            <CheckCircle className="w-5 h-5 text-white" />
                                                        ) : (
                                                            <XCircle className="w-5 h-5 text-white" />
                                                        )}
                                                    </div>
                                                    <span className="font-medium">{attempt.score} نمره</span>
                                                </div>
                                                <span className="text-sm text-gray-600">{attempt.date}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bg-amber-50 p-4 rounded-xl text-amber-800 flex items-center gap-3">
                                        <AlertTriangle className="w-6 h-6" />
                                        هنوز شرکت نکرده‌اید
                                    </div>
                                )}
                            </div>

                            {/* دکمه اقدامات */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => startExam(exam.id)}
                                className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-3 rounded-xl font-bold
                          flex items-center justify-center gap-2 hover:shadow-lg transition-shadow"
                            >
                                <Zap className="w-5 h-5" />
                                {exam.attempts.length > 0 ? 'آزمون مجدد' : 'شروع آزمون'}
                            </motion.button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* مودال شروع آزمون */}
            {showStartModal && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="bg-white rounded-2xl p-8 max-w-md w-full"
                    >
                        <div className="text-center mb-6">
                            <Rocket className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-emerald-800 mb-2">آماده شروع هستید؟</h3>
                            <p className="text-gray-600">آزمون {selectedExam.title}</p>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">زمان آزمون:</span>
                                <span className="font-medium">{selectedExam.time} دقیقه</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">تعداد سوالات:</span>
                                <span className="font-medium">{selectedExam.questions}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">نمره قبولی:</span>
                                <span className="font-medium text-emerald-600">{selectedExam.passedScore}+</span>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowStartModal(false)}
                                className="flex-1 bg-gray-100 text-gray-800 py-3 rounded-xl"
                            >
                                انصراف
                            </motion.button>
                            <motion.a
                                href={`/account/quiz/${selectedExam.id}`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"
                            >
                                <Zap className="w-5 h-5" />
                                شروع آزمون
                            </motion.a>
                        </div>
                    </motion.div>
                </motion.div>
            )}

            {/* بخش نتایج تاریخی */}
            <div className="mt-16">
                <h2 className="text-2xl font-bold text-emerald-800 mb-6 flex items-center gap-3">
                    <Clock className="w-8 h-8" />
                    تاریخچه نتایج
                </h2>

                <div className="grid grid-cols-2 gap-4">
                    {exams.map(exam =>
                        exam.attempts.map((attempt, idx) => (
                            <motion.div
                                key={`${exam.id}-${idx}`}
                                className="result-card opacity-0 translate-y-10"
                            >
                                <div className="bg-white rounded-xl p-6 shadow-md flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getStatusColor(attempt.status)}`}>
                                            {attempt.status === 'passed' ? (
                                                <CheckCircle className="w-6 h-6 text-white" />
                                            ) : (
                                                <XCircle className="w-6 h-6 text-white" />
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-emerald-800">{exam.title}</h4>
                                            <p className="text-sm text-gray-600">{attempt.date}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className={`text-2xl font-bold ${getStatusColor(attempt.status).replace('bg', 'text')}`}>
                                            {attempt.score}
                                        </span>
                                        <p className="text-sm text-gray-600">از {exam.passedScore}+</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}