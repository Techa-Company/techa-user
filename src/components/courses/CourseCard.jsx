import Link from 'next/link';
import React from 'react';
import { motion } from "framer-motion";
import Image from 'next/image';

const CourseCard = ({ course, index, image }) => {



    const truncateDescription = (description) => {
        const div = document.createElement("div");
        div.innerHTML = description || "توضیحات در دسترس نیست.";
        const text = div.innerText;
        return text.split(" ").slice(0, 30).join(" ") + "...";
    };
    return (
        <motion.div
            key={course.Id}
            className="custom-shadow rounded-3xl flex flex-col md:flex-row p-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
        >
            {/* تصویر دوره */}
            <div className="relative w-full h-48 md:w-80 md:h-48 rounded-3xl overflow-hidden">
                <Image
                    src={image}
                    alt="banner"
                    fill
                    // className="object-cover"
                    objectFit="cover"
                />
            </div>
            {/* محتوای دوره */}
            <div className="text-[#042A1B] p-5 flex flex-col justify-between">
                <div>
                    <h3 className="mb-3 text-2xl font-extrabold">
                        {course.Title}
                    </h3>
                    <p className="text-sm text-justify leading-7">
                        {truncateDescription(course.Description)}
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-5 text-center mt-5 w-full md:w-60">
                    <Link
                        className="text-sm font-normal bg-[#D0DDD140] py-2.5 rounded-xl hover:bg-[#7AE36A] hover:text-[#fff] transition-colors"
                        href={`courses/${course.Id}`}
                    >
                        مشاهده دوره
                    </Link>
                    <Link
                        className="text-sm font-normal bg-[#D0DDD140] py-2.5 rounded-xl hover:bg-[#7AE36A] hover:text-[#fff] transition-colors"
                        href=""
                    >
                        اجرای بر خط
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default CourseCard;