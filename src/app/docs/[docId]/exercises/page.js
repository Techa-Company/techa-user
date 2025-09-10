"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const ExerciseInstructionsPage = () => {
  return (
    <>
      <div className="max-w-6xl mx-auto">
        {/* هدر صفحه */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          {/* <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-green-400 to-emerald-600 rounded-3xl shadow-lg mb-8">
            <div className="bg-white p-3 rounded-2xl shadow-inner">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div> */}

          <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 mb-6">
            راهنمای جامع <span className="text-emerald-600">سیستم تمرینات</span>
          </h1>

          <p className="text-xl text-green-700 max-w-3xl mx-auto leading-relaxed">
            همه آنچه برای موفقیت در تمرینات برنامه‌نویسی نیاز دارید را در اینجا بیابید
          </p>
        </motion.header>

        {/* بخش مزایا */}
        {/* <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300">
            <div className="bg-gradient-to-br from-green-100 to-emerald-200 p-3 rounded-xl w-14 h-14 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-green-900 mb-3">یادگیری تعاملی</h3>
            <p className="text-green-800">با حل مسائل واقعی، مهارت‌های برنامه‌نویسی خود را به صورت عملی تقویت کنید</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300">
            <div className="bg-gradient-to-br from-green-100 to-emerald-200 p-3 rounded-xl w-14 h-14 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-green-900 mb-3">ارزیابی دقیق</h3>
            <p className="text-green-800">تمرینات شما توسط مدرس بررسی شده و بازخورد شخصی‌سازی شده دریافت می‌کنید</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300">
            <div className="bg-gradient-to-br from-green-100 to-emerald-200 p-3 rounded-xl w-14 h-14 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-green-900 mb-3">پیشرفت مستمر</h3>
            <p className="text-green-800">با تکمیل تمرینات، گام‌به‌گام به سمت تسلط بر مفاهیم حرکت کنید</p>
          </div>
        </motion.section> */}

        {/* بخش راهنما */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-16"
        >
          <div className="bg-gradient-to-r from-green-600 to-emerald-700 p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-2">چگونه از سیستم تمرینات استفاده کنیم؟</h2>
            <p className="text-green-100">مراحل زیر را برای بهره‌برداری کامل از سیستم تمرینات دنبال کنید</p>
          </div>

          <div className="p-8 grid md:grid-cols-2 gap-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl shadow-lg">
                  ۱
                </div>
              </div>
              <div className="mr-4">
                <h3 className="text-lg font-bold text-green-900 mb-2">انتخاب تمرین</h3>
                <p className="text-green-800">از بین تمرینات موجود، موضوعی که می‌خواهید روی آن کار کنید را انتخاب نمایید</p>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl shadow-lg">
                  ۲
                </div>
              </div>
              <div className="mr-4">
                <h3 className="text-lg font-bold text-green-900 mb-2">مطالعه دقیق</h3>
                <p className="text-green-800">صورت سوال و requirements را به دقت مطالعه کنید</p>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl shadow-lg">
                  ۳
                </div>
              </div>
              <div className="mr-4">
                <h3 className="text-lg font-bold text-green-900 mb-2">حل تمرین</h3>
                <p className="text-green-800">با استفاده از دانش خود و راهنمایی‌های ارائه شده، تمرین را حل کنید</p>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl shadow-lg">
                  ۴
                </div>
              </div>
              <div className="mr-4">
                <h3 className="text-lg font-bold text-green-900 mb-2">ارسال پاسخ</h3>
                <p className="text-green-800">پاسخ خود را قبل از پایان مهلت تعیین شده ارسال کنید</p>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl shadow-lg">
                  ۵
                </div>
              </div>
              <div className="mr-4">
                <h3 className="text-lg font-bold text-green-900 mb-2">دریافت بازخورد</h3>
                <p className="text-green-800">پس از تصحیح، نمره و بازخورد مدرس را مشاهده کنید</p>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl shadow-lg">
                  ۶
                </div>
              </div>
              <div className="mr-4">
                <h3 className="text-lg font-bold text-green-900 mb-2">تکمیل و بهبود</h3>
                <p className="text-green-800">در صورت نیاز، با استفاده از بازخوردها پاسخ خود را بهبود بخشید</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* بخش نکات مهم */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-3xl p-8 text-white shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              نکات مهم
            </h2>

            <ul className="space-y-4">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-300 ml-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>حتما قبل از پایان مهلت مقرر، پاسخ خود را ارسال کنید</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-300 ml-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>برای دریافت نمره کامل، تمام بخش‌های صورت سوال را پاسخ دهید</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-300 ml-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>کدهای خود را تمیز و خوانا بنویسید</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-300 ml-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>از کامنت‌گذاری مناسب در کد خود استفاده کنید</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-green-100">
            <h2 className="text-2xl font-bold text-green-900 mb-6 flex items-center">
              <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 663m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2zm3 -13v21m-4 0h8" />
              </svg>
              سیستم نمره‌دهی
            </h2>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-green-800">نمره کامل</span>
                  <span className="font-bold text-green-600">100-90</span>
                </div>
                <div className="w-full bg-green-100 rounded-full h-2.5">
                  <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-green-800">خوب</span>
                  <span className="font-bold text-amber-600">89-70</span>
                </div>
                <div className="w-full bg-amber-100 rounded-full h-2.5">
                  <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-green-800">نیاز به بهبود</span>
                  <span className="font-bold text-red-600">69-0</span>
                </div>
                <div className="w-full bg-red-100 rounded-full h-2.5">
                  <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
              <p className="text-green-700 text-sm">
                برای قبولی در دوره، باید حداقل نمره 70 از 100 را در تمرینات کسب کنید.
              </p>
            </div>
          </div>
        </motion.section>

      </div>
    </>
  );
};

export default ExerciseInstructionsPage;