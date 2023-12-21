import React, {useState} from 'react';

export default function Login( { onLogin }) {
    const[usernameInput, setUsernameInput] = useState("");

    function handleLogin(e) {
        e.preventDefault();

        fetch('/login', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content": "application/json"
            },
            body: JSON.stringify({username: usernameInput})
        })
        .then( response => response.json() )
        .then( json => onLogin(json))
    }

    return (
        <form onSubmit={handleLogin}>
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" value={usernameInput} onChange={(e) => 
            {setUsernameInput(e.target.value)}} />
            <button type="submit">Login</button>
        </form>
    )
}