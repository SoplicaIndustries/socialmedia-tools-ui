import React from 'react';
import PropTypes from 'prop-types';
import './styles/CalendarMonthView.css';

/**
 * Month view component for the calendar
 */
const MonthView = ({
  daysInMonth,
  weekdayNames,
  selectedDate,
  highlightToday,
  onDayClick
}) => {
  return (
    <>
      <div className="calendar-weekdays">
        {weekdayNames.map((day, index) => (
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
            onClick={() => onDayClick(day)}
          >
            <span className="day-number">{day.dayNumber}</span>
            {day.hasEvents && <div className="event-indicator"></div>}
          </div>
        ))}
      </div>
    </>
  );
};

MonthView.propTypes = {
  daysInMonth: PropTypes.array.isRequired,
  weekdayNames: PropTypes.array.isRequired,
  selectedDate: PropTypes.instanceOf(Date),
  highlightToday: PropTypes.bool,
  onDayClick: PropTypes.func.isRequired
};

export default MonthView;
