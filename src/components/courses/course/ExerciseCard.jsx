// components/ExerciseCard.js
"use client";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { CheckCircle, AlertCircle, Circle, Zap } from "lucide-react";

const ExerciseCard = ({ exercise, onClick, isSelected }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const radius = useMotionValue(0);
    const background = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, var(--${exercise.status}-hover) 0%, transparent 65%)`;

    const StatusIcon = () => {
        const iconClass = "transform transition-transform duration-300";
        switch (exercise.status) {
            case "completed":
                return (
                    <CheckCircle
                        className={`text-emerald-500 ${iconClass} hover:scale-110`}
                        size={24}
                    />
                );
            case "pending":
                return (
                    <AlertCircle
                        className={`text-amber-500 animate-pulse ${iconClass}`}
                        size={24}
                    />
                );
            default:
                return (
                    <div className="relative">
                        <Circle className={`text-gray-400 ${iconClass}`} size={24} />
                        <Zap
                            className="absolute top-0 left-0 text-emerald-500 animate-ping"
                            size={16}
                        />
                    </div>
                );
        }
    };

    const handleMouseMove = (e) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
        radius.set(e.currentTarget.offsetWidth * 1.5);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            className={`group relative p-6 rounded-xl cursor-pointer transition-all
        ${isSelected
                    ? "border-2 border-emerald-500/50 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5"
                    : "border border-gray-200/50 hover:border-emerald-300/30 bg-white"
                }`}
            style={{
                boxShadow: isSelected
                    ? "0 10px 30px -10px rgba(16, 185, 129, 0.3)"
                    : "0 4px 20px -6px rgba(0, 0, 0, 0.1)",
            }}
        >
            {/* Hover Gradient Effect */}
            {!isSelected && (
                <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                        background,
                        "--completed-hover": "rgba(16, 185, 129, 0.03)",
                        "--pending-hover": "rgba(245, 158, 11, 0.03)",
                    }}
                />
            )}

            {/* Animated Border */}
            {isSelected && (
                <motion.div
                    className="absolute inset-0 rounded-xl border-2 pointer-events-none"
                    initial={{ opacity: 0, borderColor: "#10B981" }}
                    animate={{
                        opacity: 1,
                        borderColor: ["#10B981", "#A7F3D0", "#10B981"],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "loop",
                    }}
                    style={{
                        borderImage: `linear-gradient(120deg, #10B981 0%, #A7F3D0 50%, #10B981 100%) 1`,
                    }}
                />
            )}

            <div className="flex items-center justify-between relative z-10 gap-3">
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <motion.div
                            className={`w-12 h-12 rounded-lg flex items-center justify-center ${isSelected
                                ? "bg-emerald-500 text-white"
                                : "bg-emerald-50 text-emerald-500"
                                }`}
                            whileHover={{ scale: 1.05 }}
                        >
                            <span className="font-bold text-xl">#{exercise.id}</span>
                        </motion.div>
                        <h3 className="text-xl font-bold text-gray-800">
                            {exercise.title}
                        </h3>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                            className={`h-2 rounded-full ${exercise.status === "completed"
                                ? "bg-emerald-500"
                                : exercise.status === "pending"
                                    ? "bg-amber-500"
                                    : "bg-gray-300"
                                }`}
                            initial={{ width: 0 }}
                            animate={{
                                width:
                                    exercise.status === "completed"
                                        ? "100%"
                                        : exercise.status === "pending"
                                            ? "50%"
                                            : "0%",
                            }}
                            transition={{ duration: 0.8, type: "spring" }}
                        />
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                        <span
                            className={`px-3 py-1 rounded-full ${exercise.status === "completed"
                                ? "bg-emerald-100 text-emerald-700"
                                : exercise.status === "pending"
                                    ? "bg-amber-100 text-amber-700"
                                    : "bg-gray-100 text-gray-600"
                                }`}
                        >
                            {exercise.difficulty}
                        </span>
                        <span className="text-gray-500">
                            ⏳ مهلت: {exercise.deadline}
                        </span>
                    </div>
                </div>

                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <StatusIcon />
                </motion.div>
            </div>

            {/* Floating Particles */}
            {isSelected && (
                <div className="absolute inset-0 overflow-hidden rounded-xl">
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-emerald-400 rounded-full"
                            initial={{
                                opacity: 0,
                                x: Math.random() * 100 - 50,
                                y: Math.random() * 100 - 50,
                            }}
                            animate={{
                                opacity: [0, 0.4, 0],
                                x: Math.random() * 100 - 50,
                                y: Math.random() * 100 - 50,
                            }}
                            transition={{
                                duration: 2 + Math.random() * 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    ))}
                </div>
            )}
        </motion.div>
    );
};

export default ExerciseCard;