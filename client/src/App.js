import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './components/Home';
import Users from './components/Users';
import Events from './components/Events';
import EventInfo from './components/EventInfo';
import UserInfo from './components/UserInfo';
import EventsJoined from './components/EventsJoined';
import Comments from './components/Comments';
<Route path="/events/:eventId/comments" element={<Comments />} />

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventInfo />} />
        <Route path="/users/:id" element={<UserInfo />} />
        <Route path="/events/:id/comments" element={<Comments />} />
        <Route path="/users/:id/events_joineds" element={<EventsJoined />} />
        <Route path="*" element={<div><p>No page found</p></div>} />
      </Routes>
    </Router>
  );
}

export default App;
