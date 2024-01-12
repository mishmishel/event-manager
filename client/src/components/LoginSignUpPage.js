import React, { useEffect } from 'react';
import SignUp from './SignUp';
import Login from './Login';
import { useNavigate } from 'react-router-dom'

export default function LoginSignUpPage({ onSignUp, onLogin, user }) {

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (user) {
    return null; // returns nothing if user is in session
  }

  return (
    <div>
      <h2>Sign Up</h2>
      <SignUp onSignUp={onSignUp} />

      <h2>Login</h2>
      <Login onLogin={onLogin} />
    </div>
  );
}

