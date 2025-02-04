"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { AboutIcon, AboutLightIcon, BarsIcon, CircleXIcon, ContactIcon, ContactLightIcon, ContactUSIcon, CourseIcon, CourseLightIcon, HomeIcon, HomeLightIcon, XIcon } from '../Icons/Icons';
import { usePathname } from 'next/navigation'
const Header = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname()

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 640);
        };
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        const handleClickOutside = (event) => {
            if (isMenuOpen && !event.target.closest('.menu-container')) {
                setIsMenuOpen(false);
            }
        };

        handleResize();
        handleScroll();
        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll);
        document.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isMenuOpen]);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isMenuOpen]);

    return (
        <>
            <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 ${isMenuOpen ? 'block' : 'hidden'}`}></div>
            <header className={`fixed w-full z-50 transition-all duration-200 ${pathname === "/" ? "" : "bg-[#042A1B]"} ${scrolled ? 'shadow-2xl bg-[#042A1B] py-3' : 'py-5'}`}>
                <div className='container mx-auto px-5 xl:px-20'>
                    <nav className='flex justify-between items-center'>
                        <div className='flex items-center'>
                            <div className='lg:border-l border-[#FFFFFF33] pl-8'>
                                <Image src="/images/logo-light.svg" width={200} height={100} alt='logo' priority />
                            </div>
                            <div className={`pt-14 lg:pt-0 px-5 lg:px-0 fixed w-64 lg:w-auto ${isMenuOpen ? '-right-0' : '-right-64'} bottom-0 top-0 z-50 bg-[#042A1B] lg:bg-transparent border-8 border-r-0 rounded-2xl rounded-r-none border-[#7AE36A] lg:border-0 lg:static transition-all duration-300 menu-container`}>
                                {/* <span className='absolute top-5 left-5 lg:hidden' onClick={() => setIsMenuOpen(false)}>
                                    <CircleXIcon />
                                </span> */}
                                <Image src="/images/logo-light.svg" className='mx-auto lg:hidden' width={200} height={100} alt='logo' priority />
                                <ul className='lg:pr-8 flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-10 mt-10 lg:mt-0'>
                                    <li className='flex items-center gap-2'>
                                        <span>
                                            {!isMobile ? <HomeLightIcon /> : <HomeIcon />}
                                        </span>
                                        <Link
                                            className='font-normal text-sm text-white'
                                            onClick={() => setIsMenuOpen(false)}
                                            href="/">صفحه اصلی</Link>
                                    </li>
                                    <li className='flex items-center gap-2'>
                                        <span >
                                            {!isMobile ? <CourseLightIcon /> : <CourseIcon />}
                                        </span>
                                        <Link
                                            className='font-normal text-sm text-white'
                                            onClick={() => setIsMenuOpen(false)}
                                            href="/courses">دوره های ما</Link>
                                    </li>
                                    <li className='flex items-center gap-2'>
                                        <span >
                                            {!isMobile ? <AboutLightIcon /> : <AboutIcon />}
                                        </span>
                                        <Link
                                            className='font-normal text-sm text-white'
                                            onClick={() => setIsMenuOpen(false)}
                                            href="/about-us">درباره ما</Link>
                                    </li>
                                    <li className='flex items-center gap-2'>
                                        <span >
                                            {!isMobile ? <ContactLightIcon /> : <ContactIcon />}
                                        </span>
                                        <Link
                                            className='font-normal text-sm text-white'
                                            onClick={() => setIsMenuOpen(false)}
                                            href="/contact-us">تماس با ما</Link>
                                    </li>
                                </ul>
                                <div className='flex items-center gap-3 mt-10 justify-center lg:hidden'>
                                    <div className='text-white'>
                                        <p className='text-[12.5px] font-normal'>با ما در تماس باشید</p>
                                        <h3 className='font-bold'>021-82800003</h3>
                                    </div>
                                    <span>
                                        <ContactUSIcon />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='lg:hidden'>
                            {
                                isMenuOpen ? (
                                    <span onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                        <XIcon />
                                    </span>
                                ) : (
                                    <span onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                        <BarsIcon />
                                    </span>
                                )
                            }
                        </div>
                        <div className='hidden lg:flex items-center gap-3'>
                            <div className='text-white'>
                                <p className='text-[12.5px] font-normal'>با ما در تماس باشید</p>
                                <h3 className='font-bold'>021-82800003</h3>
                            </div>
                            <span>
                                <ContactUSIcon />
                            </span>
                        </div>
                    </nav>
                </div>
            </header>
        </>
    );
};

export default Header;
