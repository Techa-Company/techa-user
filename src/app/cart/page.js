// app/cart/page.jsx
"use client";
import { useSelector, useDispatch } from 'react-redux';
import {
    RiShoppingCartLine,
    RiDeleteBinLine,
    RiCoupon3Line,
    RiWallet3Line,
    RiBankLine,
    RiCashLine,
    RiArrowLeftLine,
    RiArrowRightLine
} from 'react-icons/ri';
import {
    removeFromCart,
    applyDiscount,
    selectPayment,
    clearCart
} from '../../features/cart/cartSlice';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

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
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    const handleApplyDiscount = () => {
        dispatch(applyDiscount(discountInput.toUpperCase()));
        setDiscountInput('');
    };

    const grandTotal = totalAmount - discountAmount;

    console.log(totalAmount, discountAmount, grandTotal)

    const cartItemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, x: 50 }
    };

    return (
        <div className="min-h-screen pt-32">
            <div className="container mx-auto px-5 lg:px-0 xl:px-5 2xl:px-20">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4"
                >
                    <h1 className="text-2xl md:text-3xl font-bold text-emerald-800 flex items-center gap-3">
                        <RiShoppingCartLine className="w-7 h-7 md:w-8 md:h-8" />
                        سبد خرید شما
                    </h1>
                    <Link
                        href="/courses"
                        className="bg-emerald-100 hover:bg-emerald-200 text-emerald-700 px-4 py-2 md:px-5 md:py-2.5 rounded-lg transition-all duration-300 flex items-center gap-2 group"
                    >
                        <RiArrowRightLine className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                        بازگشت به فروشگاه
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                    {/* Cart Items Section */}
                    <div className="lg:col-span-2 space-y-4 md:space-y-6">
                        <AnimatePresence>
                            {items.length === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="bg-white rounded-2xl shadow-lg p-6 md:p-8 text-center border-2 border-dashed border-emerald-100 hover:border-emerald-200 transition-colors"
                                >
                                    <div className="max-w-xs mx-auto">
                                        {/* <Image
                                            src="/images/empty-cart.png"
                                            width={400}
                                            height={300}
                                            alt="سبد خرید خالی"
                                            className="mx-auto w-3/4 md:w-full"
                                        /> */}
                                        {/* {doc} */}
                                    </div>
                                    <p className="text-gray-600 text-lg my-5">سبد خرید شما خالی است!</p>
                                    <Link
                                        href="/docs"
                                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl transition-colors inline-flex items-center gap-2"
                                    >
                                        <RiShoppingCartLine className="w-5 h-5" />
                                        مشاهده دوره‌ها
                                    </Link>
                                </motion.div>
                            ) : (
                                items.map((item, index) => (
                                    <motion.div
                                        key={item.Id}
                                        variants={cartItemVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border border-emerald-100 group hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                                    >
                                        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                                            <div className="relative w-full md:w-32 h-32 shrink-0">
                                                <Image
                                                    src={item.Image}
                                                    alt={item.Title}
                                                    fill
                                                    className="rounded-xl object-cover border-2 border-emerald-100"
                                                    sizes="(max-width: 768px) 100vw, 150px"
                                                />
                                            </div>
                                            <div className="flex-1 w-full">
                                                <h3 className="font-dana-bold text-emerald-800 text-lg md:text-xl mb-2">
                                                    دوره {item.Title}
                                                </h3>
                                                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                                                    <span className="text-emerald-600 font-dana-medium text-lg">
                                                        {item.Price?.toLocaleString()} تومان
                                                    </span>
                                                    <button
                                                        onClick={() => dispatch(removeFromCart(item.Id))}
                                                        className="text-red-500 hover:text-red-600 flex items-center gap-2 transition-colors md:pr-4"
                                                    >
                                                        <RiDeleteBinLine className="w-5 h-5" />
                                                        <span className="text-sm md:text-base">حذف از سبد</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Payment Summary Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white rounded-2xl shadow-xl p-5 md:p-6 h-fit sticky top-24 border border-emerald-100 backdrop-blur-sm bg-opacity-90"
                    >
                        <h2 className="text-xl font-dana-bold text-emerald-800 mb-5 md:mb-6">جزئیات پرداخت</h2>

                        <div className="space-y-5 md:space-y-6">
                            {/* Discount Section */}
                            <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-100">
                                <label className="block text-sm font-dana-medium text-emerald-800 mb-2">
                                    کد تخفیف
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="کد تخفیف را وارد کنید..."
                                        className="flex-1 border border-emerald-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm md:text-base"
                                        value={discountInput}
                                        onChange={(e) => setDiscountInput(e.target.value)}
                                    />
                                    <button
                                        onClick={handleApplyDiscount}
                                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 md:px-5 rounded-lg transition-colors flex items-center gap-2 text-sm md:text-base"
                                    >
                                        <RiCoupon3Line className="w-4 h-4 md:w-5 md:h-5" />
                                        اعمال
                                    </button>
                                </div>
                            </div>

                            {/* Price Summary */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">جمع کل:</span>
                                    <span className="font-dana-medium text-emerald-800">
                                        {totalAmount?.toLocaleString()} تومان
                                    </span>
                                </div>

                                {discountAmount > 0 && (
                                    <div className="flex justify-between items-center text-green-600">
                                        <span>تخفیف ({discountCode}):</span>
                                        <span>-{discountAmount.toLocaleString()} تومان</span>
                                    </div>
                                )}

                                <div className="border-t border-emerald-100 pt-4">
                                    <div className="flex justify-between items-center font-dana-bold text-lg md:text-xl">
                                        <span>مبلغ نهایی:</span>
                                        <span className="text-emerald-600">
                                            {grandTotal.toLocaleString()} تومان
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Methods */}
                            <div className="pt-4 border-t border-emerald-100">
                                <h3 className="text-lg font-dana-medium text-emerald-800 mb-4">
                                    روش پرداخت
                                </h3>

                                <div className="grid grid-cols-1 gap-2 md:gap-3">
                                    {paymentMethods.map(method => (
                                        <motion.button
                                            key={method.id}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => {
                                                dispatch(selectPayment(method.id));
                                                setShowPayment(true);
                                            }}
                                            className={`p-3 md:p-4 rounded-xl border-2 transition-all ${selectedPayment === method.id
                                                ? 'border-emerald-500 bg-emerald-50'
                                                : 'border-emerald-100 hover:border-emerald-300'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className={`${selectedPayment === method.id ? 'text-emerald-600' : 'text-gray-600'}`}>
                                                    {method.icon}
                                                </span>
                                                <span className="font-dana-medium text-sm md:text-base">
                                                    {method.name}
                                                </span>
                                            </div>
                                        </motion.button>
                                    ))}
                                </div>

                                {/* Checkout Button */}
                                {selectedPayment && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-6"
                                    >
                                        <button
                                            onClick={() => dispatch(clearCart())}
                                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 md:py-3.5 rounded-xl transition-all duration-300 font-dana-medium flex items-center justify-center gap-2 relative overflow-hidden"
                                        >
                                            پرداخت ایمن
                                            <RiWallet3Line className="w-5 h-5" />
                                        </button>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;