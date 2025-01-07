"use client"
import React, { useState } from 'react';
import { BottomAngleIcon, CheckIcon, SmallCheckIcon } from '../Icons/Icons';
import Link from 'next/link';

const Accordion = ({ title, subtitle, content, isOpen, onClick }) => {
    return (
        <div className='border border-[#D0DDD1] rounded-2xl px-5 mb-5'>
            <div className='flex items-center justify-between py-3 cursor-pointer' onClick={onClick}>
                <div className='flex items-center gap-3'>
                    <div className='w-11 h-11 flex justify-center items-center rounded-full bg-[#7AE36A]'>
                        <CheckIcon />
                    </div>
                    <div>
                        <p className='text-[#042A1B] text-[15px] opacity-50 -mb-1'>{title}</p>
                        <h3 className='text-[#0412A1B] text-[17px] '>{subtitle}</h3>
                    </div>
                </div>
                <button>
                    <BottomAngleIcon />
                </button>
            </div>
            <div className={`overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
                <div className='py-5'>
                    {content}
                </div>
            </div>
        </div>
    );
};

const Sidebar = () => {
    const [openAccordion, setOpenAccordion] = useState(0);

    const toggleAccordion = (index) => {
        setOpenAccordion(openAccordion === index ? -1 : index);
    };

    const generateContent = (length) => (
        <ul className='flex flex-col gap-7'>
            {Array.from({ length }, (_, index) => {
                const minutes = Math.floor(Math.random() * 60) + 1;
                return (
                    <li className='relative' key={index}>
                        <Link className='flex items-center justify-between' href="">
                            <div className='flex items-center gap-3'>
                                <span className='w-6 h-6 flex justify-center items-center rounded-full bg-[#7AE36A]'>
                                    <SmallCheckIcon />
                                </span>
                                <p className='font-medium text-lg '>متغیر ها</p>
                            </div>
                            <span className='text-[#042A1B] opacity-50 font-light'>{minutes} دقیقه</span>
                        </Link>
                        {index !== length - 1 && (
                            <span className='absolute right-2.5 top-8 border-r-2 border-dashed h-5'></span>
                        )}
                    </li>
                );
            })}
        </ul>
    );

    return (
        <aside className='min-w-80'>
            <h1 className=" font-bold text-[#042A1B] text-3xl">
                سرفصل ها
            </h1>
            <div className='mt-8'>
                <Accordion title="فصل اول" subtitle="مقدمه ای بری ReactJS" content={generateContent(5)} isOpen={openAccordion === 0} onClick={() => toggleAccordion(0)} />
                <Accordion title="فصل دوم" subtitle="مفاهیم پیشرفته" content={generateContent(3)} isOpen={openAccordion === 1} onClick={() => toggleAccordion(1)} />
                <Accordion title="فصل سوم" subtitle="پروژه عملی" content={generateContent(4)} isOpen={openAccordion === 2} onClick={() => toggleAccordion(2)} />
                <Accordion title="فصل سوم" subtitle="پروژه عملی" content={generateContent(6)} isOpen={openAccordion === 3} onClick={() => toggleAccordion(3)} />
                <Accordion title="فصل سوم" subtitle="پروژه عملی" content={generateContent(3)} isOpen={openAccordion === 4} onClick={() => toggleAccordion(4)} />
                <Accordion title="فصل سوم" subtitle="پروژه عملی" content={generateContent(2)} isOpen={openAccordion === 5} onClick={() => toggleAccordion(5)} />
            </div>
        </aside>
    );
};

export default Sidebar;