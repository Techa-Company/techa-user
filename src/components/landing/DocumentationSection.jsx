import { BookText, Code, GraduationCap, Clock, FileText } from 'lucide-react'
import Link from 'next/link'

const DocumentationSection = () => {
    const courses = [
        {
            title: "آموزش جامع React.js",
            description: "یادگیری React از پایه تا پیشرفته با پروژه‌های واقعی",
            level: "متوسط",
            duration: "28 ساعت",
            lessons: "42 درس",
            icon: <Code className="w-6 h-6 text-emerald-600" />,
            tags: ["پروژه‌محور", "آپدیت 1403", "تمرین تعاملی"]
        },
        {
            title: "اصول Python برای مبتدیان",
            description: "آموزش مفاهیم پایه برنامه‌نویسی با پایتون",
            level: "مبتدی",
            duration: "18 ساعت",
            lessons: "30 درس",
            icon: <BookText className="w-6 h-6 text-emerald-600" />,
            tags: ["مناسب شروع", "تمرین کدنویسی"]
        },
        {
            title: "آموزش پیشرفته Node.js",
            description: "ساخت API های حرفه‌ای با Express و MongoDB",
            level: "پیشرفته",
            duration: "35 ساعت",
            lessons: "50 درس",
            icon: <GraduationCap className="w-6 h-6 text-emerald-600" />,
            tags: ["Backend", "پروژه واقعی"]
        }
    ]

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
                    {courses.map((course, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 group"
                        >
                            <div className="p-6">
                                {/* هدر کارت */}
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="p-3 bg-emerald-50 rounded-xl">
                                        {course.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">
                                            {course.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 mt-1">
                                            {course.description}
                                        </p>
                                    </div>
                                </div>

                                {/* تگ‌ها */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {course.tags.map((tag, i) => (
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
                                        <span>مدت زمان: {course.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <BookText className="w-4 h-4 text-emerald-600" />
                                        <span>تعداد درس‌ها: {course.lessons}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <GraduationCap className="w-4 h-4 text-emerald-600" />
                                        <span>سطح: {course.level}</span>
                                    </div>
                                </div>

                                {/* دکمه اقدام */}
                                <button className="mt-4 w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-xl transition-colors flex items-center justify-center gap-2">
                                    <span>مشاهده سرفصل‌ها</span>
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
                                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* دکمه مشاهده بیشتر */}
                <div className="text-center mt-10">
                    <Link href="/docs" className="px-8 w-fit py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-colors flex items-center gap-2 mx-auto">
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