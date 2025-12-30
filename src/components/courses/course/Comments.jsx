"use client";
import { useState, useEffect } from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import { Loader2 } from 'lucide-react';

const Comments = () => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // شبیه‌سازی دریافت داده
        const fetchComments = async () => {
            await new Promise((resolve) => setTimeout(resolve, 800));
            const fakeComments = [
                {
                    id: 1,
                    userName: "علی جوشنگ",
                    userAvatar: "https://i.pravatar.cc/150?img=65",
                    rating: 4,
                    date: "2023-10-12",
                    comment: "این دوره واقعاً دید من رو نسبت به برنامه‌نویسی تغییر داد. ممنون از تیم خوبتون.",
                    replies: [
                        {
                            id: 11,
                            userName: "پشتیبانی سایت",
                            userAvatar: "https://i.pravatar.cc/150?img=33",
                            date: "2023-10-13",
                            comment: "خوشحالیم که براتون مفید بوده علی جان! موفق باشید.",
                            role: "admin" // برای استایل دهی خاص به ادمین
                        },
                    ],
                },
                {
                    id: 2,
                    userName: "مریم احمدی",
                    userAvatar: "https://i.pravatar.cc/150?img=47",
                    rating: 5,
                    date: "2023-10-10",
                    comment: "کیفیت صدا و تصویر عالی بود. فقط ای کاش بخش پروژه‌ها کمی بیشتر بود.",
                    replies: [],
                },
            ];
            setComments(fakeComments);
            setLoading(false);
        };
        fetchComments();
    }, []);

    const handleAddComment = (newComment, resetForm) => {
        const commentToAdd = {
            ...newComment,
            id: Date.now(),
            date: new Date().toISOString().split("T")[0],
            userAvatar: `https://i.pravatar.cc/150?u=${Date.now()}`, // آواتار رندوم
            replies: [],
        };
        setComments([commentToAdd, ...comments]);
        resetForm();
    };

    const handleAddReply = (commentId, text) => {
        const replyToAdd = {
            id: Date.now(),
            userName: "کاربر مهمان",
            userAvatar: "/images/default-avatar.jpg",
            date: new Date().toISOString().split("T")[0],
            comment: text,
        };
        setComments((prevComments) =>
            prevComments.map((comment) =>
                comment.id === commentId
                    ? { ...comment, replies: [...comment.replies, replyToAdd] }
                    : comment
            )
        );
    };

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-8">
                <div className="h-8 w-1 bg-emerald-500 rounded-full"></div>
                <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
                    نظرات <span className="text-emerald-500">دانشجویان</span>
                </h2>
                <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded-full mr-2">
                    {comments.length} نظر
                </span>
            </div>

            <CommentForm handleAddComment={handleAddComment} />

            {loading ? (
                <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                    <Loader2 className="w-10 h-10 animate-spin mb-3 text-emerald-500" />
                    <p>در حال بارگذاری نظرات...</p>
                </div>
            ) : (
                <CommentList comments={comments} handleAddReply={handleAddReply} />
            )}
        </div>
    );
};

export default Comments;