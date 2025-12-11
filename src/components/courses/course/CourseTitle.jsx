"use client"
const CourseTitle = ({ title }) => {
    return (
        <h1 className="font-extrabold text-black text-3xl">
            دوره آموزشی <span className="font-black">{title}</span>
        </h1>
    );
};

export default CourseTitle;
