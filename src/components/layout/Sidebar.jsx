"use client";
import React, { useState, useEffect } from 'react';
import { CheckIcon, SmallCheckIcon } from '../Icons/Icons';
import Link from 'next/link';
import { ChevronDown, PanelTopOpen } from 'lucide-react';
import { useParams } from 'next/navigation'; // اضافه کردن useParams

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
    const [contents, setContents] = useState([]);
    const [loading, setLoading] = useState(true);

    // دریافت courseId از URL
    const params = useParams();
    const courseId = params.courseId;

    useEffect(() => {
        // دریافت داده‌ها از API
        const fetchData = async () => {
            try {
                const response = await fetch(`http://45.139.10.84:5000/api/Content`);
                const data = await response.json();

                // بررسی ساختار پاسخ و فیلتر داده‌ها بر اساس CourseId
                if (data.Data && Array.isArray(data.Data)) {
                    const filteredData = data.Data.filter(item => item.CourseId === parseInt(courseId));
                    setContents(filteredData);
                } else {
                    console.error("Invalid data format:", data);
                    setContents([]); // مقدار پیش‌فرض برای جلوگیری از خطا
                }
            } catch (error) {
                console.error("Error fetching content:", error);
                setContents([]); // مقدار پیش‌فرض برای جلوگیری از خطا
            } finally {
                setLoading(false);
            }
        };

        if (courseId) {
            fetchData();
        }
    }, [courseId]);

    const toggleAccordion = (index) => {
        setOpenAccordion(openAccordion === index ? -1 : index);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
        document.body.style.overflow = isSidebarOpen ? 'auto' : 'hidden';
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

    // گروه‌بندی داده‌ها بر اساس ParentId
    const groupedContents = (contents || []).reduce((acc, content) => {
        if (!content.ParentId) {
            acc[content.Id] = { ...content, children: [] };
        } else {
            if (acc[content.ParentId]) {
                acc[content.ParentId].children.push(content);
            }
        }
        return acc;
    }, {});

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <aside
            className={`min-w-80 fixed lg:static z-30 lg:z-0 bg-[#042A1B] lg:bg-transparent shadow-xl lg:shadow-none bottom-0 py-10 lg:py-0 px-5 transition-all duration-200`}
            style={{ right: isSidebarOpen ? '0' : '-320px', top: `${topPosition}px` }}
        >
            <h1 className=" font-bold text-white lg:text-[#042A1B] text-3xl">
                سرفصل ها
            </h1>
            <div className='mt-8 overflow-y-auto' style={{ maxHeight: 'calc(100vh - 72px)' }}>
                {Object.values(groupedContents).map((content, index) => (
                    <Accordion
                        key={content.Id}
                        title={`فصل ${index + 1}`}
                        subtitle={content.Title}
                        content={
                            <ul className='flex flex-col gap-7'>
                                {content.children.map((child) => (
                                    <li className='relative' key={child.Id}>
                                        <Link className='flex items-center justify-between' href={`/courses/${courseId}/${child.Id}`}>
                                            <div className='flex items-center gap-3'>
                                                <span className='w-5 h-5 flex justify-center items-center rounded-full bg-[#7AE36A]'>
                                                    <SmallCheckIcon />
                                                </span>
                                                <p className='font-medium text-lg '>{child.Title}</p>
                                            </div>
                                            <span className='text-white lg:text-[#042A1B] opacity-50 font-light'>{child.Duration} دقیقه</span>
                                        </Link>
                                        {content.children.indexOf(child) !== content.children.length - 1 && (
                                            <span className='absolute right-2.5 top-8 border-r-2 border-dashed h-5'></span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        }
                        isOpen={openAccordion === index}
                        onClick={() => toggleAccordion(index)}
                    />
                ))}
            </div>
            <div className='w-9 h-9 lg:hidden absolute -left-9 top-16 flex justify-center items-center bg-[#042A1B] rounded-l-lg cursor-pointer' onClick={toggleSidebar}>
                <PanelTopOpen className={`transition-transform duration-200 ${isSidebarOpen ? "-rotate-90" : "rotate-90"} text-[#7AE36A]`} />
            </div>
        </aside>
    );
};

export default Sidebar;