// components/SubmissionForm.js
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Send } from "lucide-react";

const SubmissionForm = ({ exercise }) => {
    const [code, setCode] = useState("");
    const [file, setFile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        // منطق ارسال تمرین
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-50 rounded-xl p-6"
        >
            <h3 className="text-xl font-semibold mb-4">ارسال تکلیف</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">آپلود فایل</label>
                    <label className="flex items-center gap-2 cursor-pointer border border-dashed p-4 rounded-lg hover:bg-white transition-colors">
                        <Upload size={20} className="text-gray-500" />
                        <span className="text-gray-600">
                            {file ? file.name : "فایل خود را اینجا رها کنید یا کلیک کنید"}
                        </span>
                        <input
                            type="file"
                            className="hidden"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </label>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">یا کد خود را اینجا وارد کنید</label>
                    <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="// کد خود را اینجا بنویسید..."
                    />
                </div>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-emerald-500 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-emerald-600 transition-colors"
                >
                    <Send size={18} />
                    ارسال پاسخ
                </motion.button>
            </form>
        </motion.div>
    );
};

export default SubmissionForm;