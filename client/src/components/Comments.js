import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './Comments.css';

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

  const handleDeleteComment = (commentId) => {
    console.log("Deleting comment with ID:", commentId);
    fetch(`/delete/${commentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(json => {
        console.log("Delete Comment Response:", json);
        // Update the comments state to reflect the deletion
        setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
      })
      .catch(error => {
        console.error("Error during delete:", error);
      });
  };

  return (
    <div className="comments-container">
    {user && (
      <div>
          <div className="label-container">
            <label htmlFor="newComment">Post a comment:</label>
          </div>
          {commentError && <p>{commentError}</p>}
          <textarea
          id="newComment"
          className="new-comment-input"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
         <div className="post-comment-wrapper">
        <button className="post-comment-button" onClick={handlePostComment}>Post</button>
        </div>
      </div>
    )}

    {!user && (
      <p>You need to <Link to="/login">sign up</Link> to post a comment.</p>
    )}

    {comments.length > 0 ? (
      <>
       <ul className="comments-list">
       {comments.map((comment, index) => {
        return (
        <li key={index} className="comment-item">
        <div className="comment-content">
        <div className="username">{comment.user.username}</div>
        <div className="text">{comment.text}</div>
        </div>
        {user && user.id === comment.user?.id && (
        <button className="delete-comment-button" onClick={() => handleDeleteComment(comment.id)}>X</button>
      )}
      </li>
      );
      })}
        </ul>
      </>
    ) : (
      <p>No comments found</p>
    )}
  </div>
)
}