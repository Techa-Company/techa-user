"use client";
import { BottomAngleIcon, ClockIcon } from "@/components/Icons/Icons";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from 'next/navigation'; // اضافه کردن useParams

export default function Lesson() {
    const [openAccordion, setOpenAccordion] = useState(0);
    const [lessonData, setLessonData] = useState(null);
    const [loading, setLoading] = useState(true);

    // دریافت courseId و lessonId از URL
    const params = useParams();
    const courseId = params.courseId;
    const lessonId = params.lessonId;

    console.log(courseId, lessonId)

    useEffect(() => {
        // دریافت داده‌ها از API
        const fetchData = async () => {
            try {
                const response = await fetch(`http://45.139.10.84:5000/api/Content`);
                const data = await response.json();

                console.log(data)

                // فیلتر داده‌ها بر اساس CourseId و ParentId
                if (data.Data && Array.isArray(data.Data)) {
                    const filteredData = data.Data.filter(
                        item => item.CourseId === parseInt(courseId) && item.Id === parseInt(lessonId)
                    );
                    console.log(filteredData)
                    setLessonData(filteredData[0]); // اولین آیتم فیلتر شده
                } else {
                    console.error("Invalid data format:", data);
                    setLessonData(null); // مقدار پیش‌فرض برای جلوگیری از خطا
                }
            } catch (error) {
                console.error("Error fetching content:", error);
                setLessonData(null); // مقدار پیش‌فرض برای جلوگیری از خطا
            } finally {
                setLoading(false);
            }
        };

        if (courseId && lessonId) {
            fetchData();
        }
    }, [courseId, lessonId]);

    const toggleAccordion = (index) => {
        setOpenAccordion(openAccordion === index ? -1 : index);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!lessonData) {
        return <div>No lesson data available</div>;
    }

    return (
        <div className=''>
            <div className='flex flex-col sm:flex-row gap-5 justify-between items-center'>
                <h1 className=" font-bold text-[#042A1B] text-3xl">
                    {lessonData.Title}
                </h1>
                <div className="flex gap-4 items-center">
                    <Link className="flex items-center gap-1.5 border border-[#D0DDD1] rounded-xl py-2.5 px-5" href="">
                        <span className="w-4 h-4 flex justify-center items-center border border-[#042A1B] rounded-md">
                            <ChevronRight className="" />
                        </span>
                        <p className="text-[#042A1B] text-[16px] font-medium">قبلی</p>
                    </Link>
                    <Link className="flex items-center gap-1.5 border border-[#D0DDD1] rounded-xl py-2.5 px-5" href="">
                        <p className="text-[#042A1B] text-[16px] font-medium">بعدی</p>
                        <span className="w-4 h-4 flex justify-center items-center border border-[#042A1B] rounded-md">
                            <ChevronLeft className="" />
                        </span>
                    </Link>
                </div>
            </div>
            <div className="text-[17.5px] font-normal leading-7 text-justify mt-7 grid gap-5">
                <div
                    className="prose prose-headings:text-3xl prose-headings:my-5 prose-p:text-secondary prose-p:leading-9 prose-p:text-justify prose-code:text-[#e83e8c] 
      prose-code:px-2 prose-code:py-1 prose-code:rounded-sm prose-code:bg-[#ebedf2] max-w-full"
                    dangerouslySetInnerHTML={{ __html: lessonData.Description }}
                >
                </div>
                <div className="bg-[#F3F6F3] rounded-2xl p-2">
                    <div className="px-5 flex items-center justify-between py-2">
                        <h3 className="text-[16px] font-bold text-[#042A1B]">مثال</h3>
                        <button className="text-white font-bold text-sm px-6 py-2 rounded-md bg-[#042A1B]">خودت امتحان کن</button>
                    </div>
                    <div className="bg-white rounded-2xl h-60">
                        {/* محتوای مثال */}
                    </div>
                </div>
            </div>
            <div className="flex gap-4 items-center justify-between mt-10">
                <Link className="flex items-center gap-1.5 border border-[#D0DDD1] rounded-xl py-2.5 px-5" href="">
                    <span className="w-4 h-4 mb-1 flex justify-center items-center border border-[#042A1B] rounded-md">
                        <ChevronRight className="" />
                    </span>
                    <p className="text-[#042A1B] text-[16px] font-medium">قبلی: <span className="font-bold">توابع آرایه</span></p>
                </Link>
                <Link className="flex items-center gap-1.5 border border-[#D0DDD1] rounded-xl py-2.5 px-5" href="">
                    <p className="text-[#042A1B] text-[16px] font-medium">بعدی: <span className="font-bold">متغییرها</span></p>
                    <span className="w-4 h-4 mb-1 flex justify-center items-center border border-[#042A1B] rounded-md">
                        <ChevronLeft className="" />
                    </span>
                </Link>
            </div>
        </div>
    );
};