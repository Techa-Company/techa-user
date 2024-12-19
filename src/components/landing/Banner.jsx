import Image from "next/image";

const Banner = () => {
    return (
        <div className="pt-40 pb-10 bg-[#042A1B] h-fit relative">
            <div className="container mx-auto px-20">
                <div className="grid grid-cols-2 gap-20 items-center">
                    <div>
                        <h1 className="text-[#042A1B] text-4xl font-extrabold bg-[#F6DC66] py-3 px-5 rounded-xl w-fit tracking-tighter">آموزش و توسعه آنلاین</h1>
                        <div className="pr-3 font-semibold text-white text-[26px] mt-7 leading-[50px] w-fit">
                            لذت آموزش و کدنویسی آنلاین در بستر وب <br />
                            بدون نیاز به نصب هیچگونه نرم افزار و ابزار جانبی
                            <div className="relative w-full h-3 mt-2">
                                <Image className="object-cover" src="/images/line.svg" layout="fill" alt="banner" />
                            </div>
                        </div>
                        <div className="pr-3 mt-20 flex items-center">
                            <div className="w-2 h-2 rotate-45 bg-[#7AE36A]"></div>
                            <div className="w-32 h-0.5 bg-[#7AE36A] rounded-full"></div>
                        </div>
                        <p className="font-light text-white my-5 pr-3">
                            برای عضویت و اطلاع از دوره‌ها، شماره تماس خود را وارد نمایید.
                        </p>
                    </div>
                    <div className=" flex justify-end">
                        <Image width={500} height={300} src="/images/Pic.svg" alt="banner" />
                    </div>
                </div>
            </div>
            <img className="absolute -bottom-32 w-full h-32" src="/images/banner.png" alt="banner" />

        </div>
    );
};

export default Banner;