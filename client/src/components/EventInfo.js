import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function EventInfo({user}) {
  const [event, setEvent] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const { id } = useParams();

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

          <Link to={`/events/${id}/comments`}>View Comments</Link>
        </>
      ) : (
        <p>No event found</p>
      )}
    </div>
  );
}