// components/Banner.js
"use client"
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import Image from 'next/image';
import { toast } from "react-toastify";

const Banner = () => {
    const [phone, setPhone] = useState('09')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async () => {
        if (phone.length !== 11) {
            toast.error('شماره موبایل باید 11 رقمی باشد')
            return
        }

        setIsSubmitting(true)
        try {
            const response = await fetch('http://45.139.10.84:7000/api/numbers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phone })
            })

            const data = await response.json()
            if (response.ok) {
                toast.success('درخواست با موفقیت ثبت شد!')
                setPhone('09')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error('خطا در ارتباط با سرور')
        } finally {
            setIsSubmitting(false)
        }
    }


    const handlePhoneChange = (e) => {
        const value = e.target.value
        const cleaned = value.replace(/\D/g, '').slice(0, 11)

        if (cleaned.startsWith('09')) {
            setPhone(cleaned)
        }
    }

    const phrases = [
        "اعتبار بگیر",
        "مسلط شو",
        "درآمد کسب کن",
        "اعتبار بگیر، مسلط شو، در آمد کسب کن"
    ];

    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
    const [currentText, setCurrentText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const controls = useAnimation();
    const cursorControls = useAnimation();

    // تنظیمات انیمیشن
    const typingSpeed = 50;
    const deletingSpeed = 50;
    const pauseDuration = 2500;
    const phraseChangeSpeed = 500;

    // انیمیشن مکان‌نما
    useEffect(() => {
        cursorControls.start({
            opacity: [0, 1, 0],
            transition: { repeat: Infinity, duration: 0.8 }
        });
    }, []);

    useEffect(() => {
        const handleTyping = async () => {
            const fullText = phrases[currentPhraseIndex];

            if (!isDeleting) {
                // حالت تایپ کردن
                setCurrentText(fullText.substring(0, currentText.length + 1));

                await controls.start({
                    x: 0,
                    opacity: 1,
                    transition: { duration: typingSpeed / 1000 }
                });

                if (currentText === fullText) {
                    await new Promise(resolve => setTimeout(resolve, pauseDuration));
                    setIsDeleting(true);
                }
            } else {
                // حالت پاک کردن
                setCurrentText(fullText.substring(0, currentText.length - 1));

                await controls.start({
                    x: -50,
                    opacity: 0.5,
                    transition: { duration: deletingSpeed / 1000 }
                });

                if (currentText === "") {
                    setIsDeleting(false);
                    setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
                    await new Promise(resolve => setTimeout(resolve, phraseChangeSpeed));
                }
            }
        };

        const timer = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
        return () => clearTimeout(timer);
    }, [currentText, isDeleting, currentPhraseIndex]);



    return (
        <div className="pt-40 pb-20 md:pb-10 bg-[#042A1B] h-fit relative">
            <div className="container mx-auto px-5 xl:px-20">
                <div className="grid lg:grid-cols-2 gap-x-20 gap-5 items-center">
                    <div>
                        {/* <h1 className="text-[#042A1B] text-4xl font-extrabold bg-[#F6DC66] py-3 px-5 rounded-xl w-fit ">
                            اعتبار بگیر، مسلط شو، در آمد کسب کن
                        </h1> */}

                        <div className="flex w-fit">
                            <div className="relative">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-xl sm:text-4xl font-extrabold text-[#042A1B] bg-[#F6DC66] px-6 py-4 rounded-xl min-h-[60px] sm:min-h-[72px]"
                                >
                                    {currentText}
                                    <motion.span
                                        animate={cursorControls}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#042A1B]"
                                    />
                                </motion.div>

                                {/* افکت سایه پویا */}
                                <motion.div
                                    className="absolute inset-0 rounded-xl shadow-lg"
                                    initial={{ opacity: 0 }}
                                    animate={{
                                        opacity: [0, 0.3, 0],
                                        scale: [1, 1.1, 1]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        repeatType: "loop"
                                    }}
                                />
                            </div>
                        </div>
                        <div className="pr-3 font-semibold text-white text-lg sm:text-[26px] mt-7 leading-[50px] w-fit">
                            تکا مجموعه ای در بدنه دانشگاه، با هدف توانمند سازی دانشجویان برای ورود به بازار کار و درآمدزایی مستقل، از طریق آموزش چند رسانه ای و کارآموزی مهارت محور است
                            <div className="relative w-full h-3 mt-2">
                                <Image
                                    src="/images/line.svg"
                                    fill
                                    style={{ objectFit: "cover" }}
                                    alt="banner"
                                />
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
                                    value={phone}
                                    onChange={handlePhoneChange}
                                />
                            </div>
                            <div className="flex items-center gap-5">
                                <div className="flex items-center gap-2">
                                    <img src="/images/Iran.svg" alt="" />
                                </div>
                                <button
                                    onClick={handleSubmit}
                                    className="py-3 px-5 bg-[#7AE36A] text-black text-xl font-semibold rounded-full">
                                    {isSubmitting ? 'در حال ثبت...' : 'عضویت'}

                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="relative w-full pb-[110%] mt-10 lg:mt-0">
                        <Image
                            src="/images/aster.png"
                            fill
                            style={{ objectFit: "cover" }}
                            alt="banner"
                        />
                    </div>
                </div>
            </div>
            <img className="hidden md:block absolute -bottom-32 w-full h-32" src="/images/banner.png" alt="banner" />
        </div>
    );
};

export default Banner;