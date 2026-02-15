import { useEffect, useState } from 'react';
import './App.css'
import { getComments } from './api/comments';
import CommentList from './components/CommentList';

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

  return (
    <>
      <h1>All comments</h1>
      <CommentList
        comments={comments}
      />
    </>
  )
}

export default App
