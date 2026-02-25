import { useEffect, useState } from 'react';
import './App.css'
import { createComment, deleteComment, getComments, updateComment } from './api/comments';
import { useSearchParams } from 'react-router-dom';
import CommentList from './components/CommentList';
import CommentForm from './components/CommentForm';

function App() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') || '';

  async function fetchComments(sort) {
    setLoading(true);
    try {
      const data = await getComments(sort);
      setComments(data);
    } catch (error) {
      console.error("Failed to fetch comments", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchComments(sortBy || undefined);
  }, []);

  async function handleAdd(text) {
    try {
      const newComment = await createComment(text);
      console.log(newComment);

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

  async function handleSortSelect(e) {
    const { name, value } = e.target;
    setSearchParams(prevParams => {
      prevParams.set(name, value);
      return prevParams;
    })
    await fetchComments(value);
  }

  return (
    <>
      <h1>All comments</h1>
      <CommentForm onAdd={handleAdd} />
      <div>
        <label htmlFor="sort">Sort by</label>
        <select name="sort" id="sort" value={sortBy} onChange={handleSortSelect}>
          <option value="" disabled>Select</option>
          <option value="date_desc">Newest comments</option>
          <option value="date_asc">Oldest comments</option>
          <option value="id_asc">ID Asc</option>
          <option value="id_desc">ID Desc</option>
        </select>
      </div>
      {
        comments.length === 0 && loading ? (
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
