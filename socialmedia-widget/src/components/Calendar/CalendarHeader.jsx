import React from 'react';
import PropTypes from 'prop-types';
import './styles/CalendarHeader.css';

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
  formatHeaderDate
}) => {
  return (
    <div className="calendar-header">
      <button className="calendar-nav-btn" onClick={onPrevPeriod}>
        &lt;
      </button>
      <div className="calendar-title">
        <h2>{formatHeaderDate(currentDate, view)}</h2>
        <div className="calendar-actions">
          <button className="calendar-today-btn" onClick={onTodayClick}>
            Today
          </button>
          <div className="view-toggles">
            <button 
              className={`view-toggle-btn ${view === 'day' ? 'active' : ''}`}
              onClick={() => onViewChange('day')}
            >
              Day
            </button>
            <button 
              className={`view-toggle-btn ${view === 'week' ? 'active' : ''}`}
              onClick={() => onViewChange('week')}
            >
              Week
            </button>
            <button 
              className={`view-toggle-btn ${view === 'month' ? 'active' : ''}`}
              onClick={() => onViewChange('month')}
            >
              Month
            </button>
          </div>
        </div>
      </div>
      <button className="calendar-nav-btn" onClick={onNextPeriod}>
        &gt;
      </button>
    </div>
  );
};

CalendarHeader.propTypes = {
  currentDate: PropTypes.instanceOf(Date).isRequired,
  view: PropTypes.oneOf(['day', 'week', 'month']).isRequired,
  onPrevPeriod: PropTypes.func.isRequired,
  onNextPeriod: PropTypes.func.isRequired,
  onTodayClick: PropTypes.func.isRequired,
  onViewChange: PropTypes.func.isRequired,
  formatHeaderDate: PropTypes.func.isRequired
};

export default CalendarHeader;
