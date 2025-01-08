"use client"
import React, { useEffect } from 'react';
import { LeftAngleIcon, RightAngleIcon } from '../Icons/Icons';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Navigation } from 'swiper/modules';

const LastCourses = () => {

    const images = [
        "/images/sql.webp",
        "/images/sql-2.jpg",
        "/images/React.jpg",
        "/images/htmlcss.jpeg",
        "/images/tailwind.jpg",
        "/images/js.png",
    ];
    useEffect(() => {
    }, []);

    return (
        <div className="mt-20 md:mt-60">
            <div className="container mx-auto px-5 xl:px-20">
                <div className="flex flex-col md:flex-row md:justify-between items-center">
                    <div className="text-[#042A1B] text-center md:text-start">
                        <h1 className="font-extrabold text-4xl ">
                            معرفی <span className="bg-[#7AE36A] py-0.5 px-3 rounded-xl inline-block">دوره ها</span>
                        </h1>
                        <p className="text-lg font-normal mt-3">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ</p>
                    </div>
                    <div className="hidden md:flex items-center gap-5">
                        <span className="custom-prev border border-[#042A1B4D] h-14 w-14 rounded-full flex justify-center items-center cursor-pointer hover:border-[#042A1B]">
                            <LeftAngleIcon />
                        </span>
                        <span className="custom-next border border-[#042A1B4D] h-14 w-14 rounded-full flex justify-center items-center cursor-pointer hover:border-[#042A1B]">
                            <RightAngleIcon />
                        </span>
                    </div>
                </div>
                <div >
                    <Swiper
                        style={{
                            padding: '50px 0px',
                        }}
                        slidesPerView={1}
                        spaceBetween={50}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        loop
                        breakpoints={{
                            600: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            992: {
                                slidesPerView: 2,
                                spaceBetween: 40,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                            1280: {
                                slidesPerView: 4,
                                spaceBetween: 40,
                            },
                        }}
                        navigation={{
                            nextEl: '.custom-next',
                            prevEl: '.custom-prev',
                        }}
                        modules={[Autoplay, Navigation]}
                        className="mySwiper"
                    >
                        {[...Array(6)].map((item, index) => {
                            return (
                                <SwiperSlide key={index} className="swiper-slide">
                                    <div className="custom-shadow rounded-3xl">
                                        <div className="relative w-full pb-[55%] lg:mt-0">
                                            <Image src={images[index]} className="rounded-3xl" layout="fill" objectFit="cover" alt="banner" />
                                        </div>
                                        <div className="text-[#042A1B] p-5">
                                            <h3 className="mb-3 text-2xl font-extrabold">دوره JavaScript</h3>
                                            <p className="text-[15px] text-justify leading-7">
                                                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است
                                            </p>
                                            <div className="grid grid-cols-2 gap-5 text-center mt-5">
                                                <Link className="text-sm font-normal  bg-[#D0DDD140] py-2.5 rounded-xl hover:bg-[#7AE36A] hover:text-[#fff]" href={`/courses/${String(index + 1)}`}>
                                                    مشاهده دوره
                                                </Link>
                                                <Link className="text-sm font-normal  bg-[#D0DDD140] py-2.5 rounded-xl hover:bg-[#7AE36A] hover:text-[#fff]" href="">
                                                    اجرای بر خط
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default LastCourses;
