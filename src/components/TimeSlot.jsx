const TimeSlot = ({ day, hour, isToday, isSunday, onClick, children }) => {
  const handleClick = () => {
    if (isSunday) return;

    const start = new Date(day);
    start.setHours(hour, 0, 0, 0);

    const end = new Date(day);
    end.setHours(hour + 1, 0, 0, 0);

    onClick({ start, end });
  };

  return (
    <div
      className={`timeSlot ${isToday ? 'today' : ''} ${isSunday ? 'sunday' : ''}`}
      onClick={handleClick}
    >
      <div className="timeSlot-content">{children}</div>
    </div>
  );
};

export default TimeSlot;
