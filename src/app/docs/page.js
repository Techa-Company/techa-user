"use client";
import { useEffect, useState } from "react";
import CourseCard from "../../components/courses/CourseCard";
import CoursesSkeleton from "../../components/common/CoursesSkeleton";
import { BookText, Clock, Code, GraduationCap } from "lucide-react";
import Link from "next/link";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.techa.me/api/Course")
      .then((response) => response.json())
      .then((data) => {
        if (data.IsSuccess) {
          // ادغام داده‌های دریافتی با داده‌های محلی
          const localCourses = [
            {
              level: "متوسط",
              duration: "28 ساعت",
              lessons: "42 درس",
              icon: <Code className="w-6 h-6 text-emerald-600" />,
              tags: ["پروژه‌محور", "آپدیت 1403", "تمرین تعاملی"]
            },
            {
              level: "مبتدی",
              duration: "18 ساعت",
              lessons: "30 درس",
              icon: <BookText className="w-6 h-6 text-emerald-600" />,
              tags: ["مناسب شروع", "تمرین کدنویسی"]
            },
            {
              level: "پیشرفته",
              duration: "35 ساعت",
              lessons: "50 درس",
              icon: <GraduationCap className="w-6 h-6 text-emerald-600" />,
              tags: ["Backend", "پروژه واقعی"]
            },
            {
              level: "متوسط",
              duration: "28 ساعت",
              lessons: "42 درس",
              icon: <Code className="w-6 h-6 text-emerald-600" />,
              tags: ["پروژه‌محور", "آپدیت 1403", "تمرین تعاملی"]
            },
            {
              level: "مبتدی",
              duration: "18 ساعت",
              lessons: "30 درس",
              icon: <BookText className="w-6 h-6 text-emerald-600" />,
              tags: ["مناسب شروع", "تمرین کدنویسی"]
            },
            {
              level: "پیشرفته",
              duration: "35 ساعت",
              lessons: "50 درس",
              icon: <GraduationCap className="w-6 h-6 text-emerald-600" />,
              tags: ["Backend", "پروژه واقعی"]
            },
            {
              level: "پیشرفته",
              duration: "35 ساعت",
              lessons: "50 درس",
              icon: <GraduationCap className="w-6 h-6 text-emerald-600" />,
              tags: ["Backend", "پروژه واقعی"]
            }
          ];

          // ادغام عنوان و توضیحات از داده‌های دریافتی
          const mergedCourses = data.Data.filter((course) => !course.Disabled).map((course, index) => ({
            id: course.Id,
            title: course.Title,
            description: course.Description,
            ...localCourses[index] // اضافه کردن اطلاعات محلی
          }));
          setCourses(mergedCourses);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
        setLoading(false);
      });
  }, []);


  return (
    <div className="pt-32">
      <div className="container px-5 xl:px-20 mx-auto">
        <h1 className="font-extrabold text-[#042A1B] text-3xl">مستندات ما</h1>
        {loading ? (
          <CoursesSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10 lg:px-10">
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
                        مستندات {course.title}
                      </h3>
                      <p dangerouslySetInnerHTML={{ __html: course.description?.slice(0, 100) }} className="text-sm text-gray-600 mt-1">

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
                      <span>مدت زمان : {course.duration}</span>
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
                  <Link href={`docs/${course.id}`} className="mt-4 w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-xl transition-colors flex items-center justify-center gap-2">
                    <span>مشاهده سرفصل‌ ها</span>
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
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}