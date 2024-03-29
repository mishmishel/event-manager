import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

export default function SignUp({ onSignUp }) {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordConfirmationInput, setPasswordConfirmationInput] = useState("");
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [signUpError, setSignUpError] = useState(false);

  const navigate = useNavigate();

  function handleSignUp(e) {
    e.preventDefault();

    console.log("Password Input:", passwordInput);
    console.log("Password Confirmation Input:", passwordConfirmationInput);

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
          return response.json().then(data => {
            console.log(data);
            if (data.errors && data.errors.includes('Username is already taken. Please choose a different one.')) {
              console.log(data.errors)
              setSignUpError('Username is already taken. Please choose a different one.');
            } else if (data.errors && data.errors.includes('Email is already taken. Please choose a different one.')) {
                setSignUpError('Email is already taken. Please choose a different one.');
            } else if (passwordInput.length  < 6) {
              setSignUpError('Password is too short. Please use at least 6 characters.');
            } else if (passwordInput !== passwordConfirmationInput){
              setSignUpError('Passwords do not match. Please try re-entering passwords');
            } else {
              setSignUpError('Failed to create an account');
            }
            throw new Error('Failed to create an account');
          });
        }
      })
      .then(json => {
        onSignUp(json);
        navigate('/'); // Redirect users to Home page
      })
      .catch(error => {
        console.error("Error creating an account:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
        }
      });
  }

  return (
    <form onSubmit={handleSignUp}>
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
        {signUpError && <p id="sign-up-error">{signUpError}</p>}
        <div className="signup-button-container">
        <button type="submit">Sign Up</button>
        </div>
    </form>
  )
}