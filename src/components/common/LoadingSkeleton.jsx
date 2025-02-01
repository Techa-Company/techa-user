// components/LoadingSkeleton.js

import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Loader = () => {
    return (
        <div className="grid gap-10 mt-10 lg:px-10">
            {[...Array(3)].map((_, index) => (
                <div key={index} className="custom-shadow rounded-3xl flex flex-col md:flex-row p-5">
                    {/* تصویر اسکلتون */}
                    <div className="w-full h-48 md:w-80 md:h-48 rounded-3xl overflow-hidden">
                        <Skeleton height="100%" width="100%" />
                    </div>
                    {/* محتوای اسکلتون */}
                    <div className="text-[#042A1B] p-5 flex flex-col justify-between w-full">
                        <div>
                            <Skeleton height={24} width="50%" className="mb-4" />
                            <Skeleton count={2} className="mb-2" />
                        </div>
                        <div className="grid grid-cols-2 gap-5 text-center mt-5 w-full md:w-60">
                            <Skeleton height={40} borderRadius={16} />
                            <Skeleton height={40} borderRadius={16} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Loader;
