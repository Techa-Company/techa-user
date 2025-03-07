"use client";
import Sidebar from '../../../components/resume/Sidebar';
import { useState } from 'react';
// کامپوننت سایدبار قبلی

const Dashboard = () => {
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
        projects: 0,
        certifications: 0,
        education: [
            {
                degree: "",
                institution: "",
                year: "",
            },
        ],
    });

    const handleChange = (e, section, index) => {
        const { name, value } = e.target;

        if (section === 'education') {
            const newEducation = [...profile.education];
            newEducation[index][name] = value;
            setProfile(prev => ({ ...prev, education: newEducation }));
        }
        else if (section === 'languages') {
            const newLanguages = [...profile.languages];
            newLanguages[index] = value;
            setProfile(prev => ({ ...prev, languages: newLanguages }));
        }
        else if (section === 'personalInfo') {
            setProfile(prev => ({
                ...prev,
                personalInfo: {
                    ...prev.personalInfo,
                    [name]: value
                }
            }));
        }
        else {
            setProfile(prev => ({ ...prev, [name]: value }));
        }
    };

    const addEducation = () => {
        setProfile(prev => ({
            ...prev,
            education: [...prev.education, { degree: '', institution: '', year: '' }]
        }));
    };

    const addLanguage = () => {
        setProfile(prev => ({
            ...prev,
            languages: [...prev.languages, '']
        }));
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* بخش پیش نمایش */}
            {/* <div className="flex-1 max-w-4xl p-8">
                <Sidebar />
            </div> */}

            {/* بخش فرم‌های ویرایش */}
            <div className="flex-1 p-8 bg-white shadow-lg">
                <h1 className="text-3xl font-bold mb-8 text-green-600">داشبورد ویرایش رزومه</h1>

                {/* بخش اطلاعات اصلی */}
                <div className="bg-gray-50 p-6 rounded-xl mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-green-500">اطلاعات اصلی</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">نام کامل</label>
                            <input
                                type="text"
                                name="name"
                                value={profile.name}
                                onChange={(e) => handleChange(e)}
                                className="w-full p-2 border rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">عنوان شغلی</label>
                            <input
                                type="text"
                                name="title"
                                value={profile.title}
                                onChange={(e) => handleChange(e)}
                                className="w-full p-2 border rounded-lg"
                            />
                        </div>
                    </div>
                </div>

                {/* بخش درباره من */}
                <div className="bg-gray-50 p-6 rounded-xl mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-green-500">درباره من</h2>
                    <textarea
                        name="about"
                        value={profile.about}
                        onChange={(e) => handleChange(e)}
                        className="w-full p-2 border rounded-lg h-32"
                    />
                </div>

                {/* بخش اطلاعات تماس */}
                <div className="bg-gray-50 p-6 rounded-xl mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-green-500">اطلاعات تماس</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {Object.entries({
                            email: 'ایمیل',
                            phone: 'تلفن',
                            linkedin: 'لینکدین',
                            github: 'گیتهاب',
                            twitter: 'توییتر',
                            instagram: 'اینستاگرام',
                            telegram: 'تلگرام',
                            website: 'وبسایت',
                            facebook: 'فیسبوک',
                            youtube: 'یوتیوب'
                        }).map(([key, label]) => (
                            <div key={key}>
                                <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                                <input
                                    type="text"
                                    name={key}
                                    value={profile[key]}
                                    onChange={(e) => handleChange(e)}
                                    className="w-full p-2 border rounded-lg"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* بخش اطلاعات فردی */}
                <div className="bg-gray-50 p-6 rounded-xl mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-green-500">اطلاعات فردی</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {Object.entries({
                            maritalStatus: 'وضعیت تأهل',
                            birthDate: 'تاریخ تولد',
                            city: 'شهر',
                            militaryStatus: 'وضعیت نظام',
                            address: 'آدرس',
                            startDate: 'تاریخ شروع فعالیت',
                            workExperience: 'سابقه کار',
                            residenceStatus: 'وضعیت اقامت',
                            jobStatus: 'وضعیت اشتغال'
                        }).map(([key, label]) => (
                            <div key={key}>
                                <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                                <input
                                    type="text"
                                    name={key}
                                    value={profile.personalInfo[key]}
                                    onChange={(e) => handleChange(e, 'personalInfo')}
                                    className="w-full p-2 border rounded-lg"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* بخش تحصیلات */}
                <div className="bg-gray-50 p-6 rounded-xl mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-green-500">تحصیلات</h2>
                    {profile.education.map((edu, index) => (
                        <div key={index} className="mb-4 grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">مدرک</label>
                                <input
                                    type="text"
                                    name="degree"
                                    value={edu.degree}
                                    onChange={(e) => handleChange(e, 'education', index)}
                                    className="w-full p-2 border rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">دانشگاه</label>
                                <input
                                    type="text"
                                    name="institution"
                                    value={edu.institution}
                                    onChange={(e) => handleChange(e, 'education', index)}
                                    className="w-full p-2 border rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">سال</label>
                                <input
                                    type="text"
                                    name="year"
                                    value={edu.year}
                                    onChange={(e) => handleChange(e, 'education', index)}
                                    className="w-full p-2 border rounded-lg"
                                />
                            </div>
                        </div>
                    ))}
                    <button
                        onClick={addEducation}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                    >
                        افزودن تحصیلات جدید
                    </button>
                </div>

                {/* بخش زبان‌ها */}
                <div className="bg-gray-50 p-6 rounded-xl mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-green-500">زبان‌ها</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {profile.languages.map((lang, index) => (
                            <div key={index}>
                                <label className="block text-sm font-medium text-gray-700 mb-2">زبان {index + 1}</label>
                                <input
                                    type="text"
                                    value={lang}
                                    onChange={(e) => handleChange(e, 'languages', index)}
                                    className="w-full p-2 border rounded-lg"
                                />
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={addLanguage}
                        className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                    >
                        افزودن زبان جدید
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;