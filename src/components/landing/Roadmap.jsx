


"use client"
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Lock, Check, CircleDollarSign, ChevronDown, BookOpen, Code, GraduationCap, Sparkles } from 'lucide-react'
import { useState, useRef } from 'react'
import { cn } from '../../lib/utils'

const stages = [
    {
        id: 1,
        title: 'آموزش مقدماتی HTML,CSS',
        payment: 'رایگان',
        credit: '200,000 تومان',
        summary: 'ساختار پایه HTML - سمانتیک - Flexbox - مدیا کوئری‌ها',
        duration: '۲ هفته',
        projects: 4,
        isLocked: false,
        isCompleted: true
    },
    {
        id: 2,
        title: 'آموزش تکمیلی HTML,CSS',
        payment: '200,000 تومان',
        credit: '400,000 تومان',
        summary: 'CSS Grid - انیمیشن‌های پیشرفته - معماری BEM - SASS/SCSS',
        duration: '۳ هفته',
        projects: 5,
        isLocked: false
    },
    {
        id: 3,
        title: 'آموزش JS',
        payment: '400,000 تومان',
        credit: '600,000 تومان',
        summary: 'ES6+ - DOM Manipulation - Fetch API - Local Storage',
        duration: '۵ هفته',
        projects: 6,
        isLocked: false
    },
    {
        id: 4,
        title: 'آموزش تیلیویند',
        payment: '600,000 تومان',
        credit: '800,000 تومان',
        summary: 'Utility-First - پیکربندی سفارشی - Dark Mode - پلاگین‌ها',
        duration: '۲ هفته',
        projects: 3,
        isLocked: false
    },
    {
        id: 5,
        title: 'آموزش React',
        payment: '800,000 تومان',
        credit: '1,200,000 تومان',
        summary: 'Hooks - Context API - React Router - تست با Jest',
        duration: '۶ هفته',
        projects: 4,
        isLocked: false
    },
    {
        id: 6,
        title: 'کارآموزی پروژه محور',
        payment: '1,200,000 تومان',
        credit: '1,400,000 تومان',
        summary: 'پلتفرم توسعه نرم افزار - SQL',
        duration: '۸ هفته',
        projects: 2,
        isLocked: false
    },
    {
        id: 7,
        title: 'دوره فریلنسری',
        payment: '1,400,000 تومان',
        credit: '1,500,000 تومان',
        summary: 'ارائه هاست - فضای توسعه - اجرای پروژه',
        duration: '۳ هفته',
        projects: 3,
        isLocked: false
    },
]

export default function Roadmap() {
    const [expandedStage, setExpandedStage] = useState(null)
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
    const rotate = useTransform(scrollYProgress, [0, 1], [15, -15])

    const floatingVariants = {
        float: {
            y: [-10, 10, -10],
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-slate-50 to-emerald-100 py-12 md:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Animated Background Elements */}
            <motion.div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2304c987' fill-opacity='0.1'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}
                animate={{ x: [0, 100, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />

            <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
                <motion.div style={{ rotate }} className="absolute -top-20 -right-20 opacity-10">
                    <Sparkles className="w-96 h-96 text-emerald-400/30" />
                </motion.div>

                {/* <motion.h1
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 mb-8 md:mb-16 text-center relative"
                >
                    <motion.div
                        variants={floatingVariants}
                        animate="float"
                        className="absolute -left-10 md:-left-20 top-0 z-10"
                    >
                        🚀
                    </motion.div>
                    نقشه راه فریلنسری
                    <motion.div
                        variants={floatingVariants}
                        animate="float"
                        className="absolute -right-10 md:-right-20 bottom-0"
                    >
                        💎
                    </motion.div>
                </motion.h1> */}

                <div className="text-[#042A1B] text-center">
                    <h1 className="font-extrabold text-4xl ">
                        نقشه راه <span className="bg-[#7AE36A] py-0.5 px-3 rounded-xl inline-block">فریلنسری</span>
                    </h1>
                    <p className="text-lg font-normal mt-3">
                        فرآیند ورود به بازار کار و اجرای پروژه های فریلنسری در 7 مرحله تدوین شده است که کاربر برای ورود به مرحله بعد حتما باید در آزمون برخط و مصاحبه نمره قبولی را دریافت نماید.                    </p>
                </div>

                <div className="relative mt-20">
                    <div className="absolute left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-emerald-400/30 to-transparent h-full hidden md:block" />

                    {stages.map((stage, index) => {
                        const isExpanded = expandedStage === stage.id

                        return (
                            <motion.div
                                key={stage.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                                className="relative group cursor-pointer my-6 md:my-8 w-full md:w-[50%] mx-auto"
                                onClick={() => !stage.isLocked && setExpandedStage(isExpanded ? null : stage.id)}
                            >
                                {/* Glowing Effect */}
                                {!stage.isLocked && (
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="absolute inset-0 bg-emerald-400/10 blur-3xl rounded-3xl"
                                    />
                                )}

                                <div className={cn(
                                    "relative p-6 md:p-8 rounded-2xl md:rounded-3xl border-2 border-emerald-100 backdrop-blur-lg",
                                    stage.isLocked
                                        ? "bg-white/80"
                                        : "bg-white/90 hover:border-emerald-200 shadow-lg",
                                    isExpanded && "!bg-white !border-emerald-300 shadow-xl"
                                )}>
                                    <div className="flex items-start gap-4 md:gap-6">
                                        {/* Animated Number */}
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            className={cn(
                                                "flex-shrink-0 w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center text-xl md:text-2xl font-bold border-2",
                                                stage.isLocked
                                                    ? "border-slate-200 text-slate-400 bg-white"
                                                    : "border-emerald-200 bg-emerald-50/50 text-emerald-600 shadow-sm"
                                            )}
                                        >
                                            {stage.isCompleted ? (
                                                <Check className="w-6 h-6 md:w-8 md:h-8 text-emerald-500" />
                                            ) : (
                                                stage.id
                                            )}
                                        </motion.div>

                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-3 md:mb-4">
                                                <h2 className={cn(
                                                    "text-lg md:text-2xl font-bold",
                                                    stage.isLocked
                                                        ? "text-slate-400"
                                                        : "text-emerald-800"
                                                )}>
                                                    {stage.title}
                                                </h2>
                                                {stage.isLocked ? (
                                                    <Lock className="w-5 h-5 md:w-6 md:h-6 text-slate-400" />
                                                ) : (
                                                    <motion.div
                                                        animate={{ rotate: isExpanded ? 180 : 0 }}
                                                    >
                                                        <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-emerald-500" />
                                                    </motion.div>
                                                )}
                                            </div>

                                            <div className="flex flex-col sm:flex-row gap-2 md:gap-3 mb-3 md:mb-4">
                                                <motion.div
                                                    whileHover={{ scale: 1.05 }}
                                                    className="flex items-center gap-2 px-3 py-1 md:px-4 md:py-2 rounded-full bg-emerald-50 border border-emerald-100"
                                                >
                                                    <CircleDollarSign className="w-4 h-4 md:w-5 md:h-5 text-emerald-500" />
                                                    <span className="text-sm md:text-base font-medium text-emerald-700">پرداختی: {stage.payment}</span>
                                                </motion.div>
                                                <motion.div
                                                    whileHover={{ scale: 1.05 }}
                                                    className="flex items-center gap-2 px-3 py-1 md:px-4 md:py-2 rounded-full bg-emerald-50 border border-emerald-100"
                                                >
                                                    <Check className="w-4 h-4 md:w-5 md:h-5 text-emerald-500" />
                                                    <span className="text-sm md:text-base font-medium text-emerald-700">اعتبار: {stage.credit}</span>
                                                </motion.div>
                                            </div>

                                            <p className={cn(
                                                "text-base md:text-lg",
                                                stage.isLocked ? "text-slate-400" : "text-slate-600"
                                            )}>
                                                {stage.summary}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Expanded Content */}
                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-emerald-100"
                                            >
                                                <div className="flex flex-wrap gap-3 md:gap-4 mb-4 md:mb-6">
                                                    {[BookOpen, Code, GraduationCap].map((Icon, i) => (
                                                        <motion.div
                                                            key={i}
                                                            whileHover={{ y: -3 }}
                                                            className="p-3 md:p-4 rounded-lg md:rounded-xl bg-emerald-50 border border-emerald-100"
                                                        >
                                                            <Icon className="w-6 h-6 md:w-8 md:h-8 text-emerald-500" />
                                                        </motion.div>
                                                    ))}
                                                </div>

                                                <div className="space-y-2 md:space-y-3">
                                                    {['مدت زمان دوره', 'پروژه‌های عملی', 'گواهینامه'].map((text, i) => (
                                                        <motion.div
                                                            key={text}
                                                            initial={{ x: 30 }}
                                                            animate={{ x: 0 }}
                                                            transition={{ delay: i * 0.1 }}
                                                            className="flex justify-between items-center p-3 md:p-4 rounded-lg bg-white border border-emerald-50"
                                                        >
                                                            <span className="text-sm md:text-base text-emerald-700">{text}</span>
                                                            <span className="text-sm md:text-base font-bold text-emerald-600">
                                                                {i === 0 ? '۲ هفته' : i === 1 ? '۵ پروژه' : 'دارد ✓'}
                                                            </span>
                                                        </motion.div>
                                                    ))}
                                                </div>

                                                <motion.button
                                                    whileHover={{
                                                        scale: 1.03,
                                                        backgroundImage: 'linear-gradient(to right, #10b981, #059669)'
                                                    }}
                                                    whileTap={{ scale: 0.97 }}
                                                    className="mt-4 md:mt-6 w-full py-3 md:py-4 rounded-lg md:rounded-xl font-bold bg-gradient-to-r from-emerald-500 to-teal-400 text-white hover:shadow-lg transition-all shadow-emerald-200/50 text-sm md:text-base"
                                                >
                                                    شروع دوره
                                                </motion.button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Timeline Connector - Mobile */}
                                {index < stages.length - 1 && (
                                    <div className="md:hidden absolute top-full left-1/2 -translate-x-1/2 w-1 h-6 bg-gradient-to-b from-emerald-400/30 to-transparent" />
                                )}
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}