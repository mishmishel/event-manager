import React, {useState} from 'react';

export default function Login( { onLogin }) {
    const[usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [loginError, setLoginError] = useState(false); // to handle wrong username info

    function handleLogin(e) {
        e.preventDefault();

        fetch('/login', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: usernameInput,
                password: passwordInput})
        })
        .then(response => {
            if (response.ok) {
              setLoginError(false);
              return response.json();
            } else {
              setLoginError(true);
              throw new Error('Invalid username and/or password');
            }
          })
          .then(json => onLogin(json))
          .catch(error => console.error(error));
    }

    return (
        <form onSubmit={handleLogin}>
            {loginError && <p>Incorrect username or password. Please try again.</p>}
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" value={usernameInput} onChange={(e) => 
            {setUsernameInput(e.target.value)}} />
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" value={passwordInput} onChange={(e) =>
            { setPasswordInput(e.target.value) }} />
            <button type="submit">Login</button>
        </form>
    )
}