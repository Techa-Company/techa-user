// pages/courses/index.js

"use client";
import { useEffect, useState } from "react";
import CourseCard from "../../components/courses/CourseCard";
// import Loading from "../../components/Loading";
import CoursesSkeleton from "../../components/common/CoursesSkeleton"

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.techa.me/api/Course")
      .then((response) => response.json())
      .then((data) => {
        if (data.IsSuccess) {
          setCourses(data.Data.filter((course) => !course.Disabled));
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
        setLoading(false);
      });
  }, []);

  const images = [
    "/images/sql.webp",
    "/images/sql-2.jpg",
    "/images/React.jpg",
    "/images/htmlcss.jpeg",
    "/images/tailwind.jpg",
    "/images/js.png",
  ];

  return (
    <div className="pt-32">
      <div className="container px-5 xl:px-20 mx-auto">
        <h1 className="font-extrabold text-[#042A1B] text-3xl">دوره‌های ما</h1>
        {loading ? (
          // <Loader />
          <CoursesSkeleton />
        ) : (
          <div className="grid gap-10 mt-10 lg:px-10">
            {courses.map((course, index) => {
              return (
                <CourseCard
                  key={index}
                  course={course}
                  index={index}
                  image={images[index % images.length]}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
