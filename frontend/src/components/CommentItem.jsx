export default function CommentItem({ comment }) {

    return (
        <div className="comment-container">
            <div className="comment-header">
                <div className="comment-author-info">
                    <img
                        src={comment.image}
                        alt="User profile"
                    />
                    <p>{comment.author}</p>
                    <p>{comment.date}</p>
                </div>
            </div>

            <div className="comment-body">
                <p>{comment.text}</p>
                <p>👍 {comment.likes}</p>
            </div>
        </div>
    );
}
