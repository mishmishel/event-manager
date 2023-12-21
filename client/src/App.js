import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './components/Home';
import Users from './components/Users';
import UserInfo from './components/UserInfo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserInfo />} />
        <Route path="*" element={<div><p>No page found</p></div>} />
      </Routes>
    </Router>
  );
}

export default App;
