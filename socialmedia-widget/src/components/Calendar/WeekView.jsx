import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import EventItem from './EventItem';

/**
 * Week view component for the calendar
 */
const WeekView = ({
  weekDays,
  hours,
  selectedDate,
  onDayClick,
  onEventClick,
  compactView = false // Add prop for compact view
}) => {
  // Current hour for highlighting
  const currentHour = new Date().getHours();
  
  // Organize events by hour and day to position them correctly
  const eventsByHourAndDay = useMemo(() => {
    const eventsByHour = {};
    
    weekDays.forEach((day, dayIndex) => {
      if (day.events) {
        day.events.forEach(event => {
          const eventDate = new Date(event.startTime);
          const hour = eventDate.getHours();
          const minute = eventDate.getMinutes();
          
          if (!eventsByHour[hour]) {
            eventsByHour[hour] = {};
          }
          
          if (!eventsByHour[hour][dayIndex]) {
            eventsByHour[hour][dayIndex] = [];
          }
          
          eventsByHour[hour][dayIndex].push({
            ...event,
            topPosition: (minute / 60) * 100,
            dayIndex
          });
        });
      }
    });
    
    return eventsByHour;
  }, [weekDays]);
  
  // Determine which hours to show in compact view
  const visibleHours = useMemo(() => {
    if (!compactView) {
      return hours; // Show all hours when not in compact view
    }
    
    // Find hours with events
    const hoursWithEvents = Object.keys(eventsByHourAndDay).map(Number);
    
    if (hoursWithEvents.length === 0) {
      // If no events, show current hour and a few surrounding hours
      const minHour = Math.max(0, currentHour - 2);
      const maxHour = Math.min(23, currentHour + 2);
      return hours.filter(h => h.hour >= minHour && h.hour <= maxHour);
    }
    
    // Find min and max hours with events
    const minHour = Math.max(0, Math.min(...hoursWithEvents) - 1); // Add 1 hour padding before
    const maxHour = Math.min(23, Math.max(...hoursWithEvents) + 1); // Add 1 hour padding after
    
    // Include current hour range if not already in range
    const adjustedMinHour = Math.min(minHour, currentHour - 1);
    const adjustedMaxHour = Math.max(maxHour, currentHour + 1);
    
    // Return a continuous range of hours
    return hours.filter(h => h.hour >= adjustedMinHour && h.hour <= adjustedMaxHour);
  }, [hours, eventsByHourAndDay, compactView, currentHour]);

  return (
    <div className="flex flex-col w-full">
      {/* Week days header */}
      <div className="grid grid-cols-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        {/* Time gutter header */}
        <div className="p-2 border-r border-gray-200 dark:border-gray-700"></div>
        
        {/* Day headers */}
        {weekDays.map((day, index) => (
          <div 
            key={index} 
            className={`
              p-2 text-center border-r border-gray-200 dark:border-gray-700 cursor-pointer
              ${day.isToday ? 'bg-blue-50 dark:bg-blue-900/20' : ''}
              ${selectedDate && day.date.toDateString() === selectedDate.toDateString() 
                ? 'ring-2 ring-inset ring-indigo-400 dark:ring-indigo-600' : ''}
            `}
            onClick={() => onDayClick(day)}
          >
            <div className="text-xs text-gray-500 dark:text-gray-400">{day.dayName}</div>
            <div className={`text-base font-medium ${
              day.isToday ? 'text-blue-600 dark:text-blue-400' : 'text-gray-800 dark:text-gray-200'
            }`}>
              {day.dayNumber}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{day.monthName}</div>
          </div>
        ))}
      </div>
      
      {/* Time grid */}
      <div className="grid grid-cols-8 w-full">
        {/* Time labels */}
        <div className="col-span-1">
          {/* Only render the hours we want to display */}
          {visibleHours.map((hour, index) => (
            <div 
              key={index} 
              className={`
                h-20 border-b border-r border-gray-200 dark:border-gray-700 
                text-xs text-gray-500 dark:text-gray-400 text-right pr-2 pt-0.5
                ${hour.hour === currentHour ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}
              `}
            >
              {hour.timeLabel}
            </div>
          ))}
        </div>
        
        {/* Week grid - spans the remaining 7 columns */}
        <div className="col-span-7 grid grid-cols-7 relative">
          {/* Only render the hours we want to display */}
          {visibleHours.map((hour, hourIndex) => (
            <React.Fragment key={hourIndex}>
              {weekDays.map((day, dayIndex) => (
                <div 
                  key={`${hourIndex}-${dayIndex}`}
                  className={`
                    h-20 border-b border-r border-gray-200 dark:border-gray-700 relative
                    ${day.isToday && hour.hour === currentHour ? 'bg-blue-50 dark:bg-blue-900/10' : ''}
                    ${day.isToday ? 'bg-blue-50/30 dark:bg-blue-900/5' : ''}
                  `}
                >
                  {/* Events for this day and hour */}
                  {eventsByHourAndDay[hour.hour]?.[dayIndex]?.map((event, eventIndex) => (
                    <div 
                      key={eventIndex}
                      className="absolute left-0 right-0 px-1"
                      style={{
                        top: `${event.topPosition}%`,
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
                        view="week"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </React.Fragment>
          ))}
          
          {/* Current time indicator - adjusted to calculate position within visible hours */}
          {weekDays.some(day => day.isToday) && (
            <div 
              className="absolute left-0 right-0 border-t-2 border-red-500 z-20 pointer-events-none"
              style={{ 
                top: compactView 
                  ? `${visibleHours.findIndex(h => h.hour === currentHour) * 80 + (new Date().getMinutes() / 60) * 80}px` 
                  : `${currentHour * 80 + (new Date().getMinutes() / 60) * 80}px`,
                display: visibleHours.some(h => h.hour === currentHour) ? 'block' : 'none'
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

WeekView.propTypes = {
  weekDays: PropTypes.array.isRequired,
  hours: PropTypes.array.isRequired,
  selectedDate: PropTypes.instanceOf(Date),
  onDayClick: PropTypes.func.isRequired,
  onEventClick: PropTypes.func.isRequired,
  compactView: PropTypes.bool
};

export default WeekView;
