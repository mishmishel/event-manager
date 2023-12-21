import './App.css';
import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './components/Home';
import Users from './components/Users';
import Events from './components/Events';
import EventInfo from './components/EventInfo';
import UserInfo from './components/UserInfo';
import EventsJoined from './components/EventsJoined';
import Comments from './components/Comments';
import NewEvent from './components/NewEvent';
import Login from './components/Login';

function App() {

  const [user, setUser] = useState(null);

  return (
    <div>
      {user
    ?
      <h1>Welcome back, {user.username}!</h1>
    : 
    <Login onLogin={setUser} />
    }
    
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventInfo />} />
        <Route path="/users/:id" element={<UserInfo />} />
        <Route path="/events/:id/comments" element={<Comments />} />
        <Route path="/users/:id/events_joineds" element={<EventsJoined />} />
        <Route path="/events/new" element={<NewEvent />} />
        <Route path="*" element={<div><p>No page found</p></div>} />
      </Routes>
    </Router>
    </div>
  
  );
}

export default App;
