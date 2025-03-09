
"use client";
import { useState } from 'react';
import LanguagesSection from "../../../components/account/resume/LanguagesSection";
import PersonalInfoSection from "../../../components/account/resume/PersonalInfoSection";
import AchievementsSection from "../../../components/account/resume/AchievementsSection";
import CertificatesSection from "../../../components/account/resume/CertificatesSection";
import ProjectsSection from "../../../components/account/resume/ProjectsSection";
import SkillsSection from "../../../components/account/resume/SkillsSection";

import { AnimatePresence, motion } from "framer-motion"
import Link from 'next/link';

const DashboardResume = () => {
    const [profile, setProfile] = useState({
        name: "رامین جوشنگ",
        title: "توسعه دهنده فول استک",
        image: "/images/teacher.jpeg",
        email: "",
        linkedin: "",
        github: "",
        twitter: "",
        instagram: "",
        telegram: "",
        website: "",
        facebook: "",
        youtube: "",
        about: "",
        languages: ["", ""],
        personalInfo: {
            maritalStatus: "",
            birthDate: "",
            phone: "",
            city: "",
            militaryStatus: "",
            address: "",
            startDate: "",
            workExperience: "",
            residenceStatus: "",
            jobStatus: "",
        },
        education: [
            {
                degree: "",
                institution: "",
                year: "",
            },
        ],
        certificatesData: [
            {
                title: "کارشناسی ارشد مهندسی نرم‌افزار",
                issuer: "دانشگاه تهران",
                date: "مهر ۱۴۰۰ - شهریور ۱۴۰۲",
                id: "UT-SE-789456",
                type: "official",
                description: "گرایش سیستم‌های هوشمند - معدل ۱۹.۲ - پایان‌نامه برتر دانشکده",
                credentialUrl: "#",
                downloadUrl: "#",
                image: "/images/blog-1.png"
            },
        ],
        skills: [
            {
                name: 'HTML/CSS',
                level: 95,
                icon: '/images/teacher.jpeg',
                isVerified: true,
                experience: '۵+ سال'
            },
        ],
        experiences: [
            {
                position: "مهندس ارشد فرانت‌اند",
                company: "شرکت فناوری نوین",
                year: "۱۴۰۰-۱۴۰۲",
                description: "توسعه و راهبری پلتفرم مدیریت محتوای سازمانی با استفاده از آخرین تکنولوژی‌های وب",
                techStack: ["React", "TypeScript", "Next.js", "GraphQL"]
            },
        ],
        projects: [
            {
                title: 'سیستم تحلیل پیشرفته',
                role: 'معمار اصلی',
                tech: ['Python', 'TensorFlow', 'Kubernetes', 'Apache Kafka'],
                image: '/images/blog-1.png',
                link: '#',
                duration: '18 ماه',
                description: 'سیستم تحلیل بلادرنگ داده‌های صنعتی با قابلیت پردازش 1M رکورد در ثانیه'
            },
        ],
        achievements: [
            {
                title: 'برترین راهکار ابری',
                organization: 'انجمن فناوری ابری آسیا',
                year: '2023',
            },
        ],
        certificates: [
            {
                title: "سیستم مدیریت هوشمند انرژی",
                image: "/images/blog-1.png",
                role: "معمار اصلی سیستم",
                description: "طراحی و پیاده‌سازی یک پلتفرم جامع برای مدیریت هوشمند مصرف انرژی در مقیاس صنعتی با قابلیت پیش‌بینی و بهینه‌سازی مصرف.",
                tech: ["IoT", "Machine Learning", "Node.js", "React", "TensorFlow"],
                duration: "۸ ماه",
                link: "#",
                awards: ["جایزه بهترین پروژه IoT 2023", "رتبه اول نوآوری انرژی"]
            },
        ]
    });

    const handleChange = (e, section, index, nestedKey) => {
        const { name, value } = e.target;

        if (section === 'education') {
            const newEducation = [...profile.education];
            newEducation[index][name] = value;
            setProfile(prev => ({ ...prev, education: newEducation }));
        } else if (section === 'languages') {
            const newLanguages = [...profile.languages];
            newLanguages[index] = value;
            setProfile(prev => ({ ...prev, languages: newLanguages }));
        } else if (section === 'personalInfo') {
            setProfile(prev => ({
                ...prev,
                personalInfo: {
                    ...prev.personalInfo,
                    [name]: value
                }
            }));
        } else if (section === 'skills') {
            const updatedSkills = [...profile.skills];
            updatedSkills[index][nestedKey] = value;
            setProfile(prev => ({ ...prev, skills: updatedSkills }));
        } else if (section === 'projects') {
            const updatedProjects = [...profile.projects];
            updatedProjects[index][nestedKey] = value;
            setProfile(prev => ({ ...prev, projects: updatedProjects }));
        } else if (section === 'certificatesData') {
            const updatedCertificates = [...profile.certificatesData];
            updatedCertificates[index][nestedKey] = value;
            setProfile(prev => ({ ...prev, certificatesData: updatedCertificates }));
        } else if (section === 'achievements') {
            const updatedAchievements = [...profile.achievements];
            updatedAchievements[index][nestedKey] = value;
            setProfile(prev => ({ ...prev, achievements: updatedAchievements }));
        } else {
            setProfile(prev => ({ ...prev, [name]: value }));
        }
    };

    const addLanguage = () => {
        setProfile(prev => ({
            ...prev,
            languages: [...prev.languages, ""]
        }));
    };

    const deleteLanguage = (index) => {
        const newLanguages = profile.languages.filter((_, i) => i !== index);
        setProfile(prev => ({ ...prev, languages: newLanguages }));
    };

    const addEducation = () => {
        setProfile(prev => ({
            ...prev,
            education: [...prev.education, { degree: "", institution: "", year: "" }]
        }));
    };

    const deleteEducation = (index) => {
        const newEducation = profile.education.filter((_, i) => i !== index);
        setProfile(prev => ({ ...prev, education: newEducation }));
    };

    const addSkill = () => {
        setProfile(prev => ({
            ...prev,
            skills: [...prev.skills, { name: "", level: 0 }]
        }));
    };

    const deleteSkill = (index) => {
        const newSkills = profile.skills.filter((_, i) => i !== index);
        setProfile(prev => ({ ...prev, skills: newSkills }));
    };

    const addProject = () => {
        setProfile(prev => ({
            ...prev,
            projects: [...prev.projects, { title: "", role: "", tech: [], duration: "", description: "" }]
        }));
    };

    const deleteProject = (index) => {
        const newProjects = profile.projects.filter((_, i) => i !== index);
        setProfile(prev => ({ ...prev, projects: newProjects }));
    };

    const addCertificate = () => {
        setProfile(prev => ({
            ...prev,
            certificatesData: [...prev.certificatesData, { title: "", issuer: "" }]
        }));
    };

    const deleteCertificate = (index) => {
        const newCertificates = profile.certificatesData.filter((_, i) => i !== index);
        setProfile(prev => ({ ...prev, certificatesData: newCertificates }));
    };

    const addAchievement = () => {
        setProfile(prev => ({
            ...prev,
            achievements: [...prev.achievements, { title: "", organization: "", year: "" }]
        }));
    };

    const deleteAchievement = (index) => {
        const newAchievements = profile.achievements.filter((_, i) => i !== index);
        setProfile(prev => ({ ...prev, achievements: newAchievements }));
    };

    const [showPreview, setShowPreview] = useState(false);

    const handlePreview = () => {
        router.push('/preview');
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
    };



    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen p-6"
        >
            <AnimatePresence>
                {showPreview && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-emerald-900/80 flex items-center justify-center"
                    >
                        <motion.div
                            className="bg-white p-8 rounded-2xl w-full max-w-4xl shadow-2xl"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                        >
                            {/* محتوای پیش‌نمایش */}
                            <button
                                onClick={() => setShowPreview(false)}
                                className="text-emerald-600 hover:text-emerald-800 text-lg"
                            >
                                × بستن
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                variants={itemVariants}
                className="max-w-6xl mx-auto"
            >
                <motion.header
                    className="text-center mb-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <motion.img
                        src={profile.image}
                        alt="Profile"
                        className="rounded-full w-40 h-40 mb-6 mx-auto shadow-xl border-4 border-emerald-200"
                        whileHover={{ scale: 1.05 }}
                    />
                    <motion.h1
                        className="text-4xl font-bold text-emerald-800 mb-2"
                        initial={{ y: 20 }}
                        animate={{ y: 0 }}
                    >
                        {profile.name}
                    </motion.h1>
                    <motion.h2 className="text-2xl text-emerald-600">
                        {profile.title}
                    </motion.h2>
                </motion.header>

                <motion.section
                    className="bg-white rounded-2xl p-8 mb-8 shadow-lg"
                    variants={itemVariants}
                >
                    <h3 className="text-2xl font-semibold text-emerald-800 mb-6">درباره من</h3>
                    <motion.textarea
                        value={profile.about}
                        onChange={(e) => handleChange(e, 'about')}
                        className="w-full p-4 border-2 border-emerald-100 rounded-xl focus:outline-none focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        style={{ minHeight: '120px' }}
                        whileFocus={{ scale: 1.02 }}
                    />
                </motion.section>

                <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <SkillsSection
                        skills={profile.skills}
                        handleChange={handleChange}
                        addSkill={addSkill}
                        deleteSkill={deleteSkill}
                    />

                    <ProjectsSection
                        projects={profile.projects}
                        handleChange={handleChange}
                        addProject={addProject}
                        deleteProject={deleteProject}
                    />
                </motion.div>

                <motion.div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <CertificatesSection
                        certificatesData={profile.certificatesData}
                        handleChange={handleChange}
                        addCertificate={addCertificate}
                        deleteCertificate={deleteCertificate}
                    />

                    <AchievementsSection
                        achievements={profile.achievements}
                        handleChange={handleChange}
                        addAchievement={addAchievement}
                        deleteAchievement={deleteAchievement}
                    />
                </motion.div>

                <motion.div className="mt-8">
                    <PersonalInfoSection
                        personalInfo={profile.personalInfo}
                        handleChange={handleChange}
                    />

                    <LanguagesSection
                        languages={profile.languages}
                        handleChange={handleChange}
                        addLanguage={addLanguage}
                        deleteLanguage={deleteLanguage}
                    />
                </motion.div>

                <motion.div
                    className="flex justify-center mt-12"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Link
                        href="/resume"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-xl transition-all flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        مشاهده پیش‌نمایش زنده
                    </Link>
                </motion.div>
            </motion.div>
        </motion.div>

    );
};

export default DashboardResume;
