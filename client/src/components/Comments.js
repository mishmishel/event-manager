import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Comments( { user } ) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { id } = useParams(); 

  useEffect(() => {
    console.log("Event ID:", id);
    fetch(`/events/${id}/comments`)
      .then(response => response.json())
      .then(json => {
        console.log("Comments:", json);
        setComments(json);
      });
  }, [id]);

  const handlePostComment = () => {
    // check if newComment is not empty before making POST request
    if (newComment.trim() !== '') {
      const user_id = user.id; 

      fetch(`/events/${id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id,
          text: newComment,
        }),
      })
        .then(response => response.json())
        .then(newComment => {
          // update comments state with the new comment
          setComments(prevComments => [...prevComments, newComment]);
          // clear newComment state after posting
          setNewComment('');
        });
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="newComment">Post a comment:</label>
        <textarea
          id="newComment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handlePostComment}>Post Comment</button>
      </div>

      {comments.length > 0 ? (
        <>
          <h1>Comments</h1>
          <ul>
            {comments.map((comment, index) => (
              <li key={index}>{comment.text} - {comment.user.username}</li>
            ))}
          </ul>
        </>
      ) : (
        <p>No comments found</p>
      )}
    </div>
  );
}