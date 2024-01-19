import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

export default function NavBar({ user }) {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    // Navigate to SignUp page
    navigate('/login');
  };

  return (
    <nav>
      <input type="checkbox" id="check" />
      <label htmlFor="check" className="checkbtn">
        <i className="fas fa-bars"></i>
      </label>

      <label className="logo">Sydney Street Dance Events</label>
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
