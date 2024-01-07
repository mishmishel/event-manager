import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Logout( {onLogout} ) {
    const navigate = useNavigate();

    function handleLogout(e) {
        e.preventDefault();
        fetch('/logout', {
            method: "DELETE"
        })
        .then(() => {
            onLogout();
            navigate('/'); // Redirect to the home page
          });
    }

    return (
        <button onClick={handleLogout}>Logout</button>
    )
}
