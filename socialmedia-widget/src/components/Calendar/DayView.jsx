import React from 'react';
import PropTypes from 'prop-types';
import EventItem from './EventItem';

/**
 * Day view component for the calendar
 */
const DayView = ({
  currentDate,
  hours,
  isCurrentDayToday,
  onEventClick
}) => {
  const currentHour = new Date().getHours();
  const currentMinute = new Date().getMinutes();
  
  // Format the day header
  const dayTitle = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  
  return (
    <div className="flex flex-col h-full">
      {/* Day header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-3 text-center">
        <h3 className={`text-lg font-medium ${isCurrentDayToday ? 'text-blue-600 dark:text-blue-400' : 'text-gray-800 dark:text-gray-200'}`}>
          {dayTitle}
        </h3>
      </div>
      
      {/* Time grid */}
      <div className="flex flex-1 overflow-y-auto">
        {/* Time labels */}
        <div className="w-16 flex-shrink-0 border-r border-gray-200 dark:border-gray-700">
          {hours.map((hour, index) => (
            <div 
              key={index} 
              className={`
                h-14 border-b border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400
                text-right pr-2 pt-0.5 
                ${isCurrentDayToday && hour.hour === currentHour ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}
              `}
            >
              {hour.timeLabel}
            </div>
          ))}
        </div>
        
        {/* Day schedule */}
        <div className="flex-1 relative">
          {/* Hour cells */}
          {hours.map((hour, hourIndex) => (
            <div 
              key={hourIndex} 
              className={`
                h-14 border-b border-gray-200 dark:border-gray-700 relative
                ${isCurrentDayToday && hour.hour === currentHour ? 'bg-blue-50 dark:bg-blue-900/10' : ''}
              `}
            >
              {/* Events for this hour */}
              {hour.events.map((event, eventIndex) => (
                <div 
                  key={eventIndex}
                  className="absolute left-0 right-0 px-4"
                  style={{
                    top: `${(new Date(event.startTime).getMinutes() / 60) * 56}px`,
                    zIndex: 10
                  }}
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
                    view="day"
                  />
                </div>
              ))}
            </div>
          ))}
          
          {/* Current time indicator */}
          {isCurrentDayToday && (
            <div 
              className="absolute left-0 right-0 border-t-2 border-red-500 z-20 pointer-events-none"
              style={{ 
                top: `${currentHour * 56 + (currentMinute / 60) * 56}px` 
              }}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-red-500 absolute -left-1.5 -top-1.5"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

DayView.propTypes = {
  currentDate: PropTypes.instanceOf(Date).isRequired,
  hours: PropTypes.array.isRequired,
  isCurrentDayToday: PropTypes.bool.isRequired,
  onEventClick: PropTypes.func.isRequired
};

export default DayView;
