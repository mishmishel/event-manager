import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function NavBar({ user }) {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    // Navigate to SignUp page
    navigate('/signup');
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        {user ? (
          <>
            <li><Link to="/events">Events</Link></li>
            <li><Link to={`/users/${user.id}`}>User Info</Link></li>
          </>
        ) : (
          <li onClick={handleSignUpClick}><Link to="/signup">Sign Up</Link></li>
        )}
      </ul>
    </nav>
  );
}