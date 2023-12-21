import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function EventsJoined() {
  const [eventsJoined, setEventsJoined] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    console.log("User ID:", id);
    fetch(`/users/${id}/events_joineds`)
      .then(response => response.json())
      .then(json => {
        console.log("Events joined:", json);
        setEventsJoined(json);
      });
  }, [id]);

  return (
    <div>
      <h1>Events Joined by the User</h1>
      <ul>
        {eventsJoined.map((event, index) => (
          <li key={index}>{event.event_title} - {event.event_date}</li>
        ))}
      </ul>
    </div>
  );
}