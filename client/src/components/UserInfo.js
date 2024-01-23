import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './UserInfo.css';

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
    <div className="user-info-container">

      <div className="events-joined-container">
      {!user.error ? (
        <>
          <h1>{user.first_name} {user.last_name}</h1>

          <h2>Events Joined</h2>
          <ul>
            {eventsJoined.map((event) => (
              <li key={event.event_id}><Link to={`/events/${event.event_id}`}>{event.event_title} - {event.event_date}</Link></li>
            ))}
          </ul>
        </>
      ) : (
        <p>You haven't logged in yet! Log in or Sign up to continue!</p>
      )}
      </div>
      <div className="userinfo-backbutton">
      <button  onClick={handleBack}>Back</button>
      </div>
    </div>
  );
}
