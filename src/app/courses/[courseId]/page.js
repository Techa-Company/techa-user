"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle, ChevronDown, PlayCircle } from "lucide-react";
import { ClockIcon } from "../../../components/Icons/Icons";

// کامپوننت آکاردئون
const Accordion = ({ title, content, isOpen, onClick }) => {
  return (
    <div
      className="border-b border-[#D0DDD1] py-5 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <p className="text-[16px] font-normal text-[#042A1B]">{title}</p>
        <span
          className={`text-[#7AE36A] transition-transform duration-300 ${isOpen ? "rotate-180" : ""
            }`}
        >
          <ChevronDown />
        </span>
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ${isOpen ? "max-h-screen" : "max-h-0"
          }`}
      >
        <div className="mt-5 pr-5 pl-10">
          <p className="text-[16px] font-medium text-[#042A1B] leading-7 text-justify">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
};

// کامپوننت تب اطلاعات دوره
const CourseInfoTab = ({ courseDetails }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(-1);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? -1 : index);
  };

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

  return (
    <div>
      {/* توضیحات دوره */}

      <div
        className={`overflow-hidden text-[17.5px] text-[#042A1B] text-justify leading-7 font-normal transition-all duration-500 relative ${showFullDescription ? "max-h-screen" : "max-h-40"
          }`}
      >
        <div
          dangerouslySetInnerHTML={{
            __html: courseDetails?.Description || "",
          }}
        ></div>
        {!showFullDescription && (
          <span className="absolute w-full bg-white h-5 bottom-0 opacity-70"></span>
        )}
      </div>
      <button
        onClick={() => setShowFullDescription(!showFullDescription)}
        className="mt-2 flex items-center font-semibold gap-2 text-[#7AE36A]"
      >
        {showFullDescription ? "مشاهده کمتر" : "مشاهده بیشتر"}
        <span
          className={`transition-transform duration-300 ${showFullDescription ? "rotate-180" : ""
            }`}
        >
          <ChevronDown />
        </span>
      </button>

      {/* اطلاعات دوره */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 2xl:gap-10 mt-5">
        <div className="bg-[#D0DDD140] rounded-xl py-5 px-5">
          <span>
            <ClockIcon />
          </span>
          <p className="text-[#042A1B7F] text-[14px] font-normal mt-4 ">
            مدت زمان دوره
          </p>
          <h4 className="text-[#042A1B] font-bold text-xl">98 ساعت</h4>
        </div>
        <div className="bg-[#D0DDD140] rounded-xl py-5 px-5">
          <span>
            <ClockIcon />
          </span>
          <p className="text-[#042A1B7F] text-[14px] font-normal mt-4 ">
            آخرین بروزرسانی
          </p>
          <h4 className="text-[#042A1B] font-bold text-xl">04 خرداد 1403</h4>
        </div>
        <div className="bg-[#D0DDD140] rounded-xl py-5 px-5">
          <span>
            <ClockIcon />
          </span>
          <p className="text-[#042A1B7F] text-[14px] font-normal mt-4 ">
            پیش نیاز
          </p>
          <h4 className="text-[#042A1B] font-bold text-xl">HTML & CSS & JS</h4>
        </div>
        <div className="bg-[#D0DDD140] rounded-xl py-5 px-5">
          <span>
            <ClockIcon />
          </span>
          <p className="text-[#042A1B7F] text-[14px] font-normal mt-4 ">
            نوع مشاهده
          </p>
          <h4 className="text-[#042A1B] font-bold text-xl">دانلودی/آنلاین</h4>
        </div>
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
        <div className="mt-5">
          {accordionContent.map((item, index) => (
            <Accordion
              key={index}
              title={item.title}
              content={item.content}
              isOpen={openAccordion === index}
              onClick={() => toggleAccordion(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// کامپوننت اصلی
export default function CourseDetail() {
  const params = useParams();
  const router = useRouter();
  const { courseId } = params;

  const [activeTab, setActiveTab] = useState(0);
  const [courseDetails, setCourseDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // به صورت موقت محتوای دوره را دستی تنظیم می‌کنیم
    const fakeCourseDetails = {
      Title: "دوره آموزش ری‌اکت",
      Description: "<p>این دوره برای آموزش ری‌اکت طراحی شده است...</p>",
      // سایر جزئیات دوره...
    };

    setCourseDetails(fakeCourseDetails);
    setLoading(false);

    // در صورت نیاز می‌توانید از API استفاده کنید

    if (courseId) {
      fetch(`http://45.139.10.84:5000/api/Course/${courseId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.IsSuccess) {
            setCourseDetails(data.Data);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching course details:", error);
          setLoading(false);
        });
    }

  }, [courseId]);

  const tabContent = [
    {
      id: 0,
      title: "اطلاعات دوره",
      content: <CourseInfoTab courseDetails={courseDetails} />,
    },
    {
      id: 1,
      title: "تمرین‌ها",
      content: <Exercises courseId={courseId} />,
    },
    {
      id: 2,
      title: "نظرات کاربران",
      content: "در این بخش نظرات کاربران نمایش داده می‌شود.",
    },
  ];

  return (
    <div className="">
      {/* عنوان و تب‌ها */}
      <div className="flex flex-col sm:flex-row gap-5 justify-between items-center">
        <h1 className="font-extrabold text-[#042A1B] text-3xl">
          دوره آموزشی <span className="font-bold">{courseDetails?.Title}</span>
        </h1>
        <div className="flex space-x-1 bg-[#D0DDD140] p-1.5 rounded-full">
          {tabContent.map((tab, index) => (
            <button
              key={index}
              className={`py-2 px-5 text-sm sm:text-[16px] font-medium text-[#042A1B] rounded-full transition duration-300 ${activeTab !== index
                ? "bg-transparent opacity-50"
                : "bg-[#ffffff] font-semibold opacity-100"
                }`}
              onClick={() => setActiveTab(index)}
            >
              {tab.title}
            </button>
          ))}
        </div>
      </div>

      {/* محتوای تب‌ها */}
      <div className="my-5">
        {tabContent.map((tab, index) => (
          <div
            key={index}
            className={`transition-opacity duration-300 ${activeTab === index ? "block" : "hidden"
              }`}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}

import { motion, AnimatePresence } from "framer-motion";

const Exercises = ({ courseId }) => {
  const router = useRouter();
  const [chapters, setChapters] = useState([]);
  const [openChapterIndex, setOpenChapterIndex] = useState(-1);
  const [hoveredSession, setHoveredSession] = useState(null);

  useEffect(() => {
    const fetchChapters = async () => {
      // شبیه‌سازی دریافت داده از API با داده‌های ساختگی
      await new Promise((resolve) => setTimeout(resolve, 500));
      const fakeChapters = [
        {
          Id: 1,
          Title: "فصل اول: مبانی برنامه‌نویسی",
          Sessions: [
            {
              Id: 101,
              Title: "جلسه ۱: آشنایی با برنامه‌نویسی",
              HasExercises: true,
              Duration: "۳۰ دقیقه",
              Description: "مقدمه‌ای بر مفاهیم برنامه‌نویسی",
            },
            {
              Id: 102,
              Title: "جلسه ۲: متغیرها و انواع داده",
              HasExercises: true,
              Duration: "۴۵ دقیقه",
              Description: "بررسی متغیرها و انواع داده در جاوااسکریپت",
            },
            {
              Id: 103,
              Title: "جلسه ۳: عملگرها",
              HasExercises: true,
              Duration: "۴۰ دقیقه",
              Description: "معرفی عملگرهای ریاضی و منطقی",
            },
          ],
        },
        {
          Id: 2,
          Title: "فصل دوم: توابع و دامنه‌ها",
          Sessions: [
            {
              Id: 201,
              Title: "جلسه ۱: تعریف توابع",
              HasExercises: true,
              Duration: "۵۰ دقیقه",
              Description: "نحوه تعریف و استفاده از توابع",
            },
            {
              Id: 202,
              Title: "جلسه ۲: دامنه متغیرها",
              HasExercises: true,
              Duration: "۳۵ دقیقه",
              Description: "مفهوم دامنه و نحوه دسترسی به متغیرها",
            },
            {
              Id: 203,
              Title: "جلسه ۳: توابع بازگشتی",
              HasExercises: true,
              Duration: "۴۵ دقیقه",
              Description: "بررسی توابع بازگشتی و کاربردهای آن",
            },
            {
              Id: 204,
              Title: "جلسه ۴: توابع ناشناس",
              HasExercises: true,
              Duration: "۳۰ دقیقه",
              Description: "معرفی توابع ناشناس و کاربردهای آن",
            },
          ],
        },
        {
          Id: 3,
          Title: "فصل سوم: شیء‌گرایی",
          Sessions: [
            {
              Id: 301,
              Title: "جلسه ۱: مفاهیم شیء‌گرایی",
              HasExercises: true,
              Duration: "۶۰ دقیقه",
              Description: "آشنایی با اصول شیء‌گرایی",
            },
            {
              Id: 302,
              Title: "جلسه ۲: کلاس‌ها و اشیاء",
              HasExercises: true,
              Duration: "۵۵ دقیقه",
              Description: "نحوه تعریف کلاس‌ها و ایجاد اشیاء",
            },
            {
              Id: 303,
              Title: "جلسه ۳: وراثت",
              HasExercises: true,
              Duration: "۴۵ دقیقه",
              Description: "بررسی مفهوم وراثت در شیء‌گرایی",
            },
            {
              Id: 304,
              Title: "جلسه ۴: پلی‌مورفیسم",
              HasExercises: true,
              Duration: "۵۰ دقیقه",
              Description: "مفهوم چندریختی و کاربردهای آن",
            },
            {
              Id: 305,
              Title: "جلسه ۵: تزریق وابستگی",
              HasExercises: true,
              Duration: "۴۰ دقیقه",
              Description: "بررسی Dependency Injection در شیء‌گرایی",
            },
          ],
        },
        {
          Id: 4,
          Title: "فصل چهارم: مباحث پیشرفته",
          Sessions: [
            {
              Id: 401,
              Title: "جلسه ۱: مدیریت خطا",
              HasExercises: true,
              Duration: "۳۵ دقیقه",
              Description: "نحوه مدیریت و کنترل خطاها",
            },
            {
              Id: 402,
              Title: "جلسه ۲: async و await",
              HasExercises: true,
              Duration: "۴۵ دقیقه",
              Description: "بررسی مفاهیم برنامه‌نویسی ناهمزمان",
            },
            {
              Id: 403,
              Title: "جلسه ۳: کار با API ها",
              HasExercises: true,
              Duration: "۵۰ دقیقه",
              Description: "نحوه ارتباط با API های خارجی",
            },
            {
              Id: 404,
              Title: "جلسه ۴: امنیت در برنامه‌نویسی",
              HasExercises: true,
              Duration: "۶۰ دقیقه",
              Description: "مفاهیم امنیتی و بهترین روش‌ها",
            },
            {
              Id: 405,
              Title: "جلسه ۵: بهینه‌سازی کد",
              HasExercises: true,
              Duration: "۴۰ دقیقه",
              Description: "روش‌های بهبود عملکرد و بهینه‌سازی",
            },
            {
              Id: 406,
              Title: "جلسه ۶: تست نرم‌افزار",
              HasExercises: true,
              Duration: "۵۵ دقیقه",
              Description: "مبانی و روش‌های تست کد",
            },
            {
              Id: 407,
              Title: "جلسه ۷: الگوهای طراحی",
              HasExercises: true,
              Duration: "۷۰ دقیقه",
              Description: "بررسی الگوهای طراحی متداول",
            },
          ],
        },
      ];
      setChapters(fakeChapters);
    };
    fetchChapters();
  }, []);

  const toggleChapter = (index) => {
    setOpenChapterIndex((prev) => (prev === index ? -1 : index));
  };

  const handleSessionClick = (sessionId) => {
    router.push(`/courses/${courseId}/sessions/${sessionId}/exercises`);
  };

  const SessionBadge = ({ progress }) => {
    let content;
    switch (progress) {
      case "completed":
        return (
          <div className="flex items-center gap-2 text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">
            <CheckCircle size={16} />
            <span className="text-sm font-medium">تکمیل شده</span>
          </div>
        );
      case "pending":
        return (
          <div className="flex items-center gap-2 text-amber-600 bg-amber-100 px-3 py-1 rounded-full">
            <AlertCircle size={16} />
            <span className="text-sm font-medium">در انتظار بررسی</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-2 text-sky-600 bg-sky-100 px-3 py-1 rounded-full">
            <span className="text-sm font-medium">شروع تمرین</span>
            <PlayCircle size={16} />
          </div>
        );
    }
  };

  return (
    <div className="mt-8 space-y-6">
      {chapters.map((chapter, chapterIndex) => (
        <motion.div
          key={chapter.Id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: chapterIndex * 0.1 }}
        >
          {/* عنوان فصل */}
          <div
            className={`
              bg-white p-6 rounded-xl cursor-pointer shadow-sm
              border-2 ${openChapterIndex === chapterIndex
                ? "border-emerald-500"
                : "border-gray-100"
              }
              hover:border-emerald-400 transition-all duration-300
            `}
            onClick={() => toggleChapter(chapterIndex)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center">
                  <span className="text-emerald-600 font-bold text-xl">
                    {chapterIndex + 1}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {chapter.Title}
                </h2>
              </div>
              <ChevronDown
                className={`transform transition-transform duration-300 text-gray-600 ${openChapterIndex === chapterIndex ? "rotate-180" : ""
                  }`}
                size={28}
              />
            </div>
          </div>

          {/* لیست جلسات */}
          <AnimatePresence>
            {openChapterIndex === chapterIndex && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 space-y-2 pl-8"
              >
                {chapter.Sessions.filter((s) => s.HasExercises).map(
                  (session, sessionIndex) => (
                    <motion.div
                      key={session.Id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: sessionIndex * 0.1 }}
                      className="group bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow
                      border border-gray-100 hover:border-emerald-100 cursor-pointer"
                      onClick={() => handleSessionClick(session.Id)}
                      onMouseEnter={() => setHoveredSession(session.Id)}
                      onMouseLeave={() => setHoveredSession(null)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <div
                              className={`w-10 h-10 rounded-lg flex items-center justify-center
                                ${hoveredSession === session.Id
                                  ? "bg-emerald-500 text-white"
                                  : "bg-emerald-50 text-emerald-500"
                                }`}
                            >
                              <PlayCircle size={20} />
                            </div>
                            {hoveredSession === session.Id && (
                              <motion.div
                                className="absolute inset-0 border-2 border-emerald-200 rounded-lg"
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 300 }}
                              />
                            )}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">
                              {session.Title}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                              {session.Duration} • {session.Description}
                            </p>
                          </div>
                        </div>
                        <SessionBadge
                          progress={
                            sessionIndex % 3 === 0
                              ? "completed"
                              : sessionIndex % 3 === 1
                                ? "pending"
                                : null
                          }
                        />
                      </div>
                    </motion.div>
                  )
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};



