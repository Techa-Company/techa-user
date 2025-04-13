"use client";
import { Check, X, Zap, Gem, HelpCircle, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function PricingPage() {
    // lib/data.ts
    const pricingPlans = [
        {
            title: "تکا",
            price: "رایگان",
            isPlus: false,
            features: [
                { text: "دسترسی به تمام ویدیوهای آموزشی", available: true },
                { text: "مستندات کامل زبان‌ها", available: true },
                { text: "ادیتور آنلاین", available: true },
                { text: "پشتیبانی جامعه", available: true },
                { text: "تمرین‌های اختصاصی", available: false },
                { text: "بررسی کد خصوصی", available: false },
            ],
        },
        {
            title: "تکا پلاس",
            price: "۴۹۰۰۰",
            isPlus: true,
            features: [
                { text: "تمام امکانات نسخه رایگان", available: true },
                { text: "تمرین‌های اختصاصی", available: true },
                { text: "بررسی کد خصوصی", available: true },
                { text: "پشتیبانی VIP", available: true },
                { text: "پروژه‌های واقعی", available: true },
                { text: "مصاحبه‌های شغلی", available: true },
            ],
        },
    ];

    const faqs = [
        {
            question: "تفاوت تکا و تکا پلاس چیست؟",
            answer: "تکا پلاس شامل ویژگی‌های پیشرفته مثل بررسی کد خصوصی، پشتیبانی VIP و پروژه‌های واقعی می‌شود.",
        },
        {
            question: "آیا می‌توانم پلن را تغییر دهم؟",
            answer: "بله، در هر زمان می‌توانید از طریق حساب کاربری خود پلن را ارتقا یا کاهش دهید.",
        },
    ];
    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
            {/* Hero Section با افکت پارالاکس */}
            <section className="container py-24 mx-auto text-center relative overflow-hidden 2xl:px20 px-5">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10"
                >
                    <h1 className="text-5xl font-extrabold text-green-700 mb-6 drop-shadow-md">
                        <span className="bg-gradient-to-r from-green-600 to-emerald-600 text-transparent bg-clip-text">
                            مسیر یادگیری
                        </span>
                        <br />را خودت انتخاب کن!
                    </h1>
                    <p className="text-xl text-green-800/90 max-w-2xl mx-auto leading-relaxed">
                        با پلن‌های حرفه‌ای ما از پایه تا پیشرفته، برنامه‌نویسی را اصولی یاد بگیر
                    </p>
                </motion.div>

                {/* افکت زمینه داینامیک */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-to-r from-green-200/20 to-emerald-200/20 blur-3xl rounded-full"
                />

                <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto my-14">
                    {pricingPlans.map((plan, index) => (
                        <motion.div
                            key={plan.title}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2, type: "spring" }}
                            whileHover={{ y: -10 }}
                            className={`relative p-8 rounded-3xl shadow-2xl transition-all duration-300 ${plan.isPlus
                                ? "bg-gradient-to-br from-green-700 to-emerald-800 text-white border-4 border-emerald-200/20"
                                : "bg-white border-4 border-green-50"
                                }`}
                        >
                            {/* نشان ویژه برای پلن پلاس */}
                            {plan.isPlus && (
                                <div className="absolute -top-5 right-5 bg-amber-400 text-green-900 px-6 py-2 rounded-full font-bold shadow-lg flex items-center gap-2">
                                    <Zap className="w-5 h-5 fill-current" />
                                    پرفروش
                                </div>
                            )}

                            <div className="flex items-center gap-4 mb-8">
                                <div
                                    className={`p-4 rounded-2xl ${plan.isPlus ? "bg-emerald-900/30" : "bg-green-100"
                                        }`}
                                >
                                    {plan.isPlus ? (
                                        <Gem className="w-10 h-10 text-amber-400" />
                                    ) : (
                                        <Zap className="w-10 h-10 text-green-600" />
                                    )}
                                </div>
                                <h2 className="text-3xl font-bold">{plan.title}</h2>
                            </div>

                            <div className="mb-8 flex items-baseline gap-3">
                                <span className="text-5xl font-black">{plan.price}</span>
                                <span
                                    className={`text-lg ${plan.isPlus ? "text-emerald-200" : "text-gray-500"
                                        }`}
                                >
                                    /ماهانه
                                </span>
                            </div>

                            <ul className="space-y-5 mb-10">
                                {plan.features.map((feature) => (
                                    <motion.li
                                        key={feature.text}
                                        whileHover={{ x: 10 }}
                                        className="flex items-center gap-3"
                                    >
                                        <div
                                            className={`p-2 rounded-lg ${feature.available
                                                ? "bg-green-500/20 text-green-600"
                                                : "bg-red-500/20 text-red-500"
                                                }`}
                                        >
                                            {feature.available ? (
                                                <Check className="w-6 h-6" />
                                            ) : (
                                                <X className="w-6 h-6" />
                                            )}
                                        </div>
                                        <span
                                            className={`text-lg ${plan.isPlus ? "text-emerald-50" : "text-gray-700"
                                                }`}
                                        >
                                            {feature.text}
                                        </span>
                                    </motion.li>
                                ))}
                            </ul>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-colors ${plan.isPlus
                                    ? "bg-amber-400 text-green-900 hover:bg-amber-500"
                                    : "bg-green-600 text-white hover:bg-green-700"
                                    }`}
                            >
                                شروع مسیر یادگیری
                                <ChevronRight className="w-5 h-5 inline-block mr-2" />
                            </motion.button>
                        </motion.div>
                    ))}
                </div>

                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-4xl font-bold text-center text-green-700 mb-16 flex items-center justify-center gap-3"
                >
                    <HelpCircle className="w-10 h-10 text-amber-500" />
                    سوالات متداول
                </motion.h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={faq.question}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group cursor-pointer p-6 rounded-2xl bg-white/90 backdrop-blur-sm border-2 border-green-100 hover:border-green-300 transition-all shadow-lg hover:shadow-xl"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                                    <HelpCircle className="w-6 h-6 text-green-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-green-800">
                                    {faq.question}
                                </h3>
                            </div>
                            <p className="mt-4 pl-12 text-gray-600 leading-relaxed">
                                {faq.answer}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}