import React, { useState } from 'react';

export default function EventModal({ event, onSave, onClose }) {
  const [data, setData] = useState({ ...event });

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>{event.id ? 'Edit' : 'New'} Event</h3>
        <label>Title: <input value={data.title} onChange={e => setData({ ...data, title: e.target.value })} /></label>
        <label>Start: <input type="datetime-local" value={data.start} onChange={e => setData({ ...data, start: e.target.value })} /></label>
        <label>End: <input type="datetime-local" value={data.end} onChange={e => setData({ ...data, end: e.target.value })} /></label>
        <label>Type:
          <select value={data.type} onChange={e => setData({ ...data, type: e.target.value })}>
            <option value="TASK">TASK</option>
            <option value="HOLIDAY">HOLIDAY</option>
          </select>
        </label>
        <div className="modal-buttons">
          <button onClick={() => onSave(data)}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
