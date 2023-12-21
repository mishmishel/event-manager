import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function UserInfo() {
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    console.log("User ID:", id);
    fetch('/users/' + id)
      .then(response => response.json())
      .then(json => {
        setUser(json);
      });
  }, [id]); // Including id as dependency to retrieve data when id changes

  return (
    <div>
      {!user.error ? (
        <>
          <h1>{user.first_name} {user.last_name}</h1>
          {user.events && user.events.length > 0 ? (
            <>
              <h2>Events:</h2>
              <ul>
                {user.events.map((event, index) => (
                  <li key={index}>{event.title} - {event.date}</li>
                ))}
              </ul>
            </>
          ) : (
            <p>No events found</p>
          )}
        </>
      ) : (
        <p>No user found</p>
      )}
    </div>
  );
}