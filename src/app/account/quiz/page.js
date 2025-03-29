"use client";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Code, Clock, Star, CheckCircle, RotateCw, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const AssessmentWizard = () => {
    const [step, setStep] = useState(0); // 0: شروع، 1: آزمون، 2: نتیجه
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [timeLeft, setTimeLeft] = useState(0);

    const questions = [
        {
            type: 'code',
            lang: 'javascript',
            code: `function greeting() {\n  console.log("Hello World!");\n}`,
            question: "خروجی این کد چیست؟",
            options: ["Hello World!", "خطای syntax", "undefined", "هیچکدام"],
            correct: 0,
            time: 30
        },
        {
            type: 'theory',
            question: "کدام گزینه ویژگی position: sticky را به درستی توصیف می‌کند؟",
            options: [
                "موقعیت نسبی تا رسیدن به نقطه خاص",
                "موقعیت مطلق نسبت به والد",
                "همیشه ثابت در صفحه",
                "هیچکدام"
            ],
            correct: 0,
            time: 45
        },
        {
            type: 'code',
            lang: 'javascript',
            code: `const arr = [1, 2, 3];\narr.push(4);\nconsole.log(arr);`,
            question: "خروجی این کد چیست؟",
            options: ["[1, 2, 3]", "[1, 2, 3, 4]", "[4, 1, 2, 3]", "خطای syntax"],
            correct: 1,
            time: 30
        },
        {
            type: 'theory',
            question: "کدام یک از این‌ها یک نوع داده در JavaScript است؟",
            options: ["String", "Integer", "Float", "None"],
            correct: 0,
            time: 30
        },
        {
            type: 'code',
            lang: 'javascript',
            code: `let x = 5;\nlet y = 10;\nconsole.log(x + y);`,
            question: "خروجی این کد چیست؟",
            options: ["15", "510", "خطای syntax", "هیچکدام"],
            correct: 0,
            time: 30
        },
        {
            type: 'theory',
            question: "کدام یک از این‌ها یک حلقه در JavaScript است؟",
            options: ["for", "while", "do...while", "همه موارد"],
            correct: 3,
            time: 30
        },
        {
            type: 'code',
            lang: 'javascript',
            code: `const obj = {name: "Alice", age: 25};\nconsole.log(obj.name);`,
            question: "خروجی این کد چیست؟",
            options: ["Alice", "25", "undefined", "خطای syntax"],
            correct: 0,
            time: 30
        },
        {
            type: 'theory',
            question: "کدام یک از این‌ها یک روش برای تعریف تابع در JavaScript است؟",
            options: ["function myFunction() {}", "myFunction() => {}", "const myFunction = function() {}", "همه موارد"],
            correct: 3,
            time: 30
        },
        {
            type: 'code',
            lang: 'javascript',
            code: `let a = [1, 2, 3];\na.length = 0;\nconsole.log(a);`,
            question: "خروجی این کد چیست؟",
            options: ["[1, 2, 3]", "[]", "[null]", "خطای syntax"],
            correct: 1,
            time: 30
        },
        {
            type: 'theory',
            question: "کدام یک از این‌ها یک روش برای تبدیل رشته به عدد در JavaScript است؟",
            options: ["parseInt()", "toString()", "Number()", "الف و ج"],
            correct: 3,
            time: 30
        },
        {
            type: 'code',
            lang: 'javascript',
            code: `const x = 10;\nif (x > 5) {\n  console.log("بزرگتر از 5");\n}`,
            question: "خروجی این کد چیست؟",
            options: ["بزرگتر از 5", "کوچکتر از 5", "هیچکدام", "خطای syntax"],
            correct: 0,
            time: 30
        },
        {
            type: 'theory',
            question: "کدام یک از این‌ها یک روش برای اضافه کردن رویداد به یک عنصر در JavaScript است؟",
            options: ["addEventListener()", "onClick()", "setEvent()", "همه موارد"],
            correct: 0,
            time: 30
        },
        {
            type: 'code',
            lang: 'javascript',
            code: `const fruits = ["apple", "banana", "cherry"];\nconsole.log(fruits[1]);`,
            question: "خروجی این کد چیست؟",
            options: ["apple", "banana", "cherry", "خطای syntax"],
            correct: 1,
            time: 30
        },
        {
            type: 'theory',
            question: "کدام یک از این‌ها یک روش برای حذف یک عنصر از آرایه در JavaScript است؟",
            options: ["pop()", "shift()", "splice()", "همه موارد"],
            correct: 3,
            time: 30
        },
        {
            type: 'code',
            lang: 'javascript',
            code: `let num = 10;\nnum += 5;\nconsole.log(num);`,
            question: "خروجی این کد چیست؟",
            options: ["10", "15", "5", "خطای syntax"],
            correct: 1,
            time: 30
        },
        {
            type: 'theory',
            question: "کدام یک از این‌ها یک روش برای بررسی وجود یک عنصر در آرایه است؟",
            options: ["includes()", "exists()", "has()", "همه موارد"],
            correct: 0,
            time: 30
        },
        {
            type: 'code',
            lang: 'javascript',
            code: `const a = 5;\nconst b = 10;\nconsole.log(a * b);`,
            question: "خروجی این کد چیست؟",
            options: ["15", "50", "خطای syntax", "هیچکدام"],
            correct: 1,
            time: 30
        },
        {
            type: 'theory',
            question: "کدام یک از این‌ها یک روش برای تبدیل عدد به رشته در JavaScript است؟",
            options: ["String()", "toString()", "concat()", "الف و ب"],
            correct: 3,
            time: 30
        },
        {
            type: 'code',
            lang: 'javascript',
            code: `let x = 0;\nwhile (x < 3) {\n  x++;\n}\nconsole.log(x);`,
            question: "خروجی این کد چیست؟",
            options: ["2", "3", "1", "خطای syntax"],
            correct: 1,
            time: 30
        },
        {
            type: 'theory',
            question: "کدام یک از این‌ها یک روش برای ایجاد یک شیء در JavaScript است؟",
            options: ["const obj = {};", "const obj = new Object();", "const obj = Object.create();", "همه موارد"],
            correct: 3,
            time: 30
        }
    ];

    // شروع آزمون
    const startAssessment = () => {
        setStep(1);
        setTimeLeft(questions[0].time);
    };

    // مدیریت زمان
    useEffect(() => {
        let timer;
        if (step === 1 && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [step, timeLeft]);

    // ارسال پاسخ
    const handleAnswer = (answerIndex) => {
        setAnswers([...answers, answerIndex]);

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
            setTimeLeft(questions[currentQuestion + 1].time);
        } else {
            setStep(2);
        }
    };

    // محاسبه امتیاز
    const calculateScore = () => {
        return questions.reduce((score, q, index) =>
            answers[index] === q.correct ? score + 1 : score, 0
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            {/* صفحه شروع */}
            <AnimatePresence>
                {step === 0 && (
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="max-w-2xl mx-auto px-4 py-20 text-center"
                    >
                        <div className="p-6 bg-white rounded-2xl shadow-lg inline-block mb-8">
                            <BookOpen className="w-12 h-12 text-blue-600" />
                        </div>
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">
                            <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                                آزمون مهارت‌های فنی
                            </span>
                        </h1>
                        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                            <ul className="grid gap-4 text-gray-600 text-left">
                                <li className="flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                                    {questions.length} سوال ترکیبی
                                </li>
                                <li className="flex items-center gap-3">
                                    <Code className="w-5 h-5 text-blue-600" />
                                    سوالات کدنویسی و تئوری
                                </li>
                                <li className="flex items-center gap-3">
                                    <Clock className="w-5 h-5 text-amber-600" />
                                    زمان‌دار برای هر سوال
                                </li>
                            </ul>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={startAssessment}
                            className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-medium shadow-lg hover:bg-blue-700 transition-all"
                        >
                            شروع آزمون
                            <ArrowRight className="w-5 h-5 inline-block mr-2" />
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* صفحه سوالات */}
            {step === 1 && (
                <div className="max-w-3xl mx-auto px-4 py-12">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-2 text-blue-600">
                            <BookOpen className="w-5 h-5" />
                            <span className="font-medium">
                                سوال {currentQuestion + 1} از {questions.length}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-amber-600">
                            <Clock className="w-5 h-5" />
                            <span>{timeLeft} ثانیه</span>
                        </div>
                    </div>

                    <motion.div
                        key={currentQuestion}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="bg-white rounded-2xl shadow-lg p-8"
                    >
                        {questions[currentQuestion].type === 'code' && (
                            <div className="mb-6" dir="ltr">
                                <SyntaxHighlighter
                                    language={questions[currentQuestion].lang}
                                    style={atomOneLight}
                                    className="rounded-lg p-4 text-sm border border-gray-200"
                                >
                                    {questions[currentQuestion].code}
                                </SyntaxHighlighter>
                            </div>
                        )}

                        <h2 className="text-xl font-bold text-gray-800 mb-6">
                            {questions[currentQuestion].question}
                        </h2>

                        <div className="grid gap-3">
                            {questions[currentQuestion].options.map((option, index) => (
                                <motion.button
                                    key={index}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleAnswer(index)}
                                    className="p-4 text-right bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors border border-gray-200 hover:border-blue-300"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="w-6 h-6 flex items-center justify-center bg-blue-600 text-white rounded-md">
                                            {String.fromCharCode(65 + index)}
                                        </span>
                                        {option}
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                </div>
            )}

            {/* صفحه نتیجه */}
            {step === 2 && (
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="max-w-2xl mx-auto px-4 py-20 text-center"
                >
                    <div className="p-6 bg-white rounded-2xl shadow-lg inline-block mb-8">
                        <Star className="w-12 h-12 text-amber-400 fill-current" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        نتیجه آزمون شما
                    </h2>

                    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                        <div className="flex justify-center gap-8">
                            <div className="text-center">
                                <div className="text-4xl font-bold text-blue-600">
                                    {calculateScore()}
                                </div>
                                <div className="text-gray-600">پاسخ صحیح</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-gray-800">
                                    {questions.length}
                                </div>
                                <div className="text-gray-600">سوال کل</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center gap-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                setStep(0);
                                setCurrentQuestion(0);
                                setAnswers([]);
                            }}
                            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium"
                        >
                            آزمون مجدد
                            <RotateCw className="w-5 h-5 inline-block mr-2" />
                        </motion.button>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default AssessmentWizard;