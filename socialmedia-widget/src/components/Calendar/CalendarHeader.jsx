import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { availablePlatforms } from '../SocialIcons';
import SocialIcon from '../SocialIcons';

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
  onSearch = () => {},
  searchQuery = '',
  onPlatformFilterChange = () => {},
  selectedPlatforms = []
}) => {
  const [searchText, setSearchText] = useState(searchQuery);
  const [showPlatformDropdown, setShowPlatformDropdown] = useState(false);
  const dropdownRef = useRef(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowPlatformDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get all available platforms
  const platforms = availablePlatforms();
  
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

  // Toggle platform selection
  const handlePlatformToggle = (platform) => {
    onPlatformFilterChange(platform);
  };

  // Clear all selected platforms
  const handleClearPlatforms = () => {
    onPlatformFilterChange(null, true);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-3 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
      <div className="flex justify-between items-center mb-2">
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
        
        {/* Right side: Platform filter and Search bar */}
        <div className="flex items-center">
          {/* Platform filter dropdown */}
          <div className="relative mr-3" ref={dropdownRef}>
            <button 
              className="flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              onClick={() => setShowPlatformDropdown(!showPlatformDropdown)}
            >
              <span className="mr-1">Platforms</span>
              {selectedPlatforms.length > 0 && (
                <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs font-medium ml-1 px-2 py-0.5 rounded-full">
                  {selectedPlatforms.length}
                </span>
              )}
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
            {showPlatformDropdown && (
              <div className="absolute right-0 mt-1 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg z-20 border border-gray-200 dark:border-gray-700">
                <div className="p-2">
                  <div className="text-xs text-gray-500 dark:text-gray-400 pb-2 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <span>Filter by platform</span>
                    {selectedPlatforms.length > 0 && (
                      <button 
                        className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                        onClick={handleClearPlatforms}
                      >
                        Clear all
                      </button>
                    )}
                  </div>
                  <div className="max-h-60 overflow-y-auto py-1">
                    {platforms.map(platform => (
                      <label key={platform} className="flex items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedPlatforms.includes(platform)}
                          onChange={() => handlePlatformToggle(platform)}
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <div className="flex items-center ml-2">
                          <div className="w-5 h-5 mr-2 bg-gray-200 dark:bg-gray-600 rounded-full p-1">
                            <SocialIcon platform={platform} size="100%" />
                          </div>
                          <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                            {platform}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Search bar - Fixed the button/SVG nesting */}
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
      
      {/* Platform filter badges - Fixed the JSX nesting */}
      {selectedPlatforms.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedPlatforms.map(platform => (
            <span 
              key={platform}
              className="inline-flex items-center py-1 px-2 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200"
            >
              <div className="w-3 h-3 mr-1">
                <SocialIcon platform={platform} size="100%" />
              </div>
              <span className="capitalize">{platform}</span>
              <button 
                type="button"
                className="ml-1 inline-flex rounded-full focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-indigo-500"
                onClick={() => handlePlatformToggle(platform)}
              >
                <span className="sr-only">Remove</span>
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </span>
          ))}
        </div>
      )}
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
  searchQuery: PropTypes.string,
  onPlatformFilterChange: PropTypes.func,
  selectedPlatforms: PropTypes.arrayOf(PropTypes.string)
};

export default CalendarHeader;
