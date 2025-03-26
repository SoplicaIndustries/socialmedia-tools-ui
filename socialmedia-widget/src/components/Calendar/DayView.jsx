import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EventItem from './EventItem';

/**
 * Day view component for the calendar
 */
const DayView = ({
  currentDate,
  hours,
  isCurrentDayToday,
  onEventClick,
  onEventUpdate
}) => {
  // Add state for drag feedback
  const [dragFeedback, setDragFeedback] = useState(null);
  
  // Define snap interval in minutes (15 = quarter hour, 30 = half hour)
  const SNAP_INTERVAL = 15;
  
  const currentHour = new Date().getHours();
  const currentMinute = new Date().getMinutes();
  
  // Format the day header
  const dayTitle = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  
  // Function to get snap position in minutes (rounded to nearest SNAP_INTERVAL)
  const getSnapMinutes = (relativeY, cellHeight) => {
    const exactMinutes = Math.floor((relativeY / cellHeight) * 60);
    return Math.round(exactMinutes / SNAP_INTERVAL) * SNAP_INTERVAL;
  };
  
  // Handle drag over with visual feedback
  const handleDragOver = (e, hour) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    
    if (!onEventUpdate) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const relativeY = e.clientY - rect.top;
    
    // Calculate snapped minutes
    const snapMinutes = getSnapMinutes(relativeY, rect.height);
    
    // Show snap feedback
    setDragFeedback({
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

  // Handle drop with snapping
  const handleDrop = (e, hour) => {
    e.preventDefault();
    setDragFeedback(null);
    
    const eventId = e.dataTransfer.getData('text/plain');
    
    if (eventId && onEventUpdate) {
      // Create new date for the event
      const newDate = new Date(currentDate);
      
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
                ${onEventUpdate ? 'cursor-pointer' : ''}
              `}
              onDragOver={(e) => onEventUpdate ? handleDragOver(e, hour.hour) : null}
              onDragLeave={onEventUpdate ? handleDragLeave : null}
              onDrop={(e) => onEventUpdate ? handleDrop(e, hour.hour) : null}
            >
              {/* Time snap guides - render at SNAP_INTERVAL */}
              {onEventUpdate && Array.from({ length: 60 / SNAP_INTERVAL }).map((_, i) => (
                i > 0 && (
                  <div 
                    key={`guide-${i}`} 
                    className="absolute w-full border-b border-dashed border-gray-200 dark:border-gray-700 pointer-events-none opacity-50"
                    style={{ top: `${(i * SNAP_INTERVAL / 60) * 56}px` }}
                  />
                )
              ))}
              
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
                    services={event.services || []}
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
          
          {/* Drag and drop snap feedback - using the same styling as week view */}
          {dragFeedback && (
            <div
              className="absolute left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-500 z-30 pointer-events-none transition-all duration-75 ease-in-out"
              style={{
                top: `${
                  (dragFeedback.hour * 56) + 
                  ((dragFeedback.minute / 60) * 56)
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

DayView.propTypes = {
  currentDate: PropTypes.instanceOf(Date).isRequired,
  hours: PropTypes.array.isRequired,
  isCurrentDayToday: PropTypes.bool.isRequired,
  onEventClick: PropTypes.func.isRequired,
  onEventUpdate: PropTypes.func
};

export default DayView;
