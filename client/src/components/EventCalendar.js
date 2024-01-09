import React, { useState } from 'react';
import Calendar from 'react-calendar';

import 'react-calendar/dist/Calendar.css';

export default function EventCalendar({ events }) {
  const [date, setDate] = useState(new Date());

  const onChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div>
      <h2>Events Calendar</h2>
      {/* Calendar Itself */}
      <Calendar onChange={onChange} value={date} /> 

      {/* Displays events for current month  */}
      <h3>Events for {date.toLocaleString('default', { month: 'long', year: 'numeric' })}</h3> 
      <ul>
        {events
          .filter((event) => {
            const eventDate = new Date(event.date);
            return eventDate.getMonth() === date.getMonth() && eventDate.getFullYear() === date.getFullYear();
          })
          .map((event) => (
            <li key={event.id}>{event.title} - {event.date}</li>
          ))}
      </ul>
    </div>
  );
}