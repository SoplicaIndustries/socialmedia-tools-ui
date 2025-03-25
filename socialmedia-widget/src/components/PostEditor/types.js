/**
 * @typedef {Object} CustomMediaInput
 * @property {string} label - Display label for the media input button
 * @property {React.ReactNode} icon - Icon to display in the button
 * @property {string} [tooltip] - Optional tooltip text
 * @property {Function} onClick - Function to handle click event, receives handleCustomMediaInput function
 * @property {Object} [data] - Optional additional data to pass to the handler
 */

/**
 * @typedef {Object} MediaItem
 * @property {string} url - URL or data URL of the media
 * @property {'image'|'video'} type - Type of media (image or video)
 * @property {Object} [file] - Original file object if available
 * @property {string} [thumbnail] - URL to a thumbnail for videos
 */

export {};
