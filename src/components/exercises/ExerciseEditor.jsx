"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FiCode, FiMoon, FiSun, FiRefreshCw, FiPlay, FiCheck } from "react-icons/fi";
import ExerciseHTMLEditor from "../inline/exercises/ExerciseHTMLEditor";
import ExerciseJSEditor from "../inline/exercises/ExerciseJSEditor";
import ExerciseReactEditor from "../inline/exercises/ExerciseReactEditor";


export default function ExerciseEditor({ exercise, courseId, code, setCode, onSubmit, submitting }) {
    const [output, setOutput] = useState("");
    const [isExecuting, setIsExecuting] = useState(false);
    const [theme, setTheme] = useState('light');
    const [isSaved, setIsSaved] = useState(false);
    const editorRef = useRef(null);
    console.log(exercise.Id)
    // بارگذاری کد ذخیره شده از localStorage
    useEffect(() => {
        const savedCode = localStorage.getItem(`exercise-${exercise.Id}-code`);
        if (savedCode) {
            setCode(savedCode);
        } else {
            setCode(exercise.initialCode || '// کد خود را اینجا بنویسید\nfunction solution() {\n  \n}');
        }
    }, [exercise.Id, exercise.initialCode]);

    // ذخیره خودکار کد هنگام تغییر
    useEffect(() => {
        const timer = setTimeout(() => {
            if (code) {
                localStorage.setItem(`exercise-${exercise.Id}-code`, code);
                setIsSaved(true);
                setTimeout(() => setIsSaved(false), 2000);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [code, exercise.Id]);

    const resetCode = () => {
        if (confirm('آیا از بازنشانی کد به حالت اولیه اطمینان دارید؟')) {
            setCode(exercise.initialCode || '// کد خود را اینجا بنویسید\nfunction solution() {\n  \n}');
        }
    };


    // تعیین زبان بر اساس courseId
    const getLanguage = () => {
        switch (courseId) {
            case "19":
                return "html";
            case "10":
                return "react";
            case "21":
                return "javascript";
            default:
                return "html"; // مقدار پیش‌فرض
        }
    };

    const renderEditor = () => {
        const language = getLanguage();

        switch (language) {
            case "html":
                return (
                    <ExerciseHTMLEditor
                        tutorialID={courseId}
                        onCodeChange={setCode}
                        editable={true}
                    />
                );
            case "javascript":
                return (
                    <ExerciseJSEditor
                        tutorialID={courseId}
                        onCodeChange={setCode}
                        editable={true}
                    />
                );
            case "react":
                return (
                    <ExerciseReactEditor
                        tutorialID={courseId}
                        onCodeChange={setCode}
                        editable={true}
                    />
                );
            default:
                return <div>زبان تمرین پشتیبانی نمی‌شود</div>;
        }
    };

    return (
        <div className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                    <FiCode />
                    محیط کدنویسی
                </h3>
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={resetCode}
                        className="text-sm text-amber-600 hover:text-amber-800 flex items-center px-3 py-2 rounded-lg bg-amber-100 hover:bg-amber-200 dark:bg-amber-900/30 dark:hover:bg-amber-900/50"
                    >
                        <FiRefreshCw className="ml-1" />
                        بازنشانی کد
                    </button>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gray-50 dark:bg-gray-900 rounded-xl "
            >
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        {isSaved && (
                            <span className="text-xs text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full flex items-center">
                                ذخیره شد
                            </span>
                        )}
                    </div>

                </div>

                <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    {renderEditor()}
                </div>

                {/* بخش خروجی کد */}
                {output && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                    >
                        <div className="bg-gray-800 text-gray-100 px-4 py-2 text-sm font-mono flex items-center justify-between">
                            <span>خروجی</span>
                        </div>
                        <pre className="p-4 bg-gray-900 text-green-400 font-mono text-sm overflow-auto max-h-60">
                            {output}
                        </pre>
                    </motion.div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onSubmit(code)}
                        disabled={submitting || exercise.UserStatus === 2 || exercise.UserStatus === 1}
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