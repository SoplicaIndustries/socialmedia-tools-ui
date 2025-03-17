import { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './AccountsContainer.css';
import { useTheme } from '../../theme/ThemeContext';

/**
 * AccountsContainer component displays a scrollable/expandable container for AccountCard components
 */
const AccountsContainer = ({ 
  children, 
  title,
  maxRows = 1,
  expandBreakpoint = '768px',
  itemsPerRow = 5
}) => {
  const containerRef = useRef(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const theme = useTheme();
  
  // Check if container is scrollable
  useEffect(() => {
    const checkScrollable = () => {
      if (containerRef.current) {
        const { scrollWidth, clientWidth } = containerRef.current;
        setIsScrollable(scrollWidth > clientWidth);
      }
    };
    
    checkScrollable();
    window.addEventListener('resize', checkScrollable);
    
    return () => {
      window.removeEventListener('resize', checkScrollable);
    };
  }, [children]);

  // Generate CSS variables for the component
  const containerStyle = {
    '--max-rows': maxRows,
    '--expand-breakpoint': expandBreakpoint,
    '--items-per-row': itemsPerRow,
    '--container-bg': theme.colors.surface,
    '--border-radius': theme.borderRadius.lg,
    '--shadow': theme.shadows.sm,
    '--padding': theme.spacing.md
  };

  return (
    <div className="accounts-container-wrapper" style={containerStyle}>
      {title && <h3 className="accounts-container__title">{title}</h3>}
      
      <div className="accounts-container" ref={containerRef}>
        {children}
      </div>
      
      {isScrollable && (
        <div className="accounts-container__scroll-indicator">
          <span>Scroll for more</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      )}
    </div>
  );
};

AccountsContainer.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  maxRows: PropTypes.number,
  expandBreakpoint: PropTypes.string,
  itemsPerRow: PropTypes.number
};

export default AccountsContainer;
