'use client'

import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Rocket, ChevronRight, Code2 } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

const Poster = () => {
    const [isMounted, setIsMounted] = useState(false)
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })

    useEffect(() => {
        setIsMounted(true)
    }, [])

    return (
        <section
            ref={ref}
            className="mt-20 md:mt-60"
        >
            <div className="container mx-auto px-5 xl:px-20">
                <div className='h-[500px] sm:h-[320px] relative overflow-hidden'>


                    {/* افکت پس‌زمینه */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 1 }}
                        className="absolute inset-0 bg-gradient-to-br from-[#042A1B] via-[#0A3323] to-[#042A1B] opacity-95 rounded-3xl"
                    />

                    {/* محتوای اصلی */}
                    <div className="relative z-10 h-full flex items-center justify-center">
                        <div className="container mx-auto px-4">
                            <motion.div
                                initial={{ y: '50%', opacity: 0 }}
                                animate={isInView ? { y: '0%', opacity: 1 } : {}}
                                transition={{ duration: 1 }}
                                className="text-center space-y-8"
                            >
                                {/* عنوان اصلی با افکت تایپ */}
                                <AnimatePresence>
                                    {isMounted && (
                                        <motion.h1
                                            initial={{ opacity: 0, y: 50 }}
                                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                                            transition={{ duration: 1, delay: 0.2 }}
                                            className="text-5xl md:text-6xl font-extrabold text-[#F6DC66] mb-8"
                                        >
                                            <span className="inline-block overflow-hidden">
                                                <motion.span
                                                    initial={{ y: '100%' }}
                                                    animate={isInView ? { y: 0 } : {}}
                                                    transition={{ duration: 1, delay: 0.5 }}
                                                    className="block"
                                                >
                                                    بوت کمپ فول استک
                                                </motion.span>
                                            </span>{' '}
                                            <span className="inline-block overflow-hidden">
                                                <motion.span
                                                    initial={{ y: '100%' }}
                                                    animate={isInView ? { y: 0 } : {}}
                                                    transition={{ duration: 1, delay: 0.8 }}
                                                    className="block bg-[#7AE36A] text-[#042A1B] px-4 py-2 rounded-xl"
                                                >
                                                    فرانت‌اند
                                                </motion.span>
                                            </span>
                                        </motion.h1>
                                    )}
                                </AnimatePresence>

                                {/* زیرعنوان با افکت حروف */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={isInView ? { opacity: 1 } : {}}
                                    transition={{ delay: 1.2 }}
                                    className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed"
                                >
                                    <div className="overflow-hidden">
                                        <motion.div
                                            initial={{ y: '100%' }}
                                            animate={isInView ? { y: 0 } : {}}
                                            transition={{ duration: 0.8, delay: 1.4 }}
                                        >
                                            تبدیل شو به توسعه‌دهنده سطح Senior با پروژه‌های واقعی
                                        </motion.div>
                                    </div>
                                    <div className="overflow-hidden">
                                        <motion.span
                                            initial={{ y: '100%' }}
                                            animate={isInView ? { y: 0 } : {}}
                                            transition={{ duration: 0.8, delay: 1.6 }}
                                            className="text-[#7AE36A] font-bold"
                                        >
                                            بدون نیاز به پیش‌زمینه برنامه‌نویسی
                                        </motion.span>
                                    </div>
                                </motion.div>

                                {/* دکمه‌های اقدام */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ delay: 2, type: 'spring' }}
                                    className="flex flex-col sm:flex-row gap-4 justify-center"
                                >
                                    <Link href="/front-boot-camp" passHref>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-8 py-3.5 bg-[#7AE36A] text-[#042A1B] rounded-xl font-bold relative overflow-hidden group shine-effect"
                                        >
                                            <span className="relative z-10 flex items-center justify-center gap-2">
                                                <Rocket className="w-5 h-5" />
                                                مشاهده دوره
                                            </span>
                                        </motion.button>
                                    </Link>

                                    {/* <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-8 py-3.5 border-2 border-[#7AE36A] text-[#7AE36A] rounded-xl font-bold relative overflow-hidden group"
                                    >
                                        <span className="relative z-10">دریافت مشاوره رایگان</span>
                                        <div className="absolute inset-0 bg-[#7AE36A10] opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </motion.button> */}
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>

                    {/* افکت کدنویسی */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 1 }}
                        className="absolute inset-0 z-0 pointer-events-none"
                    >
                        <motion.div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%]"
                            animate={isInView ? { rotate: [0, 360], scale: [1, 1.2] } : {}}
                            transition={{
                                duration: 30,
                                repeat: Infinity,
                                ease: 'linear'
                            }}
                        >
                            <Code2 className="absolute text-[#7AE36A20] w-32 h-32"
                                style={{ top: '10%', left: '20%' }} />
                            <Code2 className="absolute text-[#F6DC6620] w-28 h-28"
                                style={{ top: '70%', right: '15%' }} />
                            <Code2 className="absolute text-[#7AE36A20] w-24 h-24"
                                style={{ bottom: '20%', left: '40%' }} />
                        </motion.div>
                    </motion.div>

                    {/* افکت پارتیکل */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 1 }}
                        className="absolute inset-0 z-0 overflow-hidden"
                    >
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-2 h-2 bg-[#7AE36A] rounded-full shadow-glow"
                                initial={{
                                    x: Math.random() * window.innerWidth,
                                    y: Math.random() * window.innerHeight
                                }}
                                animate={isInView ? {
                                    scale: [0.5, 1, 0.5],
                                    opacity: [0.3, 1, 0.3]
                                } : {}}
                                transition={{
                                    duration: 2 + Math.random() * 3,
                                    repeat: Infinity,
                                    delay: Math.random() * 2
                                }}
                            />
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Poster