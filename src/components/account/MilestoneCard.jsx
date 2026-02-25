import { CheckCircle2, Lock, MapPin, Sparkles } from "lucide-react";
import { MilestoneStatus } from "../../app/account/page";

export default function MilestoneCard({ milestone, status }) {
    const Icon = milestone.icon;

    const getCardStyles = () => {
        switch (status) {
            case MilestoneStatus.COMPLETED:
                return 'bg-white/80 border-emerald-200/60 shadow-sm hover:shadow-emerald-100 hover:border-emerald-300 hover:-translate-y-1';
            case MilestoneStatus.CURRENT:
                return 'bg-white border-teal-500/50 shadow-[0_0_30px_-10px_rgba(20,184,166,0.3)] ring-2 ring-teal-400/20 transform scale-105 z-10';
            case MilestoneStatus.LOCKED:
                return 'bg-gray-50/50 border-transparent opacity-60 grayscale hover:opacity-80 hover:bg-gray-50';
            default:
                return '';
        }
    };

    const getIconStyles = () => {
        switch (status) {
            case MilestoneStatus.COMPLETED:
                return 'bg-gradient-to-br from-emerald-100 to-emerald-50 text-emerald-600 shadow-inner';
            case MilestoneStatus.CURRENT:
                return 'bg-gradient-to-br from-teal-500 to-emerald-500 text-white shadow-lg shadow-teal-500/30 animate-pulse-slow';
            case MilestoneStatus.LOCKED:
                return 'bg-gray-100 text-gray-400';
            default:
                return '';
        }
    };

    return (
        <div className={`
      relative flex flex-col items-center justify-center text-center p-5 rounded-3xl border transition-all duration-500 ease-out group min-h-[160px] backdrop-blur-sm
      ${getCardStyles()}
    `}>
            {/* "You are here" Indicator */}
            {status === MilestoneStatus.CURRENT && (
                <>
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-teal-600 to-emerald-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg shadow-teal-500/30 flex items-center gap-1 animate-bounce whitespace-nowrap z-20 ring-2 ring-white">
                        <MapPin size={10} fill="currentColor" />
                        <span>الان اینجا هستی!</span>
                    </div>
                    {/* Outer glow ring */}
                    <span className="absolute inset-0 rounded-3xl border-2 border-teal-500/30 animate-pulse-slow pointer-events-none"></span>
                </>
            )}

            {/* Completion Badge (Top Right Corner) */}
            {status === MilestoneStatus.COMPLETED && (
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-emerald-100 p-1 rounded-full">
                        <CheckCircle2 size={14} className="text-emerald-600" />
                    </div>
                </div>
            )}

            {/* Icon */}
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${getIconStyles()}`}>
                <Icon size={26} strokeWidth={2} />
            </div>

            {/* Title */}
            <h3 className={`text-sm font-bold leading-relaxed mb-3 transition-colors ${status === MilestoneStatus.LOCKED ? 'text-gray-500' : 'text-gray-800 group-hover:text-teal-700'}`}>
                {milestone.title}
            </h3>

            {/* Status Footer */}
            <div className="mt-auto w-full flex justify-center">
                {status === MilestoneStatus.COMPLETED && (
                    <div className="flex items-center gap-1.5 text-emerald-600 text-[10px] font-bold bg-emerald-50/80 px-2.5 py-1 rounded-full border border-emerald-100">
                        <CheckCircle2 size={10} strokeWidth={3} />
                        <span>تکمیل شده</span>
                    </div>
                )}
                {status === MilestoneStatus.CURRENT && (
                    <div className="flex items-center gap-1.5 text-teal-700 text-[10px] font-bold bg-teal-50 px-2.5 py-1 rounded-full border border-teal-100">
                        <Sparkles size={10} className="text-teal-500" />
                        <span>در حال انجام</span>
                    </div>
                )}
                {status === MilestoneStatus.LOCKED && (
                    <div className="flex items-center gap-1 text-gray-400 text-[10px] font-medium">
                        <Lock size={12} />
                        <span>قفل</span>
                    </div>
                )}
            </div>
        </div>
    );
};