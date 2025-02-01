// components/CourseInfoCard.js
const CourseInfoCard = ({ icon, label, value }) => {
    return (
        <div className="bg-[#D0DDD140] rounded-xl py-5 px-5">
            <span>{icon}</span>
            <p className="text-[#042A1B7F] text-[14px] font-normal mt-4">{label}</p>
            <h4 className="text-[#042A1B] font-bold text-xl">{value}</h4>
        </div>
    );
};

export default CourseInfoCard;
