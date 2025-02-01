// components/CommentForm.js
"use client";
import { useState } from 'react';

const CommentForm = ({ handleAddComment }) => {
    const [newComment, setNewComment] = useState({
        userName: "",
        userAvatar: "",
        rating: 0,
        comment: "",
        date: "",
    });

    return (
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">ارسال نظر جدید</h3>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">نام شما</label>
                <input
                    type="text"
                    value={newComment.userName}
                    onChange={(e) =>
                        setNewComment({ ...newComment, userName: e.target.value })
                    }
                    className="w-full p-3 border rounded-lg"
                    placeholder="نام خود را وارد کنید"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">امتیاز شما</label>
                <select
                    value={newComment.rating}
                    onChange={(e) =>
                        setNewComment({ ...newComment, rating: parseFloat(e.target.value) })
                    }
                    className="w-full p-3 border rounded-lg"
                >
                    <option value={0}>انتخاب کنید</option>
                    {/* مقادیر امتیاز */}
                    {[5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1, 0.5].map((rating) => (
                        <option key={rating} value={rating}>{rating}</option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">متن نظر</label>
                <textarea
                    value={newComment.comment}
                    onChange={(e) =>
                        setNewComment({ ...newComment, comment: e.target.value })
                    }
                    className="w-full p-3 border rounded-lg"
                    placeholder="نظر خود را بنویسید"
                    rows={4}
                ></textarea>
            </div>
            <button
                onClick={() => handleAddComment(newComment, setNewComment)}
                className="px-6 py-3 bg-[#7AE36A] text-white rounded-lg font-semibold hover:bg-emerald-600 transition-colors"
            >
                ارسال نظر
            </button>
        </div>
    );
};

export default CommentForm;