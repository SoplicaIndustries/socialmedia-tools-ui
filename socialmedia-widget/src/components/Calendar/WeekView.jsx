import React, { useMemo, useState } from 'react';
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
  compactView = false,
  onEventUpdate
}) => {
  // Add state for drag feedback
  const [dragFeedback, setDragFeedback] = useState(null);
  
  // Define snap interval in minutes (15 = quarter hour, 30 = half hour)
  const SNAP_INTERVAL = 15;
  
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
  
  // Function to get snap position in minutes (rounded to nearest SNAP_INTERVAL)
  const getSnapMinutes = (relativeY, cellHeight) => {
    const exactMinutes = Math.floor((relativeY / cellHeight) * 60);
    return Math.round(exactMinutes / SNAP_INTERVAL) * SNAP_INTERVAL;
  };

  // Drag over handler with visual feedback
  const handleDragOver = (e, dayIndex, hour) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    
    if (!onEventUpdate) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const relativeY = e.clientY - rect.top;
    
    // Calculate snapped minutes
    const snapMinutes = getSnapMinutes(relativeY, rect.height);
    
    // Show snap feedback
    setDragFeedback({
      dayIndex,
      hour,
      minute: snapMinutes,
      clientX: e.clientX,
      clientY: e.clientY,
      width: rect.width
    });
  };

  // Clear drag feedback when leaving drop zone
  const handleDragLeave = () => {
    setDragFeedback(null);
  };

  // Drop handler with snapping
  const handleDrop = (e, dayIndex, hour) => {
    e.preventDefault();
    setDragFeedback(null);
    
    const eventId = e.dataTransfer.getData('text/plain');
    
    if (eventId && onEventUpdate && weekDays[dayIndex]) {
      // Create new date for the event
      const newDate = new Date(weekDays[dayIndex].date);
      
      // Get snap minutes
      const rect = e.currentTarget.getBoundingClientRect();
      const relativeY = e.clientY - rect.top;
      const snapMinutes = getSnapMinutes(relativeY, rect.height);
      
      // Set the hour and calculated minutes
      newDate.setHours(hour, snapMinutes, 0, 0);
      
      // Get original event's duration
      const originalTimeData = e.dataTransfer.getData('application/json');
      let newEndTime = null;
      
      if (originalTimeData) {
        const { hasEndTime, duration } = JSON.parse(originalTimeData);
        if (hasEndTime && duration) {
          newEndTime = new Date(newDate.getTime() + duration);
        }
      }
      
      onEventUpdate(eventId, newDate, newEndTime);
    }
  };

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
                    ${onEventUpdate ? 'cursor-pointer' : ''}
                  `}
                  onDragOver={(e) => onEventUpdate ? handleDragOver(e, dayIndex, hour.hour) : null}
                  onDragLeave={onEventUpdate ? handleDragLeave : null}
                  onDrop={(e) => onEventUpdate ? handleDrop(e, dayIndex, hour.hour) : null}
                >
                  {/* Time snap guides - render at SNAP_INTERVAL */}
                  {onEventUpdate && Array.from({ length: 60 / SNAP_INTERVAL }).map((_, i) => (
                    i > 0 && (
                      <div 
                        key={`guide-${i}`} 
                        className="absolute w-full border-b border-dashed border-gray-200 dark:border-gray-700 pointer-events-none opacity-50"
                        style={{ top: `${(i * SNAP_INTERVAL / 60) * 100}%` }}
                      />
                    )
                  ))}
                  
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
                      draggable={!!onEventUpdate}
                      onDragStart={e => {
                        e.dataTransfer.setData('text/plain', event.id);
                        // Store original time information
                        const timeData = {
                          hour: new Date(event.startTime).getHours(),
                          minute: new Date(event.startTime).getMinutes(),
                          hasEndTime: !!event.endTime,
                          duration: event.endTime ? new Date(event.endTime) - new Date(event.startTime) : null
                        };
                        e.dataTransfer.setData('application/json', JSON.stringify(timeData));
                        
                        // Create a ghost element that looks like the actual event
                        const sourceElement = e.currentTarget;
                        const ghostElement = sourceElement.cloneNode(true);
                        
                        // Style the ghost element to make it transparent
                        ghostElement.style.position = 'absolute';
                        ghostElement.style.top = '-1000px';
                        ghostElement.style.left = '-1000px';
                        ghostElement.style.width = `${sourceElement.offsetWidth}px`;
                        ghostElement.style.height = `${sourceElement.offsetHeight}px`;
                        ghostElement.style.opacity = '0.7'; // Make it semi-transparent
                        ghostElement.style.pointerEvents = 'none';
                        ghostElement.style.zIndex = '-1';
                        ghostElement.style.transform = 'scale(0.95)'; // Slightly smaller
                        ghostElement.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'; // Add shadow for depth
                        
                        document.body.appendChild(ghostElement);
                        e.dataTransfer.setDragImage(ghostElement, 10, 10);
                        
                        // Remove after drag is initialized
                        setTimeout(() => {
                          document.body.removeChild(ghostElement);
                        }, 0);
                      }}
                    >
                      <EventItem 
                        title={event.title}
                        description={event.description}
                        startTime={event.startTime}
                        endTime={event.endTime}
                        color={event.color}
                        isAllDay={event.isAllDay}
                        services={event.services || []} // Pass services array to EventItem
                        view="week"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </React.Fragment>
          ))}
          
          {/* Current time indicator */}
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
          
          {/* Drag and drop snap feedback - now wider but less tall */}
          {dragFeedback && (
            <div
              className="absolute h-0.5 bg-blue-600 dark:bg-blue-500 z-30 pointer-events-none transition-all duration-75 ease-in-out"
              style={{
                left: `${(dragFeedback.dayIndex * 100) / 7}%`,
                width: `${100 / 7}%`,
                top: `${
                  (visibleHours.findIndex(h => h.hour === dragFeedback.hour) * 80) + 
                  ((dragFeedback.minute / 60) * 80)
                }px`,
                height: '2px',
                boxShadow: '0 0 6px 1px rgba(59, 130, 246, 0.6)',
                transform: 'scaleY(1)'
              }}
            >
              <div className="absolute right-full mr-2 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded whitespace-nowrap">
                {`${dragFeedback.hour % 12 || 12}:${dragFeedback.minute.toString().padStart(2, '0')} ${dragFeedback.hour >= 12 ? 'PM' : 'AM'}`}
              </div>
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
  compactView: PropTypes.bool,
  onEventUpdate: PropTypes.func
};

export default WeekView;
