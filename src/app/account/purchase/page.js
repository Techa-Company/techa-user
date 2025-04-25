"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, Tag, Clock, Eye, Receipt, ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const purchases = [
    {
        id: 1,
        title: 'دوره React پیشرفته',
        date: '۱۴۰۳/۰۳/۱۵',
        originalPrice: 1_500_000,
        discount: 30,
        finalPrice: 1_050_000,
        status: 'completed',
        link: '/courses/react'
    },
    {
        id: 2,
        title: 'دوره Next.js حرفه‌ای',
        date: '۱۴۰۳/۰۲/۲۸',
        originalPrice: 1_200_000,
        discount: 25,
        finalPrice: 900_000,
        status: 'pending',
        link: '/courses/next'
    },
    // آیتم‌های بیشتر...
];

export default function PurchaseHistory() {
    const [hoveredRow, setHoveredRow] = useState(null);

    const formatPrice = (price) =>
        new Intl.NumberFormat('fa-IR').format(price) + ' تومان';

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'bg-emerald-100 text-emerald-800';
            case 'pending': return 'bg-amber-100 text-amber-800';
            default: return 'bg-red-100 text-red-800';
        }
    };

    const totalSpent = purchases.reduce((sum, p) => sum + p.finalPrice, 0);

    return (
        <div className="min-h-screen px-5 sm:px-10">
            {/* هدر صفحه */}
            <div className="mb-12">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-6 mb-8"
                >
                    <div className="bg-emerald-100 p-4 rounded-2xl">
                        <Wallet className="w-12 h-12 text-emerald-600" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold text-emerald-800 mb-2">تاریخچه خریدها</h1>
                        <p className="text-emerald-600">لیست کامل تراکنش‌های انجام شده</p>
                    </div>
                </motion.div>

                {/* جدول خریدها */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-emerald-50">
                                <tr>
                                    <th className="px-6 py-4 text-right text-emerald-800 font-bold">عنوان دوره</th>
                                    <th className="px-6 py-4 text-center text-emerald-800 font-bold">تاریخ خرید</th>
                                    <th className="px-6 py-4 text-center text-emerald-800 font-bold">مبلغ اصلی</th>
                                    <th className="px-6 py-4 text-center text-emerald-800 font-bold">تخفیف</th>
                                    <th className="px-6 py-4 text-center text-emerald-800 font-bold">مبلغ نهایی</th>
                                    <th className="px-6 py-4 text-center text-emerald-800 font-bold">وضعیت</th>
                                    <th className="px-6 py-4 text-center text-emerald-800 font-bold">اقدامات</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-emerald-100">
                                <AnimatePresence>
                                    {purchases.map((purchase) => (
                                        <motion.tr
                                            key={purchase.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            onHoverStart={() => setHoveredRow(purchase.id)}
                                            onHoverEnd={() => setHoveredRow(null)}
                                            className={`transition-all ${hoveredRow === purchase.id ? 'bg-emerald-50' : ''}`}
                                        >
                                            <td className="px-6 py-4 text-right font-medium text-emerald-900 whitespace-nowrap">
                                                <Link href={`/courses/${purchase.id}`}>
                                                    {purchase.title}
                                                </Link>
                                            </td>

                                            <td className="px-6 py-4 text-center text-emerald-700">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Clock className="w-4 h-4" />
                                                    {purchase.date}
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 text-center line-through text-gray-400 whitespace-nowrap">
                                                {formatPrice(purchase.originalPrice)}
                                            </td>

                                            <td className="px-6 py-4 text-center text-rose-600 font-bold">
                                                <div className="flex items-center justify-center gap-1">
                                                    <Tag className="w-4 h-4" />
                                                    {purchase.discount}%
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 text-center font-bold text-emerald-700 whitespace-nowrap">
                                                {formatPrice(purchase.finalPrice)}
                                            </td>

                                            <td className="px-6 py-4 text-center">
                                                <span className={`${getStatusColor(purchase.status)} px-3 py-1 rounded-full text-sm whitespace-nowrap`}>
                                                    {purchase.status === 'completed' ? 'تکمیل شده' : 'در انتظار'}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 text-center">
                                                <div className="flex items-center justify-center gap-3">
                                                    <motion.a
                                                        whileHover={{ scale: 1.05 }}
                                                        href="/account/license"
                                                        className="text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                                                    >
                                                        <Eye className="w-5 h-5" />
                                                        مشاهده
                                                    </motion.a>
                                                    <motion.button
                                                        whileHover={{ scale: 1.05 }}
                                                        className="text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                                                    >
                                                        <Receipt className="w-5 h-5" />
                                                        رسید
                                                    </motion.button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>

                    {/* جمع کل */}
                    <div className="border-t border-emerald-100 p-6 bg-emerald-50">
                        <div className="flex justify-between items-center max-w-4xl mx-auto">
                            <div className="flex items-center gap-4">
                                <div className="bg-emerald-100 p-3 rounded-xl">
                                    <Wallet className="w-8 h-8 text-emerald-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-emerald-800">مجموع خریدها</h3>
                                    <p className="text-sm text-emerald-600">تمام تراکنش‌های انجام شده</p>
                                </div>
                            </div>
                            <div className="text-2xl font-bold text-emerald-700">
                                {formatPrice(totalSpent)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* راهنما */}
                <div className="mt-8 p-6 bg-emerald-100 rounded-2xl flex items-center gap-6">
                    <div className="bg-emerald-600 text-white p-3 rounded-xl">
                        <ArrowLeft className="w-8 h-8" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-emerald-800 mb-2">راهنمای وضعیت تراکنش‌ها</h3>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                                <span className="text-emerald-700">پرداخت موفق</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                                <span className="text-emerald-700">در حال پرداخت</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                                <span className="text-emerald-700">ناموفق</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}