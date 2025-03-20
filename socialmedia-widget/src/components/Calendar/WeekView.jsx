import React from 'react';
import PropTypes from 'prop-types';
import './styles/CalendarWeekView.css';
import './styles/CalendarEvents.css';

/**
 * Week view component for the calendar
 */
const WeekView = ({
  weekDays,
  hours,
  selectedDate,
  onDayClick,
  getRandomEventColor
}) => {
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
              onClick={() => onDayClick(day)}
            >
              {day.dayNumber}
              <div className="weekday-month">{day.monthName}</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="week-content">
        {hours.map((hourData, hIndex) => (
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

WeekView.propTypes = {
  weekDays: PropTypes.array.isRequired,
  hours: PropTypes.array.isRequired,
  selectedDate: PropTypes.instanceOf(Date),
  onDayClick: PropTypes.func.isRequired,
  getRandomEventColor: PropTypes.func.isRequired
};

export default WeekView;
