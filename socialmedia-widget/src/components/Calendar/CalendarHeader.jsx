import React from 'react';
import PropTypes from 'prop-types';

/**
 * Calendar header component with navigation and view toggles
 */
const CalendarHeader = ({
  currentDate,
  view,
  onPrevPeriod,
  onNextPeriod,
  onTodayClick,
  onViewChange,
  formatHeaderDate,
  showDayView = false // New prop to control whether day view is shown
}) => {
  return (
    <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-3 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
      <button 
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        onClick={onPrevPeriod}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-300" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </button>
      
      <div className="flex flex-col sm:flex-row items-center">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2 sm:mb-0 sm:mr-4">
          {formatHeaderDate(currentDate, view)}
        </h2>
        
        <div className="flex flex-wrap justify-center">
          <button 
            className="px-3 py-1.5 text-sm rounded-md font-medium mx-1 mb-1 transition-colors"
            onClick={onTodayClick}
            style={{ 
              backgroundColor: 'rgba(79, 70, 229, 0.1)',
              color: '#4F46E5'
            }}
          >
            Today
          </button>
          
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-md mx-1 mb-1">
            {showDayView && (
              <button 
                className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                  view === 'day' 
                    ? 'bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                    : 'text-gray-600 dark:text-gray-300'
                } rounded-md`}
                onClick={() => onViewChange('day')}
              >
                Day
              </button>
            )}
            <button 
              className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                view === 'week' 
                  ? 'bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                  : 'text-gray-600 dark:text-gray-300'
              } rounded-md`}
              onClick={() => onViewChange('week')}
            >
              Week
            </button>
            <button 
              className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                view === 'month' 
                  ? 'bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                  : 'text-gray-600 dark:text-gray-300'
              } rounded-md`}
              onClick={() => onViewChange('month')}
            >
              Month
            </button>
          </div>
        </div>
      </div>
      
      <button 
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        onClick={onNextPeriod}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-300" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};

CalendarHeader.propTypes = {
  currentDate: PropTypes.instanceOf(Date).isRequired,
  view: PropTypes.oneOf(['week', 'month']).isRequired,
  onPrevPeriod: PropTypes.func.isRequired,
  onNextPeriod: PropTypes.func.isRequired,
  onTodayClick: PropTypes.func.isRequired,
  onViewChange: PropTypes.func.isRequired,
  formatHeaderDate: PropTypes.func.isRequired,
  showDayView: PropTypes.bool
};

export default CalendarHeader;
