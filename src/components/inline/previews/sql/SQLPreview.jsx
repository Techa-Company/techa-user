"use client";
import { useEffect, useRef, useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import {
    Play,
    Square,
    Edit,
    Terminal,
    RefreshCw,
    ChevronRight,
    X,
} from "lucide-react";

export const ConsoleOutput = ({ output, className }) => (
    <div className={`bg-gray-900 text-gray-100 p-4 rounded-b-lg font-mono text-sm overflow-y-auto ${className}`}>
        {output.map((line, i) => (
            <div
                key={i}
                className="flex items-start gap-2 border-b border-gray-700 py-1"
            >
                <ChevronRight className="w-4 h-4 flex-shrink-0 text-gray-500" />
                <pre className={`flex-1 text-${line.color}`}>{line.text}</pre>
            </div>
        ))}
    </div>
);

const SQLPreview = ({ code: initialCode }) => {
    const [internalCode, setInternalCode] = useState('');
    const [isEditable, setEditable] = useState(false);
    const [consoleOutput, setConsoleOutput] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const [results, setResults] = useState([]);
    const [isMounted, setIsMounted] = useState(false);
    const [isPreviewVisible, setIsPreviewVisible] = useState(false); // Set default to true


    useEffect(() => {
        setInternalCode(initialCode || '-- SQL کد خود را اینجا بنویسید\nSELECT * FROM users;');
        setIsMounted(true);
    }, [initialCode]);



    const runQuery = async () => {
        setConsoleOutput([]);
        setIsRunning(true);

        try {
            // شبیه‌سازی اجرای کوئری
            const mockResponse = [
                { id: 1, name: 'Test 1' },
                { id: 2, name: 'Test 2' }
            ];

            setResults(mockResponse);
            setConsoleOutput([{
                text: 'Query executed successfully',
                color: 'emerald-400'
            }]);
            setIsPreviewVisible(true)
        } catch (error) {
            setConsoleOutput([{
                text: error.message,
                color: 'red-400'
            }]);
        } finally {
            setIsRunning(false);
        }
    };

    if (!isMounted) return null;
    return (
        <div className="flex flex-col gap-4 bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-700"
            dir="ltr"
        >
            {/* Header */}
            <div className="flex flex-col-reverse lg:flex-row items-center justify-between bg-gray-900 px-4 py-3 border-b border-gray-700">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setEditable(!isEditable)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-700 hover:bg-gray-600 text-gray-300 transition-colors duration-200"
                    >
                        {isEditable ? (
                            <>
                                <span className="text-xs font-medium">قفل</span>
                                <Square className="w-4 h-4" />
                            </>
                        ) : (
                            <>
                                <span className="text-xs font-medium">ویرایش</span>
                                <Edit className="w-4 h-4" />
                            </>
                        )}
                    </button>

                    <button
                        onClick={runQuery}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white transition-colors duration-200"
                    >
                        <span className="text-xs font-medium">اجرا</span>
                        {isRunning ? (
                            <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                            <Play className="w-4 h-4" />
                        )}
                    </button>

                    {/* New Close Button */}
                    <button
                        onClick={() => setIsPreviewVisible(!isPreviewVisible)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-red-600 hover:bg-red-500 text-white transition-colors duration-200"
                    >
                        <span className="text-xs font-medium">
                            {isPreviewVisible ? "بستن" : "بازکردن"} پیش نمایش
                        </span>
                        <X className="w-4 h-4" />
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    <h2 className="text-gray-200 font-semibold text-2xl">
                        اجرای برخط SQL
                    </h2>
                    <Terminal className="w-10 h-10 text-emerald-400 scale-x-[-1]" />
                </div>
            </div>

            {/* Editor */}
            <div className="px-4 pb-4">
                <MonacoEditor
                    height="200px"
                    language="sql"
                    value={internalCode}
                    onChange={setInternalCode}
                    // loading={
                    //     <div className="text-gray-400 text-center py-4">
                    //         در حال بارگذاری ویرایشگر...
                    //     </div>
                    // }
                    options={{
                        readOnly: !isEditable,
                        minimap: { enabled: true },
                        fontSize: 16,
                        lineNumbers: "on",
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        glyphMargin: false,
                        folding: false,
                        tabSize: 4,
                        lineDecorationsWidth: 0,
                        lineNumbersMinChars: 0,
                        renderLineHighlight: "none",
                        tabSize: 8,
                        formatOnType: true,
                        formatOnPaste: true,

                    }}
                    theme="vs-dark"
                    className="rounded-lg overflow-hidden border border-gray-700 max-w-full"
                />
            </div>

            {/* Results Table */}
            {isPreviewVisible && (
                <div className="bg-gray-900 mx-4 mb-4 rounded-lg overflow-hidden border border-gray-700">
                    <div className="px-4 py-2.5 bg-gray-800 border-b border-gray-700">
                        <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider text-end">
                            پیش نمایش
                        </h3>
                    </div>
                    <div className="overflow-x-auto max-h-96">
                        <table className="w-full text-gray-300">
                            <thead className="bg-gray-700">
                                <tr>
                                    {Object.keys(results[0]).map((key) => (
                                        <th key={key} className="px-4 py-2 text-sm text-left">
                                            {key}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {results.map((row, i) => (
                                    <tr key={i} className="border-b border-gray-700">
                                        {Object.values(row).map((value, j) => (
                                            <td key={j} className="px-4 py-2 text-sm">
                                                {value}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Console */}
            {isPreviewVisible && (
                <div className="bg-gray-900 mx-4 mb-4 rounded-lg overflow-hidden border border-gray-700">
                    <div className="px-4 py-2.5 bg-gray-800 border-b border-gray-700">
                        <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider text-end">
                            کنسول
                        </h3>
                    </div>
                    <ConsoleOutput
                        output={consoleOutput}
                        className="max-h-48"
                    />
                </div>
            )}
        </div>
    );
};

export default SQLPreview;