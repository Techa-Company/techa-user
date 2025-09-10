import { useState } from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiAward, FiBook, FiCheck, FiClock, FiCode, FiAlertCircle } from "react-icons/fi";
import ExerciseEditor from "./ExerciseEditor";
import DueDate from "./DueDate";

export default function ExerciseDetails({ exercise, onBack, courseId }) {
    const [submitting, setSubmitting] = useState(false);
    const [code, setCode] = useState("");

    const difficultyColors = {
        0: 'text-green-600 bg-green-100',
        1: 'text-yellow-600 bg-yellow-100',
        2: 'text-red-600 bg-red-100',
        3: 'text-pulple-600 bg-pulple-100',
    };

    const statusColors = {
        0: 'text-gray-600 bg-gray-100',
        1: 'text-blue-600 bg-blue-100',
        2: 'text-green-600 bg-green-100',
        3: 'text-red-600 bg-red-100',
    };

    const handleSubmit = () => {
        setSubmitting(true);


        console.log(code)
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
        >
            <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                    <FiArrowRight className="h-5 w-5" />
                    بازگشت به لیست تمرینات
                </button>

                {exercise.UserScore !== null && (
                    <motion.div
                        className="text-center"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    >
                        <div className="bg-gradient-to-r from-green-400 to-emerald-600 text-white font-bold rounded-2xl p-4 w-20 h-20 flex flex-col items-center justify-center shadow-lg">
                            <span className="text-2xl">{exercise.UserScore}</span>
                            <span className="text-xs mt-1">از 100</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">نمره شما</p>
                    </motion.div>
                )}
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{exercise.Title}</h2>
                <p className="text-gray-600 dark:text-gray-300">{exercise.Description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className={`p-4 rounded-xl flex items-center gap-3 ${difficultyColors[exercise.Level]}`}>
                    <FiAward className="text-lg" />
                    <div>
                        <span className="text-sm block">سطح دشواری:</span>
                        <p className="font-medium">
                            {exercise.Level === 0 ? "آسان" :
                                exercise.Level === 1 ? "متوسط" :
                                    exercise.Level === 2 ? "دشوار" : "چالش برانگیز"}
                        </p>
                    </div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl flex items-center gap-3">
                    <FiClock className="text-lg text-gray-500" />
                    <div>
                        <span className="text-sm text-gray-500 block">مهلت تحویل:</span>
                        <DueDate utcDate={exercise.UserDueDate} />

                    </div>
                </div>
                <div className={`p-4 rounded-xl flex items-center gap-3 ${statusColors[exercise.UserStatus]}`}>
                    <FiBook className="text-lg" />
                    <div>
                        <span className="text-sm block">وضعیت:</span>
                        <p className="font-medium">
                            {exercise.UserStatus === 2 ? "تکمیل شده" :
                                exercise.UserStatus === 1 ? "در انتظار تصحیح" :
                                    exercise.UserStatus === 3 ? "نیاز به اصلاح" : "تکمیل نشده"}
                        </p>
                    </div>
                </div>
            </div>

            {exercise.UserFeedback && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-5 mb-8"
                >
                    <h3 className="font-bold text-green-800 dark:text-green-500 mb-3 flex items-center">
                        <FiAlertCircle className="ml-2" />
                        بازخورد مدرس
                    </h3>
                    <p className="text-green-700 dark:text-green-400">{exercise.UserFeedback}</p>
                </motion.div>
            )}

            <ExerciseEditor
                exercise={exercise}
                courseId={courseId}
                code={code}
                setCode={setCode}
                onSubmit={handleSubmit}
                submitting={submitting}
            />
        </motion.div>
    );
}