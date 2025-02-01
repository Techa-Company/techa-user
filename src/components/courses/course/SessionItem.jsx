// components/SessionItem.js
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { PlayCircle, CheckCircle, AlertCircle } from "lucide-react";

const SessionItem = ({ session, sessionIndex }) => {
    const [hoveredSession, setHoveredSession] = useState(null);

    const handleMouseEnter = () => {
        setHoveredSession(session.Id);
    };

    const handleMouseLeave = () => {
        setHoveredSession(null);
    };

    const SessionBadge = ({ progress }) => {
        switch (progress) {
            case "completed":
                return (
                    <div className="flex items-center gap-2 text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">
                        <CheckCircle size={16} />
                        <span className="text-sm font-medium">تکمیل شده</span>
                    </div>
                );
            case "pending":
                return (
                    <div className="flex items-center gap-2 text-amber-600 bg-amber-100 px-3 py-1 rounded-full">
                        <AlertCircle size={16} />
                        <span className="text-sm font-medium">در انتظار بررسی</span>
                    </div>
                );
            default:
                return (
                    <div className="flex items-center gap-2 text-sky-600 bg-sky-100 px-3 py-1 rounded-full">
                        <span className="text-sm font-medium">شروع تمرین</span>
                        <PlayCircle size={16} />
                    </div>
                );
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: sessionIndex * 0.1 }}
            className="group bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow
      border border-gray-100 hover:border-emerald-100 cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center ${hoveredSession === session.Id
                                    ? "bg-emerald-500 text-white"
                                    : "bg-emerald-50 text-emerald-500"
                                }`}
                        >
                            <PlayCircle size={20} />
                        </div>
                        {hoveredSession === session.Id && (
                            <motion.div
                                className="absolute inset-0 border-2 border-emerald-200 rounded-lg"
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            />
                        )}
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                            {session.Title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                            {session.Duration} • {session.Description}
                        </p>
                    </div>
                </div>
                <SessionBadge
                    progress={
                        sessionIndex % 3 === 0
                            ? "completed"
                            : sessionIndex % 3 === 1
                                ? "pending"
                                : null
                    }
                />
            </div>
        </motion.div>
    );
};

export default SessionItem;
