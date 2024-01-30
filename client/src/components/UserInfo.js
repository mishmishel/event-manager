import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './UserInfo.css';

export default function UserInfo() {
  const [user, setUser] = useState({});
  const [eventsJoined, setEventsJoined] = useState([]);
  const [eventsCreated, setEventsCreated] = useState([]); // state to hold events created by the user
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("User ID:", id);

    // fetch user info
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

        // fetch events created by user 
        fetch(`/users/${id}/events_created`)
          .then(response => response.json())
          .then(events => {
            console.log("Events created:", events);
            setEventsCreated(events);
          });
      });
  }, [id]);

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div>
      <div className="userinfo-backbutton">
        <button onClick={handleBack}>Back</button>
      </div>
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

            <h2 id="events-created">Events Created</h2>
            {eventsCreated.length > 0 ? (
              <ul>
                {eventsCreated.map((event) => (
                  <li key={event.id}><Link to={`/events/${event.id}`}>{event.title} - {event.date}</Link></li>
                ))}
              </ul>
            ) : (
              <p id="no-events">No events created. <Link to="/events/new">Create an event</Link></p>
            )}
          </>
        ) : (
          <p>You haven't logged in yet! Log in or Sign up to continue!</p>
        )}
      </div>
    </div>
    </div>
  );
}
