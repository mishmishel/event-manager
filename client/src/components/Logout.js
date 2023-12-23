import React from 'react'

export default function Logout( {onLogout} ) {

    function handleLogout(e) {
        e.preventDefault();
        fetch('/logout', {
            method: "DELETE"
        })
        .then(() => onLogout())
    }

    return (
        <button onClick={handleLogout}>Logout</button>
    )
}
