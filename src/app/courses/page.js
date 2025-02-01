"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import CourseCard from "../../components/courses/CourseCard"
export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://45.139.10.84:5000/api/Course")
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
          <div className="flex justify-center items-center h-64">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="grid gap-10 mt-10 lg:px-10">
            {courses.map((course, index) => {
              return (
                <CourseCard key={index} course={course} index={index} image={images[index % images.length]} />
              )
            })}
          </div>
        )}
      </div>
    </div>
  );
}
