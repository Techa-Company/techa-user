'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, Calendar, FileText, Edit, Camera, Lock, Eye, EyeOff, Palette, CheckCircle, Bell, Newsletter, Briefcase } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function ProfileEditPage() {
    const [imagePreview, setImagePreview] = useState(null);
    const [showPasswords, setShowPasswords] = useState({
        old: false,
        new: false,
        confirm: false
    });
    const [loading, setLoading] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [activeSection, setActiveSection] = useState('personal');

    const [formData, setFormData] = useState({
        firstName: 'رامین',
        lastName: 'جوشنگ',
        phone: '09123456789',
        email: 'ramin@gmail.com',
        nationalId: '4312554125',
        birthDate: '1382-07-18',
    });

    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [settings, setSettings] = useState({
        newsletter: true,
        publicResume: false,
        emailNotifications: true,
        twoFactorAuth: false
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

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        // Add password change logic here
    };

    const togglePasswordVisibility = (field) => {
        setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const inputFields = [
        { key: 'firstName', icon: <User className="w-5 h-5" /> },
        { key: 'lastName', icon: <User className="w-5 h-5" /> },
        { key: 'phone', icon: <Phone className="w-5 h-5" /> },
        { key: 'email', icon: <Mail className="w-5 h-5" /> },
        { key: 'nationalId', icon: <FileText className="w-5 h-5" /> },
        { key: 'birthDate', icon: <Calendar className="w-5 h-5" /> },
    ];

    return (
        <div className="min-h-screen bg-emerald-50/50">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto px-4 py-12"
            >
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Navigation Sidebar */}
                    <div className="lg:w-64 space-y-2">
                        <button
                            onClick={() => setActiveSection('personal')}
                            className={`w-full text-right p-4 rounded-xl flex items-center gap-2 ${activeSection === 'personal' ? 'bg-emerald-600 text-white' : 'bg-white hover:bg-emerald-50'}`}
                        >
                            <User className="w-5 h-5" />
                            اطلاعات شخصی
                        </button>
                        <button
                            onClick={() => setActiveSection('password')}
                            className={`w-full text-right p-4 rounded-xl flex items-center gap-2 ${activeSection === 'password' ? 'bg-emerald-600 text-white' : 'bg-white hover:bg-emerald-50'}`}
                        >
                            <Lock className="w-5 h-5" />
                            تغییر رمز عبور
                        </button>
                        <button
                            onClick={() => setActiveSection('settings')}
                            className={`w-full text-right p-4 rounded-xl flex items-center gap-2 ${activeSection === 'settings' ? 'bg-emerald-600 text-white' : 'bg-white hover:bg-emerald-50'}`}
                        >
                            <Palette className="w-5 h-5" />
                            تنظیمات
                        </button>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        <AnimatePresence mode='wait'>
                            {/* Personal Information Section */}
                            {activeSection === 'personal' && (
                                <motion.div
                                    key="personal"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="bg-white rounded-3xl shadow-2xl p-8"
                                >
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
                                                            birthDate: 'تاریخ تولد'
                                                        }[key]}
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            className="w-full pr-12 pl-4 py-3 rounded-xl border-2 border-emerald-100 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
                                                            value={formData[key]}
                                                            onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                                                        />
                                                        <div className="absolute right-3 top-3.5 text-emerald-400">
                                                            {icon}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            type="submit"
                                            className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium flex items-center justify-center gap-2 shadow-lg transition-all"
                                        >
                                            <Edit className="w-5 h-5" />
                                            ذخیره تغییرات
                                        </motion.button>
                                    </form>
                                </motion.div>
                            )}

                            {/* Password Change Section */}
                            {activeSection === 'password' && (
                                <motion.div
                                    key="password"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="bg-white rounded-3xl shadow-2xl p-8"
                                >
                                    <form onSubmit={handlePasswordSubmit} className="space-y-8">
                                        <div className="space-y-6">
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="space-y-2"
                                            >
                                                <label className="block text-sm font-medium text-emerald-700">
                                                    رمز عبور فعلی
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type={showPasswords.old ? 'text' : 'password'}
                                                        className="w-full pr-12 pl-4 py-3 rounded-xl border-2 border-emerald-100 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
                                                        value={passwordData.oldPassword}
                                                        onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => togglePasswordVisibility('old')}
                                                        className="absolute right-3 top-3.5 text-emerald-400 hover:text-emerald-600"
                                                    >
                                                        {showPasswords.old ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                    </button>
                                                </div>
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="space-y-2"
                                            >
                                                <label className="block text-sm font-medium text-emerald-700">
                                                    رمز عبور جدید
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type={showPasswords.new ? 'text' : 'password'}
                                                        className="w-full pr-12 pl-4 py-3 rounded-xl border-2 border-emerald-100 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
                                                        value={passwordData.newPassword}
                                                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => togglePasswordVisibility('new')}
                                                        className="absolute right-3 top-3.5 text-emerald-400 hover:text-emerald-600"
                                                    >
                                                        {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                    </button>
                                                </div>
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="space-y-2"
                                            >
                                                <label className="block text-sm font-medium text-emerald-700">
                                                    تکرار رمز عبور جدید
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type={showPasswords.confirm ? 'text' : 'password'}
                                                        className="w-full pr-12 pl-4 py-3 rounded-xl border-2 border-emerald-100 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
                                                        value={passwordData.confirmPassword}
                                                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => togglePasswordVisibility('confirm')}
                                                        className="absolute right-3 top-3.5 text-emerald-400 hover:text-emerald-600"
                                                    >
                                                        {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                    </button>
                                                </div>
                                            </motion.div>
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            type="submit"
                                            className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium flex items-center justify-center gap-2 shadow-lg transition-all"
                                        >
                                            <Lock className="w-5 h-5" />
                                            تغییر رمز عبور
                                        </motion.button>
                                    </form>
                                </motion.div>
                            )}

                            {/* Settings Section */}
                            {activeSection === 'settings' && (
                                <motion.div
                                    key="settings"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="bg-white rounded-3xl shadow-2xl p-8 space-y-8"
                                >
                                    {/* Security Settings */}
                                    <div className="space-y-6">
                                        <h3 className="text-xl font-semibold text-emerald-800 flex items-center gap-2">
                                            <Lock className="w-5 h-5" />
                                            تنظیمات امنیتی
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl">
                                                <div>
                                                    <h4 className="font-medium text-emerald-800">احراز هویت دو مرحله‌ای</h4>
                                                    <p className="text-sm text-emerald-600">امنیت حساب خود را افزایش دهید</p>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        className="sr-only"
                                                        checked={settings.twoFactorAuth}
                                                        onChange={(e) => setSettings({ ...settings, twoFactorAuth: e.target.checked })}
                                                    />
                                                    <div className={`w-11 h-6 rounded-full transition-colors ${settings.twoFactorAuth ? 'bg-emerald-600' : 'bg-emerald-200'}`} />
                                                    <div className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${settings.twoFactorAuth ? 'translate-x-5' : ''}`} />
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Notification Settings */}
                                    <div className="space-y-6">
                                        <h3 className="text-xl font-semibold text-emerald-800 flex items-center gap-2">
                                            <Bell className="w-5 h-5" />
                                            تنظیمات اطلاع رسانی
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl">
                                                <div>
                                                    <h4 className="font-medium text-emerald-800">دریافت خبرنامه ایمیلی</h4>
                                                    <p className="text-sm text-emerald-600">آخرین اخبار و به روزرسانی‌ها</p>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        className="sr-only"
                                                        checked={settings.newsletter}
                                                        onChange={(e) => setSettings({ ...settings, newsletter: e.target.checked })}
                                                    />
                                                    <div className={`w-11 h-6 rounded-full transition-colors ${settings.newsletter ? 'bg-emerald-600' : 'bg-emerald-200'}`} />
                                                    <div className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${settings.newsletter ? 'translate-x-5' : ''}`} />
                                                </label>
                                            </div>

                                            <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl">
                                                <div>
                                                    <h4 className="font-medium text-emerald-800">نمایش عمومی رزومه</h4>
                                                    <p className="text-sm text-emerald-600">قابل مشاهده برای همه کاربران</p>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        className="sr-only"
                                                        checked={settings.publicResume}
                                                        onChange={(e) => setSettings({ ...settings, publicResume: e.target.checked })}
                                                    />
                                                    <div className={`w-11 h-6 rounded-full transition-colors ${settings.publicResume ? 'bg-emerald-600' : 'bg-emerald-200'}`} />
                                                    <div className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${settings.publicResume ? 'translate-x-5' : ''}`} />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}