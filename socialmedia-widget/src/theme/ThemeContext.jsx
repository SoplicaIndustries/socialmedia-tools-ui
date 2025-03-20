import { createContext, useContext, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { defaultTheme } from './defaultTheme';
import { deepMerge, createThemeCssVariables, applyCssVariables } from './utils';

// Create context
const ThemeContext = createContext();

/**
 * Theme provider component
 */
export function ThemeProvider({ theme, children }) {
  const mergedTheme = useMemo(() => {
    if (!theme) return defaultTheme;
    return deepMerge(defaultTheme, theme);
  }, [theme]);

  // Apply theme as CSS variables
  useEffect(() => {
    const cssVariables = createThemeCssVariables(mergedTheme);
    applyCssVariables(document.documentElement, cssVariables);
    
    // Apply dark mode if theme has dark background
    const isDarkMode = 
      mergedTheme.colors?.background?.toString().toLowerCase() === '#121212' || 
      mergedTheme.colors?.background?.toString().toLowerCase() === '#1e1e1e';
    
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    return () => {
      // Clean up theme variables if needed
    };
  }, [mergedTheme]);

  return (
    <ThemeContext.Provider value={{ theme: mergedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  theme: PropTypes.object,
  children: PropTypes.node.isRequired,
};

/**
 * Hook to access the current theme
 * @returns {import('./ThemeConfig').ThemeConfig} Current theme
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context.theme;
}
