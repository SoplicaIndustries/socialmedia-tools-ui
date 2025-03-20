import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Calendar header component with navigation, view toggles and search
 */
const CalendarHeader = ({
  currentDate,
  view,
  onPrevPeriod,
  onNextPeriod,
  onTodayClick,
  onViewChange,
  formatHeaderDate,
  showDayView = false,
  onSearch = () => {}, // Add search callback
  searchQuery = '' // Add search query prop
}) => {
  const [searchText, setSearchText] = useState(searchQuery);
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };
  
  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchText);
  };
  
  // Clear search
  const handleClearSearch = () => {
    setSearchText('');
    onSearch('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-3 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
      {/* Single row layout with all elements */}
      <div className="flex justify-between items-center">
        {/* Left side: navigation and date */}
        <div className="flex items-center">
          <button 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            onClick={onPrevPeriod}
            aria-label="Previous period"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-300" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mx-2">
            {formatHeaderDate(currentDate, view)}
          </h2>
          
          <button 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            onClick={onNextPeriod}
            aria-label="Next period"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-300" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        {/* Middle: Today button and view toggles */}
        <div className="flex items-center ml-4">
          <button 
            className="px-3 py-1.5 text-sm rounded-md font-medium mr-3 transition-colors"
            onClick={onTodayClick}
            style={{ 
              backgroundColor: 'rgba(79, 70, 229, 0.1)',
              color: '#4F46E5'
            }}
          >
            Today
          </button>
          
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-md">
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
        
        {/* Flex spacer */}
        <div className="flex-1"></div>
        
        {/* Right side: Search bar */}
        <div className="ml-4">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <input
              type="text"
              value={searchText}
              onChange={handleSearchChange}
              placeholder="Search events..."
              className="w-60 pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
            {searchText && (
              <button
                type="button"
                className="absolute inset-y-0 right-12 flex items-center pr-3"
                onClick={handleClearSearch}
              >
                <svg className="w-4 h-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            <button 
              type="submit" 
              className="absolute right-0 top-0 h-full px-4 text-indigo-600 dark:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-r-md"
            >
              <span className="sr-only">Search</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
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
  showDayView: PropTypes.bool,
  onSearch: PropTypes.func,
  searchQuery: PropTypes.string
};

export default CalendarHeader;
