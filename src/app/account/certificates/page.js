"use client";
import { motion, stagger, useAnimate } from 'framer-motion';
import { BadgeCheck, Download, FileText, Clock, Rocket, Award, Info } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function CertificatesPage() {
    const [certificates, setCertificates] = useState([
        {
            id: 1,
            title: 'React پیشرفته',
            completedDate: '۱۴۰۳/۰۳/۱۵',
            certificateRequested: true,
            downloadLink: '/certificates/react.pdf',
        },
        {
            id: 2,
            title: 'Next.js حرفه‌ای',
            completedDate: '۱۴۰۳/۰۲/۲۸',
            certificateRequested: false,
        },
        {
            id: 3,
            title: 'TypeScript مقدماتی',
            completedDate: '۱۴۰۳/۰۳/۱۰',
            certificateRequested: true,
            downloadLink: '/certificates/typescript.pdf',
        },
        {
            id: 4,
            title: 'GraphQL پیشرفته',
            completedDate: '۱۴۰۳/۰۲/۲۰',
            certificateRequested: false,
        },
        {
            id: 5,
            title: 'Redux حرفه‌ای',
            completedDate: '۱۴۰۳/۰۳/۱۲',
            certificateRequested: true,
            downloadLink: '/certificates/redux.pdf',
        },
        {
            id: 6,
            title: 'HTML و CSS پایه',
            completedDate: '۱۴۰۳/۰۱/۲۵',
            certificateRequested: false,
        },
    ]);


    const [scope, animate] = useAnimate();

    useEffect(() => {
        animate(
            ".certificate-card",
            { opacity: 1, y: 0 },
            { delay: stagger(0.1), duration: 0.5 }
        );
    }, []);

    const requestCertificate = (id) => {
        setCertificates(prev =>
            prev.map(cert =>
                cert.id === id ? { ...cert, certificateRequested: true } : cert
            )
        );
    };

    return (
        <div className="px-5 sm:px-10" ref={scope}>
            {/* هدر صفحه */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 text-center"
            >
                <div className="inline-block bg-emerald-100 p-4 rounded-2xl mb-6">
                    <Award className="w-12 h-12 text-emerald-600" />
                </div>
                <h1 className="text-4xl font-bold text-emerald-800 mb-3">مدارک من</h1>
                <p className="text-emerald-600">گواهینامه‌های دوره‌های تکمیل شده</p>
            </motion.div>

            {/* لیست مدارک */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {certificates.map((cert) => (
                    <motion.div
                        key={cert.id}
                        className="certificate-card opacity-0 translate-y-10"
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-emerald-100 relative overflow-hidden">
                            {/* نوار وضعیت */}
                            <div className={`absolute top-0 left-0 right-0 h-2 ${cert.certificateRequested ? 'bg-emerald-500' : 'bg-amber-400'
                                }`} />

                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-emerald-800 mb-2">
                                        {cert.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-sm text-emerald-600">
                                        <Clock className="w-4 h-4" />
                                        <span>تکمیل شده در {cert.completedDate}</span>
                                    </div>
                                </div>
                                <div className="bg-emerald-100 p-3 rounded-xl">
                                    <FileText className="w-8 h-8 text-emerald-600" />
                                </div>
                            </div>

                            {/* نوار پیشرفت */}
                            <div className="mb-6">
                                <div className="w-full bg-emerald-100 rounded-full h-3">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: '100%' }}
                                        transition={{ duration: 1 }}
                                        className="bg-emerald-500 h-3 rounded-full"
                                    />
                                </div>
                                <div className="flex justify-between text-sm text-emerald-800 mt-2">
                                    <span>وضعیت دوره:</span>
                                    <span className="flex items-center gap-1">
                                        <BadgeCheck className="w-4 h-4" />
                                        تکمیل شده
                                    </span>
                                </div>
                            </div>

                            {/* دکمه اقدامات */}
                            {cert.certificateRequested ? (
                                <motion.a
                                    whileHover={{ scale: 1.05 }}
                                    href={cert.downloadLink}
                                    download
                                    className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"
                                >
                                    <Download className="w-5 h-5" />
                                    دانلود گواهینامه
                                </motion.a>
                            ) : (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => requestCertificate(cert.id)}
                                    className="w-full bg-amber-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"
                                >
                                    <Rocket className="w-5 h-5" />
                                    درخواست گواهینامه
                                </motion.button>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* راهنما */}
            <div className="max-w-3xl mx-auto mt-16 p-6 bg-emerald-100 rounded-2xl border-2 border-emerald-200">
                <div className="flex items-center gap-4">
                    <div className="bg-emerald-600 text-white p-3 rounded-xl">
                        <Info className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-emerald-800 mb-2">نکات مهم</h3>
                        <ul className="list-disc pr-4 text-emerald-700 space-y-2">
                            <li>گواهینامه‌ها ۳ روز پس از درخواست آماده می‌شوند</li>
                            <li>مدارک دارای هولوگرام امنیتی هستند</li>
                            <li>امکان استعلام آنلاین مدارک وجود دارد</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}