import Link from 'next/link';
import React from 'react';
import { motion } from "framer-motion";
import Image from 'next/image';
import { ArrowLeft, BookText, Clock, GraduationCap } from 'lucide-react';
import * as RiIcons from "react-icons/ri";
import { formatDuration } from '../../helper';


const DocCard = ({ doc }) => {

    const truncateDescription = (description) => {
        const div = document.createElement("div");
        div.innerHTML = description || "توضیحات در دسترس نیست.";
        const text = div.innerText;
        return text.split(" ").slice(0, 6).join(" ") + (description ? "..." : "");
    };

    const iconName = doc.Icon;
    const IconComponent = RiIcons[iconName];

    console.log(doc.Duration)


    return (
        <div
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 group"
        >
            <div className="p-6">
                {/* هدر کارت */}
                <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-emerald-50 rounded-xl">
                        {IconComponent ? (
                            <IconComponent className="w-6 h-6 text-emerald-600" />
                        ) : (
                            <span className="text-xs text-gray-400">Icon</span>
                        )}
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">
                            مستندات {doc.Title}
                        </h3>
                        <p dangerouslySetInnerHTML={{ __html: truncateDescription(doc.Summary) }} className="text-sm text-gray-600 mt-1">

                        </p>
                    </div>
                </div>

                {/* تگ‌ها */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {doc.Features?.split("،").map((tag, i) => (
                        <span
                            key={i}
                            className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs rounded-full"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* اطلاعات دوره */}
                <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-emerald-600" />
                        <span>مدت زمان : {formatDuration(doc.Duration)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <BookText className="w-4 h-4 text-emerald-600" />
                        <span>تعداد درس‌ها: {doc.Lessons} جلسه</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-emerald-600" />
                        <span>سطح: {doc.Level}</span>
                    </div>
                </div>

                {/* دکمه اقدام */}
                <Link href={`docs/${doc.Id}`} className="mt-4 w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-xl transition-colors flex items-center justify-center gap-2">
                    <span>مشاهده سرفصل‌ ها</span>
                    <ArrowLeft />
                </Link>
            </div>
        </div>
    );
};

export default DocCard;