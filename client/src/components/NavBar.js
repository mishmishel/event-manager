import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginSignUpPage from './LoginSignUpPage';

export default function NavBar({ user, onSignUp, onLogin }) {
  const navigate = useNavigate();
  

  const handleSignUpClick = () => {
    // Navigate to SignUp page
    navigate('/getloggedon');
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/events">Events</Link></li>
        {user ? (
          <>
            <li><Link to={`/users/${user.id}`}>User Info</Link></li>
          </>
        ) : (
          <li onClick={handleSignUpClick}><Link to="#">Sign up or Login</Link></li>
        )}
      </ul>
      
    </nav>
  );
}