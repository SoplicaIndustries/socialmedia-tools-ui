import { useState } from 'react';
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

  const handleThemeChange = (event) => {
    setCurrentTheme(event.target.value);
  };

  return (
    <>
      <div className="theme-selector" style={{ marginBottom: '1rem' }}>
        <label htmlFor="theme-select">Choose a theme: </label>
        <select 
          id="theme-select"
          value={currentTheme} 
          onChange={handleThemeChange}
          style={{ padding: '0.5rem', marginLeft: '0.5rem' }}
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
    </>
  );
}

export default ThemeDemo;
