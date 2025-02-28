"use client";
import React, { useEffect, useState } from 'react';
import { LeftAngleIcon, RightAngleIcon } from '../Icons/Icons';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Navigation } from 'swiper/modules';
import { BlogCard } from '../blog/BlogCard';

const LastArticles = () => {
    // const [courses, setCourses] = useState([]);
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     fetch("https://api.techa.me/api/Course")
    //         .then((response) => response.json())
    //         .then((data) => {
    //             if (data.IsSuccess) {
    //                 setCourses(data.Data.filter(course => !course.Disabled));
    //             }
    //             setLoading(false);
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching courses:", error);
    //             setLoading(false);
    //         });
    // }, []);

    const posts = [

        {
            id: 1,
            slug: 'react-optimization-tips',
            title: 'تکنیک‌های بهینه‌سازی React.js',
            excerpt: 'بهترین روش‌ها برای بهینه‌سازی عملکرد برنامه‌های React.js',
            content: '...محتوا کامل مقاله...',
            category: 'تکنولوژی',
            author: 'رامین جوشنگ',
            date: '1403/03/20',
            imageUrl: '/images/blog-1.png',
            likes: 30,
            saves: 12,
            shares: 5,
            comments: [
                { id: 1, user: 'کاربر۲', text: 'بسیار مفید بود!', date: '1403/03/21' }
            ]
        },
        {
            id: 2,
            slug: 'introduction-to-graphql',
            title: 'آشنایی با GraphQL',
            excerpt: 'راهنمای جامع برای استفاده از GraphQL در برنامه‌های مدرن',
            content: '...محتوا کامل مقاله...',
            category: 'تکنولوژی',
            author: 'رامین جوشنگ',
            date: '1403/04/01',
            imageUrl: '/images/blog-1.png',
            likes: 45,
            saves: 18,
            shares: 10,
            comments: [
                { id: 1, user: 'کاربر۳', text: 'خیلی آموزنده بود.', date: '1403/04/02' }
            ]
        },
        {
            id: 3,
            slug: 'best-javascript-libraries',
            title: 'بهترین کتابخانه‌های JavaScript',
            excerpt: 'معرفی کتابخانه‌های کاربردی و محبوب JavaScript',
            content: '...محتوا کامل مقاله...',
            category: 'تکنولوژی',
            author: 'رامین جوشنگ',
            date: '1403/05/10',
            imageUrl: '/images/blog-1.png',
            likes: 50,
            saves: 20,
            shares: 15,
            comments: [
                { id: 1, user: 'کاربر۴', text: 'عالی بود!', date: '1403/05/11' }
            ]
        },
        {
            id: 4,
            slug: 'advanced-software-testing-methods',
            title: 'روش‌های پیشرفته تست نرم‌افزار',
            excerpt: 'راهنمای کامل برای تست نرم‌افزار با استفاده از ابزارهای پیشرفته',
            content: '...محتوا کامل مقاله...',
            category: 'تکنولوژی',
            author: 'رامین جوشنگ',
            date: '1403/06/05',
            imageUrl: '/images/blog-1.png',
            likes: 35,
            saves: 15,
            shares: 7,
            comments: [
                { id: 1, user: 'کاربر۵', text: 'خیلی خوب توضیح داده شده بود.', date: '1403/06/06' }
            ]
        },
        {
            id: 5,
            slug: 'introduction-to-docker',
            title: 'معرفی Docker و مزایای آن',
            excerpt: 'راهنمای کامل برای استفاده از Docker در پروژه‌های نرم‌افزاری',
            content: '...محتوا کامل مقاله...',
            category: 'تکنولوژی',
            author: 'رامین جوشنگ',
            date: '1403/07/15',
            imageUrl: '/images/blog-1.png',
            likes: 40,
            saves: 17,
            shares: 8,
            comments: [
                { id: 1, user: 'کاربر۶', text: 'اطلاعات مفیدی بود.', date: '1403/07/16' }
            ]
        }


    ];



    return (
        <div className="mt-20">
            <div className="container mx-auto px-5 xl:px-20">
                <div className="flex flex-col md:flex-row md:justify-between items-center">
                    <div className="text-[#042A1B] text-center md:text-start">
                        <h1 className="font-extrabold text-4xl ">
                            آخرین
                            <span className="bg-[#7AE36A] py-0.5 px-3 rounded-xl inline-block">مقالات</span>
                        </h1>
                        <p className="text-lg font-normal mt-3">آخرین مقالات و آموزش‌های برنامه‌نویسی</p>
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
                {posts.length === 0 ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="loader"></div>
                    </div>
                ) : (
                    <div>
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
                                // 1280: {
                                //     slidesPerView: 4,
                                //     spaceBetween: 40,
                                // },
                            }}
                            navigation={{
                                nextEl: '.custom-next',
                                prevEl: '.custom-prev',
                            }}
                            modules={[Autoplay, Navigation]}
                            className="mySwiper"
                        >
                            {posts.map((post, index) => {
                                return (
                                    <SwiperSlide key={post.id} className="swiper-slide">
                                        <BlogCard
                                            post={post}
                                            index={index}
                                        />
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LastArticles;
