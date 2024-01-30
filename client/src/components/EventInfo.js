import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Comments from './Comments';
import './EventInfo.css';

export default function EventInfo({ user }) {
  const [event, setEvent] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [isUserJoined, setIsUserJoined] = useState(false);
  const [isCreator, setIsCreator] = useState(false); 
  
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Event ID:", id);
    fetch('/events/' + id)
      .then(response => response.json())
      .then(json => {
        console.log("Event data:", json);
        setEvent(json);
        setIsCreator(json.created_by === user?.id);
      });
  }, [id, user]);

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
    if (!user) {
      navigate('/login');
      return;
    }

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

  const handleDeleteEvent = () => {
    fetch(`/events/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(json => {
        console.log("Delete Event Response:", json);
        if (json.status === 'deleted') {
          navigate(-1); 
        } else {
          setSuccessMessage('Failed to delete the event.');
        }
      })
      .catch(error => {
        console.error("Error during event deletion:", error);
        setSuccessMessage('Failed to delete the event. An error occurred.');
      });
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div>
    <div className="singular-event-container">
      {!event.error ? (
        <div className="event-info-card">
          <h1>{event.title}</h1>
          <h2>{event.date}</h2>
          <p>{event.description}</p>
  
          <div className="info-button-container">
            <button id="join-unjoin-button" onClick={handleToggleJoin} className={isUserJoined ? 'negative-action' : 'positive-action'}>
              {isUserJoined ? 'Unjoin Event' : 'Join Event'}
            </button>
            <div className="back-button-container">
            <button onClick={handleBack}>Back</button>
            </div>
          </div>
          {successMessage && <p id="success-message">{successMessage}</p>}
        </div>
      ) : (
        <p>No event found</p>
      )}
  
      <h2>Comments</h2>
      <Comments user={user} />
    </div>

    {isCreator && (
        <div className="delete-event-container">
          <button className="delete-button" onClick={handleDeleteEvent}>Delete Event</button>
        </div>
    )}

    </div>
  );
  
}