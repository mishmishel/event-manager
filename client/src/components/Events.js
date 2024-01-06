import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

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
          navigate('/signup');
        }
    };

    return (
        <div>
            <h1>Events Page</h1>
            {
                events.length > 0 
                ?
                <ul>
                    {
                    events.map(event => (
                        <li><Link to={`/events/${event.id}`}>{event.title} {event.date}</Link></li>
                    ))
                    }
                </ul>
                :
                <p>No event found</p>
            }
             <button onClick={handleCreateNewEvent}>Create New Event</button>
        </div>
    )
}