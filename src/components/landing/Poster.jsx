'use client'

import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Rocket, Code2, Code, Briefcase } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'

const Poster = () => {
    const [isMounted, setIsMounted] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0)
    const [particlePositions, setParticlePositions] = useState([]);
    const refs = [
        useRef(null),
        useRef(null),
        useRef(null)
    ]

    const isInView1 = useInView(refs[0], { margin: '-100px' })
    const isInView2 = useInView(refs[1], { margin: '-100px' })
    const isInView3 = useInView(refs[2], { margin: '-100px' })

    useEffect(() => {
        setIsMounted(true);
        // Generate random positions for particles
        const positions = Array.from({ length: 20 }, () => ({
            x: Math.random() * 1000,
            y: Math.random() * 500
        }));
        setParticlePositions(positions);
    }, [])

    const slides = [
        // {
        //     title: 'بوت کمپ توسعه فرانت اند',
        //     badge: 'پروژه محور',
        //     description: 'آموزش عملی با پروژه‌های واقعی و مربیان حرفه‌ای - شامل تمرینات کدنویسی روزانه و ادیتور آنلاین',
        //     link: "/front-boot-camp",
        //     buttonText: 'شروع سفر یادگیری',
        //     icon: <Rocket className="w-5 h-5" />
        // },
        // {
        //     title: 'دوره کارآموزی حرفه‌ای',
        //     badge: 'تجربه صنعتی',
        //     description: 'همکاری با تیم‌های توسعه واقعی و ساخت محصولات قابل ارائه در رزومه',
        //     link: "/internship",
        //     buttonText: 'فرصت‌های شغلی را کشف کن',
        //     icon: <Briefcase className="w-5 h-5" />
        // },
        {
            title: 'مستندات آموزشی پیشرفته',
            badge: 'منابع تعاملی',
            description: 'دسترسی به مستندات جامع با قابلیت اجرای کد در ادیتور آنلاین و مثال‌های تعاملی',
            link: "/docs",
            buttonText: 'شروع به یادگیری',
            icon: <Code className="w-5 h-5" />
        }
    ];

    return (
        <section className="mt-20 md:mt-60 mb-20">
            <div className="container mx-auto px-5 xl:px-20">
                {/* <Swiper
                    modules={[Autoplay, Pagination]}
                    autoplay={{ delay: 10000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    spaceBetween={50}
                    slidesPerView={1}
                    loop={true}
                    onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                    className="h-[320px] relative overflow-hidden"
                > */}
                <div
                    className="h-[320px] relative overflow-hidden">

                    {slides.map((slide, index) => (
                        // <SwiperSlide key={index}>
                        <div key={index} ref={refs[index]} className="h-full w-full">
                            {/* افکت پس زمینه */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={[isInView1, isInView2, isInView3][index] ? { opacity: 1 } : {}}
                                transition={{ duration: 1 }}
                                className="absolute inset-0 bg-gradient-to-br from-[#042A1B] via-[#0A3323] to-[#042A1B] opacity-95 rounded-3xl"
                            />

                            {/* محتوای اصلی */}
                            <div className="relative z-10 h-full flex items-center justify-center">
                                <div className="container mx-auto px-4">
                                    <motion.div
                                        key={activeIndex}
                                        initial={{ y: '50%', opacity: 0 }}
                                        animate={[isInView1, isInView2, isInView3][index] ? { y: '0%', opacity: 1 } : {}}
                                        transition={{ duration: 1 }}
                                        className="text-center space-y-8"
                                    >
                                        {/* عنوان */}
                                        <AnimatePresence mode='wait'>
                                            {isMounted && (
                                                <motion.h1
                                                    key={`title-${activeIndex}`}
                                                    initial={{ opacity: 0, y: 50 }}
                                                    animate={[isInView1, isInView2, isInView3][index] ? { opacity: 1, y: 0 } : {}}
                                                    transition={{ duration: 1, delay: 0.2 }}
                                                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-[#F6DC66]"
                                                >
                                                    <span className="inline-block overflow-hidden">
                                                        <motion.span
                                                            initial={{ y: '100%' }}
                                                            animate={[isInView1, isInView2, isInView3][index] ? { y: 0 } : {}}
                                                            transition={{ duration: 1, delay: 0.5 }}
                                                            className="block"
                                                        >
                                                            {slide.title}
                                                        </motion.span>
                                                    </span>{' '}
                                                    <span className="inline-block overflow-hidden">
                                                        <motion.span
                                                            initial={{ y: '100%' }}
                                                            animate={[isInView1, isInView2, isInView3][index] ? { y: 0 } : {}}
                                                            transition={{ duration: 1, delay: 0.8 }}
                                                            className="block bg-[#7AE36A] text-[#042A1B] px-4 py-2 rounded-xl"
                                                        >
                                                            {slide.badge}
                                                        </motion.span>
                                                    </span>
                                                </motion.h1>
                                            )}
                                        </AnimatePresence>

                                        {/* توضیحات */}
                                        <motion.div
                                            style={{ margin: "7 auto" }}
                                            key={`desc-${activeIndex}`}
                                            initial={{ opacity: 0 }}
                                            animate={[isInView1, isInView2, isInView3][index] ? { opacity: 1 } : {}}
                                            transition={{ delay: 1.2 }}
                                            className="text-lg md:text-2xl text-white/90 mb-5 max-w-2xl mx-auto space-y-0"
                                        >
                                            <div className="overflow-hidden">
                                                <motion.span
                                                    initial={{ y: '100%' }}
                                                    animate={[isInView1, isInView2, isInView3][index] ? { y: 0 } : {}}
                                                    transition={{ duration: 0.8, delay: 1.6 }}
                                                    className="text-[#7AE36A] font-bold"
                                                >
                                                    {slide.description}
                                                </motion.span>
                                            </div>
                                        </motion.div>

                                        {/* دکمه‌ها */}
                                        <motion.div
                                            key={`buttons-${activeIndex}`}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={[isInView1, isInView2, isInView3][index] ? { opacity: 1, scale: 1 } : {}}
                                            transition={{ delay: 2, type: 'spring' }}
                                            className="flex flex-col sm:flex-row gap-4 justify-center"
                                        >
                                            <Link href={slide.link} passHref>
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="px-8 py-3.5 bg-[#7AE36A] text-[#042A1B] rounded-xl font-bold relative overflow-hidden group shine-effect"
                                                >
                                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                                        {slide.icon}
                                                        {slide.buttonText}
                                                    </span>
                                                </motion.button>
                                            </Link>
                                        </motion.div>
                                    </motion.div>
                                </div>
                            </div>

                            {/* افکت کدنویسی */}
                            <motion.div
                                key={`code-${activeIndex}`}
                                initial={{ opacity: 0 }}
                                animate={[isInView1, isInView2, isInView3][index] ? { opacity: 1 } : {}}
                                transition={{ duration: 1 }}
                                className="absolute inset-0 z-0 pointer-events-none"
                            >
                                <motion.div
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%]"
                                    animate={[isInView1, isInView2, isInView3][index] ? { rotate: [0, 360], scale: [1, 1.2] } : {}}
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
                                key={`particles-${activeIndex}`}
                                initial={{ opacity: 0 }}
                                animate={[isInView1, isInView2, isInView3][index] ? { opacity: 1 } : {}}
                                transition={{ duration: 1 }}
                                className="absolute inset-0 z-0 overflow-hidden"
                            >
                                {particlePositions.map((pos, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute w-2 h-2 bg-[#7AE36A] rounded-full shadow-glow"
                                        initial={{
                                            x: pos.x,
                                            y: pos.y
                                        }}
                                        animate={[isInView1, isInView2, isInView3][index] ? {
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
                        // </SwiperSlide>
                    ))}
                    {/* <style jsx global>{`
            .swiper-pagination-bullet {
                background: #7AE36A !important;
                bottom: 20px;
                opacity: 0.5;
                }
                .swiper-pagination-bullet-active {
                    opacity: 1 !important;
                    }
                    `}</style>
                    </Swiper> */}
                </div>
            </div>
        </section>
    )
}

export default Poster