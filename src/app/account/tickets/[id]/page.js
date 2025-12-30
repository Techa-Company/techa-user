"use client";
import { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    ChevronRight, Clock, AlertCircle, Hash, User,
    Paperclip, Send, MoreVertical, ShieldCheck
} from 'lucide-react';

const mockTicket = {
    id: 2045,
    title: 'عدم اعمال کد تخفیف در سبد خرید',
    status: 'در حال بررسی',
    priority: 'بالا',
    department: 'مالی',
    createdAt: '۱۴۰۳/۱۰/۰۹ - ۱۰:۳۰',
    messages: [
        {
            id: 1,
            isUser: true,
            sender: 'رامین جوشنگ',
            avatar: null,
            content: '<p>سلام، من کد تخفیف YALDA1403 رو میزنم ولی مبلغ کسر نمیشه. لطفا بررسی کنید.</p>',
            date: '۱۰:۳۰',
            role: 'کاربر'
        },
        {
            id: 2,
            isUser: false,
            sender: 'پشتیبانی فنی',
            avatar: '/images/support-avatar.jpg',
            content: '<p>سلام رامین عزیز،<br>کد تخفیف رو بررسی کردم. این کد فقط برای دوره‌های فرانت‌اند فعال هست. سبد خرید شما شامل دوره پایتون میشه.</p>',
            date: '۱۰:۴۵',
            role: 'کارشناس پشتیبانی'
        }
    ]
};

export default function TicketDetail() {
    const [reply, setReply] = useState('');
    const [messages, setMessages] = useState(mockTicket.messages);

    const handleSend = () => {
        if (!reply) return;
        const newMsg = {
            id: Date.now(),
            isUser: true,
            sender: 'شما',
            content: reply,
            date: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
            role: 'کاربر'
        };
        setMessages([...messages, newMsg]);
        setReply('');
    };

    return (
        <div className="min-h-screen bg-[#F0F2F5] p-4 sm:p-6 font-sans" dir="rtl">
            <div className="max-w-5xl mx-auto h-[calc(100vh-3rem)] flex flex-col">

                {/* Navbar Breadcrumb */}
                <div className="flex items-center gap-2 mb-4 text-slate-500 text-sm">
                    <Link href="/account/tickets" className="hover:text-emerald-600 transition-colors">تیکت‌ها</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-slate-800 font-medium">جزئیات تیکت #{mockTicket.id}</span>
                </div>

                <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden">

                    {/* Main Chat Area */}
                    <div className="flex-1 flex flex-col bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

                        {/* Header */}
                        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white z-10">
                            <div>
                                <h1 className="font-bold text-slate-800 text-lg">{mockTicket.title}</h1>
                                <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                                    <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {mockTicket.status}
                                    </span>
                                    <span>{mockTicket.department}</span>
                                    <span>•</span>
                                    <span>{mockTicket.createdAt}</span>
                                </div>
                            </div>
                            <button className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
                                <MoreVertical className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages List (Scrollable) */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex gap-4 ${msg.isUser ? 'flex-row-reverse' : 'flex-row'}`}
                                >
                                    {/* Avatar */}
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 ${msg.isUser ? 'bg-indigo-100 border-indigo-200 text-indigo-600' : 'bg-emerald-100 border-emerald-200 text-emerald-600'}`}>
                                        {msg.isUser ? <User className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
                                    </div>

                                    {/* Bubble */}
                                    <div className={`flex flex-col max-w-[80%] ${msg.isUser ? 'items-end' : 'items-start'}`}>
                                        <div className="flex items-center gap-2 mb-1 px-1">
                                            <span className="text-xs font-bold text-slate-700">{msg.sender}</span>
                                            <span className="text-[10px] text-slate-400">{msg.date}</span>
                                        </div>
                                        <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.isUser
                                                ? 'bg-indigo-600 text-white rounded-tr-none'
                                                : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
                                            }`}>
                                            <div dangerouslySetInnerHTML={{ __html: msg.content }} className={msg.isUser ? '[&_p]:text-white' : ''} />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Reply Area */}
                        <div className="p-4 bg-white border-t border-slate-200">
                            <div className="border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
                                <Editor
                                    apiKey='v12ld4fyiekikay5d5tuv6j4578f6daxybv4qrm2a0oymp5j'
                                    init={{
                                        height: 150,
                                        menubar: false,
                                        plugins: 'link image code',
                                        toolbar: 'bold italic | bullist numlist | link',
                                        content_style: 'body { font-family:Vazir, sans-serif; font-size:14px; direction: rtl; }',
                                        directionality: 'rtl',
                                        statusbar: false,
                                    }}
                                    value={reply}
                                    onEditorChange={setReply}
                                />
                                <div className="bg-slate-50 p-2 flex justify-between items-center border-t border-slate-100">
                                    <button className="p-2 hover:bg-slate-200 rounded-lg text-slate-500 transition-colors">
                                        <Paperclip className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={handleSend}
                                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
                                    >
                                        <Send className="w-4 h-4" />
                                        ارسال پاسخ
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Sidebar Info (Desktop) */}
                    <div className="hidden lg:block w-80 space-y-4">
                        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                            <h3 className="font-bold text-slate-800 mb-4 border-b border-slate-100 pb-3">اطلاعات تیکت</h3>
                            <div className="space-y-4">
                                <InfoRow icon={Hash} label="شناسه تیکت" value={`#${mockTicket.id}`} />
                                <InfoRow icon={AlertCircle} label="اولویت" value={mockTicket.priority} valueClass="text-rose-600 font-medium" />
                                <InfoRow icon={User} label="دپارتمان" value={mockTicket.department} />
                                <InfoRow icon={Clock} label="آخرین بروزرسانی" value="۵ دقیقه پیش" />
                            </div>
                        </div>

                        <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-100">
                            <p className="text-emerald-800 text-sm font-medium mb-2">رضایت از پاسخگویی؟</p>
                            <p className="text-emerald-600 text-xs mb-4">پس از اتمام گفتگو می‌توانید به نحوه پاسخگویی امتیاز دهید.</p>
                            <button className="w-full bg-white border border-emerald-200 text-emerald-600 py-2 rounded-xl text-sm hover:bg-emerald-600 hover:text-white transition-colors">
                                بستن تیکت
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

const InfoRow = ({ icon: Icon, label, value, valueClass = "text-slate-800" }) => (
    <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 text-slate-500">
            <Icon className="w-4 h-4" />
            <span>{label}</span>
        </div>
        <span className={valueClass}>{value}</span>
    </div>
);