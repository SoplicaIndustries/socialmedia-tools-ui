import React, { useRef, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import './AccountsContainer.css';
import { useTheme } from '../../theme/ThemeContext';
import AddAccountButton from './AddAccountButton';

/**
 * AccountsContainer component displays a scrollable/expandable container for AccountCard components
 */
const AccountsContainer = ({ 
  children, 
  title,
  maxRows = 1,
  expandBreakpoint = '768px',
  itemsPerRow = 5,
  selectable = false,
  onSelectionChange = null,
  editable = false,
  onAccountAdd = null,
  onAccountRemove = null,
  showAddButton = false,
  scrollable = false, // When true, horizontal scroll; when false, wrap to next line
  size = 'md' // Add size prop with default value 'md'
}) => {
  const containerRef = useRef(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const theme = useTheme();
  const [selectedChildren, setSelectedChildren] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  
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

  // Memoize the handleCardClick function to avoid recreating it on each render
  const handleCardClick = useCallback((child) => {
    if (selectable) {
      setSelectedChildren((prevSelected) => {
        const key = child.key;
        const isAlreadySelected = prevSelected.includes(key);
        
        const newSelected = isAlreadySelected
          ? prevSelected.filter((k) => k !== key)
          : [...prevSelected, key];
        
        // Call onSelectionChange callback after state update, only in click handler
        setTimeout(() => {
          if (onSelectionChange) {
            const selectedItems = React.Children.toArray(children)
              .filter(item => React.isValidElement(item) && newSelected.includes(item.key))
              .map(item => ({
                id: item.props.id || item.key,
                props: React.isValidElement(item) ? { ...item.props } : {}
              }));
            
            onSelectionChange(selectedItems);
          }
        }, 0);
        
        return newSelected;
      });
    }
  }, [selectable, children, onSelectionChange]);

  const handleRemoveAccount = (accountId, event) => {
    event.stopPropagation(); // Prevent card selection
    if (onAccountRemove) {
      onAccountRemove(accountId);
    } else {
      alert(`Remove account with ID: ${accountId}`);
    }
  };

  const handleAddAccount = (platform = null) => {
    if (platform) {
      // If a specific platform is selected
      if (onAccountAdd) {
        onAccountAdd(platform);
      } else {
        alert(`Add new ${platform} account`);
      }
      // Close the menu after selection
      setIsAddMenuOpen(false);
    }
  };

  // Cache the cloned children to prevent unnecessary re-renders
  const renderedChildren = React.useMemo(() => {
    const childrenArray = React.Children.toArray(children);
    
    const clonedChildren = childrenArray.map((child) => {
      if (React.isValidElement(child)) {
        const clonedChild = React.cloneElement(child, {
          isSelected: selectedChildren.includes(child.key),
          onCardClick: selectable ? () => handleCardClick(child) : undefined,
        });

        return (
          <div key={child.key} className="account-card-wrapper">
            {editable && isEditing && (
              <button
                className="remove-account-button"
                onClick={(event) => handleRemoveAccount(child.props.id || child.key, event)}
              >
                ×
              </button>
            )}
            {clonedChild}
          </div>
        );
      }
      return child;
    });

    // Add "Add Account" button if showAddButton is true
    if (showAddButton) {
      clonedChildren.push(
        <AddAccountButton 
          key="add-account"
          isMenuOpen={isAddMenuOpen}
          onToggleMenu={() => setIsAddMenuOpen(!isAddMenuOpen)}
          onSelectPlatform={handleAddAccount}
          size={size} // Pass the component's size prop to AddAccountButton
        />
      );
    }

    return clonedChildren;
  }, [
    children, 
    selectable, 
    selectedChildren, 
    handleCardClick, 
    isEditing, 
    editable, 
    onAccountRemove, 
    onAccountAdd,
    theme, 
    showAddButton,
    isAddMenuOpen,
    size // Add size to dependency array
  ]);

  // Generate CSS variables for the component
  const containerStyle = {
    '--max-rows': maxRows,
    '--expand-breakpoint': expandBreakpoint,
    '--items-per-row': itemsPerRow,
    '--container-bg': theme.colors.surface,
    '--border-radius': theme.borderRadius.lg,
    '--shadow': theme.shadows.sm,
    '--padding': theme.spacing.md,
    '--primary-color': theme.colors.primary
  };

  // Container class based on scrollable prop
  const containerClass = `accounts-container ${
    scrollable ? 'accounts-container--scrollable' : 'accounts-container--wrap'
  }`;

  return (
    <div className={`accounts-container-wrapper ${isAddMenuOpen ? 'menu-open' : ''}`} style={containerStyle}>
      <div className="accounts-container-header">
        {editable && (
          <div 
            className={`edit-button-container ${isEditing ? 'editing-active' : ''}`}
            onClick={() => setIsEditing(!isEditing)}
          >
            <span className="edit-icon">
              {isEditing ? '✓' : '✎'} {/* Unicode edit icon */}
            </span>
            <span className="edit-text">{isEditing ? 'Done' : 'Edit'}</span>
          </div>
        )}
        {title && <h3 className="accounts-container__title">{title}</h3>}
      </div>
      
      {isEditing && (
        <p className="edit-instructions">Click the X button to remove accounts</p>
      )}
      
      <div className={containerClass} ref={containerRef}>
        {renderedChildren}
      </div>
      
      {/* Background overlay when add menu is open */}
      
      {scrollable && isScrollable && (
        <div className="accounts-container__scroll-indicator">
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
  itemsPerRow: PropTypes.number,
  selectable: PropTypes.bool,
  onSelectionChange: PropTypes.func,
  editable: PropTypes.bool,
  onAccountAdd: PropTypes.func,
  onAccountRemove: PropTypes.func,
  showAddButton: PropTypes.bool,
  scrollable: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']) // Add size to PropTypes
};

export default AccountsContainer;
