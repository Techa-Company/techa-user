// components/CommentList.js
"use client";
import CommentItem from './CommentItem';

const CommentList = ({ comments, handleAddReply, replyContent, setReplyContent }) => {
    return (
        <div className="space-y-6">
            {comments.map((comment, index) => (
                <CommentItem
                    key={comment.id}
                    comment={comment}
                    index={index}
                    handleAddReply={handleAddReply}
                    replyContent={replyContent}
                    setReplyContent={setReplyContent}
                />
            ))}
        </div>
    );
};

export default CommentList;
