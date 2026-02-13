import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft,
    Award,
    BookOpen,
    CheckCircle,
    Clock,
    AlertCircle,
    ChevronLeft,
    Code2,
    Send,
    XCircle,
    Loader2,
    TrendingUp,
    Zap,
    Flame,
    MessageSquare,
} from "lucide-react";
import ExerciseEditor from "./ExerciseEditor";
import DueDate from "./DueDate";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
    fetchContentsWithExercises,
    fetchExercises,
    sendExercise,
} from "../../features/main/exercises/exercisesActions";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export default function ExerciseDetails({ exercise, onBack, courseId }) {
    const [submitting, setSubmitting] = useState(false);
    const [code, setCode] = useState("");
    const MySwal = withReactContent(Swal);
    const router = useRouter();
    const { docId, lessonId } = useParams();
    const dispatch = useDispatch();

    // کانفیگ سطح دشواری
    const difficultyConfig = {
        1: {
            label: "آسان",
            color: "text-emerald-600",
            bg: "bg-emerald-50",
            border: "border-emerald-200",
            icon: <Award className="w-4 h-4" />,
        },
        2: {
            label: "متوسط",
            color: "text-amber-600",
            bg: "bg-amber-50",
            border: "border-amber-200",
            icon: <TrendingUp className="w-4 h-4" />,
        },
        3: {
            label: "دشوار",
            color: "text-orange-600",
            bg: "bg-orange-50",
            border: "border-orange-200",
            icon: <Zap className="w-4 h-4" />,
        },
        4: {
            label: "چالش‌برانگیز",
            color: "text-purple-600",
            bg: "bg-purple-50",
            border: "border-purple-200",
            icon: <Flame className="w-4 h-4" />,
        },
    };

    // کانفیگ وضعیت کاربر
    const statusConfig = {
        1: {
            label: "شروع نشده",
            color: "text-gray-600",
            bg: "bg-gray-50",
            border: "border-gray-200",
            icon: <Clock className="w-4 h-4" />,
        },
        2: {
            label: "در انتظار تصحیح",
            color: "text-blue-600",
            bg: "bg-blue-50",
            border: "border-blue-200",
            icon: <Loader2 className="w-4 h-4 animate-spin" />,
        },
        3: {
            label: "تکمیل شده",
            color: "text-green-600",
            bg: "bg-green-50",
            border: "border-green-200",
            icon: <CheckCircle className="w-4 h-4" />,
        },
        4: {
            label: "نیاز به اصلاح",
            color: "text-red-600",
            bg: "bg-red-50",
            border: "border-red-200",
            icon: <XCircle className="w-4 h-4" />,
        },
    };

    const difficulty = difficultyConfig[exercise.Level] || difficultyConfig[1];
    const status = statusConfig[exercise.UserStatus] || statusConfig[1];

    const handleSubmit = async () => {
        if (!code) {
            toast.error("لطفاً پاسخ تمرین را وارد کنید");
            return;
        }

        const confirmResult = await MySwal.fire({
            title: "ارسال تمرین",
            text: "آیا از ارسال این تمرین مطمئن هستید؟ پس از ارسال، امکان ویرایش وجود ندارد.",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "بله، ارسال کن",
            cancelButtonText: "لغو",
            confirmButtonColor: "#10b981",
            cancelButtonColor: "#ef4444",
            customClass: {
                popup: "rounded-2xl",
                confirmButton: "px-6 py-2 rounded-xl",
                cancelButton: "px-6 py-2 rounded-xl",
            },
        });

        if (!confirmResult.isConfirmed) return;

        setSubmitting(true);

        const data = {
            Id: exercise.UserExerciseProgId || 0,
            UserId: 9,
            ExerciseId: exercise.Id,
            Answer: code,
            Status: 2,
        };

        try {
            await dispatch(sendExercise(data)).unwrap();
            await Promise.all([
                dispatch(
                    fetchContentsWithExercises({
                        "@CourseId": docId,
                    })
                ),
                dispatch(
                    fetchExercises({
                        "@ContentId": lessonId,
                    })
                ),
            ]);
            toast.success("تمرین با موفقیت ارسال شد");
            setSubmitting(false);
            router.refresh();
            onBack();
        } catch (error) {
            console.error("Error sending exercise:", error);
            toast.error("خطا در ارسال تمرین: " + (error?.message || "خطای ناشناخته"));
            setSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700"
        >
            {/* هدر با گرادینت */}
            <div className="bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-4 flex items-center justify-between">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-white hover:text-emerald-100 transition-colors bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl hover:bg-white/20"
                >
                    <ChevronLeft className="w-5 h-5" />
                    <span>بازگشت به لیست</span>
                </button>
                {exercise.UserScore !== null && (
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", delay: 0.2 }}
                        className="bg-white/20 backdrop-blur-md rounded-xl px-4 py-2 flex items-center gap-3"
                    >
                        <div className="bg-white rounded-lg w-10 h-10 flex items-center justify-center shadow-lg">
                            <Award className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div className="text-white">
                            <div className="text-xs opacity-80">نمره شما</div>
                            <div className="text-xl font-bold leading-5">{exercise.UserScore}</div>
                            <div className="text-xs opacity-80">از ۱۰۰</div>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* محتوای اصلی */}
            <div className="p-6">
                {/* عنوان و توضیحات */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                        {exercise.Title}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {exercise.Description}
                    </p>
                </div>

                {/* کارت‌های اطلاعاتی در دو ردیف */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {/* سطح دشواری */}
                    <div
                        className={`flex items-center gap-3 p-4 rounded-xl border ${difficulty.border} ${difficulty.bg}`}
                    >
                        <div className={`p-2 rounded-lg ${difficulty.bg} ${difficulty.color}`}>
                            {difficulty.icon}
                        </div>
                        <div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">سطح دشواری</div>
                            <div className={`font-medium ${difficulty.color}`}>{difficulty.label}</div>
                        </div>
                    </div>

                    {/* وضعیت */}
                    <div
                        className={`flex items-center gap-3 p-4 rounded-xl border ${status.border} ${status.bg}`}
                    >
                        <div className={`p-2 rounded-lg ${status.bg} ${status.color}`}>{status.icon}</div>
                        <div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">وضعیت</div>
                            <div className={`font-medium ${status.color}`}>{status.label}</div>
                        </div>
                    </div>

                    {/* مهلت (اگر وجود دارد) */}
                    {exercise.UserDueDate && (
                        <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                            <div className="p-2 rounded-lg bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300">
                                <Clock className="w-4 h-4" />
                            </div>
                            <div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">مهلت تحویل</div>
                                <DueDate utcDate={exercise.UserDueDate} />
                            </div>
                        </div>
                    )}
                </div>

                {/* بازخورد مدرس (در صورت وجود) */}
                <AnimatePresence>
                    {exercise.UserFeedback && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mb-6 overflow-hidden"
                        >
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-xl p-5">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-green-100 dark:bg-green-800/50 rounded-lg text-green-600 dark:text-green-400">
                                        <MessageSquare className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-green-800 dark:text-green-500 mb-2">
                                            بازخورد مدرس
                                        </h3>
                                        <p className="text-green-700 dark:text-green-400 text-sm leading-relaxed">
                                            {exercise.UserFeedback}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ویرایشگر تمرین */}
                <div className="mt-4">
                    <ExerciseEditor
                        exercise={exercise}
                        courseId={courseId}
                        code={code}
                        setCode={setCode}
                        onSubmit={handleSubmit}
                        submitting={submitting}
                    />
                </div>

                {/* دکمه ارسال (اگر ویرایشگر خودش دکمه ندارد) */}
                {/* در ExerciseEditor احتمالاً دکمه ارسال هست، پس نیازی به دکمه مجزا نیست */}
            </div>
        </motion.div>
    );
}