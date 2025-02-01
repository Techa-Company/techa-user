// components/CommentItem.js
"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, StarHalf, Star as StarFilled } from 'lucide-react';

const CommentItem = ({ comment, index, handleReply, replyingTo, replyContent, setReplyContent, handleAddReply }) => {
    const [showReplyForm, setShowReplyForm] = useState(false);

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<StarFilled key={`full-${i}`} className="text-yellow-400" />);
        }

        if (hasHalfStar) {
            stars.push(<StarHalf key="half" className="text-yellow-400" />);
        }

        const emptyStars = 5 - stars.length;

        for (let i = 0; i < emptyStars; i++) {
            stars.push(<Star key={`empty-${i}`} className="text-gray-300" />);
        }

        return <div className="flex">{stars}</div>;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: "numeric", month: "long", day: "numeric" };
        return date.toLocaleDateString("fa-IR", options);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-md"
        >
            <div className="flex items-center mb-4">
                <img
                    src={comment.userAvatar}
                    alt={comment.userName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#7AE36A]"
                />
                <div className="mr-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                        {comment.userName}
                    </h3>
                    <span className="text-sm text-gray-500">
                        {formatDate(comment.date)}
                    </span>
                </div>
            </div>
            <div className="flex items-center mb-4">
                {renderStars(comment.rating)}
                <span className="text-sm text-gray-600 mr-2">
                    {comment.rating} از ۵
                </span>
            </div>
            <p className="text-gray-700 leading-7 text-justify">{comment.comment}</p>
            <button
                onClick={() => setShowReplyForm(!showReplyForm)}
                className="mt-4 text-sm text-[#7AE36A] font-semibold hover:text-emerald-600 transition-colors"
            >
                {showReplyForm ? "انصراف از پاسخ" : "پاسخ"}
            </button>
            {/* فرم پاسخ */}
            {showReplyForm && (
                <div className="mt-4">
                    <textarea
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        className="w-full p-3 border rounded-lg mb-2"
                        placeholder="پاسخ خود را بنویسید"
                        rows={3}
                    ></textarea>
                    <button
                        onClick={() => handleAddReply(comment.id)}
                        className="px-4 py-2 bg-[#7AE36A] text-white rounded-lg font-semibold hover:bg-emerald-600 transition-colors"
                    >
                        ارسال پاسخ
                    </button>
                </div>
            )}
            {/* نمایش پاسخ‌ها */}
            {comment.replies && comment.replies.length > 0 && (
                <div className="mt-6 space-y-4 border-t pt-4 border-gray-200">
                    {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex items-start">
                            <img
                                src={reply.userAvatar}
                                alt={reply.userName}
                                className="w-10 h-10 rounded-full object-cover border-2 border-gray-300"
                            />
                            <div className="mr-4">
                                <h4 className="text-md font-semibold text-gray-800">
                                    {reply.userName}
                                </h4>
                                <span className="text-sm text-gray-500">
                                    {formatDate(reply.date)}
                                </span>
                                <p className="text-gray-700 mt-2">{reply.comment}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </motion.div>
    );
};

export default CommentItem;