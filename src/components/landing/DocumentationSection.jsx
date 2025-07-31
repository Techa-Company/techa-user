"use client"
import { BookText, Code, GraduationCap, Clock, FileText, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { SP_fetch } from '../../api/utils/api';
import { formatDuration } from '../../helper';
import { RiDatabase2Fill, RiDatabaseFill, RiHtml5Fill, RiJavascriptFill, RiReactjsFill, RiTailwindCssFill } from 'react-icons/ri';





const DocumentationSection = () => {


    const icons = [
        <RiHtml5Fill className="w-6 h-6 text-emerald-600" />,
        <RiJavascriptFill className="w-6 h-6 text-emerald-600" />,
        <RiTailwindCssFill className="w-6 h-6 text-emerald-600" />,
        <RiReactjsFill className="w-6 h-6 text-emerald-600" />,
        <RiDatabase2Fill className="w-6 h-6 text-emerald-600" />,
        <RiDatabaseFill className="w-6 h-6 text-emerald-600" />
    ]

    const [docs, setDocs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDocs = async () => {
            try {
                const { Data, IsSuccess, Message, StatusCode } = await SP_fetch(
                    "Report_courses", {
                    "@Disabled": false,
                    "@PageSize": "3"
                });
                const docs = Data.Dataset;
                if (IsSuccess) setDocs(docs);
            } catch (error) {
                console.error("Error fetching docs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDocs();
    }, []);




    return (
        <section className="bg-white py-16">
            <div className="container mx-auto px-4">
                {/* عنوان بخش */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
                        <FileText className="w-8 h-8 text-emerald-600" />
                        <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                            مستندات آموزشی
                        </span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        آموزش‌های متنی جامع با پوشش کامل مفاهیم برنامه‌نویسی
                    </p>
                </div>

                {/* لیست دوره‌ها */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {docs.map((doc, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 group"
                        >
                            <div className="p-6">
                                {/* هدر کارت */}
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="p-3 bg-emerald-50 rounded-xl">
                                        {icons[index]}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">
                                            {doc.Title}
                                        </h3>
                                        <p className="text-sm text-gray-600 mt-1">
                                            {doc.Summary}
                                        </p>
                                    </div>
                                </div>

                                {/* تگ‌ها */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {docs.Features?.split("،").map((tag, i) => (
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
                                        <span>مدت زمان: {formatDuration(doc.Duration)}</span>
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
                                <Link href={`/docs/${doc.Id}`} className="mt-4 w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-xl transition-colors flex items-center justify-center gap-2">
                                    <span>مشاهده سرفصل‌ها</span>
                                    <ArrowLeft />

                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* دکمه مشاهده بیشتر */}
                <div className="text-center mt-10">
                    <Link href={`/docs`} className="px-8 w-fit py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-colors flex items-center gap-2 mx-auto">
                        مشاهده تمام مستندات
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 14l-7 7m0 0l-7-7m7 7V3"
                            />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default DocumentationSection