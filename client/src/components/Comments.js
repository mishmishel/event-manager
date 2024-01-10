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
        // Redirect to login/signup page for non-authenticated users
        navigate('/getloggedon');
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
          // clear newComment state after posting
          setNewComment('');
        })
        .catch(error => {
          // Handle errors, e.g., display an error message
          setCommentError('Failed to post the comment. Please try again.');
        });
    } else {
      // Display an error message if newComment is empty
      setCommentError('Please enter a comment before submitting.');
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="newComment">Post a comment:</label>
        {commentError && <p>{commentError}</p>}
        <textarea
          id="newComment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
          <button onClick={handlePostComment}>{user ? 'Post Comment' : 'Sign Up'}</button>
          {!user && (
            <p>You need to <Link to="/getloggedon">sign up</Link> to post a comment.</p>
          )}
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