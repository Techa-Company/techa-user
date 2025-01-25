import React from 'react';

const CourseBenefits = () => {
    return (
        <div className="mt-28">
            <div className="container mx-auto px-5 2xl:px-20">
                <div className="text-[#042A1B] text-center">
                    <h1 className="font-extrabold text-4xl ">
                        مـــزایای <span className="bg-[#7AE36A] py-0.5 px-3 rounded-xl inline-block">دوره ها</span>
                    </h1>
                    <p className="text-lg font-normal mt-3">
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است
                    </p>
                </div>
                <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 px-5 sm:px-0'>
                    <div className='relative pt-[100%] border-[5px] border-[#F6DC6526] rounded-3xl sm:rounded-full'>
                        <div className='absolute inset-0 flex flex-col justify-center items-center p-7'>
                            <div className='w-[90px] h-[90px] flex justify-center items-center bg-[#F6DC65] rounded-full mb-3'>
                                <img src="/images/Exercise.svg" alt="" />
                            </div>
                            <h3 className='mt-2 text-center text-xl font-bold '>تمرین‌ها و مثال‌ها</h3>
                            <p className='text-center font-medium text-[16px] mt-1'>بیش از 1200 مثال و تمرین</p>
                        </div>
                    </div>
                    <div className='relative pt-[100%] border-[5px] border-[#F6DC6526] rounded-3xl sm:rounded-full'>
                        <div className='absolute inset-0 flex flex-col justify-center items-center p-7'>
                            <div className='w-[90px] h-[90px] flex justify-center items-center bg-[#F6DC65] rounded-full mb-3'>
                                <img src="/images/Class.svg" alt="" />
                            </div>
                            <h3 className='mt-2 text-center text-xl font-bold '>کلاس مجازی</h3>
                            <p className='text-center font-medium text-[16px] mt-1'>آموزش و تمرین در بستر اسکای روم</p>
                        </div>
                    </div>
                    <div className='relative pt-[100%] border-[5px] border-[#F6DC6526] rounded-3xl sm:rounded-full'>
                        <div className='absolute inset-0 flex flex-col justify-center items-center p-7'>
                            <div className='w-[90px] h-[90px] flex justify-center items-center bg-[#F6DC65] rounded-full mb-3'>
                                <img src="/images/Work.svg" alt="" />
                            </div>
                            <h3 className='mt-2 text-center text-xl font-bold '>کارآموزی و ورود به بازار کار</h3>
                            <p className='text-center font-medium text-[16px] mt-1'>ارائه نقشه راه پروژه محور برای افزایش تجربه و مهارت</p>
                        </div>
                    </div>
                    <div className='relative pt-[100%] border-[5px] border-[#F6DC6526] rounded-3xl sm:rounded-full'>
                        <div className='absolute inset-0 flex flex-col justify-center items-center p-7'>
                            <div className='w-[90px] h-[90px] flex justify-center items-center bg-[#F6DC65] rounded-full mb-3'>
                                <img src="/images/Online.svg" alt="" />
                            </div>
                            <h3 className='mt-2 text-center text-xl font-bold '>محیط اجرای برخط </h3>
                            <p className='text-center font-medium text-[16px] mt-1'>ارائه محیط‌های اجرای برخط برای انواع زبان‌ها و کتابخانه‌های مختلف</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseBenefits;
