import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function EventCalendar({ events }) {
  const [date, setDate] = useState(new Date());
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [showWholeMonth, setShowWholeMonth] = useState(true);

  // whenever there is change in date
  useEffect(() => {
    filterEvents();
  }, [date, events, showWholeMonth]);

  const filterEvents = () => {
    // filter events based on the selected date / month
    const filtered = events.filter((event) => {
      const eventDate = new Date(event.date);

      if (showWholeMonth) {
        return (
          eventDate.getFullYear() === date.getFullYear() &&
          eventDate.getMonth() === date.getMonth()
        );
      } else {
        return (
          eventDate.getFullYear() === date.getFullYear() &&
          eventDate.getMonth() === date.getMonth() &&
          eventDate.getDate() === date.getDate()
        );
      }
    });

    setFilteredEvents(filtered);
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const eventsForDate = events.filter((event) => {
        const eventDate = new Date(event.date);
        return (
          eventDate.getFullYear() === date.getFullYear() &&
          eventDate.getMonth() === date.getMonth() &&
          eventDate.getDate() === date.getDate()
        );
      });
  
      if (eventsForDate.length > 0) {
        return (
          <ul>
            {eventsForDate.map((event) => (
              <li key={event.id}>{event.title}</li>
            ))}
          </ul>
        );
      }
    }
  
    return null;
  };
  

  const onChange = (newDate) => {
    setDate(newDate);
    filterEvents();
  };

  const onClickMonth = (newDate) => {
    setDate(newDate);
  };

  const onActiveStartDateChange = ({ activeStartDate }) => {
    setDate(activeStartDate);
  };

  const toggleView = () => {
    setShowWholeMonth(!showWholeMonth);
  };

  return (
    <div>
      <h2>Events Calendar</h2>
      {/* Calendar itself */}
      <Calendar
        onChange={onChange}
        onClickMonth={onClickMonth}
        onActiveStartDateChange={onActiveStartDateChange}
        value={date}
        tileContent={tileContent}
      />

      {/* toggle between viewing options */}
      <button onClick={toggleView}>
        {showWholeMonth ? 'View Events for Specific Date' : 'View Events for Whole Month'}
      </button>

      {showWholeMonth ? (
        <h3>Events for {date.toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
      ) : (
        <h3>Events for {date.toLocaleString('default', { month: 'long', year: 'numeric', day: 'numeric' })}</h3>
      )}

      {filteredEvents.length > 0 ? (
        <ul>
          {filteredEvents.map((event) => (
            <li key={event.id}><Link to={`/events/${event.id}`}>{event.title} - {event.date}</Link></li>
          ))}
        </ul>
      ) : (
        <p>No events on {date.toLocaleString('default', { month: 'long', year: 'numeric', day: 'numeric' })}</p>
      )}
    </div>
  );
}
