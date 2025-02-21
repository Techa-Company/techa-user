"use client"
import { motion, AnimatePresence } from "framer-motion"
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
    Clock
} from "lucide-react"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"

const LicensesPage = () => {
    const [copiedIndex, setCopiedIndex] = useState(null)
    const [expandedTips, setExpandedTips] = useState(false)
    let timeoutId

    const useIsMobile = (maxWidth) => {
        const [isMobile, setIsMobile] = useState(false);

        useEffect(() => {
            const handleResize = () => {
                setIsMobile(window.innerWidth <= maxWidth);
            };

            // Check initial window size
            handleResize();

            // Add event listener
            window.addEventListener('resize', handleResize);

            // Remove event listener on cleanup
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
        // { id: 7, course: "Angular Master", startDate: "1402/09/15", duration: "نامحدود", version: "Windows", licenseKey: "ANGULAR-9876-1234-EFGH", status: "منقضی" },
        // { id: 8, course: "Django Advanced", startDate: "1402/08/01", duration: "نامحدود", version: "Windows", licenseKey: "DJANGO-5678-1234-WXYZ", status: "فعال" },
        // { id: 9, course: "Swift UI", startDate: "1402/07/15", duration: "نامحدود", version: "iOS", licenseKey: "SWIFT-1234-5678-ABCD", status: "فعال" },
        // { id: 10, course: "Kotlin Development", startDate: "1402/06/01", duration: "نامحدود", version: "Android", licenseKey: "KOTLIN-9876-5432-EFGH", status: "منقضی" },
    ]

    const copyToClipboard = (text, id) => {
        navigator.clipboard.writeText(text)
        setCopiedIndex(id)

        if (timeoutId) clearTimeout(timeoutId)
        timeoutId = setTimeout(() => setCopiedIndex(null), 3000)

        toast.success(
            "لایسنس با موفقیت کپی شد!")
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto px-5 sm:px-10"
        >
            {/* هدر صفحه */}
            <div className="mb-8 space-y-4">
                <motion.h1
                    className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center gap-3"
                    initial={{ x: -20 }}
                    animate={{ x: 0 }}
                >
                    <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                    >
                        <Lock className="w-8 h-8 md:w-10 md:h-10 text-green-600" />
                    </motion.div>
                    لایسنس‌های شما
                </motion.h1>

                {/* راهنمای استفاده */}
                <motion.div
                    className="bg-green-50 p-4 rounded-xl border border-green-200 cursor-pointer"
                    onClick={() => setExpandedTips(!expandedTips)}
                    layout
                >
                    <div className="flex gap-3 items-start">
                        <Info className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                        <div className="flex-1">
                            <div className="flex justify-between items-center">
                                <h3 className="font-bold mb-2">راهنمای فعال‌سازی لایسنس</h3>
                                <motion.div
                                    animate={{ rotate: expandedTips ? 90 : 0 }}
                                >
                                    <ChevronRight className="w-5 h-5 text-green-600" />
                                </motion.div>
                            </div>
                            <AnimatePresence>
                                {expandedTips && (
                                    <motion.div
                                        initial={{ opacity: 0, maxHeight: 0 }}
                                        animate={{ opacity: 1, maxHeight: 200 }}
                                        exit={{ opacity: 0, maxHeight: 0 }}
                                        className="space-y-3 overflow-hidden"
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="flex items-start gap-2 pt-2">
                                            <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center">1</span>
                                            <p className="text-sm text-gray-600 flex-1">کلید لایسنس را کپی کنید</p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center">2</span>
                                            <p className="text-sm text-gray-600 flex-1">در نرم‌افزار مربوطه به بخش تنظیمات بروید</p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center">3</span>
                                            <p className="text-sm text-gray-600 flex-1">کلید را در قسمت فعال‌سازی وارد کنید</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* جدول لایسنس‌ها */}
            {!isMobile ? (
                <motion.div
                    className="overflow-x-auto rounded-xl border border-green-200 shadow-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <table className="w-full overflow-hidden min-w-[800px] lg:min-w-0">
                        <thead className="bg-gradient-to-r from-green-600 to-green-500 text-white">
                            <tr>
                                <th className="px-6 py-4 text-right min-w-[50px]">ردیف</th>
                                <th className="px-6 py-4 text-right min-w-[150px]">نام دوره</th>
                                <th className="px-6 py-4 text-right min-w-[120px]">تاریخ شروع</th>
                                <th className="px-6 py-4 text-right min-w-[120px]">مدت دسترسی</th>
                                <th className="px-6 py-4 text-right min-w-[50px]">نسخه</th>
                                <th className="px-6 py-4 text-right min-w-[200px]">کلید لایسنس</th>
                                {/* <th className="px-6 py-4 text-right min-w-[100px]">وضعیت</th> */}
                                <th className="px-6 py-4 text-right min-w-[100px]">عملیات</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-green-100">
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
                                    style={{ position: 'relative' }}
                                >
                                    <td className="px-6 py-4 text-gray-600">{license.id}</td>

                                    <td className="px-6 py-4 font-medium text-gray-800">
                                        <div className="flex items-center gap-2">
                                            {license.version === 'Windows' ? (
                                                <Monitor className="w-5 h-5 text-green-600" />
                                            ) : license.version === 'Android' ? (
                                                <Smartphone className="w-5 h-5 text-green-600" />
                                            ) : (
                                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                                                </svg>
                                            )}
                                            دوره {license.course}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{license.startDate}</td>
                                    <td className="px-6 py-4 text-gray-600">{license.duration}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm">
                                            {license.version}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-gray-700">{license.licenseKey}</td>
                                    {/* <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className={`px-3 py-1 rounded-full text-sm ${license.status === 'فعال'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                                }`}>
                                                {license.status}
                                            </span>
                                            {license.status === 'فعال' ? (
                                                <CheckCircle className="w-4 h-4 text-green-600" />
                                            ) : (
                                                <AlertCircle className="w-4 h-4 text-red-600" />
                                            )}
                                        </div>
                                    </td> */}
                                    <td className="px-6 py-4">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => copyToClipboard(license.licenseKey, license.id)}
                                            className="text-green-600 hover:text-green-700 flex items-center gap-1"
                                            aria-label="Copy license key"
                                        >
                                            {copiedIndex === license.id ? (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ type: "spring" }}
                                                >
                                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                                </motion.div>
                                            ) : (
                                                <ClipboardCheck className="w-5 h-5" />
                                            )}
                                            <span className="text-sm">کپی</span>
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
                            className="group relative bg-white p-5 rounded-2xl border-2 border-green-50 shadow-xs hover:shadow-lg transition-all"
                            whileHover={{
                                y: -5,
                                borderColor: "#059669",
                                boxShadow: "0 10px 30px -10px rgba(5, 150, 105, 0.15)"
                            }}
                        >
                            {/* نشانگر وضعیت */}
                            <div className={`absolute top-3 left-3 w-1.5 h-1.5 rounded-full animate-pulse ${license.status === 'فعال' ? 'bg-green-500' : 'bg-red-500'
                                }`}></div>

                            {/* هدر کارت */}
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <motion.div
                                        className="p-2 bg-gradient-to-br from-green-100 to-green-50 rounded-xl border border-green-200 shadow-inner"
                                        whileHover={{ rotate: 15, scale: 1.1 }}
                                    >
                                        {license.version === 'Windows' ? (
                                            <Monitor className="w-6 h-6 text-green-700" />
                                        ) : license.version === 'Android' ? (
                                            <Smartphone className="w-6 h-6 text-green-700" />
                                        ) : (
                                            <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                                        ? 'bg-green-100/80 text-green-800'
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

                            {/* اطلاعات دوره */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-gray-500">
                                        <CalendarDays className="w-4 h-4" />
                                        <span className="text-xs font-medium">تاریخ شروع</span>
                                    </div>
                                    <div className="text-sm font-semibold text-gray-700 bg-green-50 px-3 py-1.5 rounded-lg">
                                        {license.startDate}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-gray-500">
                                        <Clock className="w-4 h-4" />
                                        <span className="text-xs font-medium">مدت دسترسی</span>
                                    </div>
                                    <div className="text-sm font-semibold text-gray-700 bg-green-50 px-3 py-1.5 rounded-lg">
                                        {license.duration}
                                    </div>
                                </div>
                            </div>

                            {/* بخش کلید لایسنس */}
                            <motion.div
                                className="relative group"
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                onClick={() => copyToClipboard(license.licenseKey, license.id)}
                            >
                                <div className="flex items-center justify-between p-3.5 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border-2 border-green-200 cursor-pointer transition-all hover:border-green-500">
                                    <div className="flex-1 min-w-0">
                                        <span className="block text-xs text-gray-500 mb-1 font-medium">کلید لایسنس</span>
                                        <span className="font-mono text-gray-800 text-sm truncate pr-2">
                                            {license.licenseKey}
                                        </span>
                                    </div>
                                    <motion.div
                                        className="p-1.5 rounded-lg bg-white shadow-sm hover:bg-green-50"
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        {copiedIndex === license.id ? (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="text-green-600"
                                            >
                                                <CheckCircle className="w-5 h-5" />
                                            </motion.div>
                                        ) : (
                                            <ClipboardCheck className="w-5 h-5 text-green-600" />
                                        )}
                                    </motion.div>
                                </div>

                                <motion.span
                                    className="absolute -top-6 right-0 bg-green-600 text-white px-2 py-1 rounded-lg text-xs shadow-lg opacity-0 group-hover:opacity-100 transition-all"
                                    initial={{ y: 5 }}
                                >
                                    کلیک برای کپی
                                    <span className="absolute bottom-0 left-3 -mb-1.5 w-3 h-3 bg-green-600 rotate-45"></span>
                                </motion.span>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* نکات مهم با انیمیشن بهبود یافته */}
            <motion.div
                className="mt-6 bg-green-50 rounded-xl border border-green-200"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                <div className="p-4 border-b border-green-200">
                    <h3 className="font-bold text-lg text-green-800 flex items-center gap-2">
                        <Info className="w-5 h-5" />
                        نکات مهم استفاده از لایسنس
                    </h3>
                </div>
                <ul className="p-4 space-y-3">
                    <motion.li
                        className="flex items-start gap-3 text-gray-700"
                        whileHover={{ x: 5 }}
                    >
                        <span className="text-green-600">•</span>
                        هر لایسنس فقط روی یک دستگاه قابل استفاده است
                    </motion.li>
                    <motion.li
                        className="flex items-start gap-3 text-gray-700"
                        whileHover={{ x: 5 }}
                    >
                        <span className="text-green-600">•</span>
                        مدت زمان لایسنس از تاریخ اولین استفاده محاسبه می‌شود
                    </motion.li>
                    <motion.li
                        className="flex items-start gap-3 text-gray-700"
                        whileHover={{ x: 5 }}
                    >
                        <span className="text-green-600">•</span>
                        در صورت بروز مشکل با پشتیبانی تماس بگیرید
                    </motion.li>
                </ul>
            </motion.div>
        </motion.div>
    )
}

export default LicensesPage