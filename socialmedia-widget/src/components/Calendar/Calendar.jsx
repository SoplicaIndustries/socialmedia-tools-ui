import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../../theme/ThemeContext';
import CalendarHeader from './CalendarHeader';
import MonthView from './MonthView';
import WeekView from './WeekView';
import CalendarEvent from './CalendarEvent';

/**
 * Calendar component that displays calendar with multiple view options
 */
const Calendar = ({ 
  initialDate = new Date(),
  onDateClick,
  highlightToday = true,
  startWeekOnSunday = true,
  className = '',
  initialView = 'month',
  events = [], 
  maxHeight = 'none',
  compactWeekView = false
}) => {
  const theme = useTheme();
  const [currentDate, setCurrentDate] = useState(new Date(initialDate));
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [view, setView] = useState(initialView === 'day' ? 'month' : initialView);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Convert plain event objects to CalendarEvent instances
  const standardizedEvents = useMemo(() => {
    return events.map(event => {
      return event instanceof CalendarEvent ? event : new CalendarEvent(event);
    });
  }, [events]);
  
  // Filter events based on search query
  const filteredEvents = useMemo(() => {
    if (!searchQuery) return standardizedEvents;
    return standardizedEvents.filter(event => event.matchesSearch(searchQuery));
  }, [standardizedEvents, searchQuery]);
  
  // Generate days for the calendar grid when date/view/filtered events change
  useEffect(() => {
    generateDaysForMonth(currentDate, filteredEvents);
  }, [currentDate, view, filteredEvents]);

  // Handle search query changes
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Generate days array for month/week views using the provided events
  const generateDaysForMonth = (date, eventList) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    // First day of the month
    const firstDayOfMonth = new Date(year, month, 1);
    // Last day of the month
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    // Get the day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
    let firstDayOfWeek = firstDayOfMonth.getDay();
    
    // Adjust if week should start on Monday
    if (!startWeekOnSunday) {
      firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
    }
    
    // Number of days in the month
    const daysInCurrentMonth = lastDayOfMonth.getDate();
    
    // Days from the previous month to display
    const prevMonthDays = [];
    if (firstDayOfWeek > 0) {
      const prevMonth = new Date(year, month, 0);
      const prevMonthDaysCount = prevMonth.getDate();
      
      for (let i = prevMonthDaysCount - firstDayOfWeek + 1; i <= prevMonthDaysCount; i++) {
        const date = new Date(year, month - 1, i);
        prevMonthDays.push({
          date,
          dayNumber: i,
          isCurrentMonth: false,
          isPrevMonth: true,
          isNextMonth: false,
          events: getEventsForDate(date, eventList)
        });
      }
    }
    
    // Days from the current month
    const currentMonthDays = [];
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      const date = new Date(year, month, i);
      currentMonthDays.push({
        date,
        dayNumber: i,
        isCurrentMonth: true,
        isPrevMonth: false,
        isNextMonth: false,
        isToday: isToday(date),
        events: getEventsForDate(date, eventList)
      });
    }
    
    // Calculate how many days we need from the next month
    const totalDaysShown = (Math.ceil((firstDayOfWeek + daysInCurrentMonth) / 7) * 7);
    const nextMonthDaysNeeded = totalDaysShown - (prevMonthDays.length + currentMonthDays.length);
    
    // Days from the next month to display
    const nextMonthDays = [];
    for (let i = 1; i <= nextMonthDaysNeeded; i++) {
      const date = new Date(year, month + 1, i);
      nextMonthDays.push({
        date,
        dayNumber: i,
        isCurrentMonth: false,
        isPrevMonth: false,
        isNextMonth: true,
        events: getEventsForDate(date, eventList)
      });
    }
    
    // Combine all days
    setDaysInMonth([...prevMonthDays, ...currentMonthDays, ...nextMonthDays]);
  };

  // Get events for a specific date from the provided events array
  const getEventsForDate = (date, eventList) => {
    return eventList.filter(event => {
      const eventDate = new Date(event.startTime);
      return eventDate.getDate() === date.getDate() && 
             eventDate.getMonth() === date.getMonth() &&
             eventDate.getFullYear() === date.getFullYear();
    });
  };

  // Get days for week view with events 
  const getCurrentWeekDays = () => {
    const date = new Date(currentDate);
    const day = date.getDay();
    const diff = startWeekOnSunday ? day : (day === 0 ? 6 : day - 1);

    date.setDate(date.getDate() - diff);
    
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(date);
      weekDays.push({
        date: new Date(currentDay),
        dayNumber: currentDay.getDate(),
        dayName: currentDay.toLocaleDateString('en-US', { weekday: 'short' }),
        monthName: currentDay.toLocaleDateString('en-US', { month: 'short' }),
        isCurrentMonth: currentDay.getMonth() === currentDate.getMonth(),
        isToday: isToday(currentDay),
        events: getEventsForDate(currentDay, events)
      });
      date.setDate(date.getDate() + 1);
    }
    
    return weekDays;
  };

  // Get hours for day/week view
  const getHoursForDay = () => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      hours.push({
        hour: i,
        timeLabel: formatHour(i),
        events: getEventsForHour(i)
      });
    }
    return hours;
  };

  // Get events for specific hour in the current day
  const getEventsForHour = (hour) => {
    return events.filter(event => {
      const eventDate = new Date(event.startTime);
      return isDateEqual(eventDate, currentDate) && eventDate.getHours() === hour;
    });
  };
  
  // Check if two dates are the same day
  const isDateEqual = (date1, date2) => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };
  
  // Format hour (12-hour format with am/pm)
  const formatHour = (hour) => {
    return `${hour % 12 === 0 ? 12 : hour % 12}${hour < 12 ? 'am' : 'pm'}`;
  };

  // Check if a date is today
  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  // Navigation functions
  const prevPeriod = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      if (view === 'week') {
        newDate.setDate(newDate.getDate() - 7);
      } else {
        newDate.setMonth(newDate.getMonth() - 1);
      }
      return newDate;
    });
  };

  const nextPeriod = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      if (view === 'week') {
        newDate.setDate(newDate.getDate() + 7);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Handler for day click
  const handleDayClick = (day) => {
    setSelectedDate(day.date);
    
    if (onDateClick) {
      onDateClick(day.date);
    }
  };

  // Format header date based on current view
  const formatHeaderDate = (date, view) => {
    if (view === 'week') {
      const weekDays = getCurrentWeekDays();
      const firstDay = weekDays[0].date;
      const lastDay = weekDays[6].date;
      
      if (firstDay.getMonth() !== lastDay.getMonth()) {
        return `${firstDay.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${lastDay.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
      }
      
      return `${firstDay.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - ${lastDay.getDate()}, ${lastDay.getFullYear()}`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }
  };

  // Get weekday names based on starting day preference
  const getWeekdayNames = () => {
    const weekdays = startWeekOnSunday 
      ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    return weekdays;
  };

  // Handle event click
  const handleEventClick = (event) => {
    alert(`Event: ${event.title}\nTime: ${new Date(event.startTime).toLocaleTimeString()} - ${new Date(event.endTime).toLocaleTimeString()}\n${event.description || ''}`);
  };

  return (
    <div 
      className={`bg-white dark:bg-gray-800 shadow-md rounded-lg flex flex-col ${className}`}
    >
      {/* Header is outside of the scrollable area, now with search */}
      <CalendarHeader 
        currentDate={currentDate}
        view={view}
        onPrevPeriod={prevPeriod}
        onNextPeriod={nextPeriod}
        onTodayClick={goToToday}
        onViewChange={setView}
        formatHeaderDate={formatHeaderDate}
        showDayView={false}
        onSearch={handleSearch}
        searchQuery={searchQuery}
      />
      
      {/* Remove search results info div - we'll just show or hide events now */}
      
      {/* Calendar body is the only scrollable part */}
      <div 
        className="flex-1 overflow-auto"
        style={{ maxHeight: maxHeight !== 'none' ? `calc(${maxHeight} - 60px)` : 'none' }}
      >
        {view === 'month' && daysInMonth.length > 0 && (
          <MonthView 
            daysInMonth={daysInMonth}
            weekdayNames={getWeekdayNames()}
            selectedDate={selectedDate}
            highlightToday={highlightToday}
            onDayClick={handleDayClick}
            onEventClick={handleEventClick}
          />
        )}
        
        {view === 'week' && (
          <WeekView 
            weekDays={getCurrentWeekDays()}
            hours={getHoursForDay()}
            selectedDate={selectedDate}
            onDayClick={handleDayClick}
            onEventClick={handleEventClick}
            compactView={compactWeekView}
          />
        )}
      </div>
    </div>
  );
};

Calendar.propTypes = {
  initialDate: PropTypes.instanceOf(Date),
  onDateClick: PropTypes.func,
  highlightToday: PropTypes.bool,
  startWeekOnSunday: PropTypes.bool,
  className: PropTypes.string,
  initialView: PropTypes.oneOf(['week', 'month']),
  events: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    startTime: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
    endTime: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
    color: PropTypes.string.isRequired,
    isAllDay: PropTypes.bool
  })),
  maxHeight: PropTypes.string,
  compactWeekView: PropTypes.bool,
};

export default Calendar;
