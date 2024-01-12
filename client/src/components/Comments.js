import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

export default function Comments( { user } ) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [commentError, setCommentError] = useState(false);

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

      if (!user) {
        // redirect to login page for non-authenticated users
        navigate('/login');
        return;
      }

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
          // clear comment after posting
          setNewComment('');
        })
        .catch(error => {
          setCommentError('Failed to post the comment. Please try again.');
        });
    } else {
      // display error message if newComment is empty
      setCommentError('Please enter a comment before submitting.');
    }
  };

  return (
    <div>
    {user && (
      <div>
        <label htmlFor="newComment">Post a comment:</label>
        {commentError && <p>{commentError}</p>}
        <textarea
          id="newComment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handlePostComment}>Post Comment</button>
      </div>
    )}

    {!user && (
      <p>You need to <Link to="/login">sign up</Link> to post a comment.</p>
    )}

    {comments.length > 0 ? (
      <>
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
)
}