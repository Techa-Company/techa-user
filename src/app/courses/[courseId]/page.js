"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CourseTitle from "../../../components/courses/course/CourseTitle";
import TabButtons from "../../../components/courses/course/TabButtons";
import TabContent from "../../../components/courses/course/TabContent";
import CourseInfo from "../../../components/courses/course/CourseInfo";
import Exercises from "../../../components/courses/course/Exercises";
import Comments from "../../../components/courses/course/Comments";
import CourseTitleSkeleton from "../../../components/courses/course/CourseTitleSkeleton"
import TabButtonsSkeleton from "../../../components/courses/course/TabButtonsSkeleton"

export default function CourseDetail() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { courseId } = params;

  // دریافت پارامتر تب از URL
  const tabParam = searchParams.get("tab");
  const initialTabIndex = tabParam ? parseInt(tabParam) : 0;

  const [activeTab, setActiveTab] = useState(initialTabIndex);
  const [courseDetails, setCourseDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // دریافت اطلاعات دوره از API
    if (courseId) {
      fetch(`http://45.139.10.84:5000/api/Course/${courseId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.IsSuccess) {
            setCourseDetails(data.Data);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching course details:", error);
          setLoading(false);
        });
    }
  }, [courseId]);

  const tabContent = [
    {
      id: 0,
      title: "اطلاعات دوره",
      content: <CourseInfo courseDetails={courseDetails} />,
    },
    {
      id: 1,
      title: "تمرین‌ها",
      content: <Exercises courseId={courseId} />,
    },
    {
      id: 2,
      title: "نظرات کاربران",
      content: <Comments />,
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
          <CourseTitle title={courseDetails?.Title} />
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
  );

};