import { useState } from 'react';
import Header from './Header';
import TimeSlot from './TimeSlot';
import Event from './Event';
import EventPopup from './EventPopup';
import useCalendar from '../customHooks/useCalendar';
import useEvents from '../customHooks/useEvents';
import { format, isSameDay, isSunday } from 'date-fns';

const Calendar = () => {
  const {
    currentWeek,
    goToPreviousWeek,
    goToNextWeek,
    goToToday,
    hours,
    days,
  } = useCalendar();

  const {
    events,
    selectedEvent,
    handleEventClick,
    handleTimeSlotClick,
    handleSaveEvent,
    handleDeleteEvent,
    handleClosepopup,
  } = useEvents();

  return (
    <div className="calendarContainer">
      <Header
        days={days}
        currentWeek={currentWeek}
        goToPreviousWeek={goToPreviousWeek}
        goToNextWeek={goToNextWeek}
        goToToday={goToToday}
      />

      <div className="timeSlotContainer">
        {hours.map((hour) => {
          const label = format(new Date().setHours(hour, 0, 0, 0), 'h a');

          return (
            <div key={hour} className="tiemSlotRow">
              <div className="timeLabel">{label}</div>
              {days.map((day) => {
                const slotStart = new Date(day);
                slotStart.setHours(hour, 0, 0, 0);
                const slotEnd = new Date(day);
                slotEnd.setHours(hour + 1, 0, 0, 0);

                const filteredEvents = events?.filter((eachEvent) => {
                  const overlaps = eachEvent.start < slotEnd && eachEvent.end > slotStart;
                  const isNotFullDay = !(isSameDay(eachEvent.start, eachEvent.end) && (eachEvent.end - eachEvent.start) >= 86400000);
                  return overlaps && isNotFullDay;
                });

                return (
                  <TimeSlot
                    key={`${day.getTime()}}`}
                    day={day}
                    hour={hour}
                    isToday={isSameDay(day, new Date())}
                    isSunday={isSunday(day)}
                    onClick={handleTimeSlotClick}
                  >
                    {filteredEvents.map((eachEvent, index) => {
                      const overlapping = filteredEvents?.filter((checkeachEvent) =>
                        checkeachEvent?.start < eachEvent?.end && checkeachEvent.end > eachEvent.start
                      );

                      const position = overlapping?.findIndex((e) => e?.id === eachEvent?.id);
                      const total = overlapping?.length;

                      return (
                        <Event
                          key={eachEvent.id}
                          event={eachEvent}
                          onClick={handleEventClick}
                          onDelete={handleDeleteEvent}
                          position={position}
                          totalOverlapping={total}
                        />
                      );
                    })}
                  </TimeSlot>
                );
              })}
            </div>
          );
        })}
      </div>

      {selectedEvent && (
        <EventPopup
          event={selectedEvent}
          onSave={handleSaveEvent}
          onDelete={handleDeleteEvent}
          onClose={handleClosepopup}
          isSunday={isSunday(selectedEvent.start)}
        />
      )}
    </div>
  );
};

export default Calendar;
