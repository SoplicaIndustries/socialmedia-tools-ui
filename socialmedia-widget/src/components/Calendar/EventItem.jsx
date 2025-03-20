import React from 'react';
import PropTypes from 'prop-types';
import SocialIcon from '../SocialIcons';

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
  view = 'month',
  services = []
}) => {
  // Format the time for display
  const getFormattedTime = () => {
    if (isAllDay) return 'All day';
    
    const formatTime = (time) => {
      const date = new Date(time);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };
    
    // If no end time, just show start time
    if (!endTime) {
      return formatTime(startTime);
    }
    
    return `${formatTime(startTime)} - ${formatTime(endTime)}`;
  };
  
  // Make all events use the same style, regardless of view type
  const viewStyles = 'py-1 px-2 mb-2 w-full';
  
  return (
    <div 
      className={`rounded shadow-sm cursor-pointer transition-all hover:shadow-md hover:brightness-110 ${viewStyles} flex flex-col p-3`}
      style={{
        backgroundColor: `${color}bb`, // Semi-transparency
        color: 'white',
        borderLeft: `4px solid ${color}`,
      }}
      onClick={onClick}
    >
      {/* SECTION 1: Description text - now with more vertical space */}
      <div className="flex-1 text-left mb-2">
        {/* Title (if provided) with text truncation - bolder */}
        {title && (
          <div className={`font-bold ${view === 'month' ? 'text-xs' : 'text-sm'} truncate text-left mb-2`}>
            {title}
          </div>
        )}
        
        {/* Description with text truncation - more vertical space */}
        {description && (
          <div className={`font-bold ${view === 'month' ? 'text-xs' : 'text-sm'} 
            opacity-100 line-clamp-3 overflow-hidden text-ellipsis text-left leading-relaxed`}>
            {description}
          </div>
        )}
      </div>
      
      {/* SECTION 2: Social media icons with reduced vertical spacing */}
      {services && services.length > 0 && (
        <div className="flex items-center space-x-2 justify-start mb-1">
          {services.map((service, index) => (
            <div key={index} className="w-5 h-5 bg-white/40 rounded-full p-1">
              <SocialIcon platform={service} size="100%" />
            </div>
          ))}
        </div>
      )}
      
      {/* SECTION 3: Time with reduced spacing from icons */}
      <div className="flex items-center text-xs opacity-90 text-left mt-1 border-t border-white/10 pt-1">
        <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span className="font-medium">{getFormattedTime()}</span>
      </div>
    </div>
  );
};

// Update PropTypes to make title optional
EventItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  startTime: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  endTime: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  color: PropTypes.string.isRequired,
  isAllDay: PropTypes.bool,
  onClick: PropTypes.func,
  view: PropTypes.oneOf(['month', 'week']),
  services: PropTypes.arrayOf(PropTypes.string)
};

export default EventItem;
