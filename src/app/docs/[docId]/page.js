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
  const [docDetails, setDocDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   if (docId) {
  //     fetch(`https://api.techa.me/api/Course/${docId}`)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         if (data.IsSuccess) {
  //           setDocDetails(data.Data);
  //         }
  //         setLoading(false);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching course details:", error);
  //         setLoading(false);
  //       });
  //   }
  // }, [docId]);


  useEffect(() => {
    if (docId) {
      const fetchCourses = async () => {
        try {
          const { Data, IsSuccess, Message, StatusCode } = await SP_fetch(
            "Form_Courses", {
            "@Id": docId
          });
          const docs = Data.Dataset[0];
          if (IsSuccess) setDocDetails(docs);
        } catch (error) {
          console.error("Error fetching docs:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchCourses();
    }
  }, [docId]);


  return (
    <div className="space-y-10">
      <div className="space-y-5">
        {loading ? (
          <DocTitleSkeleton />
        ) : (
          <DocTitle title={docDetails?.Title} />
        )}
        {/* بخش تبلیغاتی */}
        {!loading && docDetails && <VideoCourseAd courseId={docId} title={docDetails?.Title} />}
      </div>

      <DocInfo docDetails={docDetails} />

      {!loading && <VideoCourseAdEnd courseId={docId} title={docDetails?.Title} />}
    </div>
  );
}
