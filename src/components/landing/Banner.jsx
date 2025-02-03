"use client"
import { useState } from 'react';
import Image from 'next/image';

const Banner = () => {
    const [inputValue, setInputValue] = useState('09');

    const handleInputChange = (e) => {
        const value = e.target.value;

        if (/^\d*$/.test(value)) {
            if (value.startsWith('09') && value.length <= 11) {
                setInputValue(value);
            }
        }
    };

    return (
        <div className="pt-40 pb-20 md:pb-10 bg-[#042A1B] h-fit relative">
            <div className="container mx-auto px-5 xl:px-20">
                <div className="grid lg:grid-cols-2 gap-5 items-center">
                    <div>
                        <h1 className="text-[#042A1B] text-4xl font-extrabold bg-[#F6DC66] py-3 px-5 rounded-xl w-fit ">آموزش و توسعه آنلاین</h1>
                        <div className="pr-3 font-semibold text-white text-lg sm:text-[26px] mt-7 leading-[50px] w-fit">
                            لذت آموزش و کدنویسی آنلاین در بستر وب <br />
                            بدون نیاز به نصب هیچگونه نرم افزار جانبی
                            <div className="relative w-full h-3 mt-2">
                                <Image className="object-cover" src="/images/line.svg" layout="fill" alt="banner" />
                            </div>
                        </div>
                        <div className="pr-3 mt-10 lg:mt-20 flex items-center">
                            <div className="w-2 h-2 rotate-45 bg-[#7AE36A]"></div>
                            <div className="w-32 h-0.5 bg-[#7AE36A] rounded-full"></div>
                        </div>
                        <p className="font-light text-white my-5 pr-3">
                            برای عضویت و اطلاع از دوره‌ها، شماره تماس خود را وارد نمایید.
                        </p>
                        <div className="bg-white max-w-full w-fit flex gap-5 items-center rounded-full p-2">
                            <div className='lg:w-fit'>
                                <input
                                    inputMode='numeric'
                                    style={{ direction: "ltr" }}
                                    className="max-w-40 sm:max-w-full w-full text-xl font-semibold text-black focus:outline-none"
                                    type="text"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="flex items-center gap-5">
                                <div className="flex items-center gap-2">
                                    {/* <h3 style={{ direction: "ltr" }} className="font-semibold text-[#042A1B] text-xl">+98</h3> */}
                                    <img src="/images/Iran.svg" alt="" />
                                </div>
                                <button className="py-3 px-5 bg-[#7AE36A] text-black text-xl font-semibold rounded-full">عضویت</button>
                            </div>
                        </div>
                    </div>
                    <div className="relative w-full pb-[85%] mt-10 lg:mt-0">
                        <Image src="/images/Pic.svg" layout="fill" objectFit="cover" alt="banner" />
                    </div>
                </div>
            </div>
            <img className="hidden md:block absolute -bottom-32 w-full h-32" src="/images/banner.png" alt="banner" />
        </div>
    );
};

export default Banner;
