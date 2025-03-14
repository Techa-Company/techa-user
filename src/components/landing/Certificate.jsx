"use client"
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, ShieldCheck, ArrowLeft } from 'lucide-react';

const Certificate = () => {
    const features = [
        {
            icon: CheckCircle,
            title: "امنیت پیشرفته",
            text: "رمزنگاری سطح نظامی با AES-256",
            color: "bg-emerald-50"
        },
        {
            icon: ShieldCheck,
            title: "تأیید فوری",
            text: "سیستم اعتبارسنجی بلادرنگ",
            color: "bg-blue-50"
        },
    ];

    return (
        <div className="relative bg-gradient-to-b from-gray-50 to-white py-20 px-4">
            <div className="container px-20 mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Content Section */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="flex items-center gap-4"
                        >
                            <motion.div
                                whileHover={{ rotate: 12, scale: 1.05 }}
                                className="p-3 bg-emerald-600 rounded-lg shadow-md"
                            >
                                <ShieldCheck className="w-8 h-8 text-white" />
                            </motion.div>
                            <h2 className="text-4xl font-bold text-gray-900">
                                <span className="text-emerald-600 block mb-2">پس از دوره آموزشی</span>
                                گواهینامه معتبر دریافت کنید
                            </h2>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-lg text-gray-600 leading-relaxed bg-white/80 p-6 rounded-xl shadow-sm"
                        >
                            با موفقیت در دوره‌های ما، گواهینامه‌ای دیجیتال دریافت خواهید کرد که:
                            <ul className="list-disc pr-4 mt-3 space-y-2">
                                <li>دارای <span className="font-semibold text-emerald-600">اعتبار بین‌المللی</span></li>
                                <li>قابل <span className="font-semibold text-emerald-600">اشتراک‌گذاری</span> در شبکه‌های اجتماعی</li>
                                <li>مجهز به <span className="font-semibold text-emerald-600">کد پیگیری یکتا</span></li>
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="bg-emerald-50 p-6 rounded-xl border border-emerald-100"
                        >
                            <p className="text-gray-700 mb-4">
                                🎓 پس از اتمام موفقیت‌آمیز دوره، گواهینامه شما به صورت:
                            </p>
                            <div className="flex gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                                    <span>PDF با قابلیت چاپ</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                                    <span>نسخه دیجیتال تعاملی</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-emerald-600 text-white px-6 py-4 rounded-xl font-medium flex items-center gap-2 shadow-lg hover:shadow-emerald-200/40 w-full justify-center"
                        >
                            دریافت گواهینامه نمونه
                            <ArrowLeft className="w-5 h-5" />
                        </motion.button>
                    </div>
                    {/* Certificate Preview */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        className="relative bg-white rounded-2xl shadow-xl border-8 border-white overflow-hidden"
                    >
                        <img
                            src="/images/certificate.jpg"
                            alt="Certificate"
                            className="w-full"
                        />

                        {/* Verification Badge */}
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full flex items-center gap-2 shadow-md"
                        >
                            <ShieldCheck className="w-5 h-5 text-emerald-600" />
                            <span className="text-sm font-medium">تایید شده</span>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Certificate;