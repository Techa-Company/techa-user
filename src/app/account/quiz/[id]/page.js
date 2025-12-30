"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Clock, ChevronRight, ChevronLeft, Flag, CheckCircle,
    AlertTriangle, LayoutGrid, Check, LogOut, Award, PartyPopper
} from 'lucide-react';
import Link from 'next/link';

// سوالات نمونه
const mockQuestions = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    text: `سوال شماره ${i + 1}: در React، هوک useEffect چه زمانی اجرا می‌شود؟`,
    options: [
        { id: 1, text: 'فقط هنگام Mount شدن کامپوننت' },
        { id: 2, text: 'پس از هر بار Render شدن کامپوننت' },
        { id: 3, text: 'فقط زمانی که State تغییر کند' },
        { id: 4, text: 'قبل از Render شدن کامپوننت' },
    ],
    correctOption: 2
}));

export default function LiveExamPage() {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [answers, setAnswers] = useState({});
    const [flagged, setFlagged] = useState(new Set());
    const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes
    const [isFinished, setIsFinished] = useState(false);
    const [score, setScore] = useState(0);

    // تایمر
    useEffect(() => {
        if (isFinished) return;
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    finishExam();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [isFinished]);

    const formatTime = (sec) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const handleAnswer = (optId) => {
        setAnswers(prev => ({ ...prev, [currentIdx]: optId }));
    };

    const toggleFlag = () => {
        const newSet = new Set(flagged);
        if (newSet.has(currentIdx)) newSet.delete(currentIdx);
        else newSet.add(currentIdx);
        setFlagged(newSet);
    };

    const finishExam = () => {
        let correctCount = 0;
        mockQuestions.forEach((q, idx) => {
            if (answers[idx] === q.correctOption) correctCount++;
        });
        setScore(Math.round((correctCount / mockQuestions.length) * 100));
        setIsFinished(true);
    };

    if (isFinished) {
        return <ResultView score={score} total={mockQuestions.length} correct={Math.round((score / 100) * mockQuestions.length)} />;
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans" dir="rtl">

            {/* --- Sidebar Navigation (Left on RTL) --- */}
            <aside className="w-full md:w-80 bg-white border-l border-slate-200 flex flex-col h-auto md:h-screen sticky top-0 z-20">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <div>
                        <h2 className="font-bold text-slate-800">آزمون جامع React</h2>
                        <span className="text-xs text-slate-500">کد آزمون: #4492</span>
                    </div>
                    <div className={`px-3 py-1.5 rounded-lg font-mono font-bold text-lg flex items-center gap-2 ${timeLeft < 300 ? 'bg-rose-100 text-rose-600 animate-pulse' : 'bg-indigo-50 text-indigo-600'}`}>
                        <Clock className="w-4 h-4" />
                        {formatTime(timeLeft)}
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-4">سوالات آزمون</p>
                    <div className="grid grid-cols-5 gap-2">
                        {mockQuestions.map((_, idx) => {
                            const isAnswered = answers[idx] !== undefined;
                            const isFlagged = flagged.has(idx);
                            const isCurrent = currentIdx === idx;

                            return (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentIdx(idx)}
                                    className={`aspect-square rounded-xl flex items-center justify-center text-sm font-bold transition-all relative
                                        ${isCurrent ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 scale-110 z-10' :
                                            isAnswered ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
                                                'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                                >
                                    {idx + 1}
                                    {isFlagged && <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500 border border-white"></div>}
                                </button>
                            );
                        })}
                    </div>

                    <div className="mt-8 space-y-3">
                        <div className="flex items-center gap-2 text-xs text-slate-500"><div className="w-3 h-3 bg-emerald-100 border border-emerald-200 rounded"></div> پاسخ داده شده</div>
                        <div className="flex items-center gap-2 text-xs text-slate-500"><div className="w-3 h-3 bg-indigo-600 rounded"></div> سوال جاری</div>
                        <div className="flex items-center gap-2 text-xs text-slate-500"><div className="w-3 h-3 bg-slate-100 rounded"></div> بی‌پاسخ</div>
                        <div className="flex items-center gap-2 text-xs text-slate-500"><div className="w-2 h-2 bg-amber-500 rounded-full mx-0.5"></div> نشان‌شده</div>
                    </div>
                </div>

                <div className="p-4 border-t border-slate-200">
                    <button
                        onClick={finishExam}
                        className="w-full py-3 rounded-xl bg-rose-50 text-rose-600 font-bold border border-rose-100 hover:bg-rose-100 transition-colors flex items-center justify-center gap-2"
                    >
                        <LogOut className="w-4 h-4" />
                        پایان آزمون
                    </button>
                </div>
            </aside>

            {/* --- Main Question Area --- */}
            <main className="flex-1 p-6 md:p-10 flex flex-col max-w-4xl mx-auto w-full">

                {/* Progress Bar */}
                <div className="w-full h-1.5 bg-slate-100 rounded-full mb-8 overflow-hidden">
                    <motion.div
                        className="h-full bg-indigo-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentIdx + 1) / mockQuestions.length) * 100}%` }}
                    />
                </div>

                <AnimatePresence mode='wait'>
                    <motion.div
                        key={currentIdx}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -20, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex-1 flex flex-col"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <span className="bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-bold">
                                سوال {currentIdx + 1} از {mockQuestions.length}
                            </span>
                            <button
                                onClick={toggleFlag}
                                className={`flex items-center gap-2 text-sm font-medium transition-colors ${flagged.has(currentIdx) ? 'text-amber-500' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                <Flag className={`w-4 h-4 ${flagged.has(currentIdx) ? 'fill-current' : ''}`} />
                                {flagged.has(currentIdx) ? 'نشان شده' : 'نشان کردن'}
                            </button>
                        </div>

                        <h2 className="text-xl md:text-2xl font-bold text-slate-800 leading-relaxed mb-10">
                            {mockQuestions[currentIdx].text}
                        </h2>

                        <div className="space-y-4">
                            {mockQuestions[currentIdx].options.map((opt) => (
                                <button
                                    key={opt.id}
                                    onClick={() => handleAnswer(opt.id)}
                                    className={`w-full p-5 rounded-2xl text-right transition-all border-2 relative overflow-hidden group ${answers[currentIdx] === opt.id
                                            ? 'border-indigo-600 bg-indigo-50 text-indigo-900 shadow-sm'
                                            : 'border-slate-100 bg-white text-slate-600 hover:border-indigo-200'
                                        }`}
                                >
                                    <div className="flex items-center gap-4 relative z-10">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border ${answers[currentIdx] === opt.id
                                                ? 'bg-indigo-600 text-white border-indigo-600'
                                                : 'bg-white text-slate-400 border-slate-200 group-hover:border-indigo-300'
                                            }`}>
                                            {String.fromCharCode(65 + opt.id - 1)}
                                        </div>
                                        <span className="font-medium text-lg">{opt.text}</span>
                                    </div>
                                    {answers[currentIdx] === opt.id && (
                                        <motion.div layoutId="check" className="absolute left-6 top-1/2 -translate-y-1/2 text-indigo-600">
                                            <CheckCircle className="w-6 h-6 fill-indigo-100" />
                                        </motion.div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="mt-10 flex justify-between items-center pt-6 border-t border-slate-100">
                    <button
                        onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
                        disabled={currentIdx === 0}
                        className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        <ChevronRight className="w-5 h-5" />
                        قبلی
                    </button>

                    <button
                        onClick={() => {
                            if (currentIdx < mockQuestions.length - 1) setCurrentIdx(prev => prev + 1);
                            else finishExam();
                        }}
                        className="px-8 py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-600/20 flex items-center gap-2"
                    >
                        {currentIdx === mockQuestions.length - 1 ? 'پایان آزمون' : 'سوال بعدی'}
                        {currentIdx === mockQuestions.length - 1 ? <Check className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                    </button>
                </div>

            </main>
        </div>
    );
}

// --- Result Component ---
const ResultView = ({ score, total, correct }) => {
    const isPassed = score >= 60;

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="min-h-screen bg-slate-50 flex items-center justify-center p-4"
        >
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-lg w-full text-center relative overflow-hidden">
                {isPassed && <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-teal-500"></div>}

                <motion.div
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center ${isPassed ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}
                >
                    {isPassed ? <Trophy className="w-12 h-12" /> : <AlertTriangle className="w-12 h-12" />}
                </motion.div>

                <h1 className="text-3xl font-extrabold text-slate-800 mb-2">
                    {isPassed ? 'تبریک! قبول شدید' : 'متاسفانه قبول نشدید'}
                </h1>
                <p className="text-slate-500 mb-10">
                    {isPassed ? 'شما با موفقیت آزمون را پشت سر گذاشتید.' : 'نیاز به تلاش بیشتر دارید.'}
                </p>

                <div className="relative w-48 h-48 mx-auto mb-10">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle cx="96" cy="96" r="88" className="text-slate-100" strokeWidth="12" fill="none" stroke="currentColor" />
                        <motion.circle
                            initial={{ pathLength: 0 }} animate={{ pathLength: score / 100 }} transition={{ duration: 1.5, ease: "easeOut" }}
                            cx="96" cy="96" r="88"
                            className={isPassed ? "text-emerald-500" : "text-rose-500"}
                            strokeWidth="12" fill="none" strokeLinecap="round" stroke="currentColor"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-5xl font-extrabold text-slate-800">{score}%</span>
                        <span className="text-sm text-slate-400 font-medium mt-1">نمره نهایی</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-slate-50 p-4 rounded-2xl">
                        <div className="text-2xl font-bold text-slate-800">{total}</div>
                        <div className="text-xs text-slate-500">کل سوالات</div>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl">
                        <div className="text-2xl font-bold text-slate-800">{correct}</div>
                        <div className="text-xs text-slate-500">پاسخ صحیح</div>
                    </div>
                </div>

                <div className="flex gap-3">
                    <Link href="/account/exams" className="flex-1">
                        <button className="w-full py-3.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50">
                            بازگشت
                        </button>
                    </Link>
                    {isPassed && (
                        <button className="flex-1 py-3.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2">
                            <Award className="w-5 h-5" />
                            دریافت مدرک
                        </button>
                    )}
                </div>
            </div>
        </motion.div>
    );
};