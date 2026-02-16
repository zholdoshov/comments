import { useState } from "react";

export default function CommentForm({ onAdd }) {
    const [text, setText] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleAdd(e) {
        e.preventDefault();

        if (!text.trim()) return;

        try {
            setIsSubmitting(true);
            await onAdd(text.trim());
            setText("");
        } catch (error) {
            console.error("Failed to add comment", error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form className="form-container" onSubmit={handleAdd}>
            <div className="form-input">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Write a comment..."
                    disabled={isSubmitting}
                />
            </div>

            <div className="form-button">
                <button disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
            </div>
        </form>
    );
}
