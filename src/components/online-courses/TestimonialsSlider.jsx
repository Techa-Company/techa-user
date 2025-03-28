'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Star } from 'lucide-react'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'


const TestimonialsSlider = ({ testimonials }) => {
    return (
        <section className="py-16 bg-emerald-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8">نظرات شرکت کنندگان</h2>

                <Swiper
                    modules={[Pagination, Navigation]}
                    spaceBetween={30}
                    slidesPerView={1}
                    loop={true}
                    pagination={{ clickable: true }}
                    navigation
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 }
                    }}
                >
                    {testimonials.map((testimonial, index) => (
                        <SwiperSlide key={index}>
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                className="bg-white p-8 rounded-2xl shadow-lg h-full mx-4"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <Image
                                        src={testimonial.avatar}
                                        alt={testimonial.name}
                                        width={64}
                                        height={64}
                                        className="rounded-full"
                                    />
                                    <div>
                                        <h4 className="font-bold">{testimonial.name}</h4>
                                        <p className="text-gray-500">{testimonial.role}</p>
                                    </div>
                                </div>
                                <p className="text-gray-600">{testimonial.text}</p>
                                <div className="mt-4 flex items-center gap-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-5 h-5 ${i < 5 ? 'text-amber-400' : 'text-gray-300'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    )
}

export default TestimonialsSlider