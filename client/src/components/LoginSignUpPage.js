import React from 'react';
import SignUp from './SignUp'; // Assuming the file path is correct
import Login from './Login'; // Assuming the file path is correct

export default function LoginSignUpPage({ onSignUp, onLogin }) {
  return (
    <div>
      <h2>Sign Up</h2>
      <SignUp onSignUp={onSignUp} />

      <h2>Login</h2>
      <Login onLogin={onLogin} />
    </div>
  );
}