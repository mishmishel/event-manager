import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Comments from './Comments';

export default function EventInfo({ user }) {
  const [event, setEvent] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [isUserJoined, setIsUserJoined] = useState(false);
  
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
          const userJoinedEventIds = json.map(event => event.event_id);
          setIsUserJoined(userJoinedEventIds.includes(parseInt(id, 10)));
        });
    }
  }, [user, id]);

  const handleToggleJoin = () => {
    // redirect to login if user not logged in
    if (!user) {
      navigate('/login');
      return;
    }

    // determine API endpoint based on join/unjoin
    const endpoint = isUserJoined ? `/unjoin/${id}` : `/users/${user.id}/events_joineds`;

    fetch(endpoint, {
      method: isUserJoined ? 'DELETE' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: isUserJoined ? null : JSON.stringify({ event_id: id }),
    })
      .then(response => response.json())
      .then(json => {
        console.log("Toggle Join/Unjoin Response:", json);
        if (json.status === 'Event removed successfully' || json.status === 'Joined successfully') {
          setSuccessMessage(isUserJoined ? 'Successfully unjoined the event!' : 'Successfully joined the event!');
          setIsUserJoined(!isUserJoined); 
        } else {
          setSuccessMessage(`Failed to ${isUserJoined ? 'unjoin' : 'join'} the event.`);
        }
      })
      .catch(error => {
        console.error(`Error during ${isUserJoined ? 'unjoin' : 'join'}:`, error);
        setSuccessMessage(`Failed to ${isUserJoined ? 'unjoin' : 'join'} the event. An error occurred.`);
      });
  };

  // navigate back to previous page
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div>
      {!event.error ? (
        <>
          <h1>{event.title}</h1>
          <h2>{event.date}</h2>
          <p>{event.description}</p>

          <button onClick={handleToggleJoin}>
            {isUserJoined ? 'Unjoin Event' : 'Join Event'}
          </button>
          {successMessage && <p>{successMessage}</p>}

          <button onClick={handleBack}>Back</button>
        </>
      ) : (
        <p>No event found</p>
      )}

      <h2>Comments</h2>
      <Comments user={user} />
    </div>
  );
}
