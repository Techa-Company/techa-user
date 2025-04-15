// components/ChapterItem.js
"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SessionItem from "./SessionItem";

const ChapterItem = ({ chapter, index, selectedSessionId }) => {
    const [isOpen, setIsOpen] = useState(false);

    const hasSelectedSession = chapter.Sessions.some(
        (session) => session.Id == selectedSessionId
    );

    useEffect(() => {
        if (hasSelectedSession) {
            setIsOpen(true);
        }
    }, [hasSelectedSession]);

    const toggleChapter = () => {
        setIsOpen(!isOpen);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="mb-6"
        >
            {/* عنوان فصل */}
            <div
                className={`
          bg-white p-6 rounded-xl cursor-pointer shadow-sm
          border-2 border-gray-100
          hover:border-emerald-400 transition-all duration-300
        `}
                onClick={toggleChapter}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center">
                            <span className="text-emerald-600 font-bold text-xl">
                                {index + 1}
                            </span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            {chapter.Title}
                        </h2>
                    </div>
                    <ChevronDown
                        className={`transform transition-transform duration-300 text-gray-600 ${isOpen ? "rotate-180" : ""
                            }`}
                        size={28}
                    />
                </div>
            </div>

            {/* لیست جلسات */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 space-y-2 pr-6 overflow-hidden"
                    >
                        {chapter.Sessions.filter((s) => s.HasExercises).map(
                            (session, sessionIndex) => (
                                <SessionItem
                                    key={session.Id}
                                    session={session}
                                    sessionIndex={sessionIndex}
                                    isSelected={session.Id === selectedSessionId}
                                />
                            )
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default ChapterItem;