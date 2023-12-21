import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Users() {
    const [users, setUsers] = useState([])

    useEffect(()=> {
        fetch('/users') // call the users endpoint in the backend
        .then(response => response.json())
        .then(json => {
            setUsers(json)
        })
    }, [])

    return (
        <div>
            <h1>Users Page</h1>
            {
                users.length > 0 
                ?
                <ul>
                    {
                    users.map(user => (
                        <li><Link to={`/users/${user.id}`}>{user.first_name} {user.last_name}</Link></li>
                    ))
                    }
                </ul>
                :
                <p>No user found</p>
            }
        </div>
    )
}