"use client"
import React, { useState, useEffect } from 'react';
import { CheckIcon, SmallCheckIcon } from '../Icons/Icons';
import Link from 'next/link';
import { ChevronDown, PanelTopOpen } from 'lucide-react';

const Accordion = ({ title, subtitle, content, isOpen, onClick }) => {
    return (
        <div className='border lg:border-[#D0DDD1] border-white rounded-2xl mb-5'>
            <div className={`flex items-center justify-between py-3 transition-colors duration-300 cursor-pointer px-3 lg:px-5 rounded-2xl ${isOpen ? "lg:bg-[#D0DDD140]" : "bg-transparent"}`} onClick={onClick}>
                <div className='flex items-center gap-3'>
                    <div className='w-9 h-9 flex justify-center items-center rounded-full bg-[#7AE36A]'>
                        <CheckIcon />
                    </div>
                    <div>
                        <p className='text-white lg:text-[#042A1B] text-sm opacity-50'>{title}</p>
                        <h3 className='text-white lg:text-[#042A1B] text-[16px] font-medium'>{subtitle}</h3>
                    </div>
                </div>
                <button className='text-[#7AE36A] lg:text-black'>
                    <ChevronDown className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`} />
                </button>
            </div>
            <div className={`overflow-hidden transition-all duration-500 px-3 lg:px-5 ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
                <div className='py-5 text-white lg:text-[#042A1B]'>
                    {content}
                </div>
            </div>
        </div>
    );
};

const Sidebar = () => {
    const [openAccordion, setOpenAccordion] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [topPosition, setTopPosition] = useState(72);

    const toggleAccordion = (index) => {
        setOpenAccordion(openAccordion === index ? -1 : index);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleScroll = () => {
        if (window.scrollY > 20) {
            setTopPosition(56);
        } else {
            setTopPosition(72);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const generateContent = (length) => (
        <ul className='flex flex-col gap-7'>
            {Array.from({ length }, (_, index) => {
                const minutes = Math.floor(Math.random() * 60) + 1;
                return (
                    <li className='relative' key={index}>
                        <Link className='flex items-center justify-between' href={`/courses/${index + 1}/${index + 1}`}>
                            <div className='flex items-center gap-3'>
                                <span className='w-5 h-5 flex justify-center items-center rounded-full bg-[#7AE36A]'>
                                    <SmallCheckIcon />
                                </span>
                                <p className='font-medium text-lg '>متغیر ها</p>
                            </div>
                            <span className='text-white lg:text-[#042A1B] opacity-50 font-light'>{minutes} دقیقه</span>
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
        <aside className={`min-w-80 fixed lg:static z-30 lg:z-0 bg-[#042A1B] lg:bg-transparent shadow-xl lg:shadow-none top-[${topPosition}px] bottom-0 py-10 lg:py-0 px-5 transition-all duration-200 ${isSidebarOpen ? '-right-0' : '-right-80'}`}>
            <h1 className=" font-bold text-white lg:text-[#042A1B] text-3xl">
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
            <div className='w-9 h-9 lg:hidden absolute -left-9 top-16 flex justify-center items-center bg-[#042A1B] rounded-l-lg cursor-pointer' onClick={toggleSidebar}>
                <PanelTopOpen className={`transition-transform duration-200 ${isSidebarOpen ? "-rotate-90" : "rotate-90"} text-[#7AE36A]`} />
            </div>
        </aside>
    );
};

export default Sidebar;