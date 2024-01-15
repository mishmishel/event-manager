import React, { useState, useEffect } from 'react';
import SignUp from './SignUp';
import Login from './Login';
import { useNavigate } from 'react-router-dom'

export default function LoginSignUpPage({ onSignUp, onLogin, user }) {
  const navigate = useNavigate();
  const [isLoginView, setLoginView] = useState(true);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (user) {
    return null; // returns nothing if user is in session
  }

  const toggleView = () => {
    setLoginView(prevState => !prevState);
  };

  return (
    <div>
       <h2>{isLoginView ? 'Login' : 'Sign Up'}</h2>
       <p>{isLoginView ? 'Welcome back! Enter your username and password to login.' : 'Welcome! Enter your details to sign up!'}</p>
      {isLoginView ? (
        <Login onLogin={onLogin} />
      ) : (
        <SignUp onSignUp={onSignUp} />
      )}

      <button onClick={toggleView}>
        {isLoginView ? 'Switch to Sign Up' : 'Switch to Login'}
      </button>
    </div>
  );
}

