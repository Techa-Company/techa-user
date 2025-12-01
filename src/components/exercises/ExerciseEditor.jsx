"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FiCode, FiRefreshCw, FiCheck } from "react-icons/fi";
import ExerciseHTMLEditor from "../inline/exercises/ExerciseHTMLEditor";
import ExerciseJSEditor from "../inline/exercises/ExerciseJSEditor";
import ExerciseReactEditor from "../inline/exercises/ExerciseReactEditor";

export default function ExerciseEditor({ exercise, courseId, code, setCode, onSubmit, submitting }) {
    const [output, setOutput] = useState("");
    const [isSaved, setIsSaved] = useState(false);
    const editorRef = useRef(null);

    const isDisabled = exercise.UserStatus === 2 || exercise.UserStatus === 3;

    // بارگذاری کد اولیه از localStorage یا exercise.Code
    useEffect(() => {
        const savedCode = localStorage.getItem(`exercise-${exercise.Id}-code`);
        if (savedCode) {
            setCode(savedCode);
        } else if (exercise.Code) {
            setCode(exercise.Code);
            localStorage.setItem(`exercise-${exercise.Id}-code`, exercise.Code);
        } else {
            const defaultCode = '// کد خود را اینجا بنویسید\nfunction solution() {\n  \n}';
            setCode(defaultCode);
            localStorage.setItem(`exercise-${exercise.Id}-code`, defaultCode);
        }
    }, [exercise.Id, exercise.Code]);

    // ذخیره خودکار کد هنگام تغییر
    // useEffect(() => {
    //     if (isDisabled) return; // اگر غیرقابل ویرایش است ذخیره نکن
    //     const timer = setTimeout(() => {
    //         if (code) {
    //             localStorage.setItem(`exercise-${exercise.Id}-code`, code);
    //             setIsSaved(true);
    //             setTimeout(() => setIsSaved(false), 2000);
    //         }
    //     }, 1000);

    //     return () => clearTimeout(timer);
    // }, [code, exercise.Id, isDisabled]);

    // بازنشانی کد به حالت اولیه
    const resetCode = () => {
        if (isDisabled) return;
        if (confirm('آیا از بازنشانی کد به حالت اولیه اطمینان دارید؟')) {
            const initial = exercise.Code || '// کد خود را اینجا بنویسید\nfunction solution() {\n  \n}';
            setCode(initial);
            localStorage.setItem(`exercise-${exercise.Id}-code`, initial);
        }
    };

    // تعیین زبان بر اساس courseId
    const getLanguage = () => {
        switch (courseId) {
            case "19": return "html";
            case "10": return "react";
            case "21": return "javascript";
            default: return "html";
        }
    };

    // رندر ادیتور مناسب
    const renderEditor = () => {
        const language = getLanguage();
        const editorProps = { tutorialID: courseId, onCodeChange: setCode, editable: !isDisabled };

        switch (language) {
            case "html": return <ExerciseHTMLEditor {...editorProps} />;
            case "javascript": return <ExerciseJSEditor {...editorProps} />;
            case "react": return <ExerciseReactEditor {...editorProps} />;
            default: return <div>زبان تمرین پشتیبانی نمی‌شود</div>;
        }
    };

    return (
        <div className="mb-8">
            {/* عنوان و دکمه‌ها */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                    <FiCode />
                    محیط کدنویسی
                </h3>
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={resetCode}
                        disabled={isDisabled}
                        className={`text-sm flex items-center px-3 py-2 rounded-lg ${isDisabled
                            ? "text-gray-400 bg-gray-200 dark:bg-gray-700 cursor-not-allowed"
                            : "text-amber-600 hover:text-amber-800 bg-amber-100 hover:bg-amber-200 dark:bg-amber-900/30 dark:hover:bg-amber-900/50"
                            }`}
                    >
                        <FiRefreshCw className="ml-1" />
                        بازنشانی کد
                    </button>
                </div>
            </div>

            {/* ادیتور */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gray-50 dark:bg-gray-900 rounded-xl relative">
                <div className="flex items-center justify-between mb-4">
                    {isSaved && !isDisabled && (
                        <span className="text-xs text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full flex items-center">
                            ذخیره شد
                        </span>
                    )}
                </div>

                <div className="relative border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md">
                    {renderEditor()}
                    {isDisabled && (
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/80 to-gray-100/80 dark:from-gray-900/80 dark:to-gray-800/80 backdrop-blur-md flex flex-col items-center justify-center rounded-lg cursor-not-allowed z-10 p-4">
                            <div className="relative mb-3">
                                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center shadow-inner">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <div className="absolute -inset-2 bg-gray-300/40 dark:bg-gray-600/40 rounded-full blur-sm animate-pulse"></div>
                            </div>
                            <span className="text-gray-600 dark:text-gray-300 text-sm font-medium text-center">تمرین قفل شده است</span>
                            <span className="text-gray-500 dark:text-gray-400 text-xs mt-1 text-center">این بخش در حال حاضر غیرقابل ویرایش می‌باشد</span>
                        </div>
                    )}
                </div>

                {/* بخش خروجی */}
                {output && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                        <div className="bg-gray-800 text-gray-100 px-4 py-2 text-sm font-mono flex items-center justify-between">
                            <span>خروجی</span>
                        </div>
                        <pre className="p-4 bg-gray-900 text-green-400 font-mono text-sm overflow-auto max-h-60">
                            {output}
                        </pre>
                    </motion.div>
                )}

                {/* دکمه ارسال */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onSubmit(code)}
                        disabled={submitting || isDisabled}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium py-3 px-8 rounded-xl transition-all shadow-lg hover:shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {submitting ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                در حال ارسال...
                            </>
                        ) : (
                            <>
                                <FiCheck className="w-5 h-5" />
                                ارسال تمرین
                            </>
                        )}
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
}
