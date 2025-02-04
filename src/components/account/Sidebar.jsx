"use client"
import { motion } from 'framer-motion'
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
    const [topPosition, setTopPosition] = useState(72)

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth <= 768
            setIsMobile(mobile)
            if (!mobile) setIsOpen(false)
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    useEffect(() => {
        document.body.style.overflow = isMobile && isOpen ? 'hidden' : 'auto'
    }, [isOpen, isMobile])

    useEffect(() => {
        const handleScroll = () => {
            setTopPosition(window.scrollY > 20 ? 56 : 72)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <>
            {/* Overlay برای موبایل */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                />
            )}

            {/* سایدبار اصلی */}
            <nav
                className={`fixed h-full w-72 bg-[#042A1B] transition-all duration-200 z-40 lg:right-0 ${isOpen ? 'right-0' : '-right-72'
                    }`}
                style={{ top: `${topPosition}px` }}
            >
                {/* محتوای سایدبار */}
                <div className="h-full flex flex-col">
                    {/* بخش بالایی ثابت */}
                    <div className="p-6 flex-shrink-0">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="bg-green-600 flex justify-center items-center w-12 h-12 rounded-lg">
                                <span className="text-xl">🤖</span>
                            </div>
                            <h1 className="text-2xl font-bold text-green-400">حساب کاربری</h1>
                        </div>
                    </div>

                    {/* لیست منو با اسکرول */}
                    <ul className="flex-1 overflow-y-auto pb-20 px-6 space-y-2 no-scrollbar">

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

                {/* دکمه همبرگر */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="absolute top-2 -left-10 z-40 rounded-l-md p-2 bg-[#042A1B] shadow-lg lg:hidden"
                >
                    {isOpen ? (
                        <X className="w-6 h-6 text-white" />
                    ) : (
                        <Menu className="w-6 h-6 text-white" />
                    )}
                </button>
            </nav>
        </>
    )
}