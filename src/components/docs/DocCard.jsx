import Link from 'next/link';
import React, { useState } from 'react';
import { motion } from "framer-motion";
import { ArrowLeft, BookText, Clock, GraduationCap, ShoppingCart, Star, Users, Zap, Shield, Heart } from 'lucide-react';
import { RiDatabase2Fill, RiDatabaseFill, RiHtml5Fill, RiJavascriptFill, RiReactjsFill, RiTailwindCssFill } from 'react-icons/ri';
import { formatDuration } from '../../helper';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../features/cart/cartSlice';

const DocCard = ({ index, doc }) => {
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    const dispatch = useDispatch();

    console.log(doc)

    const truncateDescription = (description) => {
        if (!description) return "توضیحات در دسترس نیست.";
        const text = description.replace(/<[^>]*>/g, '');
        return text.split(" ").slice(0, 22).join(" ") + (text.split(" ").length > 10 ? "..." : "");
    };



    const icons = [
        <RiHtml5Fill className="w-10 h-10 text-[#E44D26]" />,     // نارنجی HTML5 (رنگ لوگوی رسمی)
        <RiJavascriptFill className="w-10 h-10 text-[#F0DB4F]" />, // زرد JS
        <RiTailwindCssFill className="w-10 h-10 text-[#38B2AC]" />, // آبی-سبز Tailwind
        <RiReactjsFill className="w-10 h-10 text-[#61DAFB]" />,    // آبی روشن React
        <RiDatabase2Fill className="w-10 h-10 text-[#4479A1]" />,  // آبی تیره Database
        <RiDatabaseFill className="w-10 h-10 text-[#6E5494]" />   // بنفش Database دوم یا متفاوت
    ];


    // محاسبه قیمت و تخفیف
    const price = doc.Price || 299000;
    const originalPrice = doc.OriginalPrice || 499000;
    const discount = doc.Discount || Math.round(((originalPrice - price) / originalPrice) * 100);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="group bg-gradient-to-br from-white to-emerald-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-emerald-100 overflow-hidden flex flex-col h-full relative"
        >
            {/* دکمه علاقه‌مندی */}
            {/* <button
                onClick={() => setIsLiked(!isLiked)}
                className="absolute top-4 left-4 z-10 p-2 bg-white/80 rounded-full backdrop-blur-sm hover:bg-white transition-colors"
            >
                <Heart
                    className={`w-5 h-5 ${isLiked ? 'fill-rose-500 text-rose-500' : 'text-gray-400'}`}
                />
            </button> */}

            {/* هدر کارت با گرادیانت سبز */}
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 p-5 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

                <div className="flex items-start justify-between relative z-10">
                    <div className="p-2 bg-white/70 rounded-xl backdrop-blur-sm">
                        {icons[index % icons.length]}
                    </div>
                    {discount < 0 && (
                        <div className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                            {discount} % تخفیف
                        </div>
                    )}
                </div>

                <h3 className="text-xl font-semibold mt-4 relative z-10">
                    مستندات {doc.Title}
                </h3>

                <div className="flex items-center mt-3 text-white/90">
                    <div className="flex items-center">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="text-sm mr-1">۴.۸</span>
                    </div>
                    <span className="mx-2">•</span>
                    <div className="flex items-center">
                        <Users className="w-4 h-4" />
                        <span className="text-sm mr-1">۱۲۵+ دانشجو</span>
                    </div>
                </div>
            </div>

            <div className="p-5 flex-grow">
                {/* توضیحات */}
                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                    {truncateDescription(doc.Description)}
                </p>

                {/* تگ‌ها */}
                <div className="flex flex-wrap gap-2 mb-5">
                    {doc.Features?.split(",").slice(0, 3).map((tag, i) => (
                        <span
                            key={i}
                            className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full font-medium"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* اطلاعات دوره */}
                <div className="grid grid-cols-2 text-sm text-gray-600 border-t border-emerald-100 gap-y-3 gap-x-2 pt-5">
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-emerald-600" />
                        <span>مدت : {formatDuration(doc.Duration) || '۱۲ ساعت'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <BookText className="w-4 h-4 text-emerald-600" />
                        <span>درس‌ها: {doc.Lessons || '۲۴'} جلسه</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-emerald-600" />
                        <span>سطح: {doc.Level || 'متوسط'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-emerald-600" />
                        <span>پروژه‌محور و عملی</span>
                    </div>
                </div>
            </div>

            {/* بخش قیمت و دکمه‌های اقدام */}
            <div className="p-5 pt-0 mt-auto">
                {/* نمایش قیمت */}
                <div className="flex items-center justify-between mb-4 bg-emerald-50 p-3 rounded-xl">
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-gray-900">
                            {price.toLocaleString()} تومان
                        </span>
                        {discount < 0 && (
                            <span className="text-sm text-gray-500 line-through">
                                {originalPrice.toLocaleString()}400 تومان
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col items-end">
                        <span className="text-xs text-gray-500">هزینه دوره</span>
                        {discount < 0 && (
                            <span className="text-xs text-amber-600 font-bold">صرفه‌جویی {((originalPrice - price) / 1000).toLocaleString()}1000 هزار تومان</span>
                        )}
                    </div>
                </div>

                {/* دکمه‌های اقدام */}
                <div className="grid grid-cols-2 gap-3">
                    <Link
                        href={`docs/${doc.Id}`}
                        className="py-3 bg-white border border-emerald-600 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm font-medium"
                    >
                        <span>مشاهده جزئیات</span>
                        <ArrowLeft size={16} />
                    </Link>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => dispatch(addToCart(doc))}
                        disabled={isAddingToCart}
                        className={`py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm font-medium ${isAddingToCart
                            ? 'bg-emerald-400 text-white'
                            : 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white shadow-md hover:shadow-lg'
                            }`}
                    >
                        {isAddingToCart ? (
                            <>
                                <span>در حال افزودن...</span>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            </>
                        ) : (
                            <>
                                <span>خرید دوره</span>
                                <ShoppingCart size={16} />
                            </>
                        )}
                    </motion.button>
                </div>

                {/* گارانتی و ویژگی‌های اضافی */}
                {/* <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
                    <div className="flex items-center text-emerald-700">
                        <Shield className="w-4 h-4 ml-1" />
                        <span>ضمانت بازگشت وجه</span>
                    </div>
                    <div className="flex items-center text-emerald-700">
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span>گواهینامه معتبر</span>
                    </div>
                    <div className="flex items-center text-emerald-700">
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <span>آپدیت رایگان</span>
                    </div>
                    <div className="flex items-center text-emerald-700">
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <span>پشتیبانی آنلاین</span>
                    </div>
                </div> */}
            </div>
        </motion.div>
    );
};

export default DocCard;