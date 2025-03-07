"use client";
import { Linkedin, Github, Mail, Download, Languages, User, Calendar, Phone, MapPin, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const profile = {
    name: "رامین جوشنگ",
    title: "توسعه دهنده فول استک",
    image: "/images/teacher.jpeg",
    email: "example@domain.com",
    linkedin: "#",
    github: "#",
    about:
        "من رامین جوشنگ، توسعه‌دهنده فول استک با تجربه بالا در زمینه توسعه وب، موبایل و نرم‌افزارهای ابری هستم. علاقه‌مند به یادگیری فناوری‌های نوین و بهینه‌سازی تجربه کاربری. همیشه در جستجوی راه‌حل‌های نوآورانه برای چالش‌های پیچیده می‌باشم.",
    languages: ["فارسی (سلیسی)", "انگلیسی (پیشرفته)"],
    personalInfo: {
        maritalStatus: "مجرد",
        birthDate: "۱۳۷۵/۰۵/۱۵",
        phone: "09195993264",
        city: "تهران",
        militaryStatus: "معافیت تحصیلی",
        address: "ایران، تهران",
        startDate: "۱۴۰۰/۰۱/۰۱",
        workExperience: "۳ سال",
        residenceStatus: "اقامت دائم",
        jobStatus: "فعال"
    },
    projects: 42,
    certifications: 8,
    education: [
        {
            degree: "کارشناسی مهندسی کامپیوتر",
            institution: "دانشگاه تهران",
            year: "۱۳۹۹"
        },
        {
            degree: "کارشناسی ارشد مهندسی نرم‌افزار",
            institution: "دانشگاه علم و صنعت ایران",
            year: "۱۴۰۱"
        }
    ],
};

export default function Sidebar() {
    return (
        <div className="relative w-96 min-h-screen p-8 bg-gradient-to-br from-gray-50 to-gray-100 border-l border-gray-200 overflow-hidden">
            {/* Profile Section */}
            <div className="flex flex-col items-center">
                <div className="relative p-1 rounded-full bg-gradient-to-br from-green-500 to-green-700 mb-6 shadow-lg">
                    <div className="p-1.5 bg-white rounded-full">
                        <motion.img
                            whileHover={{ scale: 1.05 }}
                            src={profile.image}
                            alt="Profile"
                            className="w-36 h-36 rounded-full border-4 border-white object-cover cursor-pointer shadow-md"
                        />
                    </div>
                </div>
                <h2 className="text-3xl font-bold text-gray-800">
                    {profile.name}
                </h2>
                <p className="text-gray-600 mt-2 text-center text-sm font-light">
                    {profile.title}
                </p>
            </div>

            {/* About Me Section */}
            <div className="my-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-green-500">
                    <User className="w-5 h-5" />
                    درباره من
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                    {profile.about}
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4 my-8">
                <motion.div
                    whileHover={{ y: -5 }}
                    className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all"
                >
                    <div className="text-2xl font-bold text-green-500">{profile.projects}+</div>
                    <div className="text-xs text-gray-500 mt-1">پروژه انجام شده</div>
                </motion.div>
                <motion.div
                    whileHover={{ y: -5 }}
                    className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all"
                >
                    <div className="text-2xl font-bold text-green-500">{profile.certifications}</div>
                    <div className="text-xs text-gray-500 mt-1">گواهینامه</div>
                </motion.div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-200 my-8" />

            {/* Contact List */}
            <div className="space-y-4 mb-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-green-500">
                    <Mail className="w-5 h-5" />
                    راه‌های ارتباطی
                </h3>
                <ul className="space-y-3">
                    {[
                        { icon: Mail, text: profile.email, href: `mailto:${profile.email}` },
                        { icon: Linkedin, text: "LinkedIn", href: profile.linkedin },
                        { icon: Github, text: "GitHub", href: profile.github },
                    ].map((item, index) => (
                        <motion.li
                            key={index}
                            whileHover={{ x: 5 }}
                            className="flex items-center p-3 rounded-xl bg-white border border-gray-200 hover:border-green-300 transition-all cursor-pointer shadow-sm hover:shadow-md"
                        >
                            <item.icon className="w-5 h-5 ml-3 text-green-500" />
                            <a
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-gray-700"
                            >
                                {item.text}
                            </a>
                        </motion.li>
                    ))}
                </ul>
            </div>

            {/* Languages Section */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-green-500">
                    <Languages className="w-5 h-5" />
                    تسلط زبان‌ها
                </h3>
                <div className="grid grid-cols-2 gap-3">
                    {profile.languages.map((lang, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            className="p-3 rounded-xl bg-white border border-gray-200 hover:border-green-300 transition-all shadow-sm hover:shadow-md"
                        >
                            <span className="text-sm text-gray-700">
                                {lang}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Personal Info Section */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-green-500">
                    <User className="w-5 h-5" />
                    اطلاعات فردی
                </h3>
                <div className="grid grid-cols-2 gap-4">
                    {Object.entries(profile.personalInfo).map(([key, value], index) => {
                        const icons = {
                            maritalStatus: <User className="w-5 h-5 ml-3 text-green-500" />,
                            birthDate: <Calendar className="w-5 h-5 ml-3 text-green-500" />,
                            phone: <Phone className="w-5 h-5 ml-3 text-green-500" />,
                            city: <MapPin className="w-5 h-5 ml-3 text-green-500" />,
                            militaryStatus: <Shield className="w-5 h-5 ml-3 text-green-500" />,
                            address: <MapPin className="w-5 h-5 ml-3 text-green-500" />,
                            startDate: <Calendar className="w-5 h-5 ml-3 text-green-500" />,
                            workExperience: <User className="w-5 h-5 ml-3 text-green-500" />,
                            residenceStatus: <Shield className="w-5 h-5 ml-3 text-green-500" />,
                            jobStatus: <User className="w-5 h-5 ml-3 text-green-500" />
                        };

                        return (
                            <motion.div
                                key={index}
                                className="flex items-center p-3 rounded-xl bg-white border border-gray-200 hover:border-green-300 transition-all shadow-sm hover:shadow-md"
                            >
                                {icons[key]}
                                <div className="flex-1">
                                    <p className="text-sm text-gray-700">{value}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Education Section */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-green-500">
                    <Calendar className="w-5 h-5" />
                    تحصیلات
                </h3>
                <ul className="space-y-3">
                    {profile.education.map((edu, index) => (
                        <motion.li
                            key={index}
                            whileHover={{ x: 5 }}
                            className="flex flex-col p-3 rounded-xl bg-white border border-gray-200 hover:border-green-300 transition-all shadow-sm hover:shadow-md"
                        >
                            <p className="text-sm text-gray-700 font-semibold">{edu.degree}</p>
                            <p className="text-xs text-gray-500">{edu.institution} - {edu.year}</p>
                        </motion.li>
                    ))}
                </ul>
            </div>

            {/* Download Button */}
            <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-12"
            >
                <button className="w-full bg-gradient-to-r from-green-500 to-green-700 p-3 rounded-xl font-semibold flex items-center justify-center gap-2 text-white hover:shadow-lg transition-all">
                    <Download className="w-5 h-5" />
                    دریافت رزومه (PDF)
                </button>
            </motion.div>
        </div>
    );
}