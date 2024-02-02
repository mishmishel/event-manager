import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Events.css';

export default function Events({ user }) {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(()=> {
        fetch('/events') 
        .then(response => response.json())
        .then(json => {
            setEvents(json)
        })
    }, [])

    const handleCreateNewEvent = () => {
        console.log('User:', user);
        if (user) {
          // if the user logged in - navigate to /events/new
          navigate('/events/new');
        } else {
          // if the user not logged in - navigate to /signup
          navigate('/login');
        }
    };

    const handleBack = () => {
        navigate('/');
    };

    return (
    <div>
      <h1>Events Page</h1>
      <button className="create-event-button" onClick={handleCreateNewEvent}>
        {user ? 'Create New Event' : 'Sign Up'}
      </button>

      <div className="events-container">
        {events.length > 0 ? (
          events.map((event) => (
            <Link to={`/events/${event.id}`} className="event-card" key={event.id}>
              <h3>{event.title}</h3>
              <p className="event-date">{event.date}</p>
            </Link>
          ))
        ) : (
          <p></p>
        )}
      </div>
        <button className="back-button" onClick={handleBack}>Back</button>
    </div>
  );
}