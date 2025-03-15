'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, Calendar, FileText, Edit, Camera, Lock, Eye, EyeOff, Palette, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function ProfileEditPage() {
    const [imagePreview, setImagePreview] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        firstName: 'پرهام',
        lastName: 'رضایی',
        phone: '09123456789',
        email: 'parham@example.com',
        nationalId: '0012345678',
        birthDate: '1375-05-15',
        password: ''
    });

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setLoading(true);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setLoading(false);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);
        setTimeout(() => setFormSubmitted(false), 2000);
    };

    const inputFields = [
        { key: 'firstName', icon: <User className="w-5 h-5" /> },
        { key: 'lastName', icon: <User className="w-5 h-5" /> },
        { key: 'phone', icon: <Phone className="w-5 h-5" /> },
        { key: 'email', icon: <Mail className="w-5 h-5" /> },
        { key: 'nationalId', icon: <FileText className="w-5 h-5" /> },
        { key: 'birthDate', icon: <Calendar className="w-5 h-5" /> },
        { key: 'password', icon: <Lock className="w-5 h-5" /> },
    ];

    return (
        <div className="min-h-screen ">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto px-4 py-12"
            >
                <div className="space-y-10">
                    {/* Header Section */}
                    <div className="text-center space-y-4">
                        <motion.h1
                            className="text-4xl font-bold text-emerald-800"
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                        >
                            <span className="bg-emerald-600 text-white px-4 py-2 rounded-xl">پروفایل کاربری</span>
                        </motion.h1>
                        <p className="text-emerald-600/90 text-lg">اطلاعات شخصی خود را مدیریت و به‌روزرسانی کنید</p>
                    </div>

                    {/* Profile Card */}
                    <motion.div
                        className="bg-white rounded-3xl shadow-2xl p-8"
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                    >
                        {/* Profile Image Section */}
                        <div className="flex flex-col items-center mb-10">
                            <motion.label
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="group relative w-40 h-40 cursor-pointer"
                            >
                                <div className="relative w-full h-full rounded-full overflow-hidden shadow-xl border-4 border-emerald-100 hover:border-emerald-200 transition-all">
                                    <AnimatePresence mode='wait'>
                                        {loading ? (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="absolute inset-0 bg-emerald-50 flex items-center justify-center"
                                            >
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ repeat: Infinity, duration: 1 }}
                                                    className="h-8 w-8 border-4 border-emerald-500 border-t-transparent rounded-full"
                                                />
                                            </motion.div>
                                        ) : (
                                            <Image
                                                src={imagePreview || "/profile-placeholder.jpg"}
                                                alt="Profile"
                                                width={160}
                                                height={160}
                                                className="rounded-full object-cover w-full h-full"
                                            />
                                        )}
                                    </AnimatePresence>

                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-emerald-100/50">
                                        <Camera className="w-8 h-8 text-emerald-700 animate-pulse" />
                                    </div>
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </motion.label>
                        </div>

                        {/* Form Section */}
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {inputFields.map(({ key, icon }, index) => (
                                    <motion.div
                                        key={key}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="space-y-2"
                                    >
                                        <label className="block text-sm font-medium text-emerald-700">
                                            {{
                                                firstName: 'نام',
                                                lastName: 'نام خانوادگی',
                                                phone: 'شماره تماس',
                                                email: 'ایمیل',
                                                nationalId: 'کد ملی',
                                                birthDate: 'تاریخ تولد',
                                                password: 'رمز عبور'
                                            }[key]}
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={key === 'password' ? (showPassword ? 'text' : 'password') : 'text'}
                                                className="w-full pr-12 pl-4 py-3 rounded-xl border-2 border-emerald-100 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
                                                value={formData[key]}
                                                onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                                                placeholder={key === 'password' ? '••••••••' : ''}
                                            />
                                            <div className="absolute right-3 top-3.5 text-emerald-400">
                                                {key === 'password' ? (
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="hover:text-emerald-600 transition-colors"
                                                    >
                                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                    </button>
                                                ) : icon}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Security Settings */}
                            <div className="bg-emerald-50 p-6 rounded-2xl space-y-6">
                                <h3 className="text-xl font-semibold text-emerald-800 flex items-center gap-2">
                                    <Lock className="w-5 h-5" />
                                    تنظیمات امنیتی
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-white rounded-xl">
                                        <div>
                                            <h4 className="font-medium text-emerald-800">احراز هویت دو مرحله‌ای</h4>
                                            <p className="text-sm text-emerald-600">امنیت حساب خود را افزایش دهید</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only" />
                                            <div className="w-11 h-6 bg-emerald-200 rounded-full transition-colors" />
                                            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform" />
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium flex items-center justify-center gap-2 shadow-lg transition-all relative overflow-hidden"
                            >
                                <AnimatePresence mode='wait'>
                                    {formSubmitted ? (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="flex items-center gap-2"
                                        >
                                            <CheckCircle className="w-5 h-5" />
                                            تغییرات ذخیره شد!
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="submit"
                                            initial={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="flex items-center gap-2"
                                        >
                                            <Edit className="w-5 h-5" />
                                            ذخیره تغییرات
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}