"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import DocTitle from "../../../components/courses/course/CourseTitle";
import DocInfo from "../../../components/docs/doc/DocInfo";
import DocTitleSkeleton from "../../../components/courses/course/CourseTitleSkeleton";
import { motion } from "framer-motion"
import Link from "next/link";


// کامپوننت جدید برای تبلیغات
export const VideoCourseAd = ({ courseId }) => {

  return (
    <div className="bg-green-50 rounded-lg p-6 mb-8 border border-green-100 mt-5">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-green-800 mb-2">
            آموزش ویدئویی حرفه‌ای 👨💻
          </h3>
          <p className="text-green-700 mb-4">
            برای دسترسی به ddd با کیفیت HD، آموزش‌های تعاملی
            و دریافت مدرک معتبر، دوره ویدیویی ما رو تهیه کنید!
          </p>
        </div>
        <Link
          href={`/courses/${courseId}`}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap"
        >
          مشاهده دوره ویدیویی
        </Link>
      </div>
    </div>
  );
}

export const VideoCourseAdEnd = ({ onClose, courseId }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative bg-gradient-to-br from-emerald-50 to-white border-2 border-emerald-200 rounded-2xl mt-10 p-7 mb-8 shadow-xl shadow-emerald-100/30"
    >
      {/* <button
        onClick={onClose}
        className="absolute top-1.5 right-1.5 text-gray-400 hover:text-emerald-600 transition-colors"
      >
        <motion.svg
          whileHover={{ scale: 1.1, rotate: 90 }}
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </motion.svg>
      </button> */}

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Content Section */}
        <div className="flex-1 space-y-7">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-4 bg-white p-4 rounded-xl border border-emerald-200"
          >
            <span className="text-3xl bg-emerald-100 p-3 rounded-full">🎓</span>
            <div>
              <h3 className="text-xl font-black text-emerald-800">
                نسخه حرفه‌ای دوره ریکت
              </h3>
              <p className="text-sm text-emerald-600 mt-1">شروع یادگیری فقط در ۳۰ ثانیه!</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: '🎥', title: '۴۲ ساعت ویدیو HD', subtitle: 'آموزش جامع و پروژه‌محور' },
              { icon: '💬', title: 'پشتیبانی VIP', subtitle: 'پاسخگویی ۲۴ ساعته' },
              { icon: '🏆', title: 'گواهینامه معتبر', subtitle: 'بین‌المللی - قابل ارایه' },
              { icon: '📱', title: 'دسترسی دائمی', subtitle: 'همه دستگاه‌ها' },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -3 }}
                className="flex items-center gap-3 p-3 bg-white rounded-lg border border-emerald-100 hover:border-emerald-200 transition-all"
              >
                <span className="text-2xl p-2">{item.icon}</span>
                <div>
                  <h4 className="font-semibold text-emerald-800">{item.title}</h4>
                  <p className="text-xs text-emerald-600">{item.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 1 }}
          className="lg:w-80 shrink-0 bg-emerald-800 text-white p-5 rounded-xl border-2 border-emerald-900 space-y-5"
        >
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-900/40 rounded-full text-sm">
              <span className="animate-pulse">🎁</span>
              <span>تخفیف فعال!</span>
            </div>

            <div className="space-y-2">
              <div className="text-3xl font-black">۲۹۹,۰۰۰ تومان</div>
              <div className="line-through text-emerald-300/80 text-sm">۴۹۹,۰۰۰ تومان</div>
            </div>

            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={`/courses/${courseId}`}
              className="block w-full bg-white/95 text-emerald-800 px-5 py-3 rounded-lg font-bold hover:bg-white transition-colors shadow-lg"
            >
              شروع فوری یادگیری →
            </motion.a>
          </div>

          <div className="space-y-3 text-sm text-emerald-200">
            <div className="flex items-center gap-2">
              <span className="text-lg">✅</span>
              <span>ضمانت بازگشت وجه ۷ روزه</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">⏳</span>
              <span>آپدیت رایگان دوره</span>
            </div>
            {/* <div className="flex items-center gap-2">
              <span className="text-lg">📞</span>
              <span>مشاوره رایگان پیش از خرید</span>
            </div> */}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function CourseDetail() {
  const params = useParams();
  const { docId } = params;
  const [courseDetails, setCourseDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (docId) {
      fetch(`https://api.techa.me/api/Course/${docId}`)
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
  }, [docId]);

  return (
    <div className="space-y-10">
      <div className="space-y-5">
        {loading ? (
          <DocTitleSkeleton />
        ) : (
          <DocTitle title={courseDetails?.title} />
        )}
        {/* بخش تبلیغاتی */}
        {!loading && courseDetails && (
          <VideoCourseAd courseId={docId} />
        )}
      </div>


      <DocInfo courseDetails={courseDetails} />

      {!loading && <VideoCourseAdEnd courseId={docId} />}


    </div>
  );
}