import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';
// import MenuIcon from '../images/icons8-menu-64.png';

export default function NavBar({ user }) {
  const navigate = useNavigate();
  // const [showMenu, setShowMenu] = useState(false);

  const handleSignUpClick = () => {
    // Navigate to SignUp page
    navigate('/login');
  };

  // const toggleMenu = () => {
  //   setShowMenu(!showMenu);
  // };

  // useEffect(() => {
  //   const handleResize = () => {
  //     setShowMenu(window.innerWidth <= 858);
  //   };

  //   // Add event listener for window resize
  //   window.addEventListener('resize', handleResize);

  //   // Initial check for screen size
  //   handleResize();

  //   // Remove event listener on component unmount
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

  return (
    <nav>
      <label className="logo">Sydney Street Dance Events</label>
      <ul>
        <li><Link to="/">HOME</Link></li>
        <li><Link to="/events">EVENTS</Link></li>
        {user ? (
          <>
            <li><Link to={`/users/${user.id}`}>USER INFO</Link></li>
          </>
        ) : (
          <li onClick={handleSignUpClick}><Link to="#" >LOG IN</Link></li>
        )}
      </ul>
      {/* {showMenu && <img className='menu' src={MenuIcon} alt="Menu" onClick={toggleMenu} />} */}
    </nav>
  );
}
