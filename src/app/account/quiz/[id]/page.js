"use client";
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { CheckCircle, Clock, AlertTriangle, ChevronRight, ChevronLeft, Trophy, Zap } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function LiveExamPage() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [timeLeft, setTimeLeft] = useState(90 * 60); // 90 دقیقه
    const [answers, setAnswers] = useState({});
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);

    const questions = [
        {
            id: 1,
            text: 'کدام یک از موارد زیر از ویژگی‌های React هستند؟',
            options: [
                { id: 1, text: 'مبتنی بر کامپوننت', isCorrect: true },
                { id: 2, text: 'دو طرفه (Two-way binding)', isCorrect: false },
                { id: 3, text: 'مجازی DOM', isCorrect: true },
                { id: 4, text: 'زندگی چرخه (Lifecycle Methods)', isCorrect: true },
            ],
            points: 5
        },
        // سوالات بیشتر...
    ];

    // انیمیشن تایمر
    const pathLength = useMotionValue(1);
    const pathColor = useTransform(
        pathLength,
        [0.5, 0.2, 0],
        ["#10b981", "#f59e0b", "#ef4444"]
    );

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
            pathLength.set(timeLeft / (90 * 60));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleAnswer = (optionId) => {
        setAnswers(prev => ({
            ...prev,
            [currentQuestion]: [...(prev[currentQuestion] || []), optionId]
        }));
    };

    const calculateScore = () => {
        let total = 0;
        questions.forEach((question, index) => {
            const correctAnswers = question.options.filter(opt => opt.isCorrect).map(opt => opt.id);
            if (JSON.stringify(answers[index]?.sort()) === JSON.stringify(correctAnswers.sort())) {
                total += question.points;
            }
        });
        setScore(total);
        setShowResult(true);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (showResult) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-h-screen flex items-center justify-center p-8"
            >
                <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-md w-full text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="inline-block mb-6"
                    >
                        <Trophy className="w-16 h-16 text-emerald-600" />
                    </motion.div>

                    <h2 className="text-3xl font-bold text-emerald-800 mb-4">🎉 آزمون تکمیل شد!</h2>

                    <div className="space-y-4 mb-8">
                        <div className="bg-emerald-50 p-4 rounded-xl">
                            <span className="text-4xl font-bold text-emerald-600">{score}</span>
                            <p className="text-sm text-emerald-800">نمره نهایی شما</p>
                        </div>

                        <div className="flex justify-center gap-4">
                            <div className="bg-green-100 p-3 rounded-lg">
                                <span className="text-2xl font-bold text-green-600">
                                    {Object.keys(answers).length}
                                </span>
                                <p className="text-sm text-green-800">سوال پاسخ داده شده</p>
                            </div>

                            <div className="bg-amber-100 p-3 rounded-lg">
                                <span className="text-2xl font-bold text-amber-600">
                                    {questions.length - Object.keys(answers).length}
                                </span>
                                <p className="text-sm text-amber-800">سوال باقی مانده</p>
                            </div>
                        </div>
                    </div>
                    <Link href="/account/quiz">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold"
                        >
                            بازگشت به داشبورد
                        </motion.button>
                    </Link>
                </div>
            </motion.div>
        );
    }

    return (
        <div className=" p-8">
            {/* نوار وضعیت */}
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 mb-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <motion.div whileHover={{ rotate: 15 }}>
                            <Zap className="w-8 h-8 text-emerald-600" />
                        </motion.div>
                        <h1 className="text-2xl font-bold text-emerald-800">آزمون React پیشرفته</h1>
                    </div>

                    {/* تایمر */}
                    <motion.div className="relative w-16 h-16">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                            <motion.circle
                                cx="50"
                                cy="50"
                                r="45"
                                pathLength="1"
                                strokeWidth="8"
                                strokeLinecap="round"
                                stroke={pathColor}
                                fill="transparent"
                                style={{ pathLength }}
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center font-bold text-emerald-800">
                            {formatTime(timeLeft)}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* محتوای اصلی */}
            <div className="max-w-4xl mx-auto">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={currentQuestion}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -50, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                        className="bg-white rounded-2xl shadow-lg p-8"
                    >
                        {/* هدر سوال */}
                        <div className="flex justify-between items-center mb-8">
                            <div className="flex items-center gap-4">
                                <span className="bg-emerald-100 text-emerald-800 px-4 py-1 rounded-full">
                                    سوال {currentQuestion + 1}
                                </span>
                                <span className="text-emerald-600">
                                    {questions[currentQuestion].points} نمره
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-emerald-800">
                                {answers[currentQuestion] && (
                                    <>
                                        <CheckCircle className="w-5 h-5" />
                                        پاسخ داده شده
                                    </>
                                )}
                            </div>
                        </div>

                        {/* متن سوال */}
                        <h3 className="text-xl font-semibold text-gray-800 mb-8 leading-relaxed">
                            {questions[currentQuestion].text}
                        </h3>

                        {/* گزینه‌های پاسخ */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {questions[currentQuestion].options.map((option) => (
                                <motion.button
                                    key={option.id}
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleAnswer(option.id)}
                                    className={`p-4 rounded-xl border-2 transition-all text-left
                    ${answers[currentQuestion]?.includes(option.id)
                                            ? 'border-emerald-500 bg-emerald-50'
                                            : 'border-gray-200 hover:border-emerald-200'}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center
                      ${answers[currentQuestion]?.includes(option.id)
                                                ? 'bg-emerald-500 text-white'
                                                : 'bg-gray-100 text-gray-600'}`}>
                                            {String.fromCharCode(65 + option.id - 1)}
                                        </div>
                                        <span className="text-gray-800">{option.text}</span>
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* نوار ناوبری */}
                <div className="mt-8 bg-white rounded-2xl shadow-lg p-4">
                    <div className="flex justify-between items-center">
                        <motion.button
                            whileHover={{ x: -5 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                            className="flex items-center gap-2 bg-emerald-100 text-emerald-800 px-6 py-3 rounded-xl"
                            disabled={currentQuestion === 0}
                        >
                            <ChevronLeft className="w-5 h-5" />
                            قبلی
                        </motion.button>

                        {/* پیشرفت آزمون */}
                        <div className="flex gap-2">
                            {questions.map((_, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.1 }}
                                    onClick={() => setCurrentQuestion(index)}
                                    className={`w-3 h-3 rounded-full cursor-pointer
                    ${index === currentQuestion
                                            ? 'bg-emerald-600 scale-150'
                                            : answers[index]
                                                ? 'bg-emerald-300'
                                                : 'bg-gray-200'}`}
                                />
                            ))}
                        </div>

                        <motion.button
                            whileHover={{ x: 5 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                                currentQuestion < questions.length - 1
                                    ? setCurrentQuestion(prev => prev + 1)
                                    : calculateScore()
                            }
                            className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl"
                        >
                            {currentQuestion < questions.length - 1 ? 'بعدی' : 'اتمام آزمون'}
                            <ChevronRight className="w-5 h-5" />
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* افکت‌های پس‌زمینه */}
            <div className="fixed inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-emerald-400/20 rounded-full"
                        initial={{
                            x: Math.random() * 100 + '%',
                            y: Math.random() * 100 + '%',
                            scale: 0
                        }}
                        animate={{
                            scale: [0, Math.random() * 2 + 1, 0],
                            opacity: [0, 0.3, 0]
                        }}
                        transition={{
                            duration: Math.random() * 5 + 5,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                ))}
            </div>
        </div>
    );
}