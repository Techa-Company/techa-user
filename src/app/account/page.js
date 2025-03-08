"use client"
import DashboardCard from '../../components/account/Card'
import { motion } from 'framer-motion'
import CourseGrid from "../../components/account/CourseGrid"
import { Activity, CheckSquare, Book, ShoppingCart, Ticket } from 'lucide-react';
export default function DashboardPage() {
    return (
        <div className="space-y-8 px-5 sm:px-10">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
            >
                <DashboardCard
                    title="دوره‌های در حال پیگیری"
                    count={3}
                    color="bg-gradient-to-br from-green-500 to-emerald-600"
                    icon={Book}
                    progress={75}
                    trend={{ value: 20, icon: Activity }}
                />

                <DashboardCard
                    title="تمرین‌های در انتظار"
                    count={5}
                    color="bg-gradient-to-br from-blue-500 to-indigo-600"
                    icon={CheckSquare}
                    progress={60}
                    trend={{ value: 15, icon: Activity }}
                />

                <DashboardCard
                    title="تعداد خریدها"
                    count={10}
                    color="bg-gradient-to-br from-amber-500 to-orange-600"
                    icon={ShoppingCart}
                    progress={80}
                    trend={{ value: 10, icon: Activity }}
                />

                <DashboardCard
                    title="تعداد تیکت‌ها"
                    count={2}
                    color="bg-gradient-to-br from-purple-500 to-fuchsia-600"
                    icon={Ticket}
                    progress={30}
                    trend={{ value: -5, icon: Activity }}
                />
            </motion.div>
            <CourseGrid />
        </div>
    )
}