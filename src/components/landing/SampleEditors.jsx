"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import { CopyBlock, github } from 'react-code-blocks';

const SampleEditor = () => {

    const code = `const Counter = () => {        
        return (
            <div>
                <h1>Counter: {count}</h1>
                <button 
                    onClick={increment}
                >
                    Increment
                </button>
            </div>
        );
    };
export default Counter;`;

    const [activeTab, setActiveTab] = useState(2);

    const tabContent = [
        {
            id: 0, title: "JS", content: <CopyBlock
                language="jsx"
                customStyle={{
                    borderRadius: '10px',
                    fontSize: '1rem',
                    margin: '0',
                    padding: "0",
                    overflow: "scroll",
                    whiteSpace: "pre-wrap",
                    wordWrap: "break-word",
                }}
                text={code}
                codeBlock
                theme={github}
            />
        },
        {
            id: 1, title: "React", content: <CopyBlock
                language="jsx"
                customStyle={{
                    borderRadius: '10px',
                    fontSize: '1rem',
                    margin: '0',
                    padding: "0",
                    overflow: "scroll",
                    whiteSpace: "pre-wrap",
                    wordWrap: "break-word",
                }}
                text={code}
                codeBlock
                theme={github}
            />
        },
        {
            id: 1, title: "SQL", content: <CopyBlock
                language="jsx"
                customStyle={{
                    borderRadius: '10px',
                    fontSize: '1rem',
                    margin: '0',
                    padding: "0",
                    overflow: "scroll",
                    whiteSpace: "pre-wrap",
                    wordWrap: "break-word",
                }}
                text={code}
                codeBlock
                theme={github}
            />
        },
        // ...other tabs...
    ];

    return (
        <div className="mt-10 bg-[#fff5e0] py-10">
            <div className="container mx-auto px-5 xl:px-20">
                <div className="grid lg:grid-cols-2 gap-10 items-center">
                    <div className="relative w-full pb-[60%] lg:mt-0 order-2 lg:order-1">
                        <Image src="/images/Editor.png" layout="fill" objectFit="cover" alt="banner" />
                    </div>
                    <div className='text-[#042A1B] w-full order-1'>
                        <div className="w-full">
                            <div className='flex flex-col sm:flex-row gap-5 justify-between items-center'>
                                <h1 className='text-4xl font-extrabold '>ادیتور برخط</h1>
                                <div className="flex space-x-1 bg-[#F6DC6533] p-1.5 rounded-full">
                                    {tabContent.map((tab, index) => (
                                        <button
                                            key={index}
                                            className={`py-2 px-5 text-xl font-medium text-[#042A1B] rounded-full transition duration-300 ${activeTab !== index ? 'bg-transparent' : 'bg-[#F6DC65] font-semibold'
                                                }`}
                                            onClick={() => setActiveTab(index)}
                                        >
                                            {tab.title}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="my-5 rounded-xl overflow-hidden">
                                {tabContent.map((tab, index) => (
                                    <div
                                        key={index}
                                        className={`transition-opacity duration-300 ${activeTab === index ? 'block' : 'hidden'}`}
                                    >
                                        {tab.content}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </div >
    );
};

export default SampleEditor;
