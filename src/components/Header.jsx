import { format } from 'date-fns';

const Header = ({
  days,
  goToPreviousWeek,
  goToNextWeek,
  goToToday,
  children,
}) => {
  const today = new Date();
  const formattedActiveMonth = format(new Date(today), 'MMMM yyyy');

  return (
    <div className="calendarHeader">
      <div className="navigation">
          <div className="activeMonth">
          <h4>{formattedActiveMonth}</h4>
        </div>
        <div className="toggleWeeks">
          <button onClick={goToPreviousWeek}>&#10094;</button>
          <button onClick={goToToday}>Today</button>
          <button onClick={goToNextWeek}>&#10095;</button>
        </div>
      </div>

      <div className="daysHeader">
        <div className="timeLabel"></div>
        {days.map(day => {
          const date = new Date(day);
          return (
            <div key={date.toString()} className="day">
              <span className="dayName">{format(date, 'EEE')} </span>
              <span className="dayNum">{format(date, 'd')}</span>
            </div>
          );
        })}
      </div>

      {children}
    </div>
  );
};

export default Header;
