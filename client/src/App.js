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
import LoginSignUpPage from './components/LoginSignUpPage';
import Logout from './components/Logout'; 
import SignUp from './components/SignUp';
import NavBar from './components/NavBar';

function App() {
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   fetch('/me')
  //     .then(response => {
  //       if (response.ok) {
  //         response.json().then(json => setUser(json));
  //       }
  //     });
  // }, []);

  const fetchUser = () => {
    fetch('/me')
      .then(response => {
        if (response.ok) {
          response.json().then(json => setUser(json));
        }
      });
  };

  return (
    <Router>
      <div>
        <NavBar user={user} setUser={setUser}/>

        <div>
          {/* {user ? (
            <React.Fragment id="logout-button">
              <Logout onLogout={() => { setUser(null) }} />
            </React.Fragment>
          ) : (
            <React.Fragment>
            </React.Fragment>
          )} */}

          <Routes>
            <Route path="/" element={<Home user={user}/>} />
            <Route path="/events" element={<Events user={user} />} />
            <Route path="/events/:id" element={<EventInfo user={user}/>} />
            <Route path="/users/:id" element={<UserInfo />} />
            <Route path="/events/:id/comments" element={<Comments user={user} setUser={setUser}/>} />
            <Route path="/users/:id/events_joineds" element={<EventsJoined />} />
            <Route path="/events/new" element={<NewEvent user={user} />} />
            <Route path="/signup" element={<SignUp onSignUp={setUser} />} />
            <Route path="/login" element={<LoginSignUpPage onSignUp={() => fetchUser()} onLogin={() => fetchUser()} user={user}/>} />
            <Route path="*" element={<div><p>No page found</p></div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;