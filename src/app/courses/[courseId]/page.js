"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle, ChevronDown, PlayCircle } from "lucide-react";
import { ClockIcon } from "../../../components/Icons/Icons";
import { motion, AnimatePresence } from "framer-motion";
import { Star, StarHalf, Star as StarFilled } from "lucide-react";

import CourseTitle from "../../../components/courses/course/CourseTitle";
import TabButtons from "../../../components/courses/course/TabButtons";
import TabContent from "../../../components/courses/course/TabContent";
import CourseInfo from "../../../components/courses/course/CourseInfo"; // کامپوننتی که قبلاً ساختیم
import Exercises from "../../../components/courses/course/Exercises"; // کامپوننت بعدی که خواهیم ساخت
import Comments from "../../../components/courses/course/Comments"; // کامپوننت بعدی که خواهیم ساخت
import CourseTitleSkeleton from "../../../components/courses/course/CourseTitleSkeleton"
import TabButtonsSkeleton from "../../../components/courses/course/TabButtonsSkeleton"

export default function CourseDetail() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { courseId } = params;

  // دریافت پارامتر تب از URL
  const tabParam = searchParams.get("tab");
  const initialTabIndex = tabParam ? parseInt(tabParam) : 0;

  const [activeTab, setActiveTab] = useState(initialTabIndex);
  const [courseDetails, setCourseDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // دریافت اطلاعات دوره از API
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
      content: <CourseInfo courseDetails={courseDetails} />,
    },
    {
      id: 1,
      title: "تمرین‌ها",
      content: <Exercises courseId={courseId} />,
    },
    {
      id: 2,
      title: "نظرات کاربران",
      content: <Comments />,
    },
  ];

  // تعریف انیمیشن‌ها برای تب‌ها
  const tabVariants = {
    initial: {
      opacity: 0,
      x: 50,
    },
    animate: {
      opacity: 1,
      x: 0,
    },
    exit: {
      opacity: 0,
      x: -50,
    },
  };

  // تابع برای تغییر تب و به‌روزرسانی URL
  const handleTabChange = (index) => {
    setActiveTab(index);
    router.push(`${window.location.pathname}?tab=${index}`, undefined, {
      shallow: true,
    });
  };

  // درون کامپوننت CourseDetail.js

  return (
    <div>
      {/* عنوان و تب‌ها */}
      <div className="flex flex-col sm:flex-row gap-5 justify-between items-center">
        {loading ? (
          <CourseTitleSkeleton />
        ) : (
          <CourseTitle title={courseDetails?.Title} />
        )}
        {loading ? (
          <TabButtonsSkeleton />
        ) : (
          <TabButtons
            tabs={tabContent}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        )}
      </div>

      {/* محتوای تب‌ها */}
      {!loading && (
        <TabContent
          activeTab={activeTab}
          tabs={tabContent}
          variants={tabVariants}
        />
      )}
    </div>
  );

};

// const Accordion = ({ title, content, isOpen, onClick }) => {
//   return (
//     <div
//       className="border-b border-[#D0DDD1] py-5 cursor-pointer"
//       onClick={onClick}
//     >
//       <div className="flex items-center justify-between">
//         <p className="text-[16px] font-normal text-[#042A1B]">{title}</p>
//         <span
//           className={`text-[#7AE36A] transition-transform duration-300 ${isOpen ? "rotate-180" : ""
//             }`}
//         >
//           <ChevronDown />
//         </span>
//       </div>
//       <div
//         className={`overflow-hidden transition-all duration-500 ${isOpen ? "max-h-screen" : "max-h-0"
//           }`}
//       >
//         <div className="mt-5 pr-5 pl-10">
//           <p className="text-[16px] font-medium text-[#042A1B] leading-7 text-justify">
//             {content}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// const CourseInfo = ({ courseDetails }) => {
//   const [showFullDescription, setShowFullDescription] = useState(false);
//   const [openAccordion, setOpenAccordion] = useState(-1);

//   const toggleAccordion = (index) => {
//     setOpenAccordion(openAccordion === index ? -1 : index);
//   };

//   const accordionContent = [
//     {
//       title: "مقدمه ای بر برنامه نویسی",
//       content:
//         "برنامه نویسی یکی از مهارت‌های اساسی در دنیای امروز است. با یادگیری برنامه نویسی، می‌توانید نرم‌افزارها و وب‌سایت‌های مختلفی را ایجاد کنید. این مهارت به شما امکان می‌دهد تا ایده‌های خود را به واقعیت تبدیل کنید و در دنیای دیجیتال نقش فعالی داشته باشید.",
//     },
//     {
//       title: "مفاهیم پیشرفته جاوا اسکریپت",
//       content:
//         "جاوا اسکریپت یکی از زبان‌های برنامه نویسی محبوب است که برای توسعه وب استفاده می‌شود. در این بخش، به مفاهیم پیشرفته جاوا اسکریپت می‌پردازیم. این مفاهیم شامل توابع، شیءگرایی، و مدیریت حافظه می‌شود.",
//     },
//     {
//       title: "آشنایی با React",
//       content:
//         "React یک کتابخانه جاوا اسکریپت برای ساخت رابط‌های کاربری است. با استفاده از React، می‌توانید برنامه‌های وب پیچیده و تعاملی ایجاد کنید. این کتابخانه به شما امکان می‌دهد تا کامپوننت‌های قابل استفاده مجدد بسازید و مدیریت حالت را بهبود بخشید.",
//     },
//     {
//       title: "مدیریت حالت با Redux",
//       content:
//         "Redux یک کتابخانه برای مدیریت حالت در برنامه‌های جاوا اسکریپت است. با استفاده از Redux، می‌توانید حالت برنامه خود را به صورت متمرکز مدیریت کنید. این کتابخانه به شما کمک می‌کند تا برنامه‌های بزرگ و پیچیده را به راحتی مدیریت کنید.",
//     },
//     {
//       title: "آشنایی با Node.js",
//       content:
//         "Node.js یک محیط اجرایی برای جاوا اسکریپت است که به شما امکان می‌دهد برنامه‌های سمت سرور را با استفاده از جاوا اسکریپت بنویسید. با استفاده از Node.js، می‌توانید برنامه‌های سریع و مقیاس‌پذیر ایجاد کنید.",
//     },
//   ];

//   return (
//     <div>
//       {/* توضیحات دوره */}

//       <div
//         className={`overflow-hidden text-[17.5px] text-[#042A1B] text-justify leading-7 font-normal transition-all duration-500 relative ${showFullDescription ? "max-h-screen" : "max-h-40"
//           }`}
//       >
//         <div
//           dangerouslySetInnerHTML={{
//             __html: courseDetails?.Description || "",
//           }}
//         ></div>
//         {!showFullDescription && (
//           <span className="absolute w-full bg-white h-5 bottom-0 opacity-70"></span>
//         )}
//       </div>
//       <button
//         onClick={() => setShowFullDescription(!showFullDescription)}
//         className="mt-2 flex items-center font-semibold gap-2 text-[#7AE36A]"
//       >
//         {showFullDescription ? "مشاهده کمتر" : "مشاهده بیشتر"}
//         <span
//           className={`transition-transform duration-300 ${showFullDescription ? "rotate-180" : ""
//             }`}
//         >
//           <ChevronDown />
//         </span>
//       </button>

//       {/* اطلاعات دوره */}
//       <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 2xl:gap-10 mt-5">
//         <div className="bg-[#D0DDD140] rounded-xl py-5 px-5">
//           <span>
//             <ClockIcon />
//           </span>
//           <p className="text-[#042A1B7F] text-[14px] font-normal mt-4 ">
//             مدت زمان دوره
//           </p>
//           <h4 className="text-[#042A1B] font-bold text-xl">98 ساعت</h4>
//         </div>
//         <div className="bg-[#D0DDD140] rounded-xl py-5 px-5">
//           <span>
//             <ClockIcon />
//           </span>
//           <p className="text-[#042A1B7F] text-[14px] font-normal mt-4 ">
//             آخرین بروزرسانی
//           </p>
//           <h4 className="text-[#042A1B] font-bold text-xl">04 خرداد 1403</h4>
//         </div>
//         <div className="bg-[#D0DDD140] rounded-xl py-5 px-5">
//           <span>
//             <ClockIcon />
//           </span>
//           <p className="text-[#042A1B7F] text-[14px] font-normal mt-4 ">
//             پیش نیاز
//           </p>
//           <h4 className="text-[#042A1B] font-bold text-xl">HTML & CSS & JS</h4>
//         </div>
//         <div className="bg-[#D0DDD140] rounded-xl py-5 px-5">
//           <span>
//             <ClockIcon />
//           </span>
//           <p className="text-[#042A1B7F] text-[14px] font-normal mt-4 ">
//             نوع مشاهده
//           </p>
//           <h4 className="text-[#042A1B] font-bold text-xl">دانلودی/آنلاین</h4>
//         </div>
//       </div>

//       {/* بخش مناسب بودن دوره */}
//       <div className="mt-10">
//         <h1 className="font-extrabold text-[#042A1B] text-2xl">
//           این دوره برای چه کسانی مناسب است؟
//         </h1>
//         <div className="mt-3">
//           <p className="text-[17.5px] text-[#042A1B] text-justify leading-7 font-normal">
//             دوره جامع ری اکت برای دو دسته از دانشجوها خیلی مفید و کاربردی هست.
//             دسته اول کسانی که آموزش جاوا اسکریپت رو تموم کردن و دنبال یک
//             تکنولوژی مدرن و پولساز بر پایه جاوا اسکریپت هستن تا از زبانی که یاد
//             گرفتن استفاده کنن. دسته دوم کسانی که در حال حاضر در هر سطحی با ری
//             اکت کار میکنن اگر جزو یکی از این دوتا دسته هستید، این دوره جامع برای
//             شما تولید شده و اونقدر به دانش و تجربیات شما اضافه می کنه که هر ایده
//             و طرحی تو ذهنتون بیاد رو به راحتی بتونید پیاده سازی کنید یا بخش هایی
//             از پروژه های دیگران رو در پروژه خودتون بسازید.          </p>
//         </div>
//       </div>

//       {/* سوالات متداول */}
//       <div className="mt-14">
//         <h1 className="font-extrabold text-[#042A1B] text-2xl">
//           سوالات متداول
//         </h1>
//         <div className="mt-5">
//           {accordionContent.map((item, index) => (
//             <Accordion
//               key={index}
//               title={item.title}
//               content={item.content}
//               isOpen={openAccordion === index}
//               onClick={() => toggleAccordion(index)}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };



// export default function CourseDetail() {
//   const params = useParams();
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const { courseId } = params;

//   // دریافت پارامتر تب از URL
//   const tabParam = searchParams.get("tab");
//   const initialTabIndex = tabParam ? parseInt(tabParam) : 0;

//   const [activeTab, setActiveTab] = useState(initialTabIndex);
//   const [courseDetails, setCourseDetails] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // دریافت اطلاعات دوره از API
//     if (courseId) {
//       fetch(`http://45.139.10.84:5000/api/Course/${courseId}`)
//         .then((response) => response.json())
//         .then((data) => {
//           if (data.IsSuccess) {
//             setCourseDetails(data.Data);
//           }
//           setLoading(false);
//         })
//         .catch((error) => {
//           console.error("Error fetching course details:", error);
//           setLoading(false);
//         });
//     }
//   }, [courseId]);

//   const tabContent = [
//     {
//       id: 0,
//       title: "اطلاعات دوره",
//       content: <CourseInfo courseDetails={courseDetails} />,
//     },
//     {
//       id: 1,
//       title: "تمرین‌ها",
//       content: <Exercises courseId={courseId} />,
//     },
//     {
//       id: 2,
//       title: "نظرات کاربران",
//       content: <Comments />,
//     },
//   ];

//   // تعریف انیمیشن‌ها برای تب‌ها
//   const tabVariants = {
//     initial: {
//       opacity: 0,
//       x: 50,
//     },
//     animate: {
//       opacity: 1,
//       x: 0,
//     },
//     exit: {
//       opacity: 0,
//       x: -50,
//     },
//   };

//   // تابع برای تغییر تب و به‌روزرسانی URL
//   const handleTabChange = (index) => {
//     setActiveTab(index);
//     router.push(
//       `${window.location.pathname}?tab=${index}`,
//       undefined,
//       { shallow: true }
//     );
//   };

//   return (
//     <div>
//       {/* عنوان و تب‌ها */}
//       <div className="flex flex-col sm:flex-row gap-5 justify-between items-center">
//         <h1 className="font-extrabold text-[#042A1B] text-3xl">
//           دوره آموزشی <span className="font-bold">{courseDetails?.Title}</span>
//         </h1>
//         <div className="flex space-x-1 bg-[#D0DDD140] p-1.5 rounded-full">
//           {tabContent.map((tab, index) => (
//             <motion.button
//               key={index}
//               className={`py-2 px-5 text-sm sm:text-[16px] font-medium text-[#042A1B] rounded-full ${activeTab !== index
//                 ? "bg-transparent opacity-50"
//                 : "bg-[#ffffff] font-semibold opacity-100"
//                 }`}
//               onClick={() => handleTabChange(index)}
//               whileTap={{ scale: 0.95 }}
//               whileHover={{ scale: 1.05 }}
//               transition={{ type: "spring", stiffness: 300 }}
//             >
//               {tab.title}
//             </motion.button>
//           ))}
//         </div>
//       </div>

//       {/* محتوای تب‌ها با انیمیشن */}
//       <div className="my-5">
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={activeTab}
//             variants={tabVariants}
//             initial="initial"
//             animate="animate"
//             exit="exit"
//             transition={{ duration: 0.5 }}
//           >
//             {tabContent[activeTab].content}
//           </motion.div>
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }

// components/CourseDetail.js
// import CourseTitle from "./CourseTitle";
// import TabButtons from "./TabButtons";
// import TabContent from "./TabContent";
// import CourseInfo from "./CourseInfo"; // کامپوننتی که قبلاً ساختیم
// import Exercises from "./Exercises"; // کامپوننت بعدی که خواهیم ساخت
// import Comments from "./Comments"; // کامپوننت بعدی که خواهیم ساخت

// const Exercises = ({ courseId }) => {
//   const router = useRouter();
//   const [chapters, setChapters] = useState([]);
//   const [openChapterIndex, setOpenChapterIndex] = useState(-1);
//   const [hoveredSession, setHoveredSession] = useState(null);

//   useEffect(() => {
//     const fetchChapters = async () => {
//       // شبیه‌سازی دریافت داده از API با داده‌های ساختگی
//       await new Promise((resolve) => setTimeout(resolve, 500));
//       const fakeChapters = [
//         {
//           Id: 1,
//           Title: "فصل اول: مبانی برنامه‌نویسی",
//           Sessions: [
//             {
//               Id: 101,
//               Title: "جلسه ۱: آشنایی با برنامه‌نویسی",
//               HasExercises: true,
//               Duration: "۳۰ دقیقه",
//               Description: "مقدمه‌ای بر مفاهیم برنامه‌نویسی",
//             },
//             {
//               Id: 102,
//               Title: "جلسه ۲: متغیرها و انواع داده",
//               HasExercises: true,
//               Duration: "۴۵ دقیقه",
//               Description: "بررسی متغیرها و انواع داده در جاوااسکریپت",
//             },
//             {
//               Id: 103,
//               Title: "جلسه ۳: عملگرها",
//               HasExercises: true,
//               Duration: "۴۰ دقیقه",
//               Description: "معرفی عملگرهای ریاضی و منطقی",
//             },
//           ],
//         },
//         {
//           Id: 2,
//           Title: "فصل دوم: توابع و دامنه‌ها",
//           Sessions: [
//             {
//               Id: 201,
//               Title: "جلسه ۱: تعریف توابع",
//               HasExercises: true,
//               Duration: "۵۰ دقیقه",
//               Description: "نحوه تعریف و استفاده از توابع",
//             },
//             {
//               Id: 202,
//               Title: "جلسه ۲: دامنه متغیرها",
//               HasExercises: true,
//               Duration: "۳۵ دقیقه",
//               Description: "مفهوم دامنه و نحوه دسترسی به متغیرها",
//             },
//             {
//               Id: 203,
//               Title: "جلسه ۳: توابع بازگشتی",
//               HasExercises: true,
//               Duration: "۴۵ دقیقه",
//               Description: "بررسی توابع بازگشتی و کاربردهای آن",
//             },
//             {
//               Id: 204,
//               Title: "جلسه ۴: توابع ناشناس",
//               HasExercises: true,
//               Duration: "۳۰ دقیقه",
//               Description: "معرفی توابع ناشناس و کاربردهای آن",
//             },
//           ],
//         },
//         {
//           Id: 3,
//           Title: "فصل سوم: شیء‌گرایی",
//           Sessions: [
//             {
//               Id: 301,
//               Title: "جلسه ۱: مفاهیم شیء‌گرایی",
//               HasExercises: true,
//               Duration: "۶۰ دقیقه",
//               Description: "آشنایی با اصول شیء‌گرایی",
//             },
//             {
//               Id: 302,
//               Title: "جلسه ۲: کلاس‌ها و اشیاء",
//               HasExercises: true,
//               Duration: "۵۵ دقیقه",
//               Description: "نحوه تعریف کلاس‌ها و ایجاد اشیاء",
//             },
//             {
//               Id: 303,
//               Title: "جلسه ۳: وراثت",
//               HasExercises: true,
//               Duration: "۴۵ دقیقه",
//               Description: "بررسی مفهوم وراثت در شیء‌گرایی",
//             },
//             {
//               Id: 304,
//               Title: "جلسه ۴: پلی‌مورفیسم",
//               HasExercises: true,
//               Duration: "۵۰ دقیقه",
//               Description: "مفهوم چندریختی و کاربردهای آن",
//             },
//             {
//               Id: 305,
//               Title: "جلسه ۵: تزریق وابستگی",
//               HasExercises: true,
//               Duration: "۴۰ دقیقه",
//               Description: "بررسی Dependency Injection در شیء‌گرایی",
//             },
//           ],
//         },
//         {
//           Id: 4,
//           Title: "فصل چهارم: مباحث پیشرفته",
//           Sessions: [
//             {
//               Id: 401,
//               Title: "جلسه ۱: مدیریت خطا",
//               HasExercises: true,
//               Duration: "۳۵ دقیقه",
//               Description: "نحوه مدیریت و کنترل خطاها",
//             },
//             {
//               Id: 402,
//               Title: "جلسه ۲: async و await",
//               HasExercises: true,
//               Duration: "۴۵ دقیقه",
//               Description: "بررسی مفاهیم برنامه‌نویسی ناهمزمان",
//             },
//             {
//               Id: 403,
//               Title: "جلسه ۳: کار با API ها",
//               HasExercises: true,
//               Duration: "۵۰ دقیقه",
//               Description: "نحوه ارتباط با API های خارجی",
//             },
//             {
//               Id: 404,
//               Title: "جلسه ۴: امنیت در برنامه‌نویسی",
//               HasExercises: true,
//               Duration: "۶۰ دقیقه",
//               Description: "مفاهیم امنیتی و بهترین روش‌ها",
//             },
//             {
//               Id: 405,
//               Title: "جلسه ۵: بهینه‌سازی کد",
//               HasExercises: true,
//               Duration: "۴۰ دقیقه",
//               Description: "روش‌های بهبود عملکرد و بهینه‌سازی",
//             },
//             {
//               Id: 406,
//               Title: "جلسه ۶: تست نرم‌افزار",
//               HasExercises: true,
//               Duration: "۵۵ دقیقه",
//               Description: "مبانی و روش‌های تست کد",
//             },
//             {
//               Id: 407,
//               Title: "جلسه ۷: الگوهای طراحی",
//               HasExercises: true,
//               Duration: "۷۰ دقیقه",
//               Description: "بررسی الگوهای طراحی متداول",
//             },
//           ],
//         },
//       ];
//       setChapters(fakeChapters);
//     };
//     fetchChapters();
//   }, []);

//   const toggleChapter = (index) => {
//     setOpenChapterIndex((prev) => (prev === index ? -1 : index));
//   };

//   const handleSessionClick = (sessionId) => {
//     router.push(`/courses/${courseId}/sessions/${sessionId}/exercises`);
//   };

//   const SessionBadge = ({ progress }) => {
//     let content;
//     switch (progress) {
//       case "completed":
//         return (
//           <div className="flex items-center gap-2 text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">
//             <CheckCircle size={16} />
//             <span className="text-sm font-medium">تکمیل شده</span>
//           </div>
//         );
//       case "pending":
//         return (
//           <div className="flex items-center gap-2 text-amber-600 bg-amber-100 px-3 py-1 rounded-full">
//             <AlertCircle size={16} />
//             <span className="text-sm font-medium">در انتظار بررسی</span>
//           </div>
//         );
//       default:
//         return (
//           <div className="flex items-center gap-2 text-sky-600 bg-sky-100 px-3 py-1 rounded-full">
//             <span className="text-sm font-medium">شروع تمرین</span>
//             <PlayCircle size={16} />
//           </div>
//         );
//     }
//   };

//   return (
//     <div className="mt-8 space-y-6">
//       {chapters.map((chapter, chapterIndex) => (
//         <motion.div
//           key={chapter.Id}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.3, delay: chapterIndex * 0.1 }}
//         >
//           {/* عنوان فصل */}
//           <div
//             className={`
//               bg-white p-6 rounded-xl cursor-pointer shadow-sm
//               border-2 ${openChapterIndex === chapterIndex
//                 ? "border-emerald-500"
//                 : "border-gray-100"
//               }
//               hover:border-emerald-400 transition-all duration-300
//             `}
//             onClick={() => toggleChapter(chapterIndex)}
//           >
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-4">
//                 <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center">
//                   <span className="text-emerald-600 font-bold text-xl">
//                     {chapterIndex + 1}
//                   </span>
//                 </div>
//                 <h2 className="text-2xl font-bold text-gray-800">
//                   {chapter.Title}
//                 </h2>
//               </div>
//               <ChevronDown
//                 className={`transform transition-transform duration-300 text-gray-600 ${openChapterIndex === chapterIndex ? "rotate-180" : ""
//                   }`}
//                 size={28}
//               />
//             </div>
//           </div>

//           {/* لیست جلسات */}
//           <AnimatePresence>
//             {openChapterIndex === chapterIndex && (
//               <motion.div
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: "auto" }}
//                 exit={{ opacity: 0, height: 0 }}
//                 className="mt-4 space-y-2 pl-8"
//               >
//                 {chapter.Sessions.filter((s) => s.HasExercises).map(
//                   (session, sessionIndex) => (
//                     <motion.div
//                       key={session.Id}
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: sessionIndex * 0.1 }}
//                       className="group bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow
//                       border border-gray-100 hover:border-emerald-100 cursor-pointer"
//                       onClick={() => handleSessionClick(session.Id)}
//                       onMouseEnter={() => setHoveredSession(session.Id)}
//                       onMouseLeave={() => setHoveredSession(null)}
//                     >
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-4">
//                           <div className="relative">
//                             <div
//                               className={`w-10 h-10 rounded-lg flex items-center justify-center
//                                 ${hoveredSession === session.Id
//                                   ? "bg-emerald-500 text-white"
//                                   : "bg-emerald-50 text-emerald-500"
//                                 }`}
//                             >
//                               <PlayCircle size={20} />
//                             </div>
//                             {hoveredSession === session.Id && (
//                               <motion.div
//                                 className="absolute inset-0 border-2 border-emerald-200 rounded-lg"
//                                 initial={{ scale: 0.8 }}
//                                 animate={{ scale: 1 }}
//                                 transition={{ type: "spring", stiffness: 300 }}
//                               />
//                             )}
//                           </div>
//                           <div>
//                             <h3 className="text-lg font-semibold text-gray-800">
//                               {session.Title}
//                             </h3>
//                             <p className="text-sm text-gray-500 mt-1">
//                               {session.Duration} • {session.Description}
//                             </p>
//                           </div>
//                         </div>
//                         <SessionBadge
//                           progress={
//                             sessionIndex % 3 === 0
//                               ? "completed"
//                               : sessionIndex % 3 === 1
//                                 ? "pending"
//                                 : null
//                           }
//                         />
//                       </div>
//                     </motion.div>
//                   )
//                 )}
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </motion.div>
//       ))}
//     </div>
//   );
// };

// const Comments = () => {
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState({
//     userName: "",
//     userAvatar: "",
//     rating: 0,
//     comment: "",
//     date: "",
//   });
//   const [replyContent, setReplyContent] = useState("");
//   const [replyingTo, setReplyingTo] = useState(null);

//   useEffect(() => {
//     // شبیه‌سازی دریافت نظرات از API
//     const fetchComments = async () => {
//       await new Promise((resolve) => setTimeout(resolve, 500));
//       const fakeComments = [
//         {
//           id: 1,
//           userName: "علی رضایی",
//           userAvatar: "https://i.pravatar.cc/150?img=65",
//           rating: 4.5,
//           date: "2023-10-12",
//           comment:
//             "این دوره بسیار عالی بود و مطالب به خوبی توضیح داده شده بودند. واقعا راضی هستم.",
//           replies: [
//             {
//               id: 11,
//               userName: "مدیر سایت",
//               userAvatar: "https://i.pravatar.cc/150?img=63",
//               date: "2023-10-13",
//               comment: "خوشحالیم که دوره مورد پسند شما بوده است.",
//             },
//           ],
//         },
//         {
//           id: 2,
//           userName: "مریم احمدی",
//           userAvatar: "https://i.pravatar.cc/150?img=47",
//           rating: 5,
//           date: "2023-10-10",
//           comment:
//             "مدرس بسیار مسلط بود و پاسخ سوالات را با حوصله می‌داد. توصیه می‌کنم حتما این دوره را بگذرانید.",
//           replies: [],
//         },
//         {
//           id: 3,
//           userName: "محمد کاظمی",
//           userAvatar: "https://i.pravatar.cc/150?img=68",
//           rating: 4,
//           date: "2023-10-08",
//           comment:
//             "دوره خوبی بود اما می‌شد برخی مباحث را بیشتر توضیح داد. در کل رضایت‌بخش بود.",
//           replies: [],
//         },
//         // نظرات بیشتر...
//       ];
//       setComments(fakeComments);
//     };
//     fetchComments();
//   }, []);

//   const renderStars = (rating) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 !== 0;

//     for (let i = 0; i < fullStars; i++) {
//       stars.push(<StarFilled key={`full-${i}`} className="text-yellow-400" />);
//     }

//     if (hasHalfStar) {
//       stars.push(<StarHalf key="half" className="text-yellow-400" />);
//     }

//     const emptyStars = 5 - stars.length;

//     for (let i = 0; i < emptyStars; i++) {
//       stars.push(<Star key={`empty-${i}`} className="text-gray-300" />);
//     }

//     return <div className="flex">{stars}</div>;
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const options = { year: "numeric", month: "long", day: "numeric" };
//     return date.toLocaleDateString("fa-IR", options);
//   };

//   const handleAddComment = () => {
//     if (newComment.userName && newComment.comment && newComment.rating > 0) {
//       const commentToAdd = {
//         ...newComment,
//         id: comments.length + 1,
//         date: new Date().toISOString().split("T")[0],
//         userAvatar: "/images/default-avatar.jpg", // تصویر پیش‌فرض
//         replies: [],
//       };
//       setComments([commentToAdd, ...comments]);
//       setNewComment({
//         userName: "",
//         userAvatar: "",
//         rating: 0,
//         comment: "",
//         date: "",
//       });
//     } else {
//       alert("لطفاً تمامی فیلدها را پر کنید.");
//     }
//   };

//   const handleAddReply = (commentId) => {
//     if (replyContent) {
//       const replyToAdd = {
//         id: Date.now(),
//         userName: "شما",
//         userAvatar: "/images/default-avatar.jpg",
//         date: new Date().toISOString().split("T")[0],
//         comment: replyContent,
//       };
//       setComments((prevComments) =>
//         prevComments.map((comment) =>
//           comment.id === commentId
//             ? {
//               ...comment,
//               replies: [...comment.replies, replyToAdd],
//             }
//             : comment
//         )
//       );
//       setReplyContent("");
//       setReplyingTo(null);
//     } else {
//       alert("لطفاً پاسخ خود را بنویسید.");
//     }
//   };

//   return (
//     <div className="mt-8">
//       <h2 className="text-2xl font-bold text-[#042A1B] mb-6">نظرات کاربران</h2>
//       {/* فرم ارسال نظر جدید */}
//       <div className="bg-white p-6 rounded-xl shadow-md mb-8">
//         <h3 className="text-xl font-semibold text-gray-800 mb-4">ارسال نظر جدید</h3>
//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2">نام شما</label>
//           <input
//             type="text"
//             value={newComment.userName}
//             onChange={(e) =>
//               setNewComment({ ...newComment, userName: e.target.value })
//             }
//             className="w-full p-3 border rounded-lg"
//             placeholder="نام خود را وارد کنید"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2">امتیاز شما</label>
//           <select
//             value={newComment.rating}
//             onChange={(e) =>
//               setNewComment({ ...newComment, rating: parseFloat(e.target.value) })
//             }
//             className="w-full p-3 border rounded-lg"
//           >
//             <option value={0}>انتخاب کنید</option>
//             <option value={5}>۵</option>
//             <option value={4.5}>۴.۵</option>
//             <option value={4}>۴</option>
//             <option value={3.5}>۳.۵</option>
//             <option value={3}>۳</option>
//             <option value={2.5}>۲.۵</option>
//             <option value={2}>۲</option>
//             <option value={1.5}>۱.۵</option>
//             <option value={1}>۱</option>
//             <option value={0.5}>۰.۵</option>
//           </select>
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2">متن نظر</label>
//           <textarea
//             value={newComment.comment}
//             onChange={(e) =>
//               setNewComment({ ...newComment, comment: e.target.value })
//             }
//             className="w-full p-3 border rounded-lg"
//             placeholder="نظر خود را بنویسید"
//             rows={4}
//           ></textarea>
//         </div>
//         <button
//           onClick={handleAddComment}
//           className="px-6 py-3 bg-[#7AE36A] text-white rounded-lg font-semibold hover:bg-emerald-600 transition-colors"
//         >
//           ارسال نظر
//         </button>
//       </div>
//       {/* لیست نظرات */}
//       <div className="space-y-6">
//         {comments.map((comment, index) => (
//           <motion.div
//             key={comment.id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: index * 0.1 }}
//             className="bg-white p-6 rounded-xl shadow-md"
//           >
//             <div className="flex items-center mb-4">
//               <img
//                 src={comment.userAvatar}
//                 alt={comment.userName}
//                 className="w-12 h-12 rounded-full object-cover border-2 border-[#7AE36A]"
//               />
//               <div className="mr-4">
//                 <h3 className="text-lg font-semibold text-gray-800">
//                   {comment.userName}
//                 </h3>
//                 <span className="text-sm text-gray-500">
//                   {formatDate(comment.date)}
//                 </span>
//               </div>
//             </div>
//             <div className="flex items-center mb-4">
//               {renderStars(comment.rating)}
//               <span className="text-sm text-gray-600 mr-2">
//                 {comment.rating} از ۵
//               </span>
//             </div>
//             <p className="text-gray-700 leading-7 text-justify">{comment.comment}</p>
//             <button
//               onClick={() =>
//                 setReplyingTo(replyingTo === comment.id ? null : comment.id)
//               }
//               className="mt-4 text-sm text-[#7AE36A] font-semibold hover:text-emerald-600 transition-colors"
//             >
//               {replyingTo === comment.id ? "انصراف از پاسخ" : "پاسخ"}
//             </button>
//             {/* فرم پاسخ */}
//             {replyingTo === comment.id && (
//               <div className="mt-4">
//                 <textarea
//                   value={replyContent}
//                   onChange={(e) => setReplyContent(e.target.value)}
//                   className="w-full p-3 border rounded-lg mb-2"
//                   placeholder="پاسخ خود را بنویسید"
//                   rows={3}
//                 ></textarea>
//                 <button
//                   onClick={() => handleAddReply(comment.id)}
//                   className="px-4 py-2 bg-[#7AE36A] text-white rounded-lg font-semibold hover:bg-emerald-600 transition-colors"
//                 >
//                   ارسال پاسخ
//                 </button>
//               </div>
//             )}
//             {/* نمایش پاسخ‌ها */}
//             {comment.replies && comment.replies.length > 0 && (
//               <div className="mt-6 space-y-4 border-t pt-4 border-gray-200">
//                 {comment.replies.map((reply) => (
//                   <div key={reply.id} className="flex items-start">
//                     <img
//                       src={reply.userAvatar}
//                       alt={reply.userName}
//                       className="w-10 h-10 rounded-full object-cover border-2 border-gray-300"
//                     />
//                     <div className="mr-4">
//                       <h4 className="text-md font-semibold text-gray-800">
//                         {reply.userName}
//                       </h4>
//                       <span className="text-sm text-gray-500">
//                         {formatDate(reply.date)}
//                       </span>
//                       <p className="text-gray-700 mt-2">{reply.comment}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };