"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import DocTitle from "../../../components/courses/course/CourseTitle";
import DocInfo from "../../../components/docs/doc/DocInfo";
import DocTitleSkeleton from "../../../components/courses/course/CourseTitleSkeleton";
import VideoCourseAd from "../../../components/docs/doc/VideoCourseAd";
import VideoCourseAdEnd from "../../../components/docs/doc/VideoCourseAdEnd";
import { SP_fetch } from "../../../api/utils/api";

export default function CourseDetail() {
  const params = useParams();
  const { docId } = params;
  const [courseDetails, setCourseDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
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
    <div className="space-y-10">
      <div className="space-y-5">
        {loading ? (
          <DocTitleSkeleton />
        ) : (
          <DocTitle title={courseDetails?.title} />
        )}
        {/* بخش تبلیغاتی */}
        {!loading && courseDetails && <VideoCourseAd courseId={docId} />}
      </div>

      <DocInfo courseDetails={courseDetails} />

      {!loading && <VideoCourseAdEnd courseId={docId} />}
    </div>
  );
}
