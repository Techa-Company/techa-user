'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HeroSection from '../../../components/online-courses/HeroSection'
import CourseFeatures from '../../../components/online-courses/CourseFeatures'
import Curriculum from '../../../components/online-courses/Curriculum'
import InstructorSection from '../../../components/online-courses/InstructorSection'
import TestimonialsSlider from '../../../components/online-courses/TestimonialsSlider'
import FixedFooter from '../../../components/online-courses/FixedFooter'
import VideoModal from '../../../components/online-courses/VideoModal'
import FAQs from '../../../components/online-courses/FAQs'
import { RiQuestionAnswerLine } from 'react-icons/ri'
import Link from 'next/link'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import CourseContent from "../../../components/docs/CourseContent"
import Exercises from '../../../components/courses/course/Exercises'
import Comments from '../../../components/courses/course/Comments'
import TabButtons from '../../../components/courses/course/TabButtons'
import TabButtonsSkeleton from '../../../components/courses/course/TabButtonsSkeleton'
import TabContent from '../../../components/courses/course/TabContent'
import CourseTitleSkeleton from '../../../components/courses/course/CourseTitleSkeleton'


const CoursePage = () => {
    const params = useParams();
    const router = useRouter();

    const [loading, setLoading] = useState(false)
    const searchParams = useSearchParams();
    const tabParam = searchParams.get("tab");
    const initialTabIndex = tabParam ? parseInt(tabParam) : 0;
    const [activeTab, setActiveTab] = useState(initialTabIndex);

    const { id } = params;


    const tabContent = [
        {
            id: 0,
            title: "اطلاعات دوره",
            content: <CourseContent />,
        },
        {
            id: 1,
            title: "تمرین‌ها",
            content: <h1>تمرین ها</h1>,
        },
        {
            id: 2,
            title: "نظرات کاربران",
            content: <h1>نظرات کاربران</h1>,
        },
    ];

    // تعریف انیمیشن‌ها برای تب‌ها
    const tabVariants = {
        initial: {
            opacity: 0,
            x: 50,
        },
        animate: {
            opacity: 1,
            x: 0,
        },
        exit: {
            opacity: 0,
            x: -50,
        },
    };

    // تابع برای تغییر تب و به‌روزرسانی URL
    const handleTabChange = (index) => {
        setActiveTab(index);
        router.push(`${window.location.pathname}?tab=${index}`, undefined, {
            shallow: true,
        });
    };


    return (
        <div>
            {/* عنوان و تب‌ها */}
            <div className="flex flex-col sm:flex-row gap-5 justify-between items-center">
                {loading ? (
                    <CourseTitleSkeleton />
                ) : (
                    // <CourseTitle title={courseDetails?.Title} />
                    <div>دوره آموزشی</div>
                )}
                {loading ? (
                    <TabButtonsSkeleton />
                ) : (
                    <TabButtons
                        tabs={tabContent}
                        activeTab={activeTab}
                        onTabChange={handleTabChange}
                    />
                )}
            </div>

            {/* محتوای تب‌ها */}
            {!loading && (
                <TabContent
                    activeTab={activeTab}
                    tabs={tabContent}
                    variants={tabVariants}
                />
            )}
        </div>
    )
}

export default CoursePage