// components/Comments.js
"use client";
import { useState, useEffect } from 'react';
// import CommentForm from './CommentForm';
import CommentList from './CommentList';
import CommentSkeleton from './CommentSkeleton';
import CommentForm from './CommentForm';

const Comments = () => {
    const [comments, setComments] = useState([]);
    const [replyContent, setReplyContent] = useState("");
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // شبیه‌سازی دریافت نظرات از API
        const fetchComments = async () => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            const fakeComments = [
                {
                    id: 1,
                    userName: "علی رضایی",
                    userAvatar: "https://i.pravatar.cc/150?img=65",
                    rating: 4.5,
                    date: "2023-10-12",
                    comment:
                        "این دوره بسیار عالی بود و مطالب به خوبی توضیح داده شده بودند. واقعا راضی هستم.",
                    replies: [
                        {
                            id: 11,
                            userName: "مدیر سایت",
                            userAvatar: "https://i.pravatar.cc/150?img=63",
                            date: "2023-10-13",
                            comment: "خوشحالیم که دوره مورد پسند شما بوده است.",
                        },
                    ],
                },
                {
                    id: 2,
                    userName: "مریم احمدی",
                    userAvatar: "https://i.pravatar.cc/150?img=47",
                    rating: 5,
                    date: "2023-10-10",
                    comment:
                        "مدرس بسیار مسلط بود و پاسخ سوالات را با حوصله می‌داد. توصیه می‌کنم حتما این دوره را بگذرانید.",
                    replies: [],
                },
                {
                    id: 3,
                    userName: "محمد کاظمی",
                    userAvatar: "https://i.pravatar.cc/150?img=68",
                    rating: 4,
                    date: "2023-10-08",
                    comment:
                        "دوره خوبی بود اما می‌شد برخی مباحث را بیشتر توضیح داد. در کل رضایت‌بخش بود.",
                    replies: [],
                },
                // نظرات بیشتر...
            ];
            setComments(fakeComments);
            setLoading(false);
        };
        fetchComments();
    }, []);

    const handleAddComment = (newComment, resetForm) => {
        if (newComment.userName && newComment.comment && newComment.rating > 0) {
            const commentToAdd = {
                ...newComment,
                id: comments.length + 1,
                date: new Date().toISOString().split("T")[0],
                userAvatar: "/images/default-avatar.jpg", // تصویر پیش‌فرض
                replies: [],
            };
            setComments([commentToAdd, ...comments]);
            resetForm({
                userName: "",
                userAvatar: "",
                rating: 0,
                comment: "",
                date: "",
            });
        } else {
            alert("لطفاً تمامی فیلدها را پر کنید.");
        }
    };

    const handleAddReply = (commentId) => {
        if (replyContent) {
            const replyToAdd = {
                id: Date.now(),
                userName: "شما",
                userAvatar: "/images/default-avatar.jpg",
                date: new Date().toISOString().split("T")[0],
                comment: replyContent,
            };
            setComments((prevComments) =>
                prevComments.map((comment) =>
                    comment.id === commentId
                        ? {
                            ...comment,
                            replies: [...comment.replies, replyToAdd],
                        }
                        : comment
                )
            );
            setReplyContent("");
        } else {
            alert("لطفاً پاسخ خود را بنویسید.");
        }
    };

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold text-[#042A1B] mb-6">نظرات کاربران</h2>
            {/* فرم ارسال نظر جدید */}
            <CommentForm handleAddComment={handleAddComment} />
            {/* لیست نظرات */}
            {loading ? (
                <div className="space-y-6">
                    {[...Array(3)].map((_, index) => (
                        <CommentSkeleton key={index} />
                    ))}
                </div>
            ) : (
                <CommentList
                    comments={comments}
                    handleAddReply={handleAddReply}
                    replyContent={replyContent}
                    setReplyContent={setReplyContent}
                />
            )}
        </div>
    );
};

export default Comments;
