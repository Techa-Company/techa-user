// components/CourseInfo.js
import CourseDescription from './CourseDescription';
import CourseInfoCard from './CourseInfoCard';
import AccordionList from './AccordionList';
// import { ClockIcon } from '../Icons/Icons';

const accordionContent = [
    {
        title: "مقدمه ای بر برنامه نویسی",
        content:
            "برنامه نویسی یکی از مهارت‌های اساسی در دنیای امروز است. با یادگیری برنامه نویسی، می‌توانید نرم‌افزارها و وب‌سایت‌های مختلفی را ایجاد کنید. این مهارت به شما امکان می‌دهد تا ایده‌های خود را به واقعیت تبدیل کنید و در دنیای دیجیتال نقش فعالی داشته باشید.",
    },
    {
        title: "مفاهیم پیشرفته جاوا اسکریپت",
        content:
            "جاوا اسکریپت یکی از زبان‌های برنامه نویسی محبوب است که برای توسعه وب استفاده می‌شود. در این بخش، به مفاهیم پیشرفته جاوا اسکریپت می‌پردازیم. این مفاهیم شامل توابع، شیءگرایی، و مدیریت حافظه می‌شود.",
    },
    {
        title: "آشنایی با React",
        content:
            "React یک کتابخانه جاوا اسکریپت برای ساخت رابط‌های کاربری است. با استفاده از React، می‌توانید برنامه‌های وب پیچیده و تعاملی ایجاد کنید. این کتابخانه به شما امکان می‌دهد تا کامپوننت‌های قابل استفاده مجدد بسازید و مدیریت حالت را بهبود بخشید.",
    },
    {
        title: "مدیریت حالت با Redux",
        content:
            "Redux یک کتابخانه برای مدیریت حالت در برنامه‌های جاوا اسکریپت است. با استفاده از Redux، می‌توانید حالت برنامه خود را به صورت متمرکز مدیریت کنید. این کتابخانه به شما کمک می‌کند تا برنامه‌های بزرگ و پیچیده را به راحتی مدیریت کنید.",
    },
    {
        title: "آشنایی با Node.js",
        content:
            "Node.js یک محیط اجرایی برای جاوا اسکریپت است که به شما امکان می‌دهد برنامه‌های سمت سرور را با استفاده از جاوا اسکریپت بنویسید. با استفاده از Node.js، می‌توانید برنامه‌های سریع و مقیاس‌پذیر ایجاد کنید.",
    },
];


import { useState, useEffect } from 'react';
// import AccordionSkeleton from './AccordionSkeleton';
// import CourseDescriptionSkeleton from './CourseDescriptionSkeleton';
// import CourseInfoCardSkeleton from './CourseInfoCardSkeleton';
import { ClockIcon } from '../../Icons/Icons';
import CourseDescriptionSkeleton from './CourseDescriptionSkeleton';
import CourseInfoCardSkeleton from './CourseInfoCardSkeleton';
import AccordionSkeleton from '../../common/AccordionSkeleton';

const CourseInfo = ({ courseDetails }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // شبیه‌سازی دریافت داده
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    if (loading) {
        return (
            <div>
                <CourseDescriptionSkeleton />
                <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 2xl:gap-10 mt-5">
                    {[...Array(4)].map((_, index) => (
                        <CourseInfoCardSkeleton key={index} />
                    ))}
                </div>
                <AccordionSkeleton />
            </div>
        );
    }

    // بقیه کدهای قبلی...

    return (
        <div>
            {/* توضیحات دوره */}
            <CourseDescription description={courseDetails?.Description} />

            {/* اطلاعات دوره */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 2xl:gap-10 mt-5">
                <CourseInfoCard
                    icon={<ClockIcon />}
                    label="مدت زمان دوره"
                    value="98 ساعت"
                />
                <CourseInfoCard
                    icon={<ClockIcon />}
                    label="آخرین بروزرسانی"
                    value="04 خرداد 1403"
                />
                <CourseInfoCard
                    icon={<ClockIcon />}
                    label="پیش نیاز"
                    value="HTML & CSS & JS"
                />
                <CourseInfoCard
                    icon={<ClockIcon />}
                    label="نوع مشاهده"
                    value="دانلودی/آنلاین"
                />
            </div>

            {/* بخش مناسب بودن دوره */}
            <div className="mt-10">
                <h1 className="font-extrabold text-[#042A1B] text-2xl">
                    این دوره برای چه کسانی مناسب است؟
                </h1>
                <div className="mt-3">
                    <p className="text-[17.5px] text-[#042A1B] text-justify leading-7 font-normal">
                        دوره جامع ری اکت برای دو دسته از دانشجوها خیلی مفید و کاربردی هست.
                        دسته اول کسانی که آموزش جاوا اسکریپت رو تموم کردن و دنبال یک
                        تکنولوژی مدرن و پولساز بر پایه جاوا اسکریپت هستن تا از زبانی که یاد
                        گرفتن استفاده کنن. دسته دوم کسانی که در حال حاضر در هر سطحی با ری
                        اکت کار میکنن اگر جزو یکی از این دوتا دسته هستید، این دوره جامع برای
                        شما تولید شده و اونقدر به دانش و تجربیات شما اضافه می کنه که هر ایده
                        و طرحی تو ذهنتون بیاد رو به راحتی بتونید پیاده سازی کنید یا بخش هایی
                        از پروژه های دیگران رو در پروژه خودتون بسازید.          </p>
                </div>
            </div>

            {/* سوالات متداول */}
            <div className="mt-14">
                <h1 className="font-extrabold text-[#042A1B] text-2xl">
                    سوالات متداول
                </h1>
                <AccordionList items={accordionContent} />
            </div>
        </div>
    );
};

export default CourseInfo;
