import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Events() {
    const [events, setEvents] = useState([])

    useEffect(()=> {
        fetch('/events') // call the users endpoint in the backend
        .then(response => response.json())
        .then(json => {
            setEvents(json)
        })
    }, [])

    return (
        <div>
            <h1>Events Page</h1>
            {
                events.length > 0 
                ?
                <ul>
                    {
                    events.map(event => (
                        <li><Link to={`/events/${event.id}`}>{event.title} {event.date}</Link></li>
                    ))
                    }
                </ul>
                :
                <p>No event found</p>
            }
        </div>
    )
}