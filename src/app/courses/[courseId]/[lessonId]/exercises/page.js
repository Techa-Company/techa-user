"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ExerciseCard from "../../../../../components/courses/course/ExerciseCard";
import ExerciseInstructions from "../../../../../components/courses/course/ExerciseInstructions";
import ExerciseDetails from "../../../../../components/courses/course/ExerciseDetails"
export default function ExercisePage({ params }) {
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [loading, setLoading] = useState(true);

  // شبیه‌سازی داده‌های تمرینات
  const fakeExercises = [
    {
      id: 1,
      title: "تمرین اول: چاپ Hello World",
      description: "برنامه‌ای بنویسید که عبارت Hello World را در خروجی چاپ کند.",
      difficulty: "آسان",
      deadline: "۱۴۰۳/۰۳/۱۵",
      status: "completed",
    },
    {
      id: 2,
      title: "تمرین دوم: محاسبه جمع اعداد",
      description: "تابعی بنویسید که مجموع اعداد از ۱ تا N را محاسبه کند.",
      difficulty: "متوسط",
      deadline: "۱۴۰۳/۰۳/۲۰",
      status: "pending",
    },
    {
      id: 1,
      title: "تمرین اول: چاپ Hello World",
      description: "برنامه‌ای بنویسید که عبارت Hello World را در خروجی چاپ کند.",
      difficulty: "آسان",
      deadline: "۱۴۰۳/۰۳/۱۵",
      status: "completed",
    },
    {
      id: 2,
      title: "تمرین دوم: محاسبه جمع اعداد",
      description: "تابعی بنویسید که مجموع اعداد از ۱ تا N را محاسبه کند.",
      difficulty: "متوسط",
      deadline: "۱۴۰۳/۰۳/۲۰",
      status: "pending",
    },
    // ...
  ];

  useEffect(() => {
    setTimeout(() => {
      setExercises(fakeExercises);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1  gap-8">
        {/* لیست تمرینات */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-2xl font-bold mb-4">تمرینات جلسه</h2>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
            {exercises.map((exercise, index) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                index={index}
                onClick={() => setSelectedExercise(exercise)}
                isSelected={selectedExercise?.id === exercise.id}
              />
            ))}
          </div>
        </div>

        {/* جزئیات تمرین و دستورالعمل‌ها */}
        <div className="lg:col-span-2">
          {selectedExercise ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              {/* دکمه برگشت جدید */}
              <button
                onClick={() => setSelectedExercise(null)}
                className="mb-4 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 rotate-180"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                بازگشت به لیست تمرینات
              </button>

              <ExerciseDetails exercise={selectedExercise} />
            </motion.div>
          ) : (
            <ExerciseInstructions />
          )}
        </div>
      </div>
    </div>
  );
};

