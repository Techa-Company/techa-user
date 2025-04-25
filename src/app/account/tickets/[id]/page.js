"use client";
import { Editor } from '@tinymce/tinymce-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Clock, User, ChevronLeft, Paperclip, Send, CheckCircle } from 'lucide-react';

// دیتای نمونه پیشرفته
const sampleTicket = {
    id: 1,
    title: 'مشکل در اجرای کدهای ری‌اکت در نسخه موبایل',
    category: 'فنی',
    status: 'در حال بررسی',
    priority: 'بالا',
    createdAt: '۱۴۰۳/۰۳/۲۰ - ۱۴:۳۰',
    content: `
        <h2>شرح مشکل:</h2>
        <p>پس از آپدیت به نسخه ۱۸ ری‌اکت، کامپوننت‌ها در دستگاه‌های موبایل به درستی رندر نمیشوند.</p>
        <ul>
            <li>خطای مرورگر: Uncaught ReferenceError</li>
            <li>شماره خطا: ۱۲۷۸</li>
            <li>ورژن ری‌اکت: ۱۸.۲.۰</li>
        </ul>
        <p>ضمیمه‌ها:</p>
        <ol>
            <li>تصویر خطا</li>
            <li>فایل کد</li>
        </ol>
    `,
    messages: [
        {
            id: 1,
            sender: 'پشتیبانی تکا',
            role: 'کارشناس فنی',
            avatar: '/images/teacher.jpeg',
            content: 'سلام وقت بخیر، مشکالتون رو بررسی میکنیم. لطفا نسخه مرورگر و نمونه کد رو ارسال کنید.',
            date: '۱۴۰۳/۰۳/۲۰ - ۱۵:۰۰',
            attachments: ['error-screenshot.jpg'],
            systemMessage: true
        },
        {
            id: 2,
            sender: 'شما',
            role: 'کاربر',
            avatar: '/images/teacher.jpeg',
            content: 'مرورگر: Chrome 123<br/>کد نمونه:<br/><code>npm create vite@latest</code>',
            date: '۱۴۰۳/۰۳/۲۰ - ۱۵:۳۰',
            attachments: ['sample-code.jsx']
        }
    ]
};

export default function TicketDetail() {
    const { id } = useParams();
    const [replyContent, setReplyContent] = useState('');
    const [attachments, setAttachments] = useState([]);
    const [ticket, setTicket] = useState(sampleTicket);

    const handleReply = () => {
        if (!replyContent.trim()) return;

        const newMessage = {
            id: Date.now(),
            sender: 'شما',
            role: 'کاربر',
            avatar: '/user-avatar.png',
            content: replyContent,
            date: new Date().toLocaleString('fa-IR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            }),
            attachments: [...attachments]
        };

        setTicket(prev => ({
            ...prev,
            messages: [...prev.messages, newMessage],
            status: 'در حال بررسی'
        }));

        setReplyContent('');
        setAttachments([]);
    };

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        setAttachments(prev => [...prev, ...files]);
    };

    const StatusBadge = ({ status }) => (
        <motion.span
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${getStatusColor(status)}`}
        >
            {status === 'در حال بررسی' && <Clock className="w-4 h-4" />}
            {status === 'بسته' && <CheckCircle className="w-4 h-4" />}
            {status === 'پاسخ داده شده' && <Send className="w-4 h-4" />}
            {status}
        </motion.span>
    );

    return (
        <div className="max-w-5xl mx-auto p-4 lg:p-8">
            <Link
                href="/account/tickets"
                className="mb-6 flex items-center gap-2 text-emerald-600 hover:text-emerald-700 transition-colors"
            >
                <ChevronLeft className="w-5 h-5" />
                بازگشت به لیست تیکت‌ها
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg border border-emerald-50 overflow-hidden"
            >
                {/* هدر تیکت */}
                <div className="p-6 bg-gradient-to-r from-emerald-50 to-green-50 border-b border-emerald-100">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                        <div>
                            <h1 className="text-2xl lg:text-3xl font-bold text-emerald-800">
                                {ticket.title}
                            </h1>
                            <div className="mt-2 flex items-center gap-3 text-emerald-600">
                                <span className="text-sm">#{ticket.id}</span>
                                <span>•</span>
                                <span className="text-sm">{ticket.createdAt}</span>
                            </div>
                        </div>
                        <StatusBadge status={ticket.status} />
                    </div>
                </div>

                {/* اطلاعات تیکت */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
                    <InfoBox icon={<AlertCircle />} title="اولویت" value={ticket.priority} />
                    <InfoBox icon={<User />} title="ارسال کننده" value="امیر محمدی" />
                    <InfoBox icon={<Clock />} title="زمان پاسخگویی" value="حداکثر ۲۴ ساعت" />
                </div>

                {/* محتوای اصلی */}
                <div className="p-6 border-t border-emerald-100">
                    <h2 className="text-xl font-semibold text-emerald-800 mb-4">جزئیات تیکت</h2>
                    <div
                        className="prose max-w-none text-emerald-700"
                        dangerouslySetInnerHTML={{ __html: ticket.content }}
                    />
                </div>

                {/* تاریخچه مکاتبات */}
                <div className="p-6 bg-gray-50 border-t border-emerald-100">
                    <h2 className="text-xl font-semibold text-emerald-800 mb-6">تاریخچه مکاتبات</h2>

                    <div className="space-y-8">
                        <AnimatePresence>
                            {ticket.messages.map((message) => (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, x: message.systemMessage ? 20 : -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0 }}
                                    className={`flex gap-4 ${message.systemMessage ? 'flex-row-reverse' : ''}`}
                                >
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                                            <img
                                                src={message.avatar}
                                                alt={message.sender}
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                        </div>
                                    </div>

                                    <div className={`flex-1 ${message.systemMessage ? 'text-left' : 'text-right'}`}>
                                        <div className={`p-4 rounded-2xl ${message.systemMessage
                                            ? 'bg-white border border-emerald-100 shadow-sm'
                                            : 'bg-emerald-50'}`}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-semibold text-emerald-800">
                                                        {message.sender}
                                                    </span>
                                                    <span className="text-xs text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
                                                        {message.role}
                                                    </span>
                                                </div>
                                                <span className="text-sm text-emerald-600">
                                                    {message.date}
                                                </span>
                                            </div>

                                            <div
                                                className={`prose max-w-none ${message.systemMessage
                                                    ? 'text-gray-700'
                                                    : 'text-emerald-800'}`}
                                                dangerouslySetInnerHTML={{ __html: message.content }}
                                            />

                                            {message.attachments?.length > 0 && (
                                                <div className="mt-4 border-t border-emerald-100 pt-4">
                                                    <h3 className="text-sm font-medium text-emerald-800 mb-2">
                                                        ضمیمه‌ها:
                                                    </h3>
                                                    <div className="flex flex-wrap gap-2">
                                                        {message.attachments.map((file, index) => (
                                                            <a
                                                                key={index}
                                                                href="#"
                                                                className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 text-sm"
                                                            >
                                                                <Paperclip className="w-4 h-4" />
                                                                {file}
                                                            </a>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>

                {/* بخش پاسخ‌دهی */}
                <div className="p-6 bg-white border-t border-emerald-100">
                    <h3 className="text-lg font-semibold text-emerald-800 mb-4">پاسخ جدید</h3>

                    <Editor
                        apiKey='v12ld4fyiekikay5d5tuv6j4578f6daxybv4qrm2a0oymp5j'
                        init={{
                            height: 300,
                            menubar: false,
                            plugins: [
                                'advlist lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar: `undo redo | formatselect | bold italic underline | 
                                     alignright aligncenter alignleft alignjustify | 
                                     bullist numlist outdent indent | link image media | 
                                     code help`,
                            directionality: 'rtl',
                            content_style: `
                                body { 
                                    font-family: Vazir, Tahoma, sans-serif; 
                                    font-size: 14px; 
                                    line-height: 1.6;
                                }
                                ul, ol { 
                                    margin-right: 20px; 
                                }
                            `,
                            images_upload_handler: async (blobInfo) => {
                                // آپلود عکس به سرور
                                return new Promise((resolve) => {
                                    setTimeout(() => {
                                        resolve(`https://example.com/uploads/${blobInfo.filename()}`);
                                    }, 2000);
                                });
                            }
                        }}
                        value={replyContent}
                        onEditorChange={setReplyContent}
                    />

                    <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <label className="cursor-pointer text-emerald-600 hover:text-emerald-700">
                                <input
                                    type="file"
                                    multiple
                                    onChange={handleFileUpload}
                                    className="hidden"
                                />
                                <Paperclip className="w-5 h-5" />
                                <span className="text-sm">افزودن ضمیمه</span>
                            </label>
                            {attachments.length > 0 && (
                                <span className="text-sm text-emerald-600">
                                    ({attachments.length} فایل انتخاب شده)
                                </span>
                            )}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleReply}
                            className="px-6 py-3 bg-emerald-600 text-white rounded-xl 
                                     hover:bg-emerald-700 flex items-center gap-2 w-full sm:w-auto 
                                     justify-center"
                        >
                            <Send className="w-5 h-5" />
                            ارسال پاسخ
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

// کامپوننت جعبه اطلاعات
const InfoBox = ({ icon, title, value }) => (
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-emerald-100">
        <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
            {icon}
        </div>
        <div>
            <h3 className="text-sm text-emerald-600 mb-1">{title}</h3>
            <p className="font-medium text-emerald-800">{value}</p>
        </div>
    </div>
);

// تابع helper برای رنگ وضعیت
const getStatusColor = (status) => {
    switch (status) {
        case 'باز':
        case 'در حال بررسی':
            return 'bg-amber-100 text-amber-800';
        case 'پاسخ داده شده':
            return 'bg-emerald-100 text-emerald-800';
        case 'بسته':
            return 'bg-gray-100 text-gray-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};