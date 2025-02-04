'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Home, User, Book, Dumbbell, ShoppingCart, Ticket, Mail, Folder, Briefcase, Key, Phone, X, Menu } from 'lucide-react'

const sidebarItems = [
    { name: 'داشبورد', href: '/account', icon: Home },
    { name: 'پروفایل', href: '/dashboard/profile', icon: User },
    { name: 'دوره‌های من', href: '/dashboard/courses', icon: Book },
    { name: 'تمرین‌ها', href: '/dashboard/exercises', icon: Dumbbell },
    { name: 'بوت کمپ', href: '/dashboard/bootcamp', icon: Briefcase },
    { name: 'مدارک من', href: '/dashboard/certificates', icon: Folder },
    { name: 'لایسنس‌های من', href: '/dashboard/licenses', icon: Key },
    { name: 'درخواست مشاوره', href: '/dashboard/consultation', icon: Phone },
    { name: 'خریدها', href: '/dashboard/purchases', icon: ShoppingCart },
    { name: 'تیکت‌ها', href: '/dashboard/tickets', icon: Ticket },
    { name: 'ارتباط با استاد', href: '/dashboard/contact', icon: Mail },
]

export default function Sidebar() {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [topPosition, setTopPosition] = useState(72);


    // تشخیص اندازه صفحه
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768)
            if (window.innerWidth > 768) setIsOpen(false)
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])



    // مدیریت اسکرول بدن هنگام باز بودن منو
    useEffect(() => {
        if (isMobile && isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
    }, [isOpen, isMobile])

    const handleScroll = () => {
        if (window.scrollY > 20) {
            setTopPosition(56);
        } else {
            setTopPosition(72);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (


        <nav
            key="sidebar"
            // initial={{ x: isMobile ? '100%' : 0 }}
            // animate={{ x: 0 }}
            // exit={{ x: '100%' }}
            // transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`fixed h-full w-72  bg-[#042A1B] transition-all duration-200 z-50 lg:-right-0 ${isOpen ? '-right-0' : '-right-72'}`}
            style={{ top: `${topPosition}px` }}

        >
            <div className="p-6 relative h-full">
                {/* لوگو و عنوان */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-3 mb-8"
                >
                    <div className="bg-green-600 flex justify-center items-center w-12 h-12 rounded-lg">
                        <span className="text-xl">🤖</span>
                    </div>
                    <h1 className="text-2xl font-bold text-green-400">حساب کاربری</h1>
                </motion.div>

                {/* آیتم‌های منو */}
                <ul className="space-y-2 pb-5">
                    {sidebarItems.map((item) => (
                        <motion.li
                            key={item.href}
                            whileHover={{ x: -10 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative"
                        >
                            <Link
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3 p-4 rounded-xl transition-all ${pathname === item.href
                                    ? 'bg-green-700/50 text-white shadow-inner'
                                    : 'text-green-200 hover:bg-green-700/30'
                                    }`}
                            >
                                {/* انیمیشن اکتیو */}
                                {pathname === item.href && (
                                    <motion.div
                                        layoutId="activeItem"
                                        className="absolute right-0 w-1.5 h-8 bg-green-400 rounded-l-full"
                                        transition={{ type: 'spring', stiffness: 500 }}
                                    />
                                )}

                                <item.icon className="w-6 h-6 flex-shrink-0" />
                                <span className="text-sm font-medium">{item.name}</span>
                            </Link>
                        </motion.li>
                    ))}
                </ul>
            </div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="absolute top-2 -left-10 z-50 rounded-l-md p-2 bg-[#042A1B] shadow-lg lg:hidden"
            >
                {
                    isOpen ?
                        <X className="w-6 h-6 text-white" />
                        :
                        <Menu className="w-6 h-6 text-white" />
                }

            </button>
        </nav>
    )
}