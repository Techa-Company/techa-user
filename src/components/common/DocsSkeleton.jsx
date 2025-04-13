import React from 'react';
import Skeleton from 'react-loading-skeleton';

const DocsSkeleton = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-10 lg:px-10">
            {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 group">
                    <div className="p-6">
                        {/* هدر کارت */}
                        <div className="flex items-start gap-4 mb-2">
                            <div className="p-3 bg-emerald-50 rounded-full w-10 h-10 flex items-center justify-center">
                                <Skeleton circle={true} height={40} width={40} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">
                                    <Skeleton height={22} width={100} />
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    <Skeleton width={200} />
                                </p>
                            </div>
                        </div>

                        {/* تگ‌ها */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            <Skeleton height={20} width={60} className="rounded-full" />
                            <Skeleton height={20} width={60} className="rounded-full" />
                        </div>

                        {/* اطلاعات دوره */}
                        <div className="space-y-3 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <Skeleton className="w-4 h-4  rounded-full" />
                                <Skeleton width={80} />
                            </div>
                            <div className="flex items-center gap-2">
                                <Skeleton className="w-4 h-4  rounded-full" />
                                <Skeleton width={80} />
                            </div>
                            <div className="flex items-center gap-2">
                                <Skeleton className="w-4 h-4  rounded-full" />
                                <Skeleton width={80} />
                            </div>
                        </div>

                        {/* دکمه اقدام */}
                        <Skeleton height={40} className="mt-4 rounded-xl" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DocsSkeleton;