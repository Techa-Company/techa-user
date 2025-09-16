import { motion } from "framer-motion";
import DueDate from "./DueDate";

export default function ExerciseCard({ exercise, index, onClick }) {
    const getStatusColor = () => {
        switch (exercise.UserStatus) {
            case 1: return {
                bg: "bg-gradient-to-r from-amber-50 to-orange-50",
                text: "text-amber-700",
                border: "border-amber-200",
                icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                )
            };
            case 2: return {
                bg: "bg-gradient-to-r from-green-50 to-emerald-50",
                text: "text-green-700",
                border: "border-green-200",
                icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                )
            };
            case 3: return {
                bg: "bg-gradient-to-r from-red-50 to-rose-50",
                text: "text-red-700",
                border: "border-red-200",
                icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                )
            };
            default: return {
                bg: "bg-gradient-to-r from-gray-50 to-slate-50",
                text: "text-gray-700",
                border: "border-gray-200",
                icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                )
            };
        }
    };

    const getStatusText = () => {
        switch (exercise.UserStatus) {
            case 1: return "در انتظار تصحیح";
            case 2: return "تکمیل شده";
            case 3: return "نیاز به اصلاح";
            default: return "تکمیل نشده";
        }
    };

    const getDifficultyColor = () => {
        switch (exercise.Level) {
            case 0: return {
                text: "text-green-700",
                bg: "bg-green-100",
                icon: (
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                )
            };
            case 1: return {
                text: "text-blue-700",
                bg: "bg-blue-100",
                icon: (
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                )
            };
            case 2: return {
                text: "text-red-700",
                bg: "bg-red-100",
                icon: (
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                )
            };
            default: return {
                text: "text-purple-700",
                bg: "bg-purple-100",
                icon: (
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                )
            };
        }
    };

    const statusStyle = getStatusColor();
    const difficultyStyle = getDifficultyColor();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
                damping: 12
            }}
            whileHover={{
                y: -5,
                transition: { duration: 0.2 }
            }}
            className={`relative rounded-2xl p-6 shadow-lg border-2 transition-all duration-300 cursor-pointer overflow-hidden
            ${statusStyle.bg} ${statusStyle.border}`}
            onClick={onClick}
        >
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                <svg viewBox="0 0 100 100" className="text-current">
                    <path d="M0,0 L100,0 L100,100 Z" fill="currentColor" />
                </svg>
            </div>

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                        <div className="flex items-center justify-between gap-2 mb-3">
                            <span className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center ${difficultyStyle.bg} ${difficultyStyle.text}`}>
                                {difficultyStyle.icon}
                                {exercise.Level === 0 ? "آسان" :
                                    exercise.Level === 1 ? "متوسط" :
                                        exercise.Level === 2 ? "دشوار" : "چالش برانگیز"}
                            </span>

                            {exercise.UserScore != null && (
                                <div className="relative">
                                    <div className="bg-gradient-to-r from-green-400 to-emerald-600 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center text-sm shadow-lg">
                                        {exercise.UserScore}
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                                        <div className="bg-green-500 rounded-full w-3 h-3"></div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <h3 className="text-xl font-bold text-gray-800 mb-2">{exercise.Title}</h3>
                        <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">{exercise.Description}</p>
                    </div>
                </div>

                <div className="flex justify-between items-center mt-6">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-medium border flex items-center gap-1 ${statusStyle.text} ${statusStyle.border}`}>
                        {statusStyle.icon}
                        {getStatusText()}
                    </span>

                    {/* <div className="text-left flex items-center gap-1">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                            <span className="text-xs text-gray-500 block">مهلت:</span>
                            <DueDate utcDate={exercise.UserDueDate} />
                        </div>
                    </div> */}
                </div>

                {exercise.UserScore !== null && (
                    <div className="mt-4 bg-white/50 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs text-gray-600">نمره شما:</span>
                            <span className="text-xs font-bold text-gray-700">{exercise.UserScore} از 100</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div
                                className="bg-gradient-to-r from-green-400 to-emerald-600 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${(exercise.UserScore / 100) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                )}

                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
            </div>
        </motion.div>
    );
}