import DocDescription from './DocDescription';
import DocInfoCard from './DocInfoCard';
import AccordionList from './AccordionList';
import { useState, useEffect } from 'react';
import { ClockIcon } from '../../Icons/Icons';
import DocDescriptionSkeleton from './DocDescriptionSkeleton';
import DocInfoCardSkeleton from './DocInfoCardSkeleton';
import AccordionSkeleton from '../../common/AccordionSkeleton';
import { CalendarClock, Clock, Code2, GitBranch, Puzzle, Terminal, Timer, Users, UsersRound } from 'lucide-react';
import { formatDuration } from "../../../helper"
import { useSelector } from 'react-redux';


const DocInfo = ({ docDetails }) => {
    const { loading } = useSelector(state => state.docs)



    const gregorianDate = docDetails?.LastContentModifiedDate;
    const faDate = new Date(gregorianDate).toLocaleDateString('fa-IR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });



    if (loading) {
        return (
            <div>
                <DocDescriptionSkeleton />
                <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 2xl:gap-10 mt-5">
                    {[...Array(4)].map((_, index) => (
                        <DocInfoCardSkeleton key={index} />
                    ))}
                </div>
                <AccordionSkeleton />
            </div>
        );
    }


    return (
        <div>
            {/* توضیحات دوره */}
            <DocDescription description={docDetails?.Description} />

            {/* اطلاعات دوره */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 2xl:gap-10 mt-5">
                <DocInfoCard
                    icon={<Timer className='w-9 h-9 text-[#065F46]' />}
                    label="مدت زمان مطالعه"
                    value={formatDuration(docDetails?.Duration)}
                />

                <DocInfoCard
                    icon={<CalendarClock className='w-9 h-9 text-[#065F46]' />}
                    label="آخرین بروزرسانی"
                    value={faDate}
                />

                <DocInfoCard
                    icon={<Puzzle className='w-9 h-9 text-[#065F46]' />}
                    label="پیش نیاز"
                    value={docDetails?.Prerequisites || "ندارد"}
                />

                <DocInfoCard
                    icon={<Users className='w-9 h-9 text-[#065F46]' />}
                    label="تعداد دانشجویان"
                    value={docDetails?.StudentCount.toLocaleString() + " نفر"}
                />
            </div>

            {/* بخش مناسب بودن دوره */}
            <div className="mt-10">
                <h1 className="font-black text-[#042A1B] text-3xl">
                    این داکیومنت برای چه کسانی مناسب است؟
                </h1>
                <div className="mt-3">
                    <p className="text-[19px] text-black text-justify leading-9 font-normal">
                        {docDetails?.TargetAudience}     </p>
                </div>
            </div>

            {/* سوالات متداول */}
            <div className="mt-14">
                <h1 className="font-extrabold text-black text-3xl">
                    سوالات متداول
                </h1>
                <AccordionList items={docDetails?.FAQs} />
            </div>
        </div>
    );
};

export default DocInfo;
