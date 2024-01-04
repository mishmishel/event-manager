import React, { useState } from 'react';

export default function SignUp({ onSignUp }) {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordConfirmationInput, setPasswordConfirmationInput] = useState("");
  const [signUpError, setSignUpError] = useState(false);

  function handleSignUp(e) {
    e.preventDefault();

    console.log("Password Input:", passwordInput);
    console.log("Password Confirmation Input:", passwordConfirmationInput);

    if (passwordInput !== passwordConfirmationInput) {
      setSignUpError(true);
      return;
    }

    fetch('/signup', {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: usernameInput,
        password: passwordInput,
        password_confirmation: passwordConfirmationInput
      })
    })
      .then(response => {
        if (response.ok) {
          setSignUpError(false);
          return response.json();
        } else {
          setSignUpError(true);
          throw new Error('Failed to create an account');
        }
      })
      .then(json => onSignUp(json))
      .catch(error => console.error(error));
  }

  return (
    <form onSubmit={handleSignUp}>
      {signUpError && <p>Passwords do not match. Please try again.</p>}
      <label htmlFor="username">Username:</label>
      <input type="text" id="username" name="username" value={usernameInput} onChange={(e) =>
        { setUsernameInput(e.target.value) }} />
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" name="password" value={passwordInput} onChange={(e) =>
        { setPasswordInput(e.target.value) }} />
      <label htmlFor="passwordconfirmation">Retype Password:</label>
      <input type="password" id="passwordconfirmation" name="passwordconfirmation" value={passwordConfirmationInput} onChange={(e) =>
        { setPasswordConfirmationInput(e.target.value) }} />
      <button type="submit">Sign Up</button>
    </form>
  )
}