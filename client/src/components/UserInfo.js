import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function UserInfo() {
  const [user, setUser] = useState({});
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

  return (
    <div>
      {!user.error ? (
        <>
          <h1>{user.first_name} {user.last_name}</h1>

          {/* Display events created by the user */}
          {user.events && user.events.length > 0 && (
            <>
              <h2>Events Created:</h2>
              <ul>
                {user.events.map((event, index) => (
                  <li key={index}>{event.title} - {event.date}</li>
                ))}
              </ul>
            </>
          )}

          {/* Link to events joined by the user */}
          <Link to={`/users/${id}/events_joineds`}>Events Joined</Link>

        </>
      ) : (
        <p>No user found</p>
      )}
    </div>
  );
}