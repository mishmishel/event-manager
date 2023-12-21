import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function EventInfo() {
  const [event, setEvent] = useState({});
  const { id } = useParams();

  useEffect(() => {
    console.log("Event ID:", id);
    fetch('/events/' + id)
      .then(response => response.json())
      .then(json => {
        console.log("Event data:", json);
        setEvent(json);
      });
  }, [id]);

  return (
    <div>
      {!event.error ? (
        <>
          <h1>{event.title}</h1>
          <h2>{event.date}</h2>
          <p>{event.description}</p>

          <Link to={`/events/${id}/comments`}>View Comments</Link>
        </>
      ) : (
        <p>No event found</p>
      )}
    </div>
  );
}