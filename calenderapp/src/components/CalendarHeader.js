import React from 'react';
import { format, addDays, startOfWeek } from 'date-fns';

export default function CalendarHeader({ currentWeek, onPrev, onNext, onToday }) {
  const start = startOfWeek(currentWeek, { weekStartsOn: 0 });
  const end = addDays(start, 6);

  return (
    <div className="header">
      <div className="controls">
        <button onClick={onPrev}>&lt;</button>
        <button onClick={onToday}>Today</button>
        <button onClick={onNext}>&gt;</button>
      </div>
      <h3>
        {format(start, 'MMM d')} – {format(end, start.getMonth() === end.getMonth() ? 'd, yyyy' : 'MMM d, yyyy')}
      </h3>
    </div>
  );
}
