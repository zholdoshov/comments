import { useEffect, useState } from 'react';
import './App.css'
import { createComment, deleteComment, getComments, updateComment } from './api/comments';
import CommentList from './components/CommentList';
import CommentForm from './components/CommentForm';

function App() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchComments() {
      try {
        const data = await getComments();
        setComments(data);
      } catch (error) {
        console.error("Failed to fetch comments", error);
      }
    }

    fetchComments();
  }, []);

  async function handleAdd(text) {
    try {
      const newComment = await createComment(text);
      setComments((prev) => [newComment, ...prev]);
    } catch (error) {
      console.error("Failed to create comment", error);
    }
  }

  async function handleUpdate(id, text) {
    try {
      const updatedComment = await updateComment(id, text);
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === id ? updatedComment : comment
        )
      );
    } catch (error) {
      console.error("Failed to update comment", error);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteComment(id);
      setComments((prev) =>
        prev.filter((comment) => comment.id !== id)
      );
    } catch (error) {
      console.error("Failed to delete comment", error);
    }
  }

  return (
    <>
      <h1>All comments</h1>
      <CommentForm onAdd={handleAdd} />
      {
        comments.length === 0 ? (
          <p>No comments yet!</p>
        ) : (
          <CommentList
            comments={comments}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />)
      }
    </>
  )
}

export default App
