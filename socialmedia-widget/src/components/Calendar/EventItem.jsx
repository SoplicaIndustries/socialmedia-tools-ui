import React from 'react';
import PropTypes from 'prop-types';

/**
 * Calendar event item component that displays consistently across different views
 */
const EventItem = ({ 
  title,
  description,
  startTime,
  endTime,
  color,
  isAllDay = false,
  onClick,
  view = 'month' // 'month' or 'week'
}) => {
  // Format the time for display
  const getFormattedTime = () => {
    if (isAllDay) return 'All day';
    
    const formatTime = (time) => {
      const date = new Date(time);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };
    
    return `${formatTime(startTime)} - ${formatTime(endTime)}`;
  };
  
  // Make all events use the same style, regardless of view type
  const viewStyles = 'py-1 px-2 mb-2 w-full';
  
  return (
    <div 
      className={`rounded shadow-sm cursor-pointer transition-all hover:shadow-md hover:brightness-110 ${viewStyles}`}
      style={{
        backgroundColor: `${color}bb`, // Same semi-transparency for all views
        color: 'white',
        borderLeft: `4px solid ${color}`,
      }}
      onClick={onClick}
    >
      {/* Show time prefix for all views */}
      {!isAllDay && (
        <div className="font-semibold text-xs opacity-90">
          {getFormattedTime()}
        </div>
      )}
      
      {/* Title displayed in all views */}
      <div className={`font-medium ${view === 'month' ? 'text-xs' : 'text-sm'} overflow-hidden text-ellipsis`}>
        {title}
      </div>
      
      {/* Description always visible */}
      {description && (
        <div className="text-xs opacity-90 overflow-hidden text-ellipsis">
          {description}
        </div>
      )}
    </div>
  );
};

EventItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  startTime: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  endTime: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  color: PropTypes.string.isRequired,
  isAllDay: PropTypes.bool,
  onClick: PropTypes.func,
  view: PropTypes.oneOf(['month', 'week'])
};

export default EventItem;
