import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Comments from './Comments';

export default function EventInfo({ user }) {
  const [event, setEvent] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [eventsJoined, setEventsJoined] = useState([]); 
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

  useEffect(() => {
    if (user) {
      fetch(`/users/${user.id}/events_joineds`)
        .then(response => response.json())
        .then(json => {
          setEventsJoined(json);
        });
    }
  }, [user]);

  console.log("user:", user);
  console.log("eventsJoined:", eventsJoined);
  console.log("event id:", id);

  const isUserJoined = user && eventsJoined.some(event => event.event_id == id);

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
            setEventsJoined([...eventsJoined, { event_id: id }]);
          } else {
            setSuccessMessage('Failed to join the event. Perhaps you have already joined?');
          }
        });
    } else {
      // if user not logged in then get taken to login/signup page
      navigate('/login');
    }
  };

  const handleUnjoinEvent = () => {
    if (!user) {
      navigate('/login');
      return;
    }
  
    if (eventsJoined.length === 0) {
      setSuccessMessage('Failed to unjoin the event. Perhaps you have not joined yet?');
      return;
    }
  
    const eventUnjoin = eventsJoined.find(event => event.event_id == id);
  
    fetch(`/unjoin/${eventUnjoin.event_id}}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(json => {
        console.log("Unjoin Event Response:", json);
        if (json.status === 'Event removed successfully') {
          setSuccessMessage('Successfully unjoined the event!');
          setEventsJoined(eventsJoined.filter(event => event.event_id !== id));
        } else {
          setSuccessMessage('Failed to unjoin the event. Perhaps you have not joined yet?');
        }
      })
      .catch(error => {
        console.error("Error during unjoin:", error);
        setSuccessMessage('Failed to unjoin the event. An error occurred.');
      });
  };

  const handleBack = () => {
    // navigate back to the /events or /users page
    navigate(-1);
  };

  return (
    <div>
      {!event.error ? (
        <>
          <h1>{event.title}</h1>
          <h2>{event.date}</h2>
          <p>{event.description}</p>

          {isUserJoined ? (
            <button onClick={handleUnjoinEvent}>Unjoin Event</button>
          ) : (
            <button onClick={handleJoinEvent}>Join Event</button>
          )}
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