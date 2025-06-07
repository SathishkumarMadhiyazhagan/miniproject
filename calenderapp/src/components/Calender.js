import React, { useState, useEffect } from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import EventModal from './EventModal';
import { addWeeks, subWeeks } from 'date-fns';
import '../App.css';

const prefilledEvents = [
  { id: 1, "title": "My Task 1", start: "2018-05-07T13:00", end: "2018-05-07T14:00", type: "TASK" },
  { id: 2, "title": "My Task 2", start: "2018-05-07T16:00", end: "2018-05-07T17:00", type: "TASK" },
  { id: 3, "title": "My Task 3", start: "2018-05-09T00:00", end: "2018-05-09T23:59", type: "HOLIDAY" },
  { id: 4, "title": "My Task 4", start: "2018-05-11T00:00", end: "2018-05-11T23:59", type: "HOLIDAY" }
];

export default function Calendar() {
  const [currentWeek, setCurrentWeek] = useState(new Date(2018, 4, 6));
//   const [currentWeek, setCurrentWeek] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [modalData, setModalData] = useState({ isOpen: false, event: null });

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('calendarEvents')) || [];
    if (storedEvents.length) {
      try {
        setEvents(storedEvents);
      } catch (error) {
        console.error("Error parsing localStorage:", error);
        setEvents(prefilledEvents);
      }
    } else {
      setEvents(prefilledEvents);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }, [events]);

  const openModal = (event = null, date = null, hour = null) => {
    const defaultStart = date && hour !== null
      ? new Date(date.setHours(hour, 0, 0, 0)).toISOString().slice(0, 16)
      : '';
    setModalData({
      isOpen: true,
      event: event || { id: null, title: '', start: defaultStart, end: defaultStart, type: 'TASK' }
    });
  };

  const saveEvent = (event) => {
    if (event.id) {
      setEvents(events.map(e => e.id === event.id ? event : e));
    } else {
      setEvents([...events, { ...event, id: Date.now() }]);
    }
    setModalData({ isOpen: false, event: null });
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(e => e.id !== id));
  };

  return (
    <div>
      <CalendarHeader
        currentWeek={currentWeek}
        onPrev={() => setCurrentWeek(subWeeks(currentWeek, 1))}
        onNext={() => setCurrentWeek(addWeeks(currentWeek, 1))}
        onToday={() => setCurrentWeek(new Date())}
      />
      <CalendarGrid
        weekStart={currentWeek}
        events={events}
        onTimeClick={openModal}
        onEventClick={event => openModal(event)}
        onDelete={deleteEvent}
      />
      {modalData.isOpen && (
        <EventModal
          event={modalData.event}
          onSave={saveEvent}
          onClose={() => setModalData({ isOpen: false, event: null })}
        />
      )}
    </div>
  );
}
