"use client"
const DocTitle = ({ title }) => {
    return (
        <h1 className="font-extrabold text-[#042A1B] text-3xl">
            دوره آموزشی <span className="font-bold">{title}</span>
        </h1>
    );
};

export default DocTitle;
