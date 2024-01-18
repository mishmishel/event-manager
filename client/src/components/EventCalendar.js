import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function EventCalendar({ events }) {
  const [date, setDate] = useState(new Date());
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [showWholeMonth, setShowWholeMonth] = useState(true);

  useEffect(() => {
    filterEvents();
  }, [date, events, showWholeMonth]);

  const filterEvents = () => {
    console.log('Selected Date:', date);
    console.log('All Events:', events);

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

    console.log('Filtered Events:', filtered);
    setFilteredEvents(filtered);
  };

  const onChange = (newDate) => {
    setDate(newDate);
    console.log(newDate);

    // notify parent component of selected date
    filterEvents();
  };

  const onClickMonth = (newDate) => {
    setDate(newDate);
    console.log(newDate);
  };

  const onActiveStartDateChange = ({ activeStartDate }) => {
    setDate(activeStartDate);
    console.log(activeStartDate);
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
      />

      {/* toggle between viewing options */}
      <button onClick={toggleView}>
        {showWholeMonth ? 'View Events for Specific Date' : 'View Events for Whole Month'}
      </button>

      {/* displays events for selected date / month */}
      {showWholeMonth ? (
        <h3>Events for {date.toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
      ) : (
        <h3>Events for {date.toLocaleString('default', { month: 'long', year: 'numeric', day: 'numeric' })}</h3>
      )}

      {filteredEvents.length > 0 ? (
        <ul>
          {filteredEvents.map((event) => (
            <li key={event.id}>{event.title} - {event.date}</li>
          ))}
        </ul>
      ) : (
        <p>No events on {date.toLocaleString('default', { month: 'long', year: 'numeric', day: 'numeric' })}</p>
      )}
    </div>
  );
}
