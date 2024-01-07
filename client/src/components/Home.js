import React, { useState, useEffect } from 'react'
import EventCalendar from './EventCalendar';

export default function Home() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        // Fetch events data here
        fetch('/events')
          .then(response => response.json())
          .then(json => setEvents(json))
          .catch(error => console.error(error));
      }, []);
    
    return (
        <div>
            <h1>Welcome to Streetdance Event Manager</h1>
            <EventCalendar events={events} />
        </div>
    )
}