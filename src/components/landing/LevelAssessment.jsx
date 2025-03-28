"use client"
import { motion } from "framer-motion";
import { BookOpen, BarChart, Map, Rocket } from "lucide-react";
import Link from "next/link";

const LevelAssessment = () => {
    return (
        <div className="min-h-[600px] bg-white relative overflow-hidden">
            {/* Decorative Waves */}
            <div className="absolute inset-0 opacity-10">
                <svg viewBox="0 0 1440 600" className="w-full h-full">
                    <path
                        fill="#10b981"
                        d="M0 256l48 32c48 32 144 96 240 90.7 96-5.7 192-79.7 288-101.4 96-21.3 192 10.7 288 48 96 37.7 192 79.7 288 69.7 96-10 192-74 240-106.7l48-32V0H0z"
                        className="animate-[wave_10s_linear_infinite]"
                    />
                </svg>
            </div>

            <div className="container mx-auto px-4 py-20 relative z-10">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20"
                >
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="inline-flex items-center gap-3 bg-emerald-100 text-emerald-600 px-6 py-3 rounded-full mb-8"
                    >
                        <Rocket className="w-5 h-5" />
                        <span className="font-medium">یادگیری هوشمندانه شروع کن</span>
                    </motion.div>

                    <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
                        <span className="text-emerald-500">مسیر یادگیری</span> اختصاصی شما
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        با تحلیل سطح دانشتون، بهترین و کوتاهترین مسیر رو براتون طراحی میکنیم
                    </p>
                </motion.div>

                {/* Steps Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    {/* Step 1 */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                    >
                        <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                            <BookOpen className="w-8 h-8 text-emerald-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">آزمون تعیین سطح</h3>
                        <p className="text-gray-600">
                            آزمون تعاملی و هوشمند با سوالات تطبیقی
                        </p>
                    </motion.div>

                    {/* Step 2 */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                    >
                        <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                            <BarChart className="w-8 h-8 text-emerald-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">تحلیل پیشرفته</h3>
                        <p className="text-gray-600">
                            تشخیص دقیق نقاط قوت و زمینههای پیشرفت
                        </p>
                    </motion.div>

                    {/* Step 3 */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 }}
                        className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                    >
                        <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                            <Map className="w-8 h-8 text-emerald-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">نقشه راه شخصی</h3>
                        <p className="text-gray-600">
                            برنامه آموزشی دقیق با منابع یادگیری بهینه
                        </p>
                    </motion.div>
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center"
                >
                    <Link
                        href=""
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-emerald-500 text-white px-12 py-4 rounded-full text-lg font-medium hover:bg-emerald-600 transition-colors flex items-center gap-3 mx-auto"
                        >
                            شروع آزمون رایگان
                            <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </span>
                        </motion.button>
                    </ Link >
                </motion.div>
            </div>

            {/* Animated Dots Pattern */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-emerald-100 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`
                        }}
                        animate={{
                            scale: [0.5, 1, 0.5],
                            opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{
                            duration: 2 + Math.random() * 3,
                            repeat: Infinity
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default LevelAssessment;