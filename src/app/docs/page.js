"use client";
import { useEffect, useState } from "react";
import DocCard from "../../components/docs/DocCard";
import DocsSkeleton from "../../components/common/DocsSkeleton";
import { BookText, Clock, Code, GraduationCap } from "lucide-react";
import Link from "next/link";

export default function Docs() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.techa.me/api/Course")
      .then((response) => response.json())
      .then((data) => {
        if (data.IsSuccess) {
          // ادغام داده‌های دریافتی با داده‌های محلی
          const localDocs = [
            {
              level: "متوسط",
              duration: "28 ساعت",
              lessons: "42 درس",
              icon: <Code className="w-6 h-6 text-emerald-600" />,
              tags: ["پروژه‌محور", "آپدیت 1403", "تمرین تعاملی"]
            },
            {
              level: "مبتدی",
              duration: "18 ساعت",
              lessons: "30 درس",
              icon: <BookText className="w-6 h-6 text-emerald-600" />,
              tags: ["مناسب شروع", "تمرین کدنویسی"]
            },
            {
              level: "پیشرفته",
              duration: "35 ساعت",
              lessons: "50 درس",
              icon: <GraduationCap className="w-6 h-6 text-emerald-600" />,
              tags: ["Backend", "پروژه واقعی"]
            },
            {
              level: "متوسط",
              duration: "28 ساعت",
              lessons: "42 درس",
              icon: <Code className="w-6 h-6 text-emerald-600" />,
              tags: ["پروژه‌محور", "آپدیت 1403", "تمرین تعاملی"]
            },
            {
              level: "مبتدی",
              duration: "18 ساعت",
              lessons: "30 درس",
              icon: <BookText className="w-6 h-6 text-emerald-600" />,
              tags: ["مناسب شروع", "تمرین کدنویسی"]
            },
            {
              level: "پیشرفته",
              duration: "35 ساعت",
              lessons: "50 درس",
              icon: <GraduationCap className="w-6 h-6 text-emerald-600" />,
              tags: ["Backend", "پروژه واقعی"]
            },
            {
              level: "پیشرفته",
              duration: "35 ساعت",
              lessons: "50 درس",
              icon: <GraduationCap className="w-6 h-6 text-emerald-600" />,
              tags: ["Backend", "پروژه واقعی"]
            }
          ];

          // ادغام عنوان و توضیحات از داده‌های دریافتی
          const mergedDocs = data.Data.filter((doc) => !doc.Disabled).map((doc, index) => ({
            id: doc.Id,
            title: doc.Title,
            description: doc.Description,
            ...localDocs[index] // اضافه کردن اطلاعات محلی
          }));
          setDocs(mergedDocs);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
        setLoading(false);
      });
  }, []);


  return (
    <div className="pt-32">
      <div className="container px-5 xl:px-20 mx-auto">
        <h1 className="font-extrabold text-[#042A1B] text-3xl">مستندات ما</h1>
        {loading ? (
          <DocsSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10 lg:px-10">
            {docs.map((doc, index) => (
              <DocCard key={index} doc={doc} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}