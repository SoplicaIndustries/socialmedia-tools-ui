/**
 * Class representing a calendar event with standardized properties and methods
 */
class CalendarEvent {
  /**
   * Create a calendar event
   * @param {Object} config - The event configuration
   * @param {string} config.id - Unique identifier for the event
   * @param {string} [config.title] - Event title (optional)
   * @param {string} [config.description=''] - Event description
   * @param {Date|string} config.startTime - Event start date/time
   * @param {Date|string} [config.endTime] - Event end date/time (optional)
   * @param {string} [config.color='#4F46E5'] - Event color
   * @param {boolean} [config.isAllDay=false] - Whether the event is all day
   * @param {Object} [config.metadata={}] - Additional event metadata
   * @param {string[]} [config.services=[]] - Social media services associated with this event
   */
  constructor(config) {
    this.id = config.id || `event-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    // Title is now optional
    this.title = config.title || '';
    this.description = config.description || '';
    this.startTime = config.startTime instanceof Date ? config.startTime : new Date(config.startTime);
    // End time is optional
    this.endTime = config.endTime ? 
      (config.endTime instanceof Date ? config.endTime : new Date(config.endTime)) :
      null;
    this.color = config.color || '#4F46E5'; // Default indigo color
    this.isAllDay = Boolean(config.isAllDay);
    this.metadata = config.metadata || {};
    this.services = Array.isArray(config.services) ? config.services : [];
  }

  /**
   * Check if the event has an end time
   * @returns {boolean} Whether the event has an end time
   */
  hasEndTime() {
    return this.endTime !== null;
  }

  /**
   * Create a CalendarEvent from a plain object
   * @param {Object} eventData - Plain event data object
   * @returns {CalendarEvent} New CalendarEvent instance
   */
  static fromObject(eventData) {
    return new CalendarEvent(eventData);
  }

  /**
   * Convert an array of plain objects to CalendarEvent instances
   * @param {Array} eventsArray - Array of plain event objects
   * @returns {Array<CalendarEvent>} Array of CalendarEvent instances
   */
  static fromArray(eventsArray) {
    return eventsArray.map(event => CalendarEvent.fromObject(event));
  }

  /**
   * Check if the event matches a search query in any of its text fields
   * @param {string} searchText - Text to search for
   * @returns {boolean} True if the event contains the search text
   */
  matchesSearch(searchText) {
    if (!searchText) return true;
    
    const search = searchText.toLowerCase();
    return (
      (this.title && this.title.toLowerCase().includes(search)) ||
      (this.description && this.description.toLowerCase().includes(search)) ||
      (this.metadata && Object.values(this.metadata)
        .some(value => 
          typeof value === 'string' && value.toLowerCase().includes(search)
        )
      )
    );
  }

  /**
   * Get the event date formatted as a string
   * @returns {string} Formatted date
   */
  getFormattedDate() {
    return this.startTime.toLocaleDateString();
  }

  /**
   * Get the event time formatted as a string
   * @returns {string} Formatted time or time range
   */
  getFormattedTimeRange() {
    if (this.isAllDay) return 'All day';
    
    const formatTime = (date) => {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };
    
    // If no end time, just show the start time
    if (!this.hasEndTime()) {
      return formatTime(this.startTime);
    }
    
    // Otherwise show the range
    return `${formatTime(this.startTime)} - ${formatTime(this.endTime)}`;
  }

  /**
   * Get just the start time formatted
   * @returns {string} Formatted start time
   */
  getFormattedStartTime() {
    if (this.isAllDay) return 'All day';
    return this.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  /**
   * Convert the event to a plain object
   * @returns {Object} Plain event object
   */
  toObject() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      startTime: this.startTime,
      endTime: this.endTime,
      color: this.color,
      isAllDay: this.isAllDay,
      metadata: this.metadata,
      services: this.services
    };
  }
}

export default CalendarEvent;
