"use client";

import { useAuth } from "@/app/_assets/_components/contexts/AuthContext";
import NavItem from "@/app/_assets/_components/navbar/NavItem";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/assets/ghaem-platform-logo.png";
import React, { useState } from "react";
import { FiBook, FiMenu, FiX } from "react-icons/fi";

const InlineReactNavbar = () => {
  const { user } = useAuth();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  return (
    <div
      dir="rtl"
      className="w-full mx-auto bg-background h-14 flex justify-start items-center px-4"
    >
      <button className="block md:hidden" onClick={toggleMenu}>
        <FiMenu className="text-3xl text-white" />
      </button>
      <Link href={"/tutorials"}>
        <Image alt="Platform Logo" src={logo} className="h-8 w-auto" />
      </Link>

      <div className="mr-auto relative">
        <div
          className="ml-6 rounded-md overflow-hidden text-sm border border-purple-700 text-white px-4 py-2 cursor-pointer hover:bg-[#250031]"
          onClick={toggleProfile}
        >
          پروفایل
        </div>
        {isProfileOpen && (
          <div className="absolute top-12 left-0 w-72 p-4 rounded-lg bg-[#1d1d1d] shadow-lg z-50 text-white">
            <div className="flex items-center justify-between">
              <span>{user?.FullName ?? "کاربر مهمان"}</span>
              <img
                src={"profile"}
                alt="Profile"
                className="rounded-full bg-[#333] w-12 h-12"
              />
            </div>
            <div className="mt-4 flex justify-center">
              {user ? (
                <Link
                  className="px-4 py-2 bg-[#b60eb6] hover:bg-[#a60aa6] text-white rounded-lg"
                  href="/signout"
                >
                  خروج
                </Link>
              ) : (
                <>
                  <Link
                    className="px-4 py-2 bg-[#b60eb6] hover:bg-[#a60aa6] text-white rounded-lg mx-2"
                    href="/login"
                  >
                    ورود
                  </Link>
                  <Link
                    className="px-4 py-2 text-[#b60eb6] hover:text-[#a60aa6] border border-[#b60eb6] rounded-lg mx-2"
                    href="/signup"
                  >
                    ثبت نام
                  </Link>
                </>
              )}
            </div>
          </div>
        )}

        <ul
          className={`fixed top-0 left-0 w-full h-screen bg-[#1d1d1d] text-white z-50 flex flex-col transition-transform duration-300 ${
            isMenuOpen
              ? "transform translate-x-0"
              : "transform translate-x-full"
          }`}
          dir="rtl"
        >
          <div className="flex justify-between items-center px-4 py-6 border-b border-[#333]">
            <span>سامانه آموزشی تکا</span>
            <button onClick={toggleMenu}>
              <FiX className="text-3xl text-white" />
            </button>
          </div>
          <li onClick={toggleMenu}>
            <NavItem icon={<FiBook />} text="خانه" url="/" />
          </li>
          <li onClick={toggleMenu}>
            <NavItem icon={<FiBook />} text="دوره ها" url="/tutorials" />
          </li>
          <li onClick={toggleMenu}>
            <NavItem icon={<FiBook />} text="درباره ما" url="/aboutus" />
          </li>
          <li onClick={toggleMenu}>
            <NavItem icon={<FiBook />} text="تماس با ما" url="/contactus" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default InlineReactNavbar;
