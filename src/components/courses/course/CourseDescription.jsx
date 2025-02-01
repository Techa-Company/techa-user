// components/CourseDescription.js
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const CourseDescription = ({ description }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);

    return (
        <div>
            <div
                className={`overflow-hidden text-[17.5px] text-[#042A1B] text-justify leading-7 font-normal transition-all duration-500 relative ${showFullDescription ? 'max-h-screen' : 'max-h-40'
                    }`}
            >
                <div
                    dangerouslySetInnerHTML={{
                        __html: description || '',
                    }}
                ></div>
                {!showFullDescription && (
                    <span className="absolute w-full bg-white h-5 bottom-0 opacity-70"></span>
                )}
            </div>
            <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="mt-2 flex items-center font-semibold gap-2 text-[#7AE36A]"
            >
                {showFullDescription ? 'مشاهده کمتر' : 'مشاهده بیشتر'}
                <span
                    className={`transition-transform duration-300 ${showFullDescription ? 'rotate-180' : ''
                        }`}
                >
                    <ChevronDown />
                </span>
            </button>
        </div>
    );
};

export default CourseDescription;