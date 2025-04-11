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
  const { docId } = params;



  const [courseDetails, setCourseDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // دریافت اطلاعات دوره از API
    if (docId) {
      fetch(`https://api.techa.me/api/Course/${docId}`)
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
  }, [docId]);







  return (
    <div>


      <CourseInfo courseDetails={courseDetails} />
    </div>
  );

};