"use client"
import React from 'react';
import {
    Code2,
    Layout,
    FileJson,
    Palette,
    Atom,
    Briefcase,
    Github,
    Users,
    GitPullRequest,
    DollarSign,
    FolderGit2,
    Star,
    Wallet,
    UserCheck,
    GraduationCap,
    Rocket,
    Trophy,
    ChevronLeft,
    Sparkles,
    TrendingUp,
    CheckCircle2,
    Lock,
    MapPin,
    Zap
} from 'lucide-react';

import MilestoneCard from "../../components/account/MilestoneCard"

// --- Constants & Data ---

export const MilestoneStatus = {
    COMPLETED: 'COMPLETED',
    CURRENT: 'CURRENT',
    LOCKED: 'LOCKED'
};

export const CURRENT_STEP_INDEX = 7; // Corresponds to ID 7: "ساخت پروفایل GitHub حرفه‌ای"
export const TOTAL_STEPS = 14;

export const PHASES = [
    {
        id: 1,
        title: 'آموزش',
        icon: GraduationCap,
        color: 'from-emerald-400 to-emerald-600',
        milestones: [
            { id: 1, title: 'تسلط بر HTML5', icon: Code2 },
            { id: 2, title: 'تسلط بر CSS3 + Flexbox & Grid', icon: Layout },
            { id: 3, title: 'JavaScript پیشرفته ', icon: FileJson },
            { id: 4, title: 'Tailwind CSS حرفه‌ای', icon: Palette },
            { id: 5, title: 'React.js (Hooks, Routing, State)', icon: Atom },
        ]
    },
    {
        id: 2,
        title: 'کارآموزی',
        icon: Briefcase,
        color: 'from-teal-400 to-teal-600',
        milestones: [
            { id: 6, title: 'انجام پروژه‌های کارآموزی واقعی', icon: FolderGit2 },
            { id: 7, title: 'ساخت پروفایل GitHub حرفه‌ای', icon: Github },
            { id: 8, title: 'کار تیمی + Git workflow', icon: Users },
            { id: 9, title: 'تکمیل پروژه گروهی / مشارکت open-source', icon: GitPullRequest },
        ]
    },
    {
        id: 3,
        title: 'فریلنسری',
        icon: Rocket,
        color: 'from-cyan-400 to-cyan-600',
        milestones: [
            { id: 10, title: 'گرفتن اولین پروژه واقعی', icon: DollarSign },
            { id: 11, title: 'ساخت پورتفولیو شخصی قوی', icon: FolderGit2 },
            { id: 12, title: 'دریافت ۳–۵ نظر مثبت مشتری', icon: Star },
            { id: 13, title: 'درآمد منظم ماهانه', icon: Wallet },
            { id: 14, title: 'فریلنسر مستقل حرفه‌ای', icon: UserCheck },
        ]
    }
];

// --- Sub-Component: MilestoneCard ---



// --- Main App Component ---

const App = () => {
    const progressPercentage = Math.round(((CURRENT_STEP_INDEX - 1) / TOTAL_STEPS) * 100);
    const remainingSteps = TOTAL_STEPS - (CURRENT_STEP_INDEX - 1);

    const getMilestoneStatus = (id) => {
        if (id < CURRENT_STEP_INDEX) return MilestoneStatus.COMPLETED;
        if (id === CURRENT_STEP_INDEX) return MilestoneStatus.CURRENT;
        return MilestoneStatus.LOCKED;
    };

    const currentMilestone = PHASES
        .flatMap(p => p.milestones)
        .find(m => m.id === CURRENT_STEP_INDEX);

    return (
        <div className="  bg-gray-50/50 selection:bg-teal-100 selection:text-teal-900 relative ">

            {/* Animated Background Blobs */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
                <div className="absolute top-0 -left-4 w-72 h-72 bg-teal-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-32 left-20 w-80 h-80 bg-lime-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            {/* Header */}
            <header className="bg-white/70 backdrop-blur-xl border-b border-white/20  shadow-sm -mt-10">
                <div className=" mx-auto px-4 sm:px-6 py-2">
                    <div className="flex items-center justify-between gap-6">

                        <div className="flex items-center gap-3 group cursor-pointer">
                            <div className="w-11 h-11 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30 transform group-hover:rotate-12 transition-transform duration-300">
                                <Trophy className="text-white w-6 h-6" strokeWidth={2} />
                            </div>
                            <div>
                                <h1 className="text-lg font-black text-gray-800 leading-tight group-hover:text-emerald-700 transition-colors">مسیر فرانت‌اند</h1>
                                <p className="text-[11px] text-gray-500 font-bold tracking-wide">نقشه راه حرفه‌ای ۲۰۲۵</p>
                            </div>
                        </div>

                        <div className="flex-1 max-w-sm hidden sm:block">
                            <div className="bg-white/50 border border-white/60 p-3 rounded-2xl shadow-sm backdrop-blur-md">
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center gap-1.5">
                                        <TrendingUp size={14} className="text-emerald-600" />
                                        <span className="text-xs font-bold text-gray-600">پیشرفت کلی</span>
                                    </div>
                                    <span className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-l from-emerald-600 to-teal-500">{progressPercentage}٪</span>
                                </div>
                                <div className="h-2 w-full bg-gray-200/50 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-l from-emerald-500 via-teal-400 to-lime-400 rounded-full relative transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                                        style={{ width: `${progressPercentage}%` }}
                                    >
                                        <div className="absolute inset-0 bg-white/30 w-full h-full animate-[shimmer_2s_infinite] skew-x-12"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="text-center mt-7 relative">

                <h1 className="text-4xl md:text-6xl font-black text-emerald-950 tracking-tighter mb-6 drop-shadow-sm">
                    مسیر تبدیل شدن به <br className="md:hidden" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 animate-shine bg-[length:200%_auto]">توسعه‌دهنده ارشد</span>
                </h1>

                <p className="text-emerald-800/70 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
                    نقشه راه تعاملی برای تسلط بر فرانت‌اند.
                    <span className="hidden md:inline">از صفر تا اولین حقوق  فریلنسری.</span>
                </p>
            </div>

            {/* Main Content */}
            <main className=" px-4 sm:px-6 py-7 relative z-10">

                {/* Mobile Stats Card */}
                <div className="sm:hidden mb-10 p-5 bg-gradient-to-br from-white to-gray-50 rounded-3xl border border-emerald-100/50 shadow-lg shadow-emerald-100/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/5 rounded-full -mr-10 -mt-10 blur-xl"></div>
                    <div className="relative z-10">
                        <div className="flex justify-between items-end mb-3">
                            <div>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">در حال یادگیری</span>
                                <span className="text-sm font-black text-gray-800">{currentMilestone?.title}</span>
                            </div>
                            <span className="text-2xl font-black text-teal-600">{progressPercentage}<span className="text-base align-top opacity-50">٪</span></span>
                        </div>
                        <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden ring-1 ring-gray-100">
                            <div className="h-full bg-gradient-to-l from-emerald-500 to-teal-400 w-1/2 rounded-full shadow-[0_0_10px_rgba(20,184,166,0.4)]" style={{ width: `${progressPercentage}%` }}></div>
                        </div>
                    </div>
                </div>

                <div className="relative">
                    {/* Vertical Continuous Line (Left side - Corrected for RTL) */}
                    <div className="absolute right-4 md:right-[2rem] top-6 bottom-0 w-1.5 bg-gray-200/60 rounded-full hidden md:block"></div>

                    {/* Active Gradient Line Overlay */}
                    <div
                        className="absolute right-4 md:right-[2rem] top-6 w-1.5 bg-gradient-to-b from-emerald-500 via-teal-400 to-transparent rounded-full hidden md:block transition-all duration-1000 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                        style={{ height: `${Math.min(progressPercentage + 10, 100)}%` }}
                    ></div>

                    <div className="space-y-10 md:space-y-10">
                        {PHASES.map((phase, phaseIndex) => {
                            const PhaseIcon = phase.icon;
                            const isPhaseActiveOrDone = phase.milestones[0].id <= CURRENT_STEP_INDEX;

                            return (
                                <div key={phase.id} className="relative md:pr-28 group/phase">

                                    {/* Timeline Node Marker */}
                                    <div className={`
                                                    hidden md:flex absolute right-0 top-0 w-[4.5rem] h-[4.5rem] rounded-[1.25rem] items-center justify-center z-10 border-[6px] border-gray-50 transition-all duration-500 shadow-xl
                                                    ${isPhaseActiveOrDone
                                            ? `bg-gradient-to-br ${phase.color} text-white scale-100 ring-4 ring-emerald-50`
                                            : 'bg-gray-100 text-gray-300 scale-95 grayscale'}
                                                 `}>
                                        <PhaseIcon size={32} className={isPhaseActiveOrDone ? 'drop-shadow-md' : ''} />

                                        {/* Connecting line to title */}
                                        <div className={`absolute top-1/2 -left-8 w-8 h-1 ${isPhaseActiveOrDone ? 'bg-emerald-200' : 'bg-gray-200'} -z-10`}></div>
                                    </div>

                                    {/* Phase Content */}
                                    <div>
                                        {/* Phase Header */}
                                        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
                                            {/* Mobile Icon */}
                                            <div className="md:hidden flex items-center gap-3 mb-2">
                                                <div className={`
                          w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg
                          ${isPhaseActiveOrDone ? `bg-gradient-to-br ${phase.color} text-white` : 'bg-gray-200 text-gray-400'}
                        `}>
                                                    <PhaseIcon size={22} />
                                                </div>
                                                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-100">
                                                    فاز {phase.id}
                                                </span>
                                            </div>

                                            <div className="relative">
                                                <h2 className={`text-3xl font-black tracking-tight mb-1 ${isPhaseActiveOrDone ? 'text-gray-800' : 'text-gray-400'}`}>
                                                    {phase.title}
                                                </h2>
                                                <div className="hidden md:block absolute -top-4 -right-6 text-[8rem] font-black text-gray-100/50 -z-10 select-none pointer-events-none">
                                                    {phase.id}
                                                </div>
                                                {/* Desktop Phase Badge */}
                                                <span className="hidden md:inline-block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] bg-white px-2 py-0.5 rounded border border-gray-100 mt-1">
                                                    سطح {phaseIndex + 1}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Milestones Grid */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
                                            {phase.milestones.map((milestone, mIdx) => (
                                                <div
                                                    key={milestone.id}
                                                    className="transition-all duration-700"
                                                    style={{ transitionDelay: `${mIdx * 100}ms` }}
                                                >
                                                    <MilestoneCard
                                                        milestone={milestone}
                                                        status={getMilestoneStatus(milestone.id)}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </main>

            {/* Footer CTA */}
            {/* <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-white/50 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] z-30">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center border border-yellow-100 animate-pulse-slow">
                                <Sparkles className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                            </div>
                            <p className="text-gray-700 font-medium text-sm md:text-base">
                                فقط <span className="text-xl mx-1 text-transparent bg-clip-text bg-gradient-to-br from-emerald-600 to-teal-600 font-black font-sans">{remainingSteps}</span> قدم تا اولین درآمد واقعی فاصله داری! 🚀
                            </p>
                        </div>

                        <button className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white rounded-2xl font-bold shadow-lg shadow-emerald-500/30 transform transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 group ring-4 ring-emerald-500/20">
                            <span className="text-lg">قدم بعدی</span>
                            <div className="bg-white/20 p-1 rounded-full group-hover:translate-x-[-2px] transition-transform">
                                <ChevronLeft className="w-4 h-4" strokeWidth={3} />
                            </div>
                        </button>
                    </div>
                </div>
            </footer> */}


        </div>
    );
};

export default App;