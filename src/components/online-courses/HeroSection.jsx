import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import Image from 'next/image'
import { Star, Clock, HeartHandshake, MessageCircle, Video, Zap } from 'lucide-react'
import DiscountTimer from './DiscountTimer'
import PricingSection from './PricingSection'
import RatingSection from './RatingSection'

const HeroSection = ({ data, onVideoClick }) => {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const radius = useMotionValue(0)
    const background = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, rgba(16, 185, 129, 0.15), transparent 80%)`

    const handleMouseMove = (e) => {
        const { left, top } = e.currentTarget.getBoundingClientRect()
        mouseX.set(e.clientX - left)
        mouseY.set(e.clientY - top)
        radius.set(800)
    }

    return (
        <header
            className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-900 to-emerald-950 text-white"
            onMouseMove={handleMouseMove}
        >
            <motion.div
                className="absolute inset-0 opacity-30"
                style={{ background }}
            />

            <div className="container mx-auto px-4 py-16 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* اطلاعات دوره */}
                    <div className="space-y-8">
                        {/* بخش رتبه‌بندی */}
                        <RatingSection rating={data.rating} reviews={data.reviews} />

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent"
                        >
                            {data.title}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-xl text-emerald-200 font-medium"
                        >
                            {data.excerpt}
                        </motion.p>

                        {/* قیمت و تایمر */}
                        <PricingSection
                            price={data.details.price}
                            discountPrice={data.details.discountPrice}
                        />

                        <DiscountTimer days={0} hours={5} minutes={3} />
                        {/* دکمه‌های اقدام */}
                        <div className="flex flex-wrap gap-4">
                            <motion.button
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: '0px 8px 25px rgba(16, 185, 129, 0.3)'
                                }}
                                whileTap={{ scale: 0.95 }}
                                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 group relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <Zap className="w-6 h-6 animate-pulse" />
                                <span className="relative">ثبت نام فوری</span>
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex-1 border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-500/10 px-8 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 group relative"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <MessageCircle className="w-6 h-6" />
                                <span className="relative">مشاوره رایگان</span>
                            </motion.button>
                        </div>
                    </div>

                    {/* بخش ویدیو */}
                    <motion.div
                        initial={{ scale: 0.95, rotate: -2 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                            type: 'spring',
                            stiffness: 100,
                            damping: 10
                        }}
                        className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl cursor-pointer group"
                        onClick={onVideoClick}
                    >
                        <Image
                            src={data.image}
                            alt={data.title}
                            fill
                            className="object-cover transform transition-transform duration-500 group-hover:scale-105"
                            placeholder="blur"
                            blurDataURL="/images/blur.jpg"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/60">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    className="w-24 h-24 bg-emerald-500/80 rounded-full flex items-center justify-center backdrop-blur-sm"
                                >
                                    <Video className="w-12 h-12 animate-pulse" />
                                </motion.div>
                            </div>

                            <div className="absolute bottom-6 right-6 left-6 flex items-center justify-between">
                                <span className="flex items-center gap-2 text-sm bg-emerald-500/20 px-4 py-2 rounded-full backdrop-blur-sm">
                                    <Clock className="w-5 h-5" />
                                    پیش‌نمایش ۵ دقیقه‌ای
                                </span>
                                <span className="bg-emerald-500/20 px-4 py-2 rounded-full backdrop-blur-sm">
                                    🎬 HD 1080
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* المان‌های دکوراتیو */}
                <div className="absolute -top-32 -right-32 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl" />
            </div>
        </header>
    )
}

export default HeroSection