"use client";
import { motion, AnimatePresence } from 'framer-motion';
import {
    MessageSquare, Plus, Search, Filter, ChevronLeft,
    Clock, CheckCircle2, AlertCircle, LayoutGrid, List, FileText
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const statusStyles = {
    'باز': { bg: 'bg-rose-100', text: 'text-rose-600', border: 'border-rose-200', icon: AlertCircle },
    'پاسخ داده شده': { bg: 'bg-emerald-100', text: 'text-emerald-600', border: 'border-emerald-200', icon: CheckCircle2 },
    'در حال بررسی': { bg: 'bg-amber-100', text: 'text-amber-600', border: 'border-amber-200', icon: Clock },
    'بسته': { bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-200', icon: FileText }
};

export default function SupportTickets() {
    // دیتای نمونه با کمی جزئیات بیشتر
    const [tickets] = useState([
        { id: 2045, title: 'مشکل در درگاه پرداخت زرین‌پال', category: 'مالی', status: 'باز', priority: 'بالا', lastUpdate: '۱۰ دقیقه پیش', department: 'فنی' },
        { id: 2044, title: 'سوال در مورد جلسه پنجم ریکت', category: 'آموزشی', status: 'پاسخ داده شده', priority: 'متوسط', lastUpdate: '۲ ساعت پیش', department: 'آموزش' },
        { id: 2043, title: 'درخواست فاکتور رسمی', category: 'مالی', status: 'بسته', priority: 'کم', lastUpdate: '۱ روز پیش', department: 'حسابداری' },
        { id: 2042, title: 'باگ در ریسپانسیو موبایل', category: 'فنی', status: 'در حال بررسی', priority: 'بالا', lastUpdate: '۳ ساعت پیش', department: 'فنی' },
    ]);

    const [viewMode, setViewMode] = useState('grid');
    const [searchTerm, setSearchTerm] = useState('');

    // کامپوننت کارت آمار
    const StatCard = ({ title, count, color, icon: Icon }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between"
        >
            <div>
                <p className="text-slate-500 text-sm mb-1">{title}</p>
                <h3 className="text-2xl font-bold text-slate-800">{count}</h3>
            </div>
            <div className={`p-3 rounded-xl ${color}`}>
                <Icon className="w-6 h-6" />
            </div>
        </motion.div>
    );

    return (
        <div className="min-h-screen bg-slate-50/50 p-4 sm:p-8 font-sans" dir="rtl">

            {/* Header & Stats */}
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">مرکز پشتیبانی</h1>
                        <p className="text-slate-500 mt-1">مدیریت و پیگیری درخواست‌های شما</p>
                    </div>
                    <Link href="/account/tickets/new">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
                        >
                            <Plus className="w-5 h-5" />
                            ثبت تیکت جدید
                        </motion.button>
                    </Link>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard title="کل تیکت‌ها" count={12} color="bg-blue-100 text-blue-600" icon={List} />
                    <StatCard title="در انتظار پاسخ" count={3} color="bg-amber-100 text-amber-600" icon={Clock} />
                    <StatCard title="پاسخ داده شده" count={5} color="bg-emerald-100 text-emerald-600" icon={MessageSquare} />
                    <StatCard title="بسته شده" count={4} color="bg-slate-100 text-slate-600" icon={CheckCircle2} />
                </div>

                {/* Filters & Content */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                    {/* Toolbar */}
                    <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
                        <div className="relative w-full sm:w-96">
                            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="جستجو در موضوع، شناسه یا متن..."
                                className="w-full bg-slate-50 border-none rounded-xl py-3 pr-10 pl-4 text-sm focus:ring-2 focus:ring-emerald-500/20 transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-medium transition-colors">
                                <Filter className="w-4 h-4" />
                                فیلترها
                            </button>
                            <div className="h-6 w-[1px] bg-slate-200 mx-2 hidden sm:block"></div>
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2.5 rounded-xl transition-colors ${viewMode === 'grid' ? 'bg-emerald-50 text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                <LayoutGrid className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2.5 rounded-xl transition-colors ${viewMode === 'list' ? 'bg-emerald-50 text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                <List className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Ticket Grid/List */}
                    <div className={`p-5 grid gap-5 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                        <AnimatePresence>
                            {tickets.map((ticket, i) => {
                                const style = statusStyles[ticket.status];
                                const StatusIcon = style.icon;

                                return (
                                    <Link key={ticket.id} href={`/account/tickets/${ticket.id}`}>
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            whileHover={{ y: -4, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
                                            className={`group relative bg-white p-5 rounded-2xl border transition-all duration-300 ${viewMode === 'list' ? 'flex items-center justify-between border-slate-100' : 'border-slate-200 hover:border-emerald-300'}`}
                                        >
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-3">
                                                    <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${style.bg} ${style.text} flex items-center gap-1.5`}>
                                                        <StatusIcon className="w-3 h-3" />
                                                        {ticket.status}
                                                    </span>
                                                    <span className="text-xs text-slate-400 font-mono">#{ticket.id}</span>
                                                </div>

                                                <h3 className="font-bold text-slate-800 mb-2 line-clamp-1 group-hover:text-emerald-700 transition-colors">
                                                    {ticket.title}
                                                </h3>

                                                <div className="flex items-center gap-4 text-xs text-slate-500 mt-4">
                                                    <span className="flex items-center gap-1">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                                                        {ticket.department}
                                                    </span>
                                                    <span>•</span>
                                                    <span>{ticket.lastUpdate}</span>
                                                </div>
                                            </div>

                                            {viewMode === 'list' && (
                                                <ChevronLeft className="w-5 h-5 text-slate-300 mr-4" />
                                            )}
                                        </motion.div>
                                    </Link>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}