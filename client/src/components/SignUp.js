import React, { useState } from 'react';

export default function SignUp({ onSignUp }) {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordConfirmationInput, setPasswordConfirmationInput] = useState("");
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
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
        password_confirmation: passwordConfirmationInput,
        first_name: firstNameInput,
        last_name: lastNameInput,
        email: emailInput,
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
         <label htmlFor="firstName">First Name:</label>
      <input type="text" id="firstName" name="firstName" value={firstNameInput} onChange={(e) =>
        { setFirstNameInput(e.target.value) }} />
      <label htmlFor="lastName">Last Name:</label>
      <input type="text" id="lastName" name="lastName" value={lastNameInput} onChange={(e) =>
        { setLastNameInput(e.target.value) }} />
      <label htmlFor="email">Email:</label>
      <input type="text" id="email" name="email" value={emailInput} onChange={(e) =>
        { setEmailInput(e.target.value) }} />
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