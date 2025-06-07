import { startOfWeek, addDays } from 'date-fns';

export function getWeekDates(startDate) {
  return [...Array(7)].map((_, i) => addDays(startOfWeek(startDate, { weekStartsOn: 0 }), i));
}

export function formatHour(hour) {
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour} ${ampm}`;
}
