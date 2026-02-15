import CommentItem from "./CommentItem";

export default function CommentList({ comments }) {
    return (
        <div className="comment-list">
            {comments.map((comment) => {
                return (
                    <CommentItem key={comment.id} comment={comment} />
                );
            })}
        </div>
    );
}
