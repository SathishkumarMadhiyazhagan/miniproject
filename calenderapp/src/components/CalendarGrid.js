import React, { useMemo } from 'react';
import { getWeekDates, formatHour } from '../utils';
import { isSameDay, isToday, format } from 'date-fns';

export default function CalendarGrid({ weekStart, events, onTimeClick, onEventClick, onDelete, weeklabel }) {
  const hours = [...Array(24).keys()];
  const days = useMemo(() => (getWeekDates(weekStart)), [weekStart]);

  const renderEvents = (day, hour) => {
    return events.filter(e => {
      const start = new Date(e.start);
      return isSameDay(start, day) && start.getHours() === hour;
    }).map(e => (
      <div
        key={e.id}
        className={`event ${e.type.toLowerCase()}`}
        onClick={(e_) => {
          onEventClick(e);
        }}
        onMouseEnter={(e) => e.currentTarget.querySelector('.del').style.display = 'block'}
        onMouseLeave={(e) => e.currentTarget.querySelector('.del').style.display = 'none'}
      >
        {e.title}
        <span className="del" onClick={(_e) => { onDelete(e.id); }}>x</span>
      </div>
    ));
  };

  return (
    <div className="calendar-grid">
      <div className="week-header">
        <div className="time-col">Time</div>
        {days.map((day, i) => (
          <div key={i} className={`day-col ${isToday(day) ? 'today' : ''} ${day.getDay() === 0 ? 'disabled' : ''}`}>
            <div className="day-header">
              <span className="day-name">{format(day, 'EEE')} </span>
              <span className="day-date">{format(day, 'MM/dd')}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="all-day-row">
        <div className="time-col">All Day</div>
        {days.map((day, i) => (
          <div key={i} className={`day-col ${isToday(day) ? 'today' : ''} ${day.getDay() === 0 ? 'disabled' : ''}`}>
            {events.filter(e => {
              const start = new Date(e.start);
              return isSameDay(start, day) && new Date(e.start).getHours() === 0 && new Date(e.end).getHours() === 23;
            }).map(e => (
              <div
                key={e.id}
                className={`event ${e.type.toLowerCase()}`}
                onClick={() => onEventClick(e)}
              >
                {e.title}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="hour-grid">
        {hours.map(hour => (
          <div key={hour} className="hour-row">
            <div className="time-col">{formatHour(hour)}</div>
            {days.map((day, i) => (
              <div
                key={i}
                className={`day-col ${isToday(day) ? 'today' : ''} ${day.getDay() === 0 ? 'disabled' : ''}`}
                onClick={() => day.getDay() !== 0 && onTimeClick(null, new Date(day), hour)}
              >
                {renderEvents(day, hour)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}