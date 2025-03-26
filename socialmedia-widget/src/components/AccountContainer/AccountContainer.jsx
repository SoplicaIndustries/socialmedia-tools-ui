import React, { useRef, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../../theme/ThemeContext';
import AddAccountButton from './AddAccountButton';

/**
 * AccountContainer component displays a scrollable/expandable container for AccountCard components
 */
const AccountContainer = ({ 
  children, 
  title,
  hideTitle = false, // New prop to hide the title
  transparent = false, // New prop to remove background and padding
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
          <div key={child.key} className="relative">
            {editable && isEditing && (
              <button
                className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center bg-red-600 text-white rounded-full text-lg shadow-md hover:bg-red-700 hover:scale-110 transition-all z-10"
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
          size={size}
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
    showAddButton,
    isAddMenuOpen,
    size
  ]);

  // Define container classes based on scrollable prop
  const containerClass = scrollable 
    ? "flex flex-nowrap overflow-x-auto pb-2 scrollbar-thin" 
    : "flex flex-wrap gap-4 overflow-visible";
  
  return (
    <div className={`w-full relative ${transparent ? '' : 'bg-surface rounded-lg p-4 shadow-sm'} ${isAddMenuOpen ? 'z-50' : ''}`}
      style={transparent ? {} : { backgroundColor: theme.colors.surface }}>
      {/* Only show header if there's title content or editable */}
      {((!hideTitle && title) || editable) && (
        <div className="flex justify-start items-center mb-4 gap-4">
          {/* Edit Button */}
          {editable && (
            <div 
              className={`flex items-center cursor-pointer px-3 py-1.5 rounded ${isEditing ? 'hover:bg-red-100' : 'hover:bg-blue-100'}`}
              onClick={() => setIsEditing(!isEditing)}
            >
              <span className={`mr-2 ${isEditing ? 'text-red-600' : 'text-blue-600'}`}>
                {isEditing ? '✓' : '✎'}
              </span>
              <span className={`text-sm font-medium ${isEditing ? 'text-red-600' : 'text-blue-600'}`}>
                {isEditing ? 'Done' : 'Edit'}
              </span>
            </div>
          )}
          
          {/* Only show title if hideTitle is false and title exists */}
          {!hideTitle && title && (
            <h3 className="text-xl font-normal m-0">{title}</h3>
          )}
        </div>
      )}
      
      {/* Edit Instructions */}
      {isEditing && (
        <p className="text-gray-600 text-sm italic text-center mb-4">Click the X button to remove accounts</p>
      )}
      
      {/* Account Container */}
      <div className={containerClass} ref={containerRef}>
        {renderedChildren}
      </div>
      
      {/* Scroll Indicator */}
      {scrollable && isScrollable && (
        <div className="absolute right-4 bottom-4 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md animate-pulse">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      )}
    </div>
  );
};

AccountContainer.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  hideTitle: PropTypes.bool,
  transparent: PropTypes.bool,
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
  size: PropTypes.oneOf(['sm', 'md', 'lg'])
};

export default AccountContainer;
