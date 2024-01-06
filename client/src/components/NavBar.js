import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar({ user }) {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/events">Events</Link></li>
        {user ? (
          <li><Link to={`/users/${user.id}`}>User Info</Link></li>
        ) : (
          <li><Link to="/signup">Sign Up</Link></li>
        )}
      </ul>
    </nav>
  );
}