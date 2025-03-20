import React from 'react';
import PropTypes from 'prop-types';
import EventItem from './EventItem';

/**
 * Month view component for the calendar
 */
const MonthView = ({
  daysInMonth,
  weekdayNames,
  selectedDate,
  highlightToday,
  onDayClick,
  onEventClick
}) => {
  // Function to render events for a day
  const renderEvents = (day) => {
    if (!day.events || day.events.length === 0) return null;
    
    // Show all events (no limit) - this allows the day cell to expand
    const visibleEvents = day.events || [];
    
    return (
      <div className="mt-1">
        {visibleEvents.map(event => (
          <div 
            key={event.id}
            onClick={(e) => {
              e.stopPropagation();
              onEventClick(event);
            }}
          >
            <EventItem
              title={event.title}
              description={event.description}
              startTime={event.startTime}
              endTime={event.endTime}
              color={event.color}
              isAllDay={event.isAllDay}
              view="month"
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      {/* Weekday headers */}
      <div className="grid grid-cols-7 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
        {weekdayNames.map((day, index) => (
          <div key={index} className="py-2 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 grid-auto-rows bg-white dark:bg-gray-800">
        {daysInMonth.map((day, index) => (
          <div 
            key={index} 
            className={`
              border-b border-r border-gray-200 dark:border-gray-700
              ${day.isCurrentMonth ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900'} 
              ${day.isToday && highlightToday ? 'bg-blue-50 dark:bg-blue-900/20' : ''}
              ${selectedDate && day.date.toDateString() === selectedDate.toDateString() 
                ? 'ring-2 ring-indigo-400 dark:ring-indigo-600 z-10' : ''}
              ${day.isCurrentMonth ? 'hover:bg-gray-50 dark:hover:bg-gray-700' : ''}
              relative p-1 min-h-[100px] flex flex-col
              ${day.events && day.events.length > 2 ? 'h-auto' : ''}
            `}
            onClick={() => onDayClick(day)}
          >
            {/* Day number - now centered */}
            <div className="flex justify-center mb-2 pt-1">
              <span className={`
                inline-flex items-center justify-center
                ${day.isToday ? 'bg-blue-500 text-white rounded-full w-7 h-7' : 'text-center'}
                ${day.isCurrentMonth 
                  ? day.isToday 
                    ? 'text-white font-bold' 
                    : 'text-gray-900 dark:text-gray-100' 
                  : 'text-gray-400 dark:text-gray-500'}
              `}>
                {day.dayNumber}
              </span>
            </div>
            
            {/* Events container */}
            {day.events && day.events.length > 0 && (
              <div className="flex flex-col mt-1">
                {renderEvents(day)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

MonthView.propTypes = {
  daysInMonth: PropTypes.array.isRequired,
  weekdayNames: PropTypes.array.isRequired,
  selectedDate: PropTypes.instanceOf(Date),
  highlightToday: PropTypes.bool,
  onDayClick: PropTypes.func.isRequired,
  onEventClick: PropTypes.func
};

export default MonthView;
