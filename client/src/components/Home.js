import React, { useState, useEffect } from 'react'
import EventCalendar from './EventCalendar';

export default function Home({user}) {
    const [events, setEvents] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(new Date());

    useEffect(() => {
        fetch('/events')
          .then(response => response.json())
          .then(json => setEvents(json))
          .catch(error => console.error(error));
      }, [user]);

    const handleDateChange = (newDate) => {   
        setSelectedMonth(newDate);
    };
    
    return (
        <div>
            <EventCalendar events={events} selectedMonth={selectedMonth} onDateChange={handleDateChange}/>
        </div>
    )
}