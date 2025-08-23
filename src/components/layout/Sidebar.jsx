"use client";
import React, { useState, useEffect } from "react";
import { PanelTopOpen } from "lucide-react";
import { useParams } from "next/navigation";
import Accordion from "../../components/sidebar/Accordion";
import SidebarSkeleton from "../../components/common/SidebarSkeleton";
import Link from "next/link";
import { CheckIcon, SmallCheckIcon } from "../Icons/Icons";
import { SP_fetch } from "../../api/utils/api";

const Sidebar = () => {
  const [openAccordion, setOpenAccordion] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [topPosition, setTopPosition] = useState(72);
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const docId = params.docId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        /*  const response = await fetch(`https://api.techa.me/api/Content`);
        const data = await response.json();
*/
        const res = await SP_fetch("Report_Contents", {
          "@CourseId": docId,
          "@GetAll": true,
        });
        const { Data, IsSuccess, Message, StatusCode } = res;
        const raw = Data.Dataset;
        console.log(raw, "raw");
        if (raw && Array.isArray(raw)) {
          setContents(raw);
        } else {
          console.error("Invalid data format:", Data);
          setContents([]);
        }
      } catch (error) {
        console.error("Error fetching content:", error);
        setContents([]);
      } finally {
        setLoading(false);
      }
    };

    if (docId) {
      fetchData();
    }
  }, [docId]);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? -1 : index);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setTopPosition(56);
    } else {
      setTopPosition(72);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
  }, [isSidebarOpen]);

  // گروه‌بندی داده‌ها بر اساس ParentId
  // const groupedContents = (contents || []).reduce((acc, content) => {
  //   // console.log(acc)
  //   if (!content.ParentId) {
  //     acc[content.Id] = { ...content, children: [] };
  //     // console.log(acc)
  //   } else {
  //     if (acc[content.ParentId]) {
  //       acc[content.ParentId].children.push(content);
  //     }
  //   }
  //   return acc;
  // }, {});

  // const groupedContents = {};

  // مرحله ۱: سرفصل‌ها (ParentId == null)
  // مرحله ۱ و ۲ گروه‌بندی (بدون سورت)
  const groupedContents = new Map();

  (contents || []).forEach(content => {
    if (!content.ParentId) {
      groupedContents.set(content.Id, { ...content, children: [] });
    }
  });

  (contents || []).forEach(content => {
    if (content.ParentId && groupedContents.has(content.ParentId)) {
      groupedContents.get(content.ParentId).children.push(content);
    }
  });

  // سپس برای دسترسی به مقادیر:
  const groupedArray = Array.from(groupedContents.values());



  console.log(groupedContents);

  return (
    <aside
      className={`min-w-96 max-w-96 fixed lg:static z-30 lg:z-0 bg-[#042A1B] lg:bg-transparent shadow-xl lg:shadow-none bottom-0 py-10 lg:py-0 px-5 transition-all duration-200 ${isSidebarOpen ? "right-0" : "-right-96"
        }`}
      style={{ top: `${topPosition}px` }}
    >
      <h1 className="font-bold text-white lg:text-[#042A1B] text-3xl">
        سرفصل‌ها
      </h1>

      <div
        className="mt-8 overflow-y-auto no-scrollbar"
        style={{ maxHeight: "calc(100vh - 72px)" }}
      >
        {loading ? (
          <SidebarSkeleton />
        ) : (
          Object.values(groupedArray).map((content, index) => (
            <Accordion
              key={content.Id}
              title={`فصل ${index + 1}`}
              subtitle={content.Title}
              content={
                <ul className="flex flex-col gap-7">
                  {content.children.map((child) => (
                    <li className="relative" key={child.Id}>
                      <Link
                        className="flex items-center justify-between gap-3"
                        href={`/docs/${docId}/${child.Id}`}
                        onClick={() => setIsSidebarOpen(false)} // این خط اضافه شد
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-5 h-5 flex justify-center items-center rounded-full bg-[#7AE36A]">
                            <SmallCheckIcon />
                          </span>
                          <p className="font-medium text-lg ">{child.Title}</p>
                        </div>
                        <span className="text-white lg:text-[#042A1B] opacity-50 font-light">
                          {child.TimeToRead} دقیقه
                        </span>
                      </Link>
                      {content.children.indexOf(child) !==
                        content.children.length - 1 && (
                          <span className="absolute right-2.5 top-8 border-r-2 border-dashed h-5"></span>
                        )}
                    </li>
                  ))}
                </ul>
              }
              isOpen={openAccordion === index}
              onClick={() => toggleAccordion(index)}
              icon={<CheckIcon />}
            />
          ))
        )}
      </div>

      <div
        className="w-9 h-9 lg:hidden absolute -left-9 top-16 flex justify-center items-center bg-[#042A1B] rounded-l-lg cursor-pointer"
        onClick={toggleSidebar}
      >
        <PanelTopOpen
          className={`transition-transform duration-200 ${isSidebarOpen ? "-rotate-90" : "rotate-90"
            } text-[#7AE36A]`}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
