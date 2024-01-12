import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Comments from './Comments';

export default function EventInfo({ user }) {
  const [event, setEvent] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Event ID:", id);
    fetch('/events/' + id)
      .then(response => response.json())
      .then(json => {
        console.log("Event data:", json);
        setEvent(json);
      });
  }, [id]);

  // allowing users to join events when they press join button

  const handleJoinEvent = () => {
    if (user) {
      // if user is logged allows them to join event
      fetch(`/users/${user.id}/events_joineds`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ event_id: id }),
      })
        .then(response => response.json())
        .then(json => {
          console.log("Join Event Response:", json);
          if (json.status === 'Joined successfully') {
            setSuccessMessage('Successfully joined the event!');
          } else {
            setSuccessMessage('Failed to join the event. Perhaps you have already joined?');
          }
        });
    } else {
      // if user not logged in then get taken to login/signup page
      navigate('/login');
    }
  };

  const handleBack = () => {
    // navigate back to the /events page
    navigate(-1);
  };

  return (
    <div>
      {!event.error ? (
        <>
          <h1>{event.title}</h1>
          <h2>{event.date}</h2>
          <p>{event.description}</p>

          <button onClick={handleJoinEvent}>Join Event</button>
          {successMessage && <p>{successMessage}</p>}

          <button onClick={handleBack}>Back</button>
        </>
      ) : (
        <p>No event found</p>
      )}

      <h2>Comments</h2>
      <Comments user={user}/>
    </div>
  );
}