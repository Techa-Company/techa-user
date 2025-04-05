import { motion } from "framer-motion";
import { Trophy, Sparkles, RotateCw, Leaf, Code } from "lucide-react";
import ProgressCircle from "./ProgressCircle";
import HistorySection from "./HistorySection";
import TechBadge from "./TechBadge";

const ResultScreen = ({
    score,
    total,
    tech,
    answers,
    questions,
    onRestart,
    history,
    calculateUserLevel
}) => {
    const percentage = Math.round((score / total) * 100);
    const { level, color } = calculateUserLevel(score, total);
    const avgTime = Math.round(
        questions.reduce((sum, q, i) =>
            sum + (q.time - (answers[i] === -1 ? q.time : 0)),
            0
        )) / questions.length;

    return (
        <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-4xl mx-auto px-4 py-12"
        >
            <div className="text-center mb-12 space-y-8">
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="inline-flex flex-col items-center"
                >
                    <div className={`p-6 rounded-2xl shadow-lg mb-4 ${color} text-white 
                        bg-gradient-to-br from-emerald-500 to-green-600`}>
                        <Trophy className="w-12 h-12" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800">
                        <span className="bg-gradient-to-r from-emerald-600 to-green-500 
                            bg-clip-text text-transparent">
                            ارزیابی تکمیل شد!
                        </span>
                    </h2>
                    <div className={`mt-2 px-4 py-1 rounded-full ${color} 
                        bg-opacity-20 text-emerald-700 font-medium`}>
                        سطح مهارت: {level}
                    </div>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* کارت امتیاز نهایی */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald-100 
                        bg-gradient-to-b from-white to-emerald-50">
                        <h3 className="text-lg font-semibold text-emerald-700 mb-2 flex items-center gap-2">
                            <Sparkles className="w-5 h-5" />
                            امتیاز نهایی
                        </h3>
                        <div className="text-4xl font-bold text-emerald-600">
                            {score}<span className="text-2xl text-emerald-400">/{total}</span>
                        </div>
                        <div className="mt-2 text-sm text-emerald-500">
                            {percentage}% پاسخ صحیح
                        </div>
                    </div>

                    {/* کارت میانگین زمان */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald-100 
                        bg-gradient-to-b from-white to-emerald-50">
                        <h3 className="text-lg font-semibold text-emerald-700 mb-2 flex items-center gap-2">
                            <Leaf className="w-5 h-5" />
                            سرعت پاسخگویی
                        </h3>
                        <div className="text-4xl font-bold text-emerald-600">
                            {avgTime.toFixed(2)} ثانیه
                        </div>
                        <div className="mt-2 text-sm text-emerald-500">
                            میانگین زمان هر سوال
                        </div>
                    </div>

                    {/* کارت مهارت‌ها */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald-100 
                        bg-gradient-to-b from-white to-emerald-50">
                        <h3 className="text-lg font-semibold text-emerald-700 mb-2 flex items-center gap-2">
                            <Code className="w-5 h-5" />
                            حوزه‌های ارزیابی
                        </h3>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {tech.map(t => (
                                <TechBadge key={t} tech={t} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* نمودار پیشرفت */}
                <div className="flex justify-center mt-8 w-full">
                    <ProgressCircle
                        progress={percentage}
                        size={160}
                        strokeWidth={12}
                        color="stroke-emerald-500"
                        className=" border-emerald-100 rounded-full p-2"
                    />
                </div>

                {/* دکمه آزمون مجدد */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex justify-center gap-4 pt-6"
                >
                    <motion.button
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0 8px 20px -5px rgba(16, 185, 129, 0.3)"
                        }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onRestart}
                        className="bg-gradient-to-br from-emerald-500 to-green-600 text-white 
                            px-8 py-4 rounded-xl font-medium shadow-lg hover:shadow-emerald-200/50 
                            transition-all flex items-center gap-3"
                    >
                        <RotateCw className="w-5 h-5" />
                        ارزیابی مجدد
                    </motion.button>
                </motion.div>
            </div>

            {/* تاریخچه نتایج */}
            {/* <HistorySection
                history={history}
                className="bg-white rounded-2xl shadow-sm p-6 border border-emerald-100 
                    bg-gradient-to-b from-white to-emerald-50"
            /> */}
        </motion.div>
    );
};

export default ResultScreen;