import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function UserInfo() {
  const [user, setUser] = useState({});
  const [eventList, setEventList] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { id } = useParams();

  useEffect(() => {
    console.log("User ID:", id);
    fetch('/users/' + id)
      .then(response => response.json())
      .then(json => {
        console.log("User data:", json);
        setUser(json);
      });
  }, [id]);

  useEffect(() => {
    fetch('/events')
      .then(response => response.json())
      .then(json => {
        setEventList(json);
      });
  }, []);

  const handleJoinEvent = (e) => {
    e.preventDefault();


    fetch(`/users/${id}/events_joineds`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ event_id: selectedEventId }),
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
      {!user.error ? (
        <>
          <h1>{user.first_name} {user.last_name}</h1>

          <Link to={`/users/${id}/events_joineds`}>Events Joined</Link>

        </>
      ) : (
        <p>No user found</p>
      )}

      <h2>Join an Event</h2>
      <form onSubmit={handleJoinEvent}>
        <label value="events">Events</label>
        <select
          id="events"
          value={selectedEventId}
          onChange={(e) => setSelectedEventId(e.target.value)}
        >
          <option value="">Select an event</option>
          {eventList.map(event => (
            <option key={event.id} value={event.id}>
              {event.title}
            </option>
          ))}
        </select>
        <button type="submit">Join Event</button>
      </form>

      {successMessage && <p>{successMessage}</p>}
    </div>
  );
}