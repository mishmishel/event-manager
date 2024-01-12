import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function UserInfo() {
  const [user, setUser] = useState({});
  const [eventsJoined, setEventsJoined] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("User ID:", id);

    fetch(`/users/${id}`)
      .then(response => response.json())
      .then(json => {
        console.log("User data:", json);
        setUser(json);

        // fetch events joined by user
        fetch(`/users/${id}/events_joineds`)
          .then(response => response.json())
          .then(events => {
            console.log("Events joined:", events);
            setEventsJoined(events);
          });
      });
  }, [id]);

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div>
      <button onClick={handleBack}>Back</button>

      {!user.error ? (
        <>
          <h1>{user.first_name} {user.last_name}</h1>

          <h2>Events Joined</h2>
          <ul>
            {eventsJoined.map((event, index) => (
              <li key={index}>{event.event_title} - {event.event_date}</li>
            ))}
          </ul>
        </>
      ) : (
        <p>You haven't logged in yet! Log in or Sign up to continue!</p>
      )}
    </div>
  );
}
