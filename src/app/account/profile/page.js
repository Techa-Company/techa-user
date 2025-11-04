'use client';
import { motion, AnimatePresence, frameData } from 'framer-motion';
import { User, Mail, Phone, Calendar, FileText, Edit, Camera, Palette, CheckCircle, Bell, Shield, Globe, Send, Instagram, Twitter, Linkedin, Facebook } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaWhatsapp } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById, updateUser } from '../../../features/account/user/UserActions';
import { toast } from 'react-toastify';

export default function Profile() {
    const [imagePreview, setImagePreview] = useState(null);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [activeSection, setActiveSection] = useState('personal');
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        FirstName: '',
        LastName: '',
        Mobile: '',
        Email: '',
        NationalCode: '',
        // birthDate: '',
    });

    const [emailVerification, setEmailVerification] = useState({
        verified: false,
        pending: false,
        code: ''
    });

    const [socialMedia, setSocialMedia] = useState({
        instagram: { enabled: false, value: '' },
        twitter: { enabled: false, value: '' },
        linkedin: { enabled: false, value: '' },
        telegram: { enabled: false, value: '' },
        whatsapp: { enabled: false, value: '' },
        // facebook: { enabled: false, value: '' },
        // aparat: { enabled: false, value: '' },
        // eitaa: { enabled: false, value: '' },
        // soroush: { enabled: false, value: '' },
        // bale: { enabled: false, value: '' },
        website: { enabled: false, value: '' }
    });

    const [settings, setSettings] = useState({
        newsletter: true,
        publicResume: false,
        emailNotifications: true,
        twoFactorAuth: false
    });

    const dispatch = useDispatch();
    const { user, loading: userLoading, error } = useSelector((state) => state.user);
    const userId = useSelector((state) => state.auth.user?.Id);

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

    // تابع ذخیره اطلاعات کاربر
    const handleSaveUser = async (e) => {
        e.preventDefault();


        if (!formData.FirstName || !formData.LastName || !formData.Email || !formData.NationalCode) {
            toast.warn("لطفا تمامی اطلاعات را وارد نمایید.");
            return;
        }



        const data = {
            "@Id": userId,
            "@FirstName": formData.FirstName,
            "@LastName": formData.LastName,
            "@Email": formData.Email,
            "@Mobile": formData.Mobile,
            "@NationalCode": formData.NationalCode,
            "@IsActive": true,
        };

        // console.log(data)

        try {
            await dispatch(updateUser(data)).unwrap();
            toast.success('اطلاعات شما با موفقیت ویرایش شد');
            dispatch(fetchUserById({ "@Id": userId }))
        } catch (error) {
            toast.error(`خطا در ویرایش اطلاعات: ${error.message}`);
            console.error("Error creating doc:", error);

        }
    };

    // تابع ذخیره شبکه‌های اجتماعی
    const handleSaveSocialMedia = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const socialNetworks = {
                Instagram: socialMedia.instagram.value,
                Twitter: socialMedia.twitter.value,
                Linkedin: socialMedia.linkedin.value,
                Telegram: socialMedia.telegram.value,
                Whatsapp: socialMedia.whatsapp.value,
                // Facebook: socialMedia.facebook.value,
                // Aparat: socialMedia.aparat.value,
                // Eitaa: socialMedia.eitaa.value,
                // Soroush: socialMedia.soroush.value,
                // Bale: socialMedia.bale.value,
                Website: socialMedia.website.value
            };

            await dispatch(updateUser({
                Id: userId,
                SocialNetworks: JSON.stringify(socialNetworks)
            })).unwrap();

            setFormSubmitted(true);
            setTimeout(() => setFormSubmitted(false), 2000);
        } catch (error) {
            console.error('Error saving social media:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyEmail = () => {
        setEmailVerification(prev => ({ ...prev, pending: true }));
        // Simulate sending verification code
        setTimeout(() => {
            setEmailVerification(prev => ({ ...prev, pending: false }));
        }, 2000);
    };

    const handleConfirmVerification = () => {
        // Simulate verification process
        setTimeout(() => {
            setEmailVerification(prev => ({ ...prev, verified: true, code: '' }));
        }, 1000);
    };

    const handleSocialMediaChange = (platform, field, value) => {
        setSocialMedia(prev => ({
            ...prev,
            [platform]: {
                ...prev[platform],
                [field]: value
            }
        }));
    };

    const inputFields = [
        { key: 'FirstName', icon: <User className="w-5 h-5" /> },
        { key: 'LastName', icon: <User className="w-5 h-5" /> },
        { key: 'Mobile', icon: <Phone className="w-5 h-5" /> },
        { key: 'Email', icon: <Mail className="w-5 h-5" /> },
        { key: 'NationalCode', icon: <FileText className="w-5 h-5" /> },
        // { key: 'birthDate', icon: <Calendar className="w-5 h-5" /> },
    ];

    const socialPlatforms = [
        { key: 'instagram', name: 'اینستاگرام', icon: <Instagram className="w-5 h-5" />, placeholder: 'آیدی اینستاگرام' },
        { key: 'twitter', name: 'توییتر', icon: <Twitter className="w-5 h-5" />, placeholder: 'آیدی توییتر' },
        { key: 'linkedin', name: 'لینکدین', icon: <Linkedin className="w-5 h-5" />, placeholder: 'لینک پروفایل' },
        { key: 'telegram', name: 'تلگرام', icon: <User className="w-5 h-5" />, placeholder: 'آیدی تلگرام' },
        { key: 'whatsapp', name: 'واتس اپ', icon: <FaWhatsapp className="w-5 h-5" />, placeholder: 'شماره واتس اپ' },
        // { key: 'facebook', name: 'فیسبوک', icon: <Facebook className="w-5 h-5" />, placeholder: 'آیدی فیسبوک' },
        // { key: 'aparat', name: 'آپارات', icon: <User className="w-5 h-5" />, placeholder: 'آیدی آپارات' },
        // { key: 'eitaa', name: 'ایتا', icon: <User className="w-5 h-5" />, placeholder: 'آیدی ایتا' },
        // { key: 'soroush', name: 'سروش', icon: <User className="w-5 h-5" />, placeholder: 'آیدی سروش' },
        // { key: 'bale', name: 'بله', icon: <User className="w-5 h-5" />, placeholder: 'آیدی بله' },
        { key: 'website', name: 'وبسایت', icon: <Globe className="w-5 h-5" />, placeholder: 'آدرس وبسایت' }
    ];

    useEffect(() => {
        if (userId) {
            dispatch(fetchUserById({ "@Id": userId }));
        }
    }, [dispatch, userId]);

    useEffect(() => {
        if (user) {
            setFormData({
                FirstName: user.FirstName || '',
                LastName: user.LastName || '',
                Mobile: user.Mobile || '',
                Email: user.Email || '',
                NationalCode: user.NationalCode || '',
                birthDate: user.birthDate || '',
            });

            // بارگذاری شبکه‌های اجتماعی از کاربر
            if (user.SocialNetworks) {
                try {
                    const socialNetworksArray = JSON.parse(user.SocialNetworks);

                    // آرایه رو به آبجکت تبدیل می‌کنیم
                    const socialNetworks = socialNetworksArray.reduce((acc, item) => {
                        acc[item.Platform] = item.IsEnabled ? item.UrlOrId : '';
                        return acc;
                    }, {});

                    // console.log(socialNetworks.Instagram);

                    setSocialMedia(prev => ({
                        ...prev,
                        instagram: { enabled: !!socialNetworks.Instagram, value: socialNetworks.Instagram || '' },
                        twitter: { enabled: !!socialNetworks.Twitter, value: socialNetworks.Twitter || '' },
                        linkedin: { enabled: !!socialNetworks.Linkedin, value: socialNetworks.Linkedin || '' },
                        telegram: { enabled: !!socialNetworks.Telegram, value: socialNetworks.Telegram || '' },
                        whatsapp: { enabled: !!socialNetworks.WhatsApp, value: socialNetworks.WhatsApp || '' },
                        website: { enabled: !!socialNetworks.Website, value: socialNetworks.Website || '' }
                    }));
                } catch (error) {
                    console.error('Error parsing social networks:', error);
                }
            }

        }
    }, [user]);

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
                            disabled={true}

                            onClick={() => setActiveSection('emailVerification')}
                            className={`w-full text-right opacity-70 cursor-not-allowed p-4 rounded-xl flex items-center gap-2 ${activeSection === 'emailVerification' ? 'bg-emerald-600 text-white' : 'bg-white hover:bg-emerald-50'}`}
                        >
                            <Shield className="w-5 h-5" />
                            تایید ایمیل <span className='text-red-500 text-xs'>به زودی</span>
                        </button>
                        <button
                            disabled={true}
                            onClick={() => setActiveSection('social')}
                            className={`w-full text-right opacity-70 cursor-not-allowed p-4 rounded-xl flex items-center gap-2 ${activeSection === 'social' ? 'bg-emerald-600 text-white' : 'bg-white hover:bg-emerald-50'}`}
                        >
                            <Globe className="w-5 h-5" />
                            شبکه‌های اجتماعی <span className='text-red-500 text-xs'>به زودی</span>
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
                                                            src={imagePreview || "/images/user.png"}
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

                                    <form onSubmit={handleSaveUser} className="space-y-8">
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
                                                            FirstName: 'نام',
                                                            LastName: 'نام خانوادگی',
                                                            Mobile: 'شماره تماس',
                                                            Email: 'ایمیل',
                                                            NationalCode: 'کد ملی',
                                                            // birthDate: 'تاریخ تولد'
                                                        }[key]}
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            disabled={key == "Mobile"}
                                                            dir={["Mobile", "Email", "NationalCode"].includes(key) ? "ltr" : "rtl"}
                                                            type="text"
                                                            className="w-full pr-12 pl-4 py-3 rounded-xl border-2 border-emerald-100 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
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
                                            disabled={loading}
                                            className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white rounded-xl font-medium flex items-center justify-center gap-2 shadow-lg transition-all"
                                        >
                                            {loading ? (
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ repeat: Infinity, duration: 1 }}
                                                    className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                                                />
                                            ) : (
                                                <>
                                                    <Edit className="w-5 h-5" />
                                                    ذخیره تغییرات
                                                </>
                                            )}
                                        </motion.button>

                                        {formSubmitted && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="bg-emerald-100 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl text-center"
                                            >
                                                اطلاعات با موفقیت ذخیره شد!
                                            </motion.div>
                                        )}
                                    </form>
                                </motion.div>
                            )}

                            {/* Email Verification Section */}
                            {activeSection === 'emailVerification' && (
                                <motion.div
                                    key="emailVerification"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="bg-white rounded-3xl shadow-2xl p-8"
                                >
                                    <div className="space-y-8">
                                        {/* Current Email Status */}
                                        <div className="bg-emerald-50 rounded-2xl p-6">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <Mail className="w-8 h-8 text-emerald-600" />
                                                    <div>
                                                        <h3 className="font-semibold text-emerald-800">ایمیل فعلی</h3>
                                                        <p className="text-emerald-600">{formData.Email}</p>
                                                    </div>
                                                </div>
                                                <div className={`px-4 py-2 rounded-full ${emailVerification.verified ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>
                                                    {emailVerification.verified ? (
                                                        <span className="flex items-center gap-2">
                                                            <CheckCircle className="w-4 h-4" />
                                                            تایید شده
                                                        </span>
                                                    ) : (
                                                        <span>تایید نشده</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Verification Process */}
                                        {!emailVerification.verified && (
                                            <div className="space-y-6">
                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={handleVerifyEmail}
                                                    disabled={emailVerification.pending}
                                                    className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl font-medium flex items-center justify-center gap-2 shadow-lg transition-all"
                                                >
                                                    {emailVerification.pending ? (
                                                        <>
                                                            <motion.div
                                                                animate={{ rotate: 360 }}
                                                                transition={{ repeat: Infinity, duration: 1 }}
                                                                className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                                                            />
                                                            در حال ارسال کد...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Send className="w-5 h-5" />
                                                            ارسال کد تایید
                                                        </>
                                                    )}
                                                </motion.button>

                                                {emailVerification.pending && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        className="space-y-4"
                                                    >
                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-medium text-emerald-700">
                                                                کد تایید ارسال شده به ایمیل
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="w-full px-4 py-3 rounded-xl border-2 border-emerald-100 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all text-center text-lg font-mono"
                                                                placeholder="XXXXX"
                                                                value={emailVerification.code}
                                                                onChange={(e) => setEmailVerification(prev => ({ ...prev, code: e.target.value }))}
                                                                maxLength={5}
                                                            />
                                                        </div>

                                                        <motion.button
                                                            whileHover={{ scale: 1.02 }}
                                                            whileTap={{ scale: 0.98 }}
                                                            onClick={handleConfirmVerification}
                                                            className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium flex items-center justify-center gap-2 shadow-lg transition-all"
                                                        >
                                                            <CheckCircle className="w-5 h-5" />
                                                            تایید ایمیل
                                                        </motion.button>
                                                    </motion.div>
                                                )}
                                            </div>
                                        )}

                                        {/* Verified Success Message */}
                                        {emailVerification.verified && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="bg-emerald-100 border border-emerald-200 rounded-2xl p-6 text-center"
                                            >
                                                <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
                                                <h3 className="text-xl font-semibold text-emerald-800 mb-2">ایمیل با موفقیت تایید شد!</h3>
                                                <p className="text-emerald-600">حساب کاربری شما اکنون ایمن‌تر است.</p>
                                            </motion.div>
                                        )}
                                    </div>
                                </motion.div>
                            )}

                            {/* Social Media Section */}
                            {activeSection === 'social' && (
                                <motion.div
                                    key="social"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="bg-white rounded-3xl shadow-2xl p-8"
                                >
                                    <div className="space-y-8">
                                        <div className="text-center mb-8">
                                            <h2 className="text-2xl font-bold text-emerald-800 mb-2">شبکه‌های اجتماعی</h2>
                                            <p className="text-emerald-600">حساب‌های کاربری خود در شبکه‌های اجتماعی را مدیریت کنید</p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {socialPlatforms.map((platform, index) => (
                                                <motion.div
                                                    key={platform.key}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                    className="bg-emerald-50 rounded-2xl p-4 space-y-4"
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <div className="text-emerald-600">
                                                                {platform.icon}
                                                            </div>
                                                            <span className="font-medium text-emerald-800">
                                                                {platform.name}
                                                            </span>
                                                        </div>
                                                        <label className="relative inline-flex items-center cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                className="sr-only"
                                                                checked={socialMedia[platform.key].enabled}
                                                                onChange={(e) => handleSocialMediaChange(platform.key, 'enabled', e.target.checked)}
                                                            />
                                                            <div className={`w-11 h-6 rounded-full transition-colors ${socialMedia[platform.key].enabled ? 'bg-emerald-600' : 'bg-emerald-200'}`} />
                                                            <div className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${socialMedia[platform.key].enabled ? 'translate-x-5' : ''}`} />
                                                        </label>
                                                    </div>

                                                    {socialMedia[platform.key].enabled && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: 'auto' }}
                                                            className="space-y-2"
                                                        >
                                                            <input
                                                                type="text"
                                                                className="w-full px-4 py-3 rounded-xl border-2 border-emerald-100 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
                                                                placeholder={platform.placeholder}
                                                                value={socialMedia[platform.key].value}
                                                                onChange={(e) => handleSocialMediaChange(platform.key, 'value', e.target.value)}
                                                            />
                                                        </motion.div>
                                                    )}
                                                </motion.div>
                                            ))}
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={handleSaveSocialMedia}
                                            disabled={loading}
                                            className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white rounded-xl font-medium flex items-center justify-center gap-2 shadow-lg transition-all"
                                        >
                                            {loading ? (
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ repeat: Infinity, duration: 1 }}
                                                    className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                                                />
                                            ) : (
                                                <>
                                                    <CheckCircle className="w-5 h-5" />
                                                    ذخیره تغییرات
                                                </>
                                            )}
                                        </motion.button>

                                        {formSubmitted && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="bg-emerald-100 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl text-center"
                                            >
                                                شبکه‌های اجتماعی با موفقیت ذخیره شدند!
                                            </motion.div>
                                        )}
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