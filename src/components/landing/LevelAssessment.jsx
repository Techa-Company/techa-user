"use client"
import { motion, useScroll, useTransform } from 'framer-motion';
import { BookOpen, Map, ClipboardCheck, Rocket, Sparkles } from 'lucide-react';
import { useRef } from 'react';

export default function LevelAssessment() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    const staggerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.2 }
        })
    };

    return (
        <section
            ref={ref}
            className="relative overflow-hidden bg-gradient-to-br from-emerald-50/95 to-green-50/95 py-24 mt-20"
        >
            {/* Animated Background Elements */}
            <motion.div
                style={{ y: yBg }}
                className="absolute inset-0 opacity-15"
            >
                <div className="h-full w-full bg-[url('/svg/topography.svg')] bg-repeat opacity-20 mix-blend-overlay" />
            </motion.div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Content */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    className="text-center mb-16"
                >
                    <motion.div
                        variants={staggerVariants}
                        custom={0}
                        className="inline-block mb-4"
                    >
                        <div className="bg-emerald-100 px-6 py-2 rounded-full inline-flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-emerald-600" />
                            <span className="font-bold text-emerald-700">یادگیری هوشمندانه</span>
                        </div>
                    </motion.div>

                    <motion.h1
                        variants={staggerVariants}
                        custom={1}
                        className="text-5xl md:text-6xl font-black text-emerald-900 mb-8 leading-tight"
                    >
                        <span className="bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
                            نقشه راه یادگیری
                        </span>
                        <br />
                        متناسب با سطح واقعی شما
                    </motion.h1>
                </motion.div>

                {/* Interactive Grid */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Feature List */}
                    <motion.div
                        className="space-y-8"
                        initial="hidden"
                        animate="visible"
                    >
                        {[
                            {
                                icon: ClipboardCheck,
                                title: "تشخیص سطح دقیق",
                                text: "با الگوریتم هوشمند مبتنی بر هوش مصنوعی"
                            },
                            {
                                icon: Map,
                                title: "مسیر شخصی‌سازی شده",
                                text: "بر اساس نقاط قوت و ضعف شما"
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                variants={staggerVariants}
                                custom={i + 2}
                                className="p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-emerald-100/50 transition-shadow"
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-emerald-100 rounded-lg">
                                        <item.icon className="w-8 h-8 text-emerald-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-emerald-900 mb-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-600">{item.text}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* CTA Card */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 100 }}
                        className="relative group"
                    >
                        <div className="absolute inset-0 bg-emerald-500/10 rounded-2xl transform group-hover:rotate-1 transition duration-300" />
                        <div className="relative bg-white rounded-2xl p-8 shadow-2xl shadow-emerald-100/50 border border-emerald-100/80">
                            <h2 className="text-3xl font-black text-emerald-900 mb-6">
                                آماده جهش هستی؟
                                <span className="block text-2xl mt-2 text-emerald-600">شروع کن، رایگانه!</span>
                            </h2>

                            <motion.button
                                whileHover={{
                                    scale: 1.05,
                                    background: "linear-gradient(45deg, #059669, #10b981)"
                                }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    background: "linear-gradient(45deg, #059669, #10b981)"
                                }}
                                className="w-full text-white py-4 px-8 rounded-xl font-bold flex items-center justify-center gap-3 relative overflow-hidden"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
                                <Rocket className="w-6 h-6 animate-bounce" />
                                <span className="relative">شروع آزمون هوشمند</span>
                            </motion.button>

                            <div className="mt-6 flex items-center gap-3 text-emerald-700">
                                <BookOpen className="w-5 h-5" />
                                <span className="font-medium">+۱۰۰۰ ساعت محتوای آموزشی رایگان</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Animated Progress Bar */}
                <motion.div
                    className="mt-16 h-2 bg-emerald-100 rounded-full overflow-hidden"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                >
                    <div className="h-full w-full bg-gradient-to-r from-emerald-400 to-green-400 origin-left scale-x-0 animate-progress" />
                </motion.div>
            </div>
        </section>
    );
}