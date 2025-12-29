import React from 'react';
import Skeleton from 'react-loading-skeleton';

const DocsSkeleton = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 mt-10 px-4 lg:px-10">
            {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg border border-emerald-100 overflow-hidden flex flex-col h-full">

                    {/* شبیه‌سازی هدر رنگی کارت (Header Section) */}
                    <div className="p-5 bg-emerald-50/30 border-b border-emerald-50">
                        {/* آیکون و بج تخفیف */}
                        <div className="flex justify-between items-start mb-4">
                            <Skeleton width={56} height={56} borderRadius="0.75rem" /> {/* جایگزین آیکون تکنولوژی */}
                            <Skeleton width={40} height={40} circle={true} /> {/* جایگزین بج تخفیف */}
                        </div>

                        {/* عنوان */}
                        <h3 className="mt-4">
                            <Skeleton height={24} width="70%" />
                        </h3>

                        {/* ریتینگ و تعداد دانشجو */}
                        <div className="flex items-center gap-3 mt-3">
                            <Skeleton width={40} height={16} />
                            <span className="text-gray-300">•</span>
                            <Skeleton width={80} height={16} />
                        </div>
                    </div>

                    {/* بدنه کارت (Body Section) */}
                    <div className="p-5 flex-grow">
                        {/* توضیحات */}
                        <div className="space-y-2 mb-5">
                            <Skeleton count={2} />
                        </div>

                        {/* تگ‌ها */}
                        <div className="flex flex-wrap gap-2 mb-5">
                            <Skeleton width={60} height={24} borderRadius="9999px" />
                            <Skeleton width={70} height={24} borderRadius="9999px" />
                            <Skeleton width={50} height={24} borderRadius="9999px" />
                        </div>

                        {/* گرید ویژگی‌ها (مدت، درس‌ها، سطح، پروژه) */}
                        <div className="grid grid-cols-2 gap-y-3 gap-x-2 pt-5 border-t border-emerald-100">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <Skeleton circle={true} width={16} height={16} />
                                    <Skeleton width={60} height={14} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* فوتر کارت (Price & Buttons) */}
                    <div className="p-5 pt-0 mt-auto">
                        {/* بخش قیمت */}
                        <div className="flex items-center justify-between mb-4 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
                            <div className="flex flex-col gap-1">
                                <Skeleton width={100} height={20} /> {/* قیمت اصلی */}
                                <Skeleton width={60} height={12} />  {/* قیمت خط خورده */}
                            </div>
                            <Skeleton width={40} height={24} borderRadius="9999px" /> {/* درصد تخفیف */}
                        </div>

                        {/* دکمه‌ها */}
                        <div className="grid grid-cols-2 gap-3">
                            {/* دکمه جزئیات */}
                            <Skeleton height={48} borderRadius="0.75rem" />
                            {/* دکمه خرید */}
                            <Skeleton height={48} borderRadius="0.75rem" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DocsSkeleton;