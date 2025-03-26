// Barrel file that re-exports all components with paths adjusted (without file extensions)
export { availablePlatforms } from './SocialIcons'; // New export for availablePlatforms
export { default as AccountCard } from './AccountCard/AccountCard';
export { default as AccountContainer } from './AccountContainer/AccountContainer';
export { default as Calendar } from './Calendar/Calendar'; 
export { default as PostEditor } from './PostEditor/PostEditor';
// Add any other components here

// If your components are in subdirectories, use paths like:
// export { default as AccountCard } from './AccountCard/AccountCard';
