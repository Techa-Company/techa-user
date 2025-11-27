import Link from 'next/link';
import React, { useState } from 'react';
import { motion } from "framer-motion";
import { ArrowLeft, BookText, Clock, GraduationCap, ShoppingCart, Star, Users, Zap } from 'lucide-react';
import { RiDatabase2Fill, RiDatabaseFill, RiHtml5Fill, RiJavascriptFill, RiReactjsFill, RiTailwindCssFill } from 'react-icons/ri';
import { formatDuration } from '../../helper';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../features/cart/cartSlice';

const DocCard = ({ index, doc }) => {
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const isInCart = cartItems.some(item => item.Id === doc.Id);

    const truncateDescription = (description) => {
        if (!description) return "توضیحات در دسترس نیست.";
        const text = description.replace(/<[^>]*>/g, '');
        return text.split(" ").slice(0, 22).join(" ") + ".";
    };

    const iconStyles = [
        { el: <RiHtml5Fill className="w-10 h-10 text-[#E44D26]" />, bg: "bg-orange-100" },
        { el: <RiJavascriptFill className="w-10 h-10 text-[#F0DB4F]" />, bg: "bg-gray-800" },
        { el: <RiTailwindCssFill className="w-10 h-10 text-[#38B2AC]" />, bg: "bg-gray-900" },
        { el: <RiReactjsFill className="w-10 h-10 text-[#61DAFB]" />, bg: "bg-gray-900" },
        { el: <RiDatabase2Fill className="w-10 h-10 text-[#4479A1]" />, bg: "bg-slate-100" },
        { el: <RiDatabaseFill className="w-10 h-10 text-[#6E5494]" />, bg: "bg-slate-100" },
    ];

    const levelMap = {
        Beginner: "مبتدی",
        Intermediate: "متوسط",
        Advanced: "پیشرفته",
    };

    const handleAddToCart = () => {
        if (isInCart) return;
        setIsAddingToCart(true);
        setTimeout(() => {
            // ذخیره نسخه نهایی قیمت با تخفیف
            const finalPrice = doc.DiscountAmount
                ? Math.round(doc.Price * (1 - doc.DiscountAmount / 100))
                : doc.Price;
            dispatch(addToCart({ ...doc, FinalPrice: finalPrice }));
            setIsAddingToCart(false);
        }, 500); // شبیه‌سازی لودینگ
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="group bg-gradient-to-br from-white to-emerald-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-emerald-100 overflow-hidden flex flex-col h-full relative"
        >
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 p-5 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

                <div className="flex items-start justify-between relative z-10">
                    <div className={`p-2 rounded-xl shadow-md ${iconStyles[index].bg}`}>
                        {iconStyles[index].el}
                    </div>
                    {doc.DiscountAmount > 0 && (
                        <div className="absolute top-1 -left-1 cursor-pointer">
                            {/* افکت درخشش */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg blur opacity-75 animate-pulse"></div> {/* تگ تخفیف اصلی */}
                            <div className="relative bg-gradient-to-br from-orange-500 via-red-500 to-orange-600 text-white text-lg font-extrabold px-4 py-3 rounded-xl shadow-2xl transform -rotate-6 hover:rotate-0 transition-all duration-300 hover:scale-110 border-2 border-white/30 backdrop-blur-sm">
                                {/* آیکون ستاره */}
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-bounce flex items-center justify-center">
                                    <span className="text-xs">⭐</span>
                                </div>
                                {/* متن تخفیف */}
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl drop-shadow-lg font-semibold">{doc.DiscountAmount}%</span>
                                    <span className="text-sm whitespace-nowrap">تخفیف ویژه</span>
                                </div>
                                {/* خط زدن زیر متن */}
                                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-white/50 rounded-full"></div> {/* افکت دانه‌دار */} <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20200%20200%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.65%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22/%3E%3C/filter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url%28%23noise%29%22%20opacity%3D%220.1%22/%3E%3C/svg%3E')] opacity-20 rounded-xl"></div> </div> </div>
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
                        <span className="text-sm mr-1">{doc.StudentCount} دانشجو</span>
                    </div>
                </div>
            </div>

            <div className="p-5 flex-grow">
                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                    {truncateDescription(doc.Summary)}
                </p>

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

                <div className="grid grid-cols-2 text-sm text-gray-600 border-t border-emerald-100 gap-y-3 gap-x-2 pt-5">
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-emerald-600" />
                        <span>مدت : {formatDuration(doc.Duration) || '۱۲ ساعت'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <BookText className="w-4 h-4 text-emerald-600" />
                        <span>درس‌ها: {doc.Lessons || 0} جلسه</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-emerald-600" />
                        <span>سطح: {levelMap[doc.Level] || "نامشخص"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-emerald-600" />
                        <span>پروژه‌محور و عملی</span>
                    </div>
                </div>
            </div>

            <div className="p-5 pt-0 mt-auto">
                <div className="flex items-center justify-between mb-4 bg-emerald-50 p-3 rounded-xl">
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-gray-900">
                            {doc.FinalPrice ? doc.FinalPrice.toLocaleString() : doc.Price.toLocaleString()} تومانء
                        </span>
                        {doc.DiscountAmount > 0 && (
                            <span className=" text-gray-500 line-through">
                                {doc.Price.toLocaleString()} تومان
                            </span>
                        )}
                    </div>
                    {doc.DiscountAmount > 0 && (
                        <div className="bg-orange-100 text-rose-600 text-sm font-medium px-2 py-1 rounded-full">
                            {doc.DiscountAmount}%
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <Link
                        href={`docs/${doc.Id}`}
                        className="py-3 bg-white border border-emerald-600 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm font-medium"
                    >
                        <span>مشاهده جزئیات</span>
                        <ArrowLeft size={16} />
                    </Link>

                    <motion.button
                        whileHover={{ scale: isInCart ? 1 : 1.02 }}
                        whileTap={{ scale: isInCart ? 1 : 0.98 }}
                        onClick={handleAddToCart}
                        disabled={isAddingToCart || isInCart}
                        className={`py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm font-medium ${isInCart
                            ? 'bg-gray-400 text-white cursor-not-allowed'
                            : isAddingToCart
                                ? 'bg-emerald-400 text-white'
                                : 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white shadow-md hover:shadow-lg'
                            }`}
                    >
                        {isAddingToCart ? (
                            <>
                                <span>در حال افزودن...</span>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            </>
                        ) : isInCart ? (
                            <>
                                <span>در سبد خرید</span>
                                <ShoppingCart size={16} />
                            </>
                        ) : (
                            <>
                                <span>خرید دوره</span>
                                <ShoppingCart size={16} />
                            </>
                        )}
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default DocCard;
