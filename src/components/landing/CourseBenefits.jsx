import React from 'react';

const CourseBenefits = () => {
    return (
        <div className="mt-28">
            <div className="container mx-auto px-5 2xl:px-20">
                <div className="text-[#042A1B] text-center">
                    <h1 className="font-extrabold text-4xl ">
                        مـــزایای <span className="bg-[#7AE36A] py-0.5 px-3 rounded-xl inline-block">کارآموزی</span>
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
                            <h3 className='mt-2 text-center text-xl font-bold '>آموزش و کارآموزی کاملا مجازی</h3>
                            <p className='text-center font-medium text-[16px] mt-1'>هزاران تمرین و محتوای تخصصی به همراه فیلم آموزش
                            </p>
                        </div>
                    </div>
                    <div className='relative pt-[100%] border-[5px] border-[#F6DC6526] rounded-3xl sm:rounded-full'>
                        <div className='absolute inset-0 flex flex-col justify-center items-center p-7'>
                            <div className='w-[90px] h-[90px] flex justify-center items-center bg-[#F6DC65] rounded-full mb-3'>
                                <img src="/images/Class.svg" alt="" />
                            </div>
                            <h3 className='mt-2 text-center text-xl font-bold '>پرداخت حداقل هزینه</h3>
                            <p className='text-center font-medium text-[16px] mt-1'>امکان پرداخت هزینه آموزش از حقوق کارآموزی
                            </p>
                        </div>
                    </div>
                    <div className='relative pt-[100%] border-[5px] border-[#F6DC6526] rounded-3xl sm:rounded-full'>
                        <div className='absolute inset-0 flex flex-col justify-center items-center p-7'>
                            <div className='w-[90px] h-[90px] flex justify-center items-center bg-[#F6DC65] rounded-full mb-3'>
                                <img src="/images/Work.svg" alt="" />
                            </div>
                            <h3 className='mt-2 text-center text-xl font-bold '>کسب رزومه قوی</h3>
                            <p className='text-center font-medium text-[16px] mt-1'>اجرای پروژه های واقعی به همراه مربی
                            </p>
                        </div>
                    </div>
                    <div className='relative pt-[100%] border-[5px] border-[#F6DC6526] rounded-3xl sm:rounded-full'>
                        <div className='absolute inset-0 flex flex-col justify-center items-center p-7'>
                            <div className='w-[90px] h-[90px] flex justify-center items-center bg-[#F6DC65] rounded-full mb-3'>
                                <img src="/images/Online.svg" alt="" />
                            </div>
                            <h3 className='mt-2 text-center text-xl font-bold '>درآمد از استارت آپ شخصی</h3>
                            <p className='text-center font-medium text-[16px] mt-1'>رشد دادن پروژه ارائه شده و کسب منفعت مستمر</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseBenefits;
