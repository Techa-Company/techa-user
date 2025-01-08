"use client"
import { BottomAngleIcon, ClockIcon } from "@/components/Icons/Icons";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Lesson() {

    const [openAccordion, setOpenAccordion] = useState(0);




    const toggleAccordion = (index) => {
        setOpenAccordion(openAccordion === index ? -1 : index);
    };



    return (
        <div className=''>
            <div className='flex flex-col sm:flex-row gap-5 justify-between items-center'>
                <h1 className=" font-bold text-[#042A1B] text-3xl">
                    Arrow Function
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
                <p>
                    قبل از آموزش ری اکت ReactJS ابتدای کار به شما بگیم که تکنولوژی ری اکت برگ برنده برنامه نویسان در دنیای امروز هست اصلا اغراق نکردیم. یه غول به تمام معنا و دنیایی بی انتها از پروژه هایی که میشه با اون نوشت، اون هم خیلی سریع و راحت! تکنولوژی که دنیای وب رو دگرگون کرد و دستپخت شرکت فیسبوک هست که اینستاگرام رو هم با اون طراحی کرده!
                </p>
                <p>
                    کامپوننت محور بودن ری اکت باعث میشه شما با کدنویسی یک بخش بتونید بی نهایت بار در بخش های مختلف پروژه از اون استفاده کنید و از طرفی میتونید پروژه هایی بسازید که بدون نیاز به رفرش، هر دیتا و بخشی از صفحه رو تغییر بدید اون هم با سرعت نور! برای همین ری اکت، زمان کدنویسی و به اتمام پروژه رو خیلی کوتاهتر از قبل کرده!
                </p>
                <div className="bg-[#F3F6F3] rounded-2xl p-2">
                    <div className="px-5 flex items-center justify-between py-2">
                        <h3 className="text-[16px] font-bold text-[#042A1B]">مثال</h3>
                        <button className="text-white font-bold text-sm px-6 py-2 rounded-md bg-[#042A1B]">خودت امتحان کن</button>
                    </div>
                    <div className="bg-white rounded-2xl h-60">

                    </div>
                </div>
                <p>
                    قبل از آموزش ری اکت ReactJS ابتدای کار به شما بگیم که تکنولوژی ری اکت برگ برنده برنامه نویسان در دنیای امروز هست اصلا اغراق نکردیم. یه غول به تمام معنا و دنیایی بی انتها از پروژه هایی که میشه با اون نوشت، اون هم خیلی سریع و راحت! تکنولوژی که دنیای وب رو دگرگون کرد و دستپخت شرکت فیسبوک هست که اینستاگرام رو هم با اون طراحی کرده!
                </p>
                <p>
                    کامپوننت محور بودن ری اکت باعث میشه شما با کدنویسی یک بخش بتونید بی نهایت بار در بخش های مختلف پروژه از اون استفاده کنید و از طرفی میتونید پروژه هایی بسازید که بدون نیاز به رفرش، هر دیتا و بخشی از صفحه رو تغییر بدید اون هم با سرعت نور! برای همین ری اکت، زمان کدنویسی و به اتمام پروژه رو خیلی کوتاهتر از قبل کرده!
                </p>
                <div className="bg-[#F3F6F3] rounded-2xl p-2">
                    <div className="px-5 flex items-center justify-between py-2">
                        <h3 className="text-[16px] font-bold text-[#042A1B]">مثال</h3>
                        <button className="text-white font-bold text-sm px-6 py-2 rounded-md bg-[#042A1B]">خودت امتحان کن</button>
                    </div>
                    <div className="bg-white rounded-2xl h-60">

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

