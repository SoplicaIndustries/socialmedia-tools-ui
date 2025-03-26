import React, { useState } from 'react';
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
  onEventClick,
  onEventUpdate
}) => {
  // Add state for drag feedback
  const [highlightedDay, setHighlightedDay] = useState(null);
  
  // Function to handle drag over
  const handleDragOver = (e, day) => {
    e.preventDefault(); // Allow drop
    e.dataTransfer.dropEffect = "move";
    
    if (onEventUpdate) {
      setHighlightedDay(day.date.getTime());
    }
  };
  
  // Function to handle drag leave
  const handleDragLeave = () => {
    setHighlightedDay(null);
  };

  // Function to handle drop on a day
  const handleDrop = (e, day) => {
    e.preventDefault();
    setHighlightedDay(null);
    
    const eventId = e.dataTransfer.getData('text/plain');
    
    // Create new date at the same time as the original event, but on the drop day
    const originalTimeData = e.dataTransfer.getData('application/json');
    if (originalTimeData && eventId && onEventUpdate) {
      const { hour, minute, hasEndTime, endHour, endMinute, duration } = JSON.parse(originalTimeData);
      
      // Create new start time based on drop target day
      const newStartTime = new Date(day.date);
      newStartTime.setHours(hour, minute, 0, 0);
      
      // Handle end time if applicable
      let newEndTime = null;
      if (hasEndTime) {
        if (endHour !== undefined && endMinute !== undefined) {
          newEndTime = new Date(day.date);
          newEndTime.setHours(endHour, endMinute, 0, 0);
        } else if (duration) {
          newEndTime = new Date(newStartTime.getTime() + duration);
        }
      }
      
      onEventUpdate(eventId, newStartTime, newEndTime);
    }
  };

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
            draggable={!!onEventUpdate} // Make draggable only if update handler exists
            onDragStart={(e) => {
              e.dataTransfer.setData('text/plain', event.id);
              // Store original time information for precise time updates
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
      
      <div className="grid grid-cols-7 grid-auto-rows bg-white dark:bg-gray-800 gap-[1px]">
        {daysInMonth.map((day, index) => {
          // Check if this day is being highlighted as drop target
          const isHighlighted = highlightedDay === day.date.getTime();
          
          return (
            <div 
              key={index} 
              className={`
                border border-gray-200 dark:border-gray-700
                ${day.isCurrentMonth ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900'} 
                ${day.isToday && highlightToday ? 'bg-blue-50 dark:bg-blue-900/20' : ''}
                ${selectedDate && day.date.toDateString() === selectedDate.toDateString() 
                  ? 'ring-2 ring-indigo-400 dark:ring-indigo-600 z-10' : ''}
                ${day.isCurrentMonth ? 'hover:bg-gray-50 dark:hover:bg-gray-700' : ''}
                ${isHighlighted ? 'ring-1 ring-blue-400 dark:ring-blue-500' : ''}
                relative p-1 min-h-[100px] flex flex-col
                ${day.events && day.events.length > 2 ? 'h-auto' : ''}
                ${onEventUpdate ? 'cursor-pointer' : ''}
                transition-all duration-200 ease-in-out
                ${isHighlighted ? 'z-20' : ''}
              `}
              onClick={() => onDayClick(day)}
              onDragOver={(e) => onEventUpdate ? handleDragOver(e, day) : null}
              onDragLeave={onEventUpdate ? handleDragLeave : null}
              onDrop={(e) => onEventUpdate ? handleDrop(e, day) : null}
              style={{
                boxShadow: isHighlighted ? '0 0 12px 2px rgba(59,130,246,0.5)' : 'none'
              }}
            >
              {/* Day number - now with subtle highlight */}
              <div className="flex justify-center mb-2 pt-1">
                <span className={`
                  inline-flex items-center justify-center
                  ${day.isToday ? 'bg-blue-500 text-white rounded-full w-7 h-7' : 'text-center'}
                  ${isHighlighted && !day.isToday ? 'text-blue-600 dark:text-blue-400 font-medium' : ''}
                  ${day.isCurrentMonth 
                    ? day.isToday 
                      ? 'text-white font-bold' 
                      : 'text-gray-900 dark:text-gray-100' 
                    : 'text-gray-400 dark:text-gray-500'}
                  transition-colors duration-150
                `}>
                  {day.dayNumber}
                </span>
              </div>
              
              {/* Subtle glow effect when day is a drop target */}
              {isHighlighted && (
                <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900 opacity-10 pointer-events-none rounded-sm z-0"></div>
              )}
              
              {/* Events container */}
              {day.events && day.events.length > 0 && (
                <div className="flex flex-col mt-1 relative z-10">
                  {renderEvents(day)}
                </div>
              )}
            </div>
          );
        })}
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
  onEventClick: PropTypes.func,
  onEventUpdate: PropTypes.func
};

export default MonthView;
