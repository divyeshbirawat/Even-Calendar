import { useState } from 'react';

const Event = ({ event, onClick, onDelete, position = 0, totalOverlapping = 1 }) => {
  const [showDelete, setShowDelete] = useState(false);

  const handleEventClick = (e) => {
    e.stopPropagation();
    onClick(event);
  };

  const handleDeleteEvent = (e) => {
    e.stopPropagation();
    onDelete(event.id);
  };

  const width = 100 / totalOverlapping;
  const left = position * width;

  return (
    <div
      className={`event ${event.type.toLowerCase()}`}
      onClick={handleEventClick}
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
      style={{
        width: `${width}%`,
        left: `${left}%`,
        position: 'absolute',
        cursor: 'pointer',
      }}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleEventClick(e);
        }
      }}
    >
      <div className="event-title">{event.title}</div>
      {showDelete && (
        <button
          className="deleteEvent"
          onClick={handleDeleteEvent}
          aria-label={`Delete event: ${event.title}`}
        >
          ×
        </button>
      )}
    </div>
  );
};

export default Event;
