import { useState } from "react";

export default function CommentItem({ comment, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(comment.text);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    async function handleDelete() {
        try {
            setIsDeleting(true);
            await onDelete(comment.id);
        } finally {
            setIsDeleting(false);
        }
    }

    async function handleSave() {
        if (!editedText.trim()) return;

        try {
            setIsUpdating(true);
            await onUpdate(comment.id, editedText);
            setIsEditing(false);
        } finally {
            setIsUpdating(false);
        }
    }

    return (
        <div className="comment-container">
            <div className="comment-header">
                <div className="comment-author-info">
                    <img
                        src={
                            comment.image
                                ? comment.image
                                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s"
                        }
                        alt="User profile"
                    />
                    <p>{comment.author}</p>
                    <p>{new Date(comment.date).toLocaleString()}</p>
                </div>

                <div className="comment-author-actions">
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleSave}
                                disabled={isUpdating}
                            >
                                {isUpdating ? "Saving..." : "Save"}
                            </button>

                            <button
                                onClick={() => {
                                    setIsEditing(false);
                                    setEditedText(comment.text);
                                }}
                                disabled={isUpdating}
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => setIsEditing(true)}
                                disabled={isDeleting}
                            >
                                Edit
                            </button>

                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                            >
                                {isDeleting ? "Deleting..." : "Delete"}
                            </button>
                        </>
                    )}
                </div>
            </div>

            <div className="comment-body">
                {isEditing ? (
                    <textarea
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        disabled={isUpdating}
                    />
                ) : (
                    <p>{comment.text}</p>
                )}

                <p>👍 {comment.likes}</p>
            </div>
        </div>
    );
}
