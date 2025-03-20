import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../../theme/ThemeContext';
import './Calendar.css';

/**
 * Calendar component that displays calendar with multiple view options
 */
const Calendar = ({ 
  initialDate = new Date(),
  onDateClick,
  highlightToday = true,
  startWeekOnSunday = true,
  className = '',
  initialView = 'month', // Default view is month
}) => {
  const theme = useTheme();
  const [currentDate, setCurrentDate] = useState(new Date(initialDate));
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [view, setView] = useState(initialView); // 'day', 'week', or 'month'
  
  // Generate days for the calendar grid
  useEffect(() => {
    generateDaysForMonth(currentDate);
  }, [currentDate]);

  // Generate days array for the current month view, including days from prev/next month for filling the grid
  const generateDaysForMonth = (date) => {
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
        prevMonthDays.push({
          date: new Date(year, month - 1, i),
          dayNumber: i,
          isCurrentMonth: false,
          isPrevMonth: true,
          isNextMonth: false
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
        hasEvents: Math.random() > 0.7 // Placeholder for demo event indicator
      });
    }
    
    // Calculate how many days we need from the next month
    const totalDaysShown = (Math.ceil((firstDayOfWeek + daysInCurrentMonth) / 7) * 7);
    const nextMonthDaysNeeded = totalDaysShown - (prevMonthDays.length + currentMonthDays.length);
    
    // Days from the next month to display
    const nextMonthDays = [];
    for (let i = 1; i <= nextMonthDaysNeeded; i++) {
      nextMonthDays.push({
        date: new Date(year, month + 1, i),
        dayNumber: i,
        isCurrentMonth: false,
        isPrevMonth: false,
        isNextMonth: true
      });
    }
    
    // Combine all days
    setDaysInMonth([...prevMonthDays, ...currentMonthDays, ...nextMonthDays]);
  };

  // Get days for week view
  const getCurrentWeekDays = () => {
    const date = new Date(currentDate);
    const day = date.getDay();
    const diff = startWeekOnSunday ? day : (day === 0 ? 6 : day - 1); // Adjust for weeks starting on Monday

    // Start date of the week (Sunday or Monday)
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
        hasEvents: Math.random() > 0.7 // Demo placeholder
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
        hasEvents: Math.random() > 0.8 // Demo placeholder
      });
    }
    return hours;
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
      if (view === 'day') {
        newDate.setDate(newDate.getDate() - 1);
      } else if (view === 'week') {
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
      if (view === 'day') {
        newDate.setDate(newDate.getDate() + 1);
      } else if (view === 'week') {
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

  // Get current format based on view
  const formatHeaderDate = () => {
    if (view === 'day') {
      return currentDate.toLocaleDateString('en-US', { 
        weekday: 'long',
        month: 'long', 
        day: 'numeric',
        year: 'numeric'
      });
    } else if (view === 'week') {
      const weekDays = getCurrentWeekDays();
      const firstDay = weekDays[0].date;
      const lastDay = weekDays[6].date;
      
      if (firstDay.getMonth() !== lastDay.getMonth()) {
        return `${firstDay.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${lastDay.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
      }
      
      return `${firstDay.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - ${lastDay.getDate()}, ${lastDay.getFullYear()}`;
    } else {
      return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }
  };

  // Get weekday names based on starting day preference
  const getWeekdayNames = () => {
    const weekdays = startWeekOnSunday 
      ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    return weekdays;
  };

  // Render month view
  const renderMonthView = () => {
    return (
      <>
        <div className="calendar-weekdays">
          {getWeekdayNames().map((day, index) => (
            <div key={index} className="weekday">{day}</div>
          ))}
        </div>
        
        <div className="calendar-days-grid">
          {daysInMonth.map((day, index) => (
            <div 
              key={index} 
              className={`calendar-day ${day.isCurrentMonth ? 'current-month' : 'other-month'} 
                ${day.isToday && highlightToday ? 'today' : ''}
                ${selectedDate && day.date.toDateString() === selectedDate.toDateString() ? 'selected' : ''}`}
              onClick={() => handleDayClick(day)}
            >
              <span className="day-number">{day.dayNumber}</span>
              {day.hasEvents && <div className="event-indicator"></div>}
            </div>
          ))}
        </div>
      </>
    );
  };

  // Render week view
  const renderWeekView = () => {
    const weekDays = getCurrentWeekDays();
    
    return (
      <div className="calendar-week-view">
        <div className="calendar-weekdays week-view">
          {weekDays.map((day, index) => (
            <div 
              key={index} 
              className={`weekday ${day.isToday ? 'today' : ''} ${day.isCurrentMonth ? 'current-month' : ''}`}
            >
              <div className="weekday-name">{day.dayName}</div>
              <div 
                className={`weekday-date ${selectedDate && day.date.toDateString() === selectedDate.toDateString() ? 'selected' : ''}`}
                onClick={() => handleDayClick(day)}
              >
                {day.dayNumber}
                <div className="weekday-month">{day.monthName}</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="week-content">
          {getHoursForDay().map((hourData, hIndex) => (
            <div key={hIndex} className="hour-row">
              <div className="hour-label">{hourData.timeLabel}</div>
              <div className="week-hour-cells">
                {weekDays.map((day, dIndex) => (
                  <div 
                    key={dIndex} 
                    className={`week-hour-cell ${day.isToday ? 'today-column' : ''}`}
                  >
                    {Math.random() > 0.9 && (
                      <div className="event-placeholder" style={{ 
                        backgroundColor: getRandomEventColor()
                      }}>
                        Sample Event
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render day view
  const renderDayView = () => {
    const hours = getHoursForDay();
    const isCurrentDayToday = isToday(currentDate);
    
    return (
      <div className="calendar-day-view">
        <div className="day-header">
          <div className="day-title">
            {currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </div>
        </div>
        
        <div className="day-hours-container">
          {hours.map((hourData, index) => (
            <div 
              key={index} 
              className={`hour-block ${isCurrentDayToday && new Date().getHours() === hourData.hour ? 'current-hour' : ''}`}
            >
              <div className="hour-label">{hourData.timeLabel}</div>
              <div className="hour-content">
                {Math.random() > 0.85 && (
                  <div className="event-placeholder" style={{ backgroundColor: getRandomEventColor() }}>
                    Sample Event at {hourData.timeLabel}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Helper for demo event colors
  const getRandomEventColor = () => {
    const colors = [
      theme.colors.primary + 'AA',
      theme.colors.secondary + 'AA',
      theme.colors.info + 'AA',
      theme.colors.success + 'AA'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div 
      className={`calendar-container ${className}`}
      style={{
        '--calendar-bg': theme.colors.surface,
        '--calendar-text': theme.colors.text.primary,
        '--calendar-border': theme.colors.text.disabled,
        '--calendar-header-bg': theme.colors.primary,
        '--calendar-header-text': '#ffffff',
        '--calendar-today-bg': `${theme.colors.primary}33`,
        '--calendar-today-border': theme.colors.primary,
        '--calendar-highlight': theme.colors.secondary,
        '--calendar-inactive-text': theme.colors.text.disabled,
        '--calendar-border-radius': theme.borderRadius.md,
        '--calendar-shadow': theme.shadows.sm,
        '--calendar-event-indicator': theme.colors.primary,
        '--calendar-selected-bg': `${theme.colors.secondary}33`,
        '--calendar-selected-border': theme.colors.secondary
      }}
    >
      <div className="calendar-header">
        <button className="calendar-nav-btn" onClick={prevPeriod}>
          &lt;
        </button>
        <div className="calendar-title">
          <h2>{formatHeaderDate()}</h2>
          <div className="calendar-actions">
            <button className="calendar-today-btn" onClick={goToToday}>
              Today
            </button>
            <div className="view-toggles">
              <button 
                className={`view-toggle-btn ${view === 'day' ? 'active' : ''}`}
                onClick={() => setView('day')}
              >
                Day
              </button>
              <button 
                className={`view-toggle-btn ${view === 'week' ? 'active' : ''}`}
                onClick={() => setView('week')}
              >
                Week
              </button>
              <button 
                className={`view-toggle-btn ${view === 'month' ? 'active' : ''}`}
                onClick={() => setView('month')}
              >
                Month
              </button>
            </div>
          </div>
        </div>
        <button className="calendar-nav-btn" onClick={nextPeriod}>
          &gt;
        </button>
      </div>
      
      <div className={`calendar-body calendar-${view}-view`}>
        {view === 'month' && renderMonthView()}
        {view === 'week' && renderWeekView()}
        {view === 'day' && renderDayView()}
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
  initialView: PropTypes.oneOf(['day', 'week', 'month'])
};

export default Calendar;
