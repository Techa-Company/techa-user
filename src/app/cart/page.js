// app/cart/page.jsx
"use client";
import { useSelector, useDispatch } from 'react-redux';
import {
    RiShoppingCartLine,
    RiDeleteBinLine,
    RiCoupon3Line,
    RiWallet3Line,
    RiBankLine,
    RiCashLine
} from 'react-icons/ri';
import {
    removeFromCart,
    applyDiscount,
    selectPayment,
    clearCart
} from '../features/cart/cartSlice';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const paymentMethods = [
    { id: 'online', name: 'پرداخت آنلاین', icon: <RiWallet3Line className="w-6 h-6" /> },
    { id: 'bank', name: 'کارت به کارت', icon: <RiBankLine className="w-6 h-6" /> },
    { id: 'cash', name: 'پرداخت در محل', icon: <RiCashLine className="w-6 h-6" /> },
];

const CartPage = () => {
    const {
        items,
        totalAmount,
        discountAmount,
        discountCode,
        selectedPayment
    } = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const [discountInput, setDiscountInput] = useState('');
    const [showPayment, setShowPayment] = useState(false);

    const handleApplyDiscount = () => {
        dispatch(applyDiscount(discountInput.toUpperCase()));
        setDiscountInput('');
    };

    const grandTotal = totalAmount - discountAmount;

    return (
        <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-12">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl font-dana-bold text-emerald-800 flex items-center gap-3">
                            <RiShoppingCartLine className="w-8 h-8" />
                            سبد خرید شما
                        </h1>
                        <Link
                            href="/courses"
                            className="bg-emerald-100 text-emerald-700 px-5 py-2 rounded-lg hover:bg-emerald-200 transition-colors"
                        >
                            بازگشت به فروشگاه
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* لیست دوره ها */}
                        <div className="lg:col-span-2 space-y-6">
                            {items.length === 0 ? (
                                <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                                    <Image
                                        src="/images/empty-cart.png"
                                        width={300}
                                        height={200}
                                        alt="سبد خرید خالی"
                                        className="mx-auto"
                                    />
                                    <p className="text-gray-600 text-lg my-5">سبد خرید شما خالی است</p>
                                    <Link
                                        href="/courses"
                                        className="bg-emerald-600 text-white px-8 py-3 rounded-xl hover:bg-emerald-700 transition-colors"
                                    >
                                        مشاهده دوره‌ها
                                    </Link>
                                </div>
                            ) : (
                                items.map(item => (
                                    <div
                                        key={item.id}
                                        className="bg-white rounded-2xl shadow-lg p-6 border border-emerald-100 group transition-all hover:shadow-xl"
                                    >
                                        <div className="flex gap-4 items-center">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                width={150}
                                                height={150}
                                                className="rounded-xl object-cover border-2 border-emerald-100"
                                            />
                                            <div className="flex-1">
                                                <h3 className="font-dana-bold text-emerald-800 text-lg mb-2">
                                                    {item.title}
                                                </h3>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-emerald-600 font-dana-medium">
                                                        {item.price.toLocaleString()} تومان
                                                    </span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => dispatch(removeFromCart(item.id))}
                                                className="text-red-500 hover:text-red-600 flex items-center gap-2"
                                            >
                                                <RiDeleteBinLine className="w-5 h-5" />
                                                حذف
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* خلاصه سبد خرید */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-24 border border-emerald-100">
                            <h2 className="text-xl font-dana-bold text-emerald-800 mb-6">جزئیات پرداخت</h2>

                            <div className="space-y-6">
                                {/* بخش تخفیف */}
                                <div className="bg-emerald-50 rounded-xl p-4">
                                    <label className="block text-sm font-dana-medium text-emerald-800 mb-2">
                                        کد تخفیف دارید؟
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="کد تخفیف را وارد کنید"
                                            className="flex-1 border border-emerald-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                            value={discountInput}
                                            onChange={(e) => setDiscountInput(e.target.value)}
                                        />
                                        <button
                                            onClick={handleApplyDiscount}
                                            className="bg-emerald-600 text-white px-5 rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
                                        >
                                            <RiCoupon3Line className="w-5 h-5" />
                                            اعمال
                                        </button>
                                    </div>
                                </div>

                                {/* خلاصه قیمت */}
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">جمع کل:</span>
                                        <span className="font-dana-medium text-emerald-800">
                                            {totalAmount.toLocaleString()} تومان
                                        </span>
                                    </div>

                                    {discountAmount > 0 && (
                                        <div className="flex justify-between items-center text-green-600">
                                            <span>تخفیف ({discountCode}):</span>
                                            <span>-{discountAmount.toLocaleString()} تومان</span>
                                        </div>
                                    )}

                                    <div className="border-t border-emerald-100 pt-4">
                                        <div className="flex justify-between items-center font-dana-bold text-lg">
                                            <span>مبلغ نهایی:</span>
                                            <span className="text-emerald-600">
                                                {grandTotal.toLocaleString()} تومان
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* انتخاب درگاه پرداخت */}
                                <div className="pt-4 border-t border-emerald-100">
                                    <h3 className="text-lg font-dana-medium text-emerald-800 mb-4">
                                        روش پرداخت
                                    </h3>

                                    <div className="grid grid-cols-1 gap-3">
                                        {paymentMethods.map(method => (
                                            <button
                                                key={method.id}
                                                onClick={() => {
                                                    dispatch(selectPayment(method.id));
                                                    setShowPayment(true);
                                                }}
                                                className={`p-4 rounded-xl border-2 transition-all ${selectedPayment === method.id
                                                    ? 'border-emerald-500 bg-emerald-50'
                                                    : 'border-emerald-100 hover:border-emerald-300'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className="text-emerald-600">{method.icon}</span>
                                                    <span className="font-dana-medium">{method.name}</span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>

                                    {/* دکمه پرداخت نهایی */}
                                    {selectedPayment && (
                                        <div className="mt-6 animate-fade-in">
                                            <button
                                                onClick={() => {
                                                    // اتصال به درگاه پرداخت
                                                    dispatch(clearCart());
                                                }}
                                                className="w-full bg-emerald-600 text-white py-3.5 rounded-xl hover:bg-emerald-700 transition-colors font-dana-medium flex items-center justify-center gap-2"
                                            >
                                                پرداخت ایمن
                                                <RiWallet3Line className="w-5 h-5" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;