import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div>
            <h1>WELCOME TO EVENT MANAGER</h1>
            <ul>
                <li><Link to="/events">Events</Link></li>
                <li><Link to="/users">Users</Link></li>
            </ul>
        </div>
    )
}

