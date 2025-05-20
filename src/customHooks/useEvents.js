import { useState, useEffect } from 'react';
import { isSunday } from 'date-fns';

// dummy data
const initialEvents = [
  { id: '1', title: 'My Task 1', type: 'TASK', start: new Date(1745901600000), end: new Date(1745905200000) },
  { id: '2', title: 'My Task 2', type: 'TASK', start: new Date(1745988000000), end: new Date(1745991600000) },
  { id: '3', title: 'My Task 3', type: 'TASK', start: new Date(1746074400000), end: new Date(1746078000000) },
  { id: '4', title: 'My Task 4', type: 'TASK', start: new Date(1746160800000), end: new Date(1746164400000) },
  { id: '5', title: 'My Task 5', type: 'TASK', start: new Date(1746247200000), end: new Date(1746250800000) },
  { id: '6', title: 'My Task 6', type: 'TASK', start: new Date(1746333600000), end: new Date(1746337200000) },
  { id: '7', title: 'My Task 7', type: 'TASK', start: new Date(1746420000000), end: new Date(1746423600000) },
  { id: '8', title: 'My Task 8', type: 'TASK', start: new Date(1746506400000), end: new Date(1746510000000) },
  { id: '9', title: 'My Task 9', type: 'TASK', start: new Date(1746592800000), end: new Date(1746596400000) },
  { id: '10', title: 'My Task 10', type: 'TASK', start: new Date(1746679200000), end: new Date(1746682800000) },
  { id: '11', title: 'My Task 11', type: 'TASK', start: new Date(1746765600000), end: new Date(1746769200000) },
  { id: '12', title: 'My Task 12', type: 'TASK', start: new Date(1746852000000), end: new Date(1746855600000) },
  { id: '13', title: 'My Task 13', type: 'HOLIDAY', start: new Date(1746506400000), end: new Date(1746513600000) },
  { id: '14', title: 'My Task 14', type: 'TASK', start: new Date(1746938400000), end: new Date(1746942000000) },
  { id: '15', title: 'My Task 15', type: 'HOLIDAY', start: new Date(1746765600000), end: new Date(1746772800000) },
];

const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    //checking if data is present in localstorage else using the dummy data
    const savedEvents = localStorage.getItem('calendarEvents');
    if (savedEvents) {
      try {
        const parsedEvents = JSON.parse(savedEvents);
        console.log(parsedEvents,`parsedEvents`);
        setEvents(parsedEvents?.map(event => ({
          ...event,
          start: new Date(event?.start),
          end: new Date(event?.end),
        })));
      } catch (e) {
        console.log('no past events');
        setEvents(initialEvents);
      }
    } else {
      setEvents(initialEvents);
    }
  }, []);

  useEffect(() => {
  // checking if there are any events and updating the same in localstorage
    if (events?.length > 0) {
      localStorage.setItem(
        'calendarEvents',
        JSON.stringify(
          events.map((event) => ({
            ...event,
            start: event.start.getTime(),
            end: event.end.getTime(),
          }))
        )
      );
    }
  }, [events]);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleTimeSlotClick = (timeSlot) => {
    if (isSunday(timeSlot.start)) return;
    
    setSelectedEvent({
      id: Date.now().toString(),
      title: '',
      type: 'TASK',
      start: timeSlot.start,
      end: timeSlot.end,
    });
  };

  const handleSaveEvent = (updatedEvent) => {
    setEvents((prevEvents) => {
      const existingIndex = prevEvents.findIndex((e) => e.id === updatedEvent.id);
      if (existingIndex >= 0) {
        const newEvents = [...prevEvents];
        newEvents[existingIndex] = updatedEvent;
        return newEvents;
      } else {
        return [...prevEvents, updatedEvent];
      }
    });
    setSelectedEvent(null);
  };

  const handleDeleteEvent = (eventId) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
    setSelectedEvent(null);
  };

  const handleClosepopup = () => {
    setSelectedEvent(null);
  };

  return {
    events,
    selectedEvent,
    handleEventClick,
    handleTimeSlotClick,
    handleSaveEvent,
    handleDeleteEvent,
    handleClosepopup,
  };
};

export default useEvents;