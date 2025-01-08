"use client"
import { BottomAngleIcon, ClockIcon } from "@/components/Icons/Icons";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const Accordion = ({ title, content, isOpen, onClick }) => {
    return (
        <div className='border-b border-[#D0DDD1] py-5 cursor-pointer' onClick={onClick}>
            <div className='flex items-center justify-between'>
                <p className='text-[16px] font-normal text-[#042A1B] '>{title}</p>
                <span className={`text-[#7AE36A] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown />
                </span>
            </div>
            <div className={`overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
                <div className='mt-5 pr-5 pl-10'>
                    <p className='text-[16px] font-medium text-[#042A1B]  leading-7 text-justify'>{content}</p>
                </div>
            </div>
        </div>
    );
};

export default function CourseDetail() {

    const [activeTab, setActiveTab] = useState(0);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [openAccordion, setOpenAccordion] = useState(0);

    const tabContent = [
        {
            id: 0, title: "اطلاعات دوره", content: "اطلاعات"
        },
        {
            id: 1, title: "تمرین ها", content: "sghl"
        },
        {
            id: 2, title: "نظرات کاربران", content: "sghl"
        },
        // ...other tabs...
    ];

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    const toggleAccordion = (index) => {
        setOpenAccordion(openAccordion === index ? -1 : index);
    };

    const accordionContent = [
        {
            title: "مقدمه ای بر برنامه نویسی",
            content: "برنامه نویسی یکی از مهارت‌های اساسی در دنیای امروز است. با یادگیری برنامه نویسی، می‌توانید نرم‌افزارها و وب‌سایت‌های مختلفی را ایجاد کنید. این مهارت به شما امکان می‌دهد تا ایده‌های خود را به واقعیت تبدیل کنید و در دنیای دیجیتال نقش فعالی داشته باشید."
        },
        {
            title: "مفاهیم پیشرفته جاوا اسکریپت",
            content: "جاوا اسکریپت یکی از زبان‌های برنامه نویسی محبوب است که برای توسعه وب استفاده می‌شود. در این بخش، به مفاهیم پیشرفته جاوا اسکریپت می‌پردازیم. این مفاهیم شامل توابع، شیءگرایی، و مدیریت حافظه می‌شود."
        },
        {
            title: "آشنایی با React",
            content: "React یک کتابخانه جاوا اسکریپت برای ساخت رابط‌های کاربری است. با استفاده از React، می‌توانید برنامه‌های وب پیچیده و تعاملی ایجاد کنید. این کتابخانه به شما امکان می‌دهد تا کامپوننت‌های قابل استفاده مجدد بسازید و مدیریت حالت را بهبود بخشید."
        },
        {
            title: "مدیریت حالت با Redux",
            content: "Redux یک کتابخانه برای مدیریت حالت در برنامه‌های جاوا اسکریپت است. با استفاده از Redux، می‌توانید حالت برنامه خود را به صورت متمرکز مدیریت کنید. این کتابخانه به شما کمک می‌کند تا برنامه‌های بزرگ و پیچیده را به راحتی مدیریت کنید."
        },
        {
            title: "آشنایی با Node.js",
            content: "Node.js یک محیط اجرایی برای جاوا اسکریپت است که به شما امکان می‌دهد برنامه‌های سمت سرور را با استفاده از جاوا اسکریپت بنویسید. با استفاده از Node.js، می‌توانید برنامه‌های سریع و مقیاس‌پذیر ایجاد کنید."
        }
    ];

    return (
        <div className=''>
            <div className='flex flex-col sm:flex-row gap-5 justify-between items-center'>
                <h1 className=" font-extrabold text-[#042A1B] text-3xl">
                    دوره آموزشی <span className="font-bold">React</span>
                </h1>
                <div className="flex space-x-1 bg-[#D0DDD140] p-1.5 rounded-full">
                    {tabContent.map((tab, index) => (
                        <button
                            key={index}
                            className={`py-2 px-5 text-sm sm:text-[16px] font-medium text-[#042A1B] rounded-full transition duration-300 ${activeTab !== index ? 'bg-transparent opacity-50' : 'bg-[#ffffff] font-semibold opacity-100'
                                }`}
                            onClick={() => setActiveTab(index)}
                        >
                            {tab.title}
                        </button>
                    ))}
                </div>
            </div>
            <div className="my-5">
                {tabContent.map((tab, index) => (
                    <div
                        key={index}
                        className={`transition-opacity duration-300 ${activeTab === index ? 'block' : 'hidden'}`}
                    >
                        <div className={`overflow-hidden text-[17.5px] text-[#042A1B] text-justify leading-7  font-normal transition-all duration-500 relative ${showFullDescription ? 'max-h-screen' : 'max-h-40'}`}>
                            <p>
                                قبل از آموزش ری اکت ReactJS ابتدای کار به شما بگیم که تکنولوژی ری اکت برگ برنده برنامه نویسان در دنیای امروز هست اصلا اغراق نکردیم. یه غول به تمام معنا و دنیایی بی انتها از پروژه هایی که میشه با اون نوشت، اون هم خیلی سریع و راحت! تکنولوژی که دنیای وب رو دگرگون کرد و دستپخت شرکت فیسبوک هست که اینستاگرام رو هم با اون طراحی کرده
                            </p>
                            <p>
                                قبل از آموزش ری اکت ReactJS ابتدای کار به شما بگیم که تکنولوژی ری اکت برگ برنده برنامه نویسان در دنیای امروز هست اصلا اغراق نکردیم. یه غول به تمام معنا و دنیایی بی انتها از پروژه هایی که میشه با اون نوشت، اون هم خیلی سریع و راحت! تکنولوژی که دنیای وب رو دگرگون کرد و دستپخت شرکت فیسبوک هست که اینستاگرام رو هم با اون طراحی کرده!
                            </p>
                            <p>
                                قبل از آموزش ری اکت ReactJS ابتدای کار به شما بگیم که تکنولوژی ری اکت برگ برنده برنامه نویسان در دنیای امروز هست اصلا اغراق نکردیم. یه غول به تمام معنا و دنیایی بی انتها از پروژه هایی که میشه با اون نوشت، اون هم خیلی سریع و راحت! تکنولوژی که دنیای وب رو دگرگون کرد و دستپخت شرکت فیسبوک هست که اینستاگرام رو هم با اون طراحی کرده
                            </p>
                            <p>
                                قبل از آموزش ری اکت ReactJS ابتدای کار به شما بگیم که تکنولوژی ری اکت برگ برنده برنامه نویسان در دنیای امروز هست اصلا اغراق نکردیم. یه غول به تمام معنا و دنیایی بی انتها از پروژه هایی که میشه با اون نوشت، اون هم خیلی سریع و راحت! تکنولوژی که دنیای وب رو دگرگون کرد و دستپخت شرکت فیسبوک هست که اینستاگرام رو هم با اون طراحی کرده!
                            </p>
                            <p >
                                خالد حسینی تو رمان باد بادک باز مینویسه : ﻣﺮﺩ ﺁﻫﺴﺘﻪ ﺩﺭ ﮔﻮﺵ ﻓﺮﺯﻧﺪ ﺗﺎﺯﻩ ﺑﻪ ﺑﻠﻮﻍ ﺭﺳﯿﺪﻩ ﺍﺵ ﺑﺮﺍﯼ ﭘﻨﺪ ﭼﻨﯿﻦ ﻧﺠﻮﺍ ﮐﺮﺩ : ” ﭘﺴﺮﻡ ﺩﺭ ﺯﻧﺪﮔﯽ ﻫﺮﮔﺰ ﺩﺯﺩﯼ ﻧﮑﻦ ” ﭘﺴﺮ ﻣﺘﻌﺠﺐ ﻭ ﻣﺒﻬﻮﺕ ﺑﻪ ﭘﺪﺭ ﻧﮕﺎﻩ ﮐﺮﺩ ﺑﺪﯾﻦ ﻣﻌﻨﺎ ﮐﻪ ﺍﻭ ﻫﺮﮔﺰ ﺩﺳﺖ ﮐﺞ ﻧﺪﺍﺷﺘﻪ ﭘﺪﺭ ﺑﻪ ﻧﮕﺎﻩ ﻣﺘﻌﺠﺐ ﻓﺮﺯﻧﺪ ﻟﺒﺨﻨﺪﯼ ﺯﺩ ﻭ ﺍﺩﺍﻣﻪ ﺩﺍﺩ : ﺩﺭ ﺯﻧﺪﮔﯽ ﺩﺭﻭﻍ ﻧﮕﻮ ﭼﺮﺍ ﮐﻪ ﺍﮔﺮ ﮔﻔﺘﯽ ﺻﺪﺍﻗﺖ ﺭﺍ ﺩﺯﺩﯾﺪﻩ ﺍﯼ، ﺧﯿﺎﻧﺖ ﻧﮑﻦ ﮐﻪ ﺍﮔﺮ ﮐﺮﺩﯼ ﻋﺸﻖ ﺭﺍ ﺩﺯﺩﯾﺪﻩ ﺍﯼ، ﺧﺸﻮﻧﺖ ﻧﮑﻦ ﺍﮔﺮ ﮐﺮﺩﯼ ﻣﺤﺒﺖ ﺭﺍ ﺩﺯﺩﯾﺪﻩ ﺍﯼ، ﻧﺎ ﺣﻖ ﻧﮕﻮ ﺍﮔﺮ ﮔﻔﺘﯽ ﺣﻖ ﺭﺍ ﺩﺯﺩﯾﺪﻩ ﺍﯼ، ﺑﯽ ﺣﯿﺎﯾﯽ ﻧﮑﻦ ﺍﮔﺮ ﮐﺮﺩﯼ ﺷﺮﺍﻓﺖ ﺭﺍ ﺩﺯﺩﯾﺪﻩ ﺍی... ﭘﺲ ﺩﺭ ﺯﻧﺪﮔﯽ ﻓﻘﻂ ﺩﺯﺩﯼ نکن !
                            </p>
                            <p>
                                قبل از آموزش ری اکت ReactJS ابتدای کار به شما بگیم که تکنولوژی ری اکت برگ برنده برنامه نویسان در دنیای امروز هست اصلا اغراق نکردیم. یه غول به تمام معنا و دنیایی بی انتها از پروژه هایی که میشه با اون نوشت، اون هم خیلی سریع و راحت! تکنولوژی که دنیای وب رو دگرگون کرد و دستپخت شرکت فیسبوک هست که اینستاگرام رو هم با اون طراحی کرده!
                            </p>
                            <span className={`absolute w-full bg-white h-5 bottom-0 opacity-70 ${!showFullDescription ? "block" : "hidden"}`}></span>
                        </div>
                        <button onClick={toggleDescription} className="mt-2 flex items-center  font-semibold gap-2 text-[#7AE36A]">
                            {showFullDescription ? 'مشاهده کمتر' : 'مشاهده بیشتر'}
                            <span className={`transition-transform duration-300 ${showFullDescription ? 'rotate-180' : ''}`}>
                                <ChevronDown />
                            </span>
                        </button>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 2xl:gap-10 mt-5">
                <div className="bg-[#D0DDD140] rounded-xl py-5 px-5">
                    <span>
                        <ClockIcon />
                    </span>
                    <p className="text-[#042A1B7F] text-[14px] font-normal mt-4 ">مدت زمان دوره</p>
                    <h4 className="text-[#042A1B] font-bold text-xl">98 ساعت</h4>
                </div>
                <div className="bg-[#D0DDD140] rounded-xl py-5 px-5">
                    <span>
                        <ClockIcon />
                    </span>
                    <p className="text-[#042A1B7F] text-[14px] font-normal mt-4 ">آخرین بروزرسانی</p>
                    <h4 className="text-[#042A1B] font-bold text-xl">04 خرداد 1403</h4>
                </div>
                <div className="bg-[#D0DDD140] rounded-xl py-5 px-5">
                    <span>
                        <ClockIcon />
                    </span>
                    <p className="text-[#042A1B7F] text-[14px] font-normal mt-4 ">پیش نیاز</p>
                    <h4 className="text-[#042A1B] font-bold text-xl">HTML & CSS & JS</h4>
                </div>
                <div className="bg-[#D0DDD140] rounded-xl py-5 px-5">
                    <span>
                        <ClockIcon />
                    </span>
                    <p className="text-[#042A1B7F] text-[14px] font-normal mt-4 ">نوع مشاهده</p>
                    <h4 className="text-[#042A1B] font-bold text-xl">دانلودی/آنلاین</h4>
                </div>
            </div>
            <div className="mt-10">
                <h1 className="font-extrabold text-[#042A1B] text-2xl">
                    این دوره برای چه کسانی مناسب هست؟
                </h1>
                <div className="mt-3">
                    <p className="text-[17.5px] text-[#042A1B] text-justify leading-7  font-normal">
                        دوره جامع ری اکت برای دو دسته از دانشجوها خیلی مفید و کاربردی هست.
                        دسته اول کسانی که آموزش جاوا اسکریپت رو تموم کردن و دنبال یک تکنولوژی مدرن و پولساز بر پایه جاوا اسکریپت هستن تا از زبانی که یاد گرفتن استفاده کنن.
                        دسته دوم کسانی که در حال حاضر در هر سطحی با ری اکت کار میکنن
                        اگر جزو یکی از این دوتا دسته هستید، این دوره جامع برای شما تولید شده و اونقدر به دانش و تجربیات شما اضافه می کنه که هر ایده و طرحی تو ذهنتون بیاد رو به راحتی بتونید پیاده سازی کنید یا بخش هایی از پروژه های دیگران رو در پروژه خودتون بسازید.
                    </p>
                </div>
            </div>
            <div className="mt-14">
                <h1 className="font-extrabold text-[#042A1B] text-2xl">
                    سوالات متداول
                </h1>
                <div className="mt-5">
                    {accordionContent.map((accordion, index) => (
                        <Accordion
                            key={index}
                            title={accordion.title}
                            content={accordion.content}
                            isOpen={openAccordion === index}
                            onClick={() => toggleAccordion(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

