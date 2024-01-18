import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';

import 'react-calendar/dist/Calendar.css';

export default function EventCalendar({ events }) {
  const [date, setDate] = useState(new Date());

  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    console.log('Selected Date:', date);
    console.log('All Events:', events);
    // Filter events based on the selected month
    const filtered = events.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getFullYear() === date.getFullYear() &&
        eventDate.getMonth() === date.getMonth()
      );

    });
    console.log('Filtered Events:', filtered);
    setFilteredEvents(filtered);
  }, [date, events]);

  const onChange = (newDate) => {
    setDate(newDate);
    console.log(newDate)
  };

  const onClickMonth = (newDate) => {
    setDate(newDate);
    console.log(newDate);
  };

  const onActiveStartDateChange = ({ activeStartDate }) => {
    setDate(activeStartDate);
    console.log(activeStartDate);
  };

  return (
    <div>
      <h2>Events Calendar</h2>
      {/* Calendar itself */}
      <Calendar onChange={onChange} onClickMonth={onClickMonth} onActiveStartDateChange={onActiveStartDateChange} value={date} />

      {/* Displays events for the selected month */}
      <h3>Events for {date.toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
      <ul>
        {filteredEvents.map((event) => (
          <li key={event.id}>{event.title} - {event.date}</li>
        ))}
      </ul>
    </div>
  );
}
