"use client";
import { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Link from 'next/link';

export default function NewTicket() {
    const [ticketData, setTicketData] = useState({
        title: '',
        category: 'فنی',
        priority: 'بالا',
        content: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // ذخیره تیکت در localStorage یا ارسال به API
        const tickets = JSON.parse(localStorage.getItem('tickets') || []);
        const newTicket = {
            id: Date.now(),
            ...ticketData,
            createdAt: new Date().toLocaleDateString('fa-IR'),
            status: 'باز',
            messages: []
        };
        localStorage.setItem('tickets', JSON.stringify([...tickets, newTicket]));
        navigate('/support');
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-emerald-800 mb-8">تیکت جدید</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-emerald-800 mb-2">موضوع تیکت</label>
                    <input
                        type="text"
                        required
                        className="w-full p-3 rounded-xl border-2 border-emerald-100 focus:border-emerald-500 outline-none"
                        value={ticketData.title}
                        onChange={(e) => setTicketData({ ...ticketData, title: e.target.value })}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-emerald-800 mb-2">دسته‌بندی</label>
                        <select
                            className="w-full p-3 rounded-xl border-2 border-emerald-100 focus:border-emerald-500 outline-none"
                            value={ticketData.category}
                            onChange={(e) => setTicketData({ ...ticketData, category: e.target.value })}
                        >
                            <option value="فنی">فنی</option>
                            <option value="آموزشی">آموزشی</option>
                            <option value="مالی">مالی</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-emerald-800 mb-2">اولویت</label>
                        <select
                            className="w-full p-3 rounded-xl border-2 border-emerald-100 focus:border-emerald-500 outline-none"
                            value={ticketData.priority}
                            onChange={(e) => setTicketData({ ...ticketData, priority: e.target.value })}
                        >
                            <option value="بالا">بالا</option>
                            <option value="متوسط">متوسط</option>
                            <option value="کم">کم</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-emerald-800 mb-2">شرح مشکل</label>
                    <Editor
                        apiKey='v12ld4fyiekikay5d5tuv6j4578f6daxybv4qrm2a0oymp5j'
                        init={{
                            height: 400,
                            menubar: false,
                            plugins: 'lists link image table code help',
                            toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist | table | code',
                            directionality: 'rtl',
                            content_style: 'body { font-family:Vazir, sans-serif; font-size:14px }'
                        }}
                        value={ticketData.content}
                        onEditorChange={(content) => setTicketData({ ...ticketData, content })}
                    />
                </div>

                <div className="flex justify-end gap-3">
                    <Link
                        href='/account/tickets'
                        className="px-6 py-3 bg-gray-100 text-gray-800 rounded-xl hover:bg-gray-200"
                    >
                        انصراف
                    </Link>
                    <button
                        type="submit"
                        className="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700"
                    >
                        ارسال تیکت
                    </button>
                </div>
            </form>
        </div>
    );
}