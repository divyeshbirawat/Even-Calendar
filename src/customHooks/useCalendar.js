import { useState, useEffect } from 'react';
import {
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addWeeks,
  subWeeks,
} from 'date-fns';

const useCalendar = () => {
  const [referenceDate, setReferenceDate] = useState(new Date());
  const [weekDays, setWeekDays] = useState([]);

  useEffect(() => {
    const weekStart = startOfWeek(referenceDate, { weekStartsOn: 0 });
    const weekEnd = endOfWeek(referenceDate, { weekStartsOn: 0 });
    const daysArray = eachDayOfInterval({ start: weekStart, end: weekEnd });
    setWeekDays(daysArray);
  }, [referenceDate]);

  const goToPreviousWeek = () => {
    setReferenceDate(prev => subWeeks(prev, 1));
  };

  const goToNextWeek = () => {
    setReferenceDate(prev => addWeeks(prev, 1));
  };

  const goToToday = () => {
    setReferenceDate(new Date());
  };

  const hoursPerDay = [];
  for (let hour = 0; hour < 24; hour++) {
    hoursPerDay[hour] = hour;
  }


  return {
    currentWeek: referenceDate,
    days: weekDays,
    hours: hoursPerDay,
    goToPreviousWeek,
    goToNextWeek,
    goToToday,
  };
};

export default useCalendar;
