"use client"
import { motion } from "framer-motion";
import { ShoppingCart, BadgeCheck, Clock, Users, Wallet, Tag, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const PurchasePage = () => {
    const [discountCode, setDiscountCode] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("wallet");

    return (
        <div className="min-h-[50vh] flex justify-center items-center sm:mx-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-5xl w-full mx-auto bg-white sm:rounded-2xl sm:shadow-2xl p-5 md:p-8 border border-green-100"
            >
                {/* هدر صفحه */}
                <motion.div
                    className="flex items-center gap-4 mb-8"
                    whileHover={{ scale: 1.02 }}
                >
                    <div className="p-3 bg-green-100 rounded-xl">
                        <ShoppingCart className="w-12 h-12 text-green-600" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">خرید دوره پیشرفته</h1>
                        <p className="text-green-600 mt-1">مسیر تبدیل شدن به توسعه‌ده حرفه‌ای!</p>
                    </div>
                </motion.div>

                {/* محتوای اصلی */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* بخش سمت چپ */}
                    <div className="space-y-6">
                        {/* کارت مزایا */}
                        <motion.div
                            className="flex items-center gap-4 p-4 bg-green-50 rounded-xl border border-green-100"
                            whileHover={{ x: 5 }}
                        >
                            <div className="p-2 bg-green-100 rounded-lg">
                                <BadgeCheck className="w-8 h-8 text-green-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-gray-800">مزایای دوره</h3>
                                <p className="text-gray-600 text-sm mt-1">دسترسی مادام‌العمر + آپدیت‌های رایگان</p>
                            </div>
                        </motion.div>

                        {/* کارت زمان */}
                        <motion.div
                            className="flex items-center gap-4 p-4 bg-green-50 rounded-xl border border-green-100"
                            whileHover={{ x: 5 }}
                        >
                            <div className="p-2 bg-green-100 rounded-lg">
                                <Clock className="w-8 h-8 text-green-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-gray-800">مدت زمان دوره</h3>
                                <p className="text-gray-600 text-sm mt-1">۳۰ ساعت آموزش ویدیویی + تمرین عملی</p>
                            </div>
                        </motion.div>

                        {/* کارت شرکت کنندگان */}
                        <motion.div
                            className="flex items-center gap-4 p-4 bg-green-50 rounded-xl border border-green-100"
                            whileHover={{ x: 5 }}
                        >
                            <div className="p-2 bg-green-100 rounded-lg">
                                <Users className="w-8 h-8 text-green-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-gray-800">شرکت کنندگان</h3>
                                <p className="text-gray-600 text-sm mt-1">+۱۵۰۰ دانشجو در حال یادگیری</p>
                            </div>
                        </motion.div>

                        {/* بخش کد تخفیف */}
                        <motion.div
                            className="p-4 bg-green-50 rounded-xl border border-green-100"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <div className="flex gap-2">
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        value={discountCode}
                                        onChange={(e) => setDiscountCode(e.target.value)}
                                        placeholder="کد تخفیف خود را وارد کنید"
                                        className="w-full pl-10 pr-3 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                    <Tag className="w-5 h-5 text-green-600 absolute left-3 top-3 opacity-70" />
                                </div>
                                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                                    اعمال کد
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* بخش سمت راست */}
                    <div className="flex flex-col gap-6">
                        {/* قیمت و دکمه خرید */}
                        <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                            <div className="text-center mb-4">
                                <span className="text-gray-500 line-through">۳۲۰,۰۰۰ تومان</span>
                                <h2 className="text-3xl font-bold text-gray-800 mt-1">۲۰۰,۰۰۰ تومان</h2>
                            </div>

                            {/* روش پرداخت */}
                            <div className="space-y-4 mb-6">
                                <div
                                    className={`p-3 rounded-lg cursor-pointer transition ${paymentMethod === 'wallet' ? 'bg-green-100 border-2 border-green-500' : 'bg-white border border-green-200'}`}
                                    onClick={() => setPaymentMethod('wallet')}
                                >
                                    <div className="flex items-center gap-3">
                                        <Wallet className="w-6 h-6 text-green-600" />
                                        <span className="font-medium">پرداخت از کیف پول</span>
                                    </div>
                                </div>

                                <div
                                    className={`p-3 rounded-lg cursor-pointer transition ${paymentMethod === 'gateway' ? 'bg-green-100 border-2 border-green-500' : 'bg-white border border-green-200'}`}
                                    onClick={() => setPaymentMethod('gateway')}
                                >
                                    <div className="flex items-center gap-3">
                                        <Image
                                            src="/images/zarin.png"
                                            width={24}
                                            height={24}
                                            alt="درگاه پرداخت"
                                        />
                                        <span className="font-medium">پرداخت آنلاین</span>
                                    </div>
                                </div>
                            </div>

                            {/* دکمه خرید */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                تکمیل خرید
                            </motion.button>
                        </div>

                        {/* اطلاعات اضافی */}
                        <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <ShieldCheck className="w-5 h-5 text-green-600" />
                                <span>تضمین بازگشت وجه ۷ روزه</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default PurchasePage;