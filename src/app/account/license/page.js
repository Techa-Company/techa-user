"use client";
import { motion, AnimatePresence } from "framer-motion";
import {
    ClipboardCheck,
    Smartphone,
    Monitor,
    Lock,
    Info,
    CheckCircle,
    AlertCircle,
    ChevronRight,
    CalendarDays,
    Clock,
    Award
} from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const LicensesPage = () => {
    const [copiedIndex, setCopiedIndex] = useState(null);
    const [expandedTips, setExpandedTips] = useState(false);
    let timeoutId;

    const useIsMobile = (maxWidth) => {
        const [isMobile, setIsMobile] = useState(false);

        useEffect(() => {
            const handleResize = () => {
                setIsMobile(window.innerWidth <= maxWidth);
            };

            handleResize();
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, [maxWidth]);

        return isMobile;
    };

    const isMobile = useIsMobile(768);
    const licenses = [
        { id: 1, course: "HTML/CSS مقدماتی", startDate: "1403/03/15", duration: "نامحدود", version: "Windows", licenseKey: "REACT-9834-5678-ABCD", status: "فعال" },
        { id: 2, course: "HTML/CSS متوسط", startDate: "1403/02/01", duration: "نامحدود", version: "Android", licenseKey: "AND-1234-9876-ZYX", status: "منقضی" },
        { id: 3, course: "HTML/CSS پیشرفته", startDate: "1403/01/10", duration: "نامحدود", version: "Windows", licenseKey: "NODE-5678-1234-EFGH", status: "فعال" },
        { id: 4, course: "Python Data Science", startDate: "1402/12/20", duration: "نامحدود", version: "Windows", licenseKey: "PYTHON-9876-5432-ABCD", status: "فعال" },
        { id: 5, course: "Flutter Development", startDate: "1402/11/15", duration: "نامحدود", version: "Android", licenseKey: "FLUTTER-1234-5678-WXYZ", status: "منقضی" },
        { id: 6, course: "Vue.js Professional", startDate: "1402/10/01", duration: "نامحدود", version: "Windows", licenseKey: "VUE-4321-8765-ABCD", status: "فعال" },
    ];

    const copyToClipboard = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(id);

        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => setCopiedIndex(null), 3000);

        toast.success("لایسنس با موفقیت کپی شد!");
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-5 sm:mx-10"
        >
            {/* هدر صفحه */}
            <div className="mb-12">
                <motion.div
                    className="flex items-center gap-6 mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <div className="bg-emerald-100 p-4 rounded-2xl shadow-lg">
                        <Award className="w-12 h-12 text-emerald-600" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold text-emerald-800 mb-2">لایسنس‌های شما</h1>
                        <p className="text-emerald-600">گواهی‌های دسترسی به دوره‌های آموزشی</p>
                    </div>
                </motion.div>

                {/* راهنمای استفاده */}
                <motion.div
                    className="bg-gradient-to-r from-emerald-50 to -green-50 p-6 rounded-2xl border-2 border-emerald-100 shadow-sm mb-8"
                    whileHover={{ y: -2 }}
                >
                    <div className="flex gap-4 items-start">
                        <div className="bg-emerald-600 text-white p-3 rounded-xl">
                            <Info className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-emerald-800 mb-3">نحوه فعال‌سازی لایسنس</h3>
                            <div className="grid md:grid-cols-3 gap-4">
                                {[1, 2, 3].map((step) => (
                                    <motion.div
                                        key={step}
                                        className="bg-white p-4 rounded-xl border border-emerald-100"
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                                                {step}
                                            </div>
                                            <h4 className="font-semibold text-emerald-800">
                                                {step === 1 && "کپی لایسنس"}
                                                {step === 2 && "ورود به پنل"}
                                                {step === 3 && "فعال‌سازی"}
                                            </h4>
                                        </div>
                                        <p className="text-sm text-emerald-600">
                                            {step === 1 && "کلید لایسنس را از بخش زیر کپی کنید"}
                                            {step === 2 && "به بخش تنظیمات نرم‌افزار مراجعه نمایید"}
                                            {step === 3 && "کلید را در قسمت مربوطه وارد کنید"}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* جدول لایسنس‌ها */}
                {!isMobile ? (
                    <motion.div
                        className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-emerald-100"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-emerald-600 to-green-500 text-white">
                                <tr>
                                    <th className="px-6 py-4 text-right min-w-[50px]">ردیف</th>
                                    <th className="px-6 py-4 text-right min-w-[150px]">نام دوره</th>
                                    <th className="px-6 py-4 text-right min-w-[120px]">تاریخ شروع</th>
                                    <th className="px-6 py-4 text-right min-w-[120px]">مدت دسترسی</th>
                                    <th className="px-6 py-4 text-right min-w-[50px]">نسخه</th>
                                    <th className="px-6 py-4 text-right min-w-[200px]">کلید لایسنس</th>
                                    <th className="px-6 py-4 text-right min-w-[100px]">عملیات</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-emerald-50">
                                {licenses.map((license, index) => (
                                    <motion.tr
                                        key={license.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            delay: index * 0.05,
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 20
                                        }}
                                        className="group cursor-pointer hover:bg-green-50 transition-colors relative"
                                        whileHover={{
                                            scale: 1.005,
                                            zIndex: 1,
                                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                                        }}
                                    >
                                        <td className="px-6 py-4 text-gray-600">{license.id}</td>
                                        <td className="px-6 py-4 font-medium text-gray-800">
                                            <div className="flex items-center gap-2">
                                                {license.version === 'Windows' ? (
                                                    <Monitor className="w-5 h-5 text-emerald-600" />
                                                ) : license.version === 'Android' ? (
                                                    <Smartphone className="w-5 h-5 text-emerald-600" />
                                                ) : (
                                                    <svg className="w-5 h- 5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                                                    </svg>
                                                )}
                                                دوره {license.course}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{license.startDate}</td>
                                        <td className="px-6 py-4 text-gray-600">{license.duration}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm font-medium">
                                                {license.version}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-mono text-emerald-700">{license.licenseKey}</td>
                                        <td className="px-6 py-4">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => copyToClipboard(license.licenseKey, license.id)}
                                                className="text-emerald-600 hover:text-emerald-700 flex items-center gap-1.5"
                                                aria-label="Copy license key"
                                            >
                                                {copiedIndex === license.id ? (
                                                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                                                ) : (
                                                    <ClipboardCheck className="w-5 h-5" />
                                                )}
                                                <span className="text-sm font-medium">کپی کلید</span>
                                            </motion.button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </motion.div>
                ) : (
                    <div className="space-y-4">
                        {licenses.map((license) => (
                            <motion.div
                                key={license.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="group relative bg-white p-5 rounded-2xl border-2 border-emerald-100 shadow-xs hover:shadow-lg transition-all"
                                whileHover={{
                                    y: -5,
                                    borderColor: "#059669",
                                    boxShadow: "0 10px 30px -10px rgba(5, 150, 105, 0.15)"
                                }}
                            >
                                <div className={`absolute top-3 left-3 w-1.5 h-1.5 rounded-full animate-pulse ${license.status === 'فعال' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <motion.div
                                            className="p-2 bg-gradient-to-br from-emerald-100 to-green-50 rounded-xl border border-emerald-200 shadow-inner"
                                            whileHover={{ rotate: 15, scale: 1.1 }}
                                        >
                                            {license.version === 'Windows' ? (
                                                <Monitor className="w-6 h-6 text-emerald-700" />
                                            ) : license.version === 'Android' ? (
                                                <Smartphone className="w-6 h-6 text-emerald-700" />
                                            ) : (
                                                <svg className="w-6 h-6 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l9-5-9-5-9 5 9 5z" />
                                                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                                </svg>
                                            )}
                                        </motion.div>
                                        <div>
                                            <h3 className="text-lg font-extrabold text-gray-800">{license.course}</h3>
                                            <p className="text-xs text-gray-500 mt-1 font-medium">{license.version}</p>
                                        </div>
                                    </div>
                                    <motion.span
                                        className={`px-3 py-1.5 text-sm rounded-full flex items-center gap-1.5 backdrop-blur-sm ${license.status === 'فعال'
                                            ? 'bg-emerald-100/80 text-emerald-800'
                                            : 'bg-red-100/80 text-red-800'
                                            }`}
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        {license.status === 'فعال' ? (
                                            <CheckCircle className="w-4 h-4" />
                                        ) : (
                                            <AlertCircle className="w-4 h-4" />
                                        )}
                                        <span className="font-dana">{license.status}</span>
                                    </motion.span>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-gray-500">
                                            <CalendarDays className="w-4 h-4" />
                                            <span className="text-xs font-medium">تاریخ شروع</span>
                                        </div>
                                        <div className="text-sm font-semibold text-gray-700 bg-emerald-50 px-3 py-1.5 rounded-lg">
                                            {license.startDate}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-gray-500">
                                            <Clock className="w-4 h-4" />
                                            <span className="text-xs font-medium">مدت دسترسی</span>
                                        </div>
                                        <div className="text-sm font-semibold text-gray-700 bg-emerald-50 px-3 py-1.5 rounded-lg">
                                            {license.duration}
                                        </div>
                                    </div>
                                </div>

                                <motion.div
                                    className="relative group"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    onClick={() => copyToClipboard(license.licenseKey, license.id)}
                                >
                                    <div className="flex items-center justify-between p-3.5 bg-gradient-to-r from-emerald-50 to-green-100 rounded-xl border-2 border-emerald-200 cursor-pointer transition-all hover:border-emerald-500">
                                        <div className="flex-1 min-w-0">
                                            <span className="block text-xs text-gray-500 mb-1 font-medium">کلید لایسنس</span>
                                            <span className="font-mono text-gray-800 text-sm truncate pr-2">
                                                {license.licenseKey}
                                            </span>
                                        </div>
                                        <motion.div
                                            className="p-1.5 rounded-lg bg-white shadow-sm hover:bg-emerald-50"
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            {copiedIndex === license.id ? (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className="text-emerald-600"
                                                >
                                                    <CheckCircle className="w-5 h-5" />
                                                </motion.div>
                                            ) : (
                                                <ClipboardCheck className="w-5 h-5 text-emerald-600" />
                                            )}
                                        </motion.div>
                                    </div>

                                    <motion.span
                                        className="absolute -top-6 right-0 bg-emerald-600 text-white px-2 py-1 rounded-lg text-xs shadow-lg opacity-0 group-hover:opacity-100 transition-all"
                                        initial={{ y: 5 }}
                                    >
                                        کلیک برای کپی
                                        <span className="absolute bottom-0 left-3 -mb-1.5 w-3 h-3 bg-emerald-600 rotate-45"></span>
                                    </motion.span>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* نکات مهم */}
                <motion.div
                    className="mt-8 bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-2xl border-2 border-emerald-100"
                    initial={{ scale: 0.98 }}
                    whileInView={{ scale: 1 }}
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="bg-emerald-600 text-white p-2 rounded-lg">
                            <AlertCircle className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-emerald-800">قوانین استفاده</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        {["هر لایسنس مخصوص یک دستگاه است", "مدت زمان از اولین فعال‌سازی محاسبه می‌شود", "انتقال لایسنس نیاز به تایید پشتیبانی دارد", "در صورت مشکل با پشتیبانی تماس بگیرید"].map((text, index) => (
                            <motion.div
                                key={index}
                                className="flex items-start gap-3 p-3 bg-white rounded-xl border border-emerald-100"
                                whileHover={{ x: 5 }}
                            >
                                <div className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mt-1">
                                    <CheckCircle className="w-4 h-4" />
                                </div>
                                <span className="text-emerald-700 flex-1">{text}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default LicensesPage;