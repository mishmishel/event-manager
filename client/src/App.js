import './App.css';
import { useEffect, useState } from 'react';

function App() {

  useEffect(() => {
    fetch('/events')
    .then(response => response.json() )
    .then(json => {
      setEvents(json)
    })
  }, [])

  const [events, setEvents] = useState([]);
  return (
    <div className="App">
      <h1>Events:</h1>
      { events.length > 0 
      ?
        <ul>
          {
            events.map((event)=> {
              return <li>{event.title}</li>
            })
          }
        </ul>
      :
      <p>No Events</p>
      }
    </div>
  );
}

export default App;
