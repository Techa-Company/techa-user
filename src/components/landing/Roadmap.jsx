"use client"
import { motion, useScroll, useTransform } from 'framer-motion'
import { Code, BookOpen, GraduationCap, Layout, Terminal, Briefcase, Rocket } from 'lucide-react'
import { useRef } from 'react'
import { cn } from '../../lib/utils'

const stages = [
    {
        id: 1,
        title: 'آموزش مقدماتی HTML,CSS',
        icon: Code,
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
        icon: Layout,
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
        icon: Terminal,
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
        icon: BookOpen,
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
        icon: Rocket,
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
        icon: Briefcase,
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
        icon: GraduationCap,
        payment: '1,400,000 تومان',
        credit: '1,500,000 تومان',
        summary: 'ارائه هاست - فضای توسعه - اجرای پروژه',
        duration: '۳ هفته',
        projects: 3,
        isLocked: false
    },
]

export default function Roadmap() {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
    const rotate = useTransform(scrollYProgress, [0, 1], [15, -15])

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-slate-50 to-emerald-100 py-12 md:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Animated Background */}
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
                    <Rocket className="w-96 h-96 text-emerald-400/30" />
                </motion.div>

                {/* Header Section */}
                <div className="text-[#042A1B] text-center mb-16">
                    <h1 className="font-extrabold text-4xl md:text-5xl">
                        نقشه راه <span className="bg-[#7AE36A] py-0.5 px-3 rounded-xl inline-block">فریلنسری</span>
                    </h1>
                    <p className="text-lg font-normal mt-3 md:text-xl">
                        چطور می توانید در 12 ماه به یک فریلنسر با درآمد خوب تبدیل شوید؟
                    </p>
                </div>

                {/* Stages Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stages.map((stage) => {
                        const Icon = stage.icon
                        return (
                            <motion.div
                                key={stage.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                                whileHover={{ scale: 1.02 }}
                                className={cn(
                                    "relative p-8 rounded-3xl border-2 border-emerald-100 bg-white/90 backdrop-blur-lg",
                                    stage.isLocked ? "opacity-75" : "hover:shadow-xl",
                                    "transition-all duration-300"
                                )}
                            >
                                {/* Stage Number Background */}
                                <div className="absolute -top-10 left-4 opacity-20">
                                    <span className="text-[200px] font-black text-emerald-500">
                                        {stage.id}
                                    </span>
                                </div>

                                {/* Icon Container */}
                                <div className="mb-6 relative z-10">
                                    <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center">
                                        <Icon className="w-8 h-8 text-emerald-600" />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="space-y-4 relative z-10">
                                    <h3 className="text-2xl font-bold text-emerald-800">
                                        {stage.title}
                                    </h3>

                                    {/* Payment and Credit Badges */}
                                    <div className="flex flex-wrap gap-2">
                                        <div className="px-4 py-2 rounded-full bg-emerald-50 flex items-center gap-2">
                                            <span className="text-emerald-600 font-medium">
                                                {stage.payment}
                                            </span>
                                        </div>
                                        <div className="px-4 py-2 rounded-full bg-purple-50 flex items-center gap-2">
                                            <span className="text-purple-600 font-medium">
                                                {stage.credit}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Summary */}
                                    <p className="text-slate-600 leading-relaxed">
                                        {stage.summary}
                                    </p>

                                    {/* Footer */}
                                    <div className="flex justify-between items-center pt-4 border-t border-emerald-100">
                                        <div className="text-sm text-slate-500">
                                            {stage.duration}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                                            <span className="text-sm text-emerald-600">
                                                {stage.projects} پروژه عملی
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Glow Effect */}
                                {!stage.isLocked && (
                                    <div className="absolute inset-0 rounded-3xl pointer-events-none border border-emerald-200/50" />
                                )}
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}