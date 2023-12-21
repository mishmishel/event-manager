import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Comments() {
  const [comments, setComments] = useState([]);
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

  return (
    <div>
      {comments.length > 0 ? (
        <>
          <h1>Comments</h1>
          <ul>
            {comments.map((comment, index) => (
              <li key={index}>{comment.text} - {comment.user.first_name} {comment.user.last_name}</li>
            ))}
          </ul>
        </>
      ) : (
        <p>No comments found</p>
      )}
    </div>
  );
}