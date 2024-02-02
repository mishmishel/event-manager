import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';
import Logout from './Logout'; 

export default function NavBar( { user, setUser } ) {
  const navigate = useNavigate();
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   fetch('/me')
  //     .then(response => {
  //       if (response.ok) {
  //         response.json().then(json => setUser(json));
  //       }
  //     });
  // }, []);

  const handleSignUpClick = () => {
    // navigate to signUp page
    navigate('/login');
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <nav>
      <label className="logo">Sydney Dance Events</label>
      <ul>
        <li><Link to="/">HOME</Link></li>
        <li><Link to="/events">EVENTS</Link></li>
        {user ? (
          <>
            <li id="welcome-user"><Link to={`/users/${user.id}`}>Welcome {user.username}!</Link></li>
            <li id="logout-button"><Logout onLogout={handleLogout} /></li>
          </>
        ) : (
          <li onClick={handleSignUpClick}><Link to="#" >LOG IN</Link></li>
        )}
      </ul>
      {/* {showMenu && <img className='menu' src={MenuIcon} alt="Menu" onClick={toggleMenu} />} */}
    </nav>
  );
}
