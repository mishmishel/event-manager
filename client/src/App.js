import './App.css';
import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './components/Home';
// import Users from './components/Users';
import Events from './components/Events';
import EventInfo from './components/EventInfo';
import UserInfo from './components/UserInfo';
import EventsJoined from './components/EventsJoined';
import Comments from './components/Comments';
import NewEvent from './components/NewEvent';
import Login from './components/Login';
import Logout from './components/Logout'; 
import SignUp from './components/SignUp';
import NavBar from './components/NavBar';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/me')
      .then(response => {
        if (response.ok) {
          response.json().then(json => setUser(json));
        }
      });
  }, []);

  return (
    <Router>
      <div>
        <NavBar user={user} />

        <div>
          {user ? (
            <React.Fragment>
              <h1>Welcome {user.username}!</h1>
              <Logout onLogout={() => { setUser(null) }} />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Login onLogin={setUser} />
              {/* <SignUp onSignUp={setUser} /> */}
            </React.Fragment>
          )}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events user={user} />} />
            <Route path="/events/:id" element={<EventInfo />} />
            <Route path="/users/*" element={<UserInfo userProp={user} />} />
            <Route path="/events/:id/comments" element={<Comments />} />
            <Route path="/users/:id/events_joineds" element={<EventsJoined />} />
            <Route path="/events/new" element={<NewEvent />} />
            <Route path="/signup" element={<SignUp onSignUp={setUser} />} />
            <Route path="*" element={<div><p>No page found</p></div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;