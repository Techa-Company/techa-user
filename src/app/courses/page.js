"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://45.139.10.84:5000/api/Course")
      .then((response) => response.json())
      .then((data) => {
        if (data.IsSuccess) {
          setCourses(data.Data.filter(course => !course.Disabled));
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

  const truncateDescription = (description) => {
    const div = document.createElement("div");
    div.innerHTML = description || "توضیحات در دسترس نیست.";
    const text = div.innerText;
    return text.split(" ").slice(0, 30).join(" ") + "...";
  };

  return (
    <div className="pt-32">
      <div className="container px-5 xl:px-20 mx-auto">
        <h1 className=" font-extrabold text-[#042A1B] text-3xl">
          دوره های ما
        </h1>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="grid gap-10 mt-10 lg:px-10">
            {courses.map((course, index) => {
              return (
                <div key={course.Id} className="custom-shadow rounded-3xl flex flex-col md:flex-row p-5">
                  <Image src={images[index % images.length]} className="rounded-3xl w-full sm:min-w-80 sm:w-fit" width={300} height={200} alt="banner" />
                  <div className="text-[#042A1B] p-5">
                    <h3 className="mb-3 text-2xl font-extrabold">{course.Title}</h3>
                    <p className="text-sm text-justify leading-7">{truncateDescription(course.Description)}</p>
                    <div className="grid grid-cols-2 gap-5 text-center mt-5 w-60">
                      <Link className="text-sm font-normal bg-[#D0DDD140] py-2.5 rounded-xl hover:bg-[#7AE36A] hover:text-[#fff]" href={`courses/${course.Id}`}>
                        مشاهده دوره
                      </Link>
                      <Link className="text-sm font-normal bg-[#D0DDD140] py-2.5 rounded-xl hover:bg-[#7AE36A] hover:text-[#fff]" href="">
                        اجرای بر خط
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
