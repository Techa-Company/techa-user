"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Plus, Search, Ticket, ChevronRight, Loader } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const statusConfig = {
    'باز': { color: 'bg-red-500', icon: '🚨' },
    'پاسخ داده شده': { color: 'bg-emerald-500', icon: '✅' },
    'در حال بررسی': { color: 'bg-amber-500', icon: '⏳' },
    'بسته': { color: 'bg-gray-500', icon: '🔒' }
};

export default function SupportTickets() {
    const [tickets, setTickets] = useState([
        {
            id: 1,
            title: 'مشکل در فعال‌سازی لایسنس',
            category: 'فنی',
            status: 'باز',
            priority: 'بالا',
            createdAt: '۱۴۰۳/۰۳/۱۵',
            lastUpdate: '۲ ساعت پیش',
            messages: 3,
        },
        {
            id: 2,
            title: 'سوال درباره دوره React',
            category: 'آموزشی',
            status: 'پاسخ داده شده',
            priority: 'متوسط',
            createdAt: '۱۴۰۳/۰۳/۱۴',
            lastUpdate: '۱ روز پیش',
            messages: 2,
        },
        {
            id: 3,
            title: 'درخواست راهنمایی درباره پرداخت',
            category: 'مالی',
            status: 'باز',
            priority: 'کم',
            createdAt: '۱۴۰۳/۰۳/۱۰',
            lastUpdate: '۵ ساعت پیش',
            messages: 1,
        },
        {
            id: 4,
            title: 'خطا در اتصال به سرور',
            category: 'فنی',
            status: 'در حال بررسی',
            priority: 'بالا',
            createdAt: '۱۴۰۳/۰۳/۰۹',
            lastUpdate: '۲ روز پیش',
            messages: 4,
        },
        {
            id: 5,
            title: 'پیشنهاد اضافه کردن دوره جدید',
            category: 'عمومی',
            status: 'پاسخ داده شده',
            priority: 'کم',
            createdAt: '۱۴۰۳/۰۳/۰۱',
            lastUpdate: '۱ هفته پیش',
            messages: 2,
        },
        {
            id: 6,
            title: 'اشکال در نمایش صفحه دوره',
            category: 'فنی',
            status: 'باز',
            priority: 'متوسط',
            createdAt: '۱۴۰۲/۰۲/۲۸',
            lastUpdate: '۶ ساعت پیش',
            messages: 3,
        },
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const [filterStatus, setFilterStatus] = useState('all');
    const [viewMode, setViewMode] = useState('grid');

    const filteredTickets = tickets
        .filter(ticket =>
            ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ticket.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .filter(ticket =>
            filterStatus === 'all' ? true : ticket.status === filterStatus
        )
        .sort((a, b) => sortBy === 'newest' ?
            new Date(b.createdAt) - new Date(a.createdAt) :
            a.priority.localeCompare(b.priority)
        );

    const TicketCard = ({ ticket }) => (
        <Link href={`/account/tickets/${ticket.id}`}>
            <motion.div
                className={`relative group p-6 rounded-2xl transition-all bg-white border-2 border-emerald-100 shadow-lg hover:shadow-xl cursor-pointer`}
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-emerald-100`}>
                        <span className="text-2xl">{statusConfig[ticket.status].icon}</span>
                    </div>

                    <div className="flex-1 space-y-2">
                        <h3 className={`text-xl font-bold text-emerald-800 group-hover:text-emerald-600 transition-colors`}>
                            {ticket.title}
                        </h3>

                        <div className="flex flex-wrap items-center gap-3">
                            <span className={`px-3 py-1 rounded-full text-sm bg-emerald-100 text-emerald-800`}>
                                {ticket.category}
                            </span>
                            <span className="text-sm text-emerald-600">
                                {ticket.createdAt}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm ${statusConfig[ticket.status].color} bg-opacity-20 text-gray-800`}>
                            {ticket.status}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs ${ticket.priority === 'بالا' ?
                            'bg-red-100 text-red-800' :
                            ticket.priority === 'متوسط' ?
                                'bg-amber-100 text-amber-800' :
                                'bg-emerald-100 text-emerald-800'
                            }`}>
                            {ticket.priority}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 text-emerald-600">
                        <span>{ticket.messages}</span>
                        <MessageCircle className="w-5 h-5" />
                    </div>
                </div>

                <div className="absolute top-4 right-4 text-emerald-200 group-hover:opacity-100 opacity-0 transition-opacity">
                    <ChevronRight className="w-6 h-6" />
                </div>
            </motion.div>
        </Link>
    );

    return (
        <div className="min-h-screen px-5 sm:px-10">
            <div className="space-y-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                >
                    <div className="flex items-center gap-4">
                        <motion.div
                            className="p-3 rounded-xl bg-emerald-100"
                            whileHover={{ rotate: 15 }}
                        >
                            <Ticket className="w-8 h-8 text-emerald-600" />
                        </motion.div>
                        <div>
                            <h1 className="text-3xl font-bold text-emerald-800">
                                پشتیبانی فنی
                            </h1>
                            <p className="text-emerald-600">
                                مدیریت تیکت‌های پشتیبانی
                            </p>
                        </div>
                    </div>

                    <Link href="tickets/new">
                        <motion.button
                            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Plus className="w-5 h-5" />
                            تیکت جدید
                        </motion.button>
                    </Link>
                </motion.div>

                {/* Controls */}
                <motion.div
                    className="p-4 rounded-2xl bg-white border-emerald-100 border-2 shadow-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex-1 flex items-center gap-2">
                            <Search className="w-5 h-5 text-emerald-600" />
                            <input
                                type="text"
                                placeholder="جستجو در تیکت‌ها..."
                                className="flex-1 bg-transparent outline-none"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <select
                                className="rounded-xl px-4 py-2 text-emerald-800 focus:outline-none"
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="all">همه وضعیت‌ها</option>
                                <option value="باز">باز</option>
                                <option value="پاسخ داده شده">پاسخ داده شده</option>
                                <option value="در حال بررسی">در حال بررسی</option>
                            </select>

                            <select
                                className="rounded-xl px-4 py-2 text-emerald-800 focus:outline-none"
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="newest">جدیدترین</option>
                                <option value="priority">اولویت</option>
                            </select>

                            <button
                                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                                className="p-2 rounded-lg hover:bg-emerald-100"
                            >
                                {viewMode === 'grid' ? '☷' : '☰'}
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Tickets Grid */}
                <div className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                    <AnimatePresence>
                        {filteredTickets.length > 0 ? (
                            filteredTickets.map(ticket => (
                                <TicketCard key={ticket.id} ticket={ticket} />
                            ))
                        ) : (
                            <motion.div
                                className="col-span-full text-center py-20 space-y-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <div className="text-2xl text-emerald-600">
                                    موردی یافت نشد!
                                </div>
                                <Loader className="animate-spin mx-auto text-emerald-500" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}