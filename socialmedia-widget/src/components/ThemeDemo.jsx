import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '../theme/ThemeContext';
import { defaultTheme } from '../theme/defaultTheme';
import App from '../App';

// Use named export
export function ThemeDemo() {
  const [currentTheme, setCurrentTheme] = useState('default');

  // Define some theme options
  const themes = {
    default: defaultTheme,
    dark: {
      colors: {
        primary: '#bb86fc',
        secondary: '#03dac6',
        background: '#121212',
        surface: '#1e1e1e',
        text: {
          primary: 'rgba(255, 255, 255, 0.87)',
          secondary: 'rgba(255, 255, 255, 0.6)',
        }
      }
    },
    light: {
      colors: {
        primary: '#6200ee',
        secondary: '#03dac6',
        background: '#ffffff',
        surface: '#f5f5f5',
        text: {
          primary: 'rgba(0, 0, 0, 0.87)',
          secondary: 'rgba(0, 0, 0, 0.6)',
        }
      }
    },
    colorful: {
      colors: {
        primary: '#ff5722',
        secondary: '#2196f3',
        success: '#4caf50',
        error: '#f44336',
        warning: '#ff9800',
        info: '#00bcd4',
      },
      typography: {
        fontFamily: '"Comic Sans MS", cursive, sans-serif',
      }
    }
  };
  
  // Apply a class to the html element based on the theme for dark mode
  useEffect(() => {
    const isDarkTheme = currentTheme === 'dark';
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [currentTheme]);

  return (
    <div className="w-full">
      <div className="flex justify-center items-center mb-6 p-4 bg-surface rounded-lg shadow">
        <label htmlFor="theme-select" className="mr-3 text-primary">
          Choose a theme:
        </label>
        <select 
          id="theme-select"
          value={currentTheme} 
          onChange={(e) => setCurrentTheme(e.target.value)}
          className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 
                   bg-white dark:bg-gray-700 text-primary focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="default">Default</option>
          <option value="dark">Dark</option>
          <option value="light">Light</option>
          <option value="colorful">Colorful</option>
        </select>
      </div>
      <ThemeProvider theme={themes[currentTheme]}>
        <App />
      </ThemeProvider>
    </div>
  );
}

export default ThemeDemo;
