import Link from "next/link";
import { useParams } from "next/navigation";

const Exercises = () => {

    const { docId } = useParams();

    return (
        <div className="">
            <div className="max-w-6xl mx-auto">
                {/* هدر صفحه با انیمیشن */}
                <div className="text-center mb-16 relative">
                    <div className="absolute -inset-4  blur-4xl opacity-10 rounded-full"></div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-green-900 mb-6 relative z-10">
                        سیستم <span className="text-emerald-600">تمرینات تعاملی</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-[#2f2f2f] mx-auto leading-relaxed">
                        با حل تمرینات متنوع و چالش‌برانگیز، مهارت‌های برنامه‌نویسی خود را به سطح جدیدی برسانید
                    </p>

                    {/* المان تزئینی */}
                    {/* <div className="mt-12 flex justify-center">
                        <div className="relative">
                            <div className="absolute -inset-6 bg-green-500/20 rounded-full blur-2xl"></div>
                            <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 text-white font-bold py-5 px-10 rounded-2xl shadow-2xl text-lg transform hover:scale-105 transition-all duration-300 cursor-pointer"
                                onClick={() => setShowIntro(false)}>
                                شروع سفر یادگیری
                                <svg className="w-6 h-6 inline-block mr-2 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                </svg>
                            </div>
                        </div>
                    </div> */}
                </div>

                {/* مزایای سیستم تمرینات */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-green-100/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                        <div className="bg-gradient-to-br from-green-100 to-emerald-200 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6">
                            <svg className="w-8 h-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-green-900 mb-3">تمرینات متنوع</h3>
                        <p className="text-gray-700">هم کدنویسی کامل و هم تکمیل کدهای موجود با چالش‌های گام‌به‌گام</p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-green-100/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                        <div className="bg-gradient-to-br from-green-100 to-emerald-200 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6">
                            <svg className="w-8 h-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-green-900 mb-3">مهلت مشخص</h3>
                        <p className="text-gray-700">هر تمرین زمان مشخصی برای تحویل دارد تا نظم یادگیری شما حفظ شود</p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-green-100/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                        <div className="bg-gradient-to-br from-green-100 to-emerald-200 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6">
                            <svg className="w-8 h-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-green-900 mb-3">تصحیح توسط مدرس</h3>
                        <p className="text-gray-700">تمامی تمرینات توسط مدرس بررسی و نمره‌دهی می‌شوند</p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-green-100/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                        <div className="bg-gradient-to-br from-green-100 to-emerald-200 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6">
                            <svg className="w-8 h-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-green-900 mb-3">دریافت فیدبک</h3>
                        <p className="text-gray-700">برای هر تمرین بازخورد اختصاصی دریافت می‌کنید</p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-green-100/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                        <div className="bg-gradient-to-br from-green-100 to-emerald-200 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6">
                            <svg className="w-8 h-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-green-900 mb-3">ضرورت برای مدرک</h3>
                        <p className="text-gray-700">گذراندن تمرینات برای دریافت مدرک پایان دوره ضروری است</p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-green-100/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                        <div className="bg-gradient-to-br from-green-100 to-emerald-200 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6">
                            <svg className="w-8 h-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-green-900 mb-3">یادگیری عمیق‌تر</h3>
                        <p className="text-gray-700">با انجام تمرینات، مفاهیم را به صورت عمیق‌تر یاد می‌گیرید</p>
                    </div>
                </div>

                {/* آمار و اطلاعات */}
                <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-3xl shadow-2xl px-5 py-10 text-white mb-16 relative overflow-hidden">
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full"></div>
                    <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-white/5 rounded-full"></div>

                    <h2 className="text-2xl sm:text-4xl font-bold mb-10 text-center relative z-10">تمرینات دوره در یک نگاه</h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
                        <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
                            <div className="text-4xl font-bold mb-2 bg-gradient-to-br from-white to-green-200 bg-clip-text text-transparent">۱۲</div>
                            <div className="text-green-100">تمرین متنوع</div>
                        </div>
                        <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
                            <div className="text-4xl font-bold mb-2 bg-gradient-to-br from-white to-green-200 bg-clip-text text-transparent">۸۵%</div>
                            <div className="text-green-100">نمره قبولی</div>
                        </div>
                        <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
                            <div className="text-4xl font-bold mb-2 bg-gradient-to-br from-white to-green-200 bg-clip-text text-transparent">۲۴</div>
                            <div className="text-green-100">ساعت مهلت متوسط</div>
                        </div>
                        <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
                            <div className="text-4xl font-bold mb-2 bg-gradient-to-br from-white to-green-200 bg-clip-text text-transparent">۱۰۰%</div>
                            <div className="text-green-100">دریافت فیدبک</div>
                        </div>
                    </div>
                </div>

                {/* دکمه اقدام اصلی */}
                <div className="text-center">
                    <div className="relative inline-block">
                        <div className="absolute -inset-4 bg-green-400 blur-3xl opacity-30 rounded-full"></div>
                        <Link
                            href={`/docs/${docId}/exercises`}
                            className="relative bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-bold py-5 px-12 rounded-2xl text-xl shadow-2xl transition-all duration-300 transform hover:scale-105"
                        >
                            مشاهده تمرینات دوره
                            <svg className="w-6 h-6 inline-block mr-2 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </Link>
                    </div>

                    {/* <p className="text-green-700 mt-6 text-lg">
                        با شروع تمرینات، مسیر تبدیل شدن به یک متخصص را آغاز کنید!
                    </p> */}
                </div>

                {/* بخش پایینی */}
                {/* <div className="mt-20 text-center text-green-700/80">
                    <p>هر سوالی دارید؟ از پشتیبانی آنلاین کمک بگیرید</p>
                </div> */}
            </div>
        </div>
    );
};

export default Exercises;