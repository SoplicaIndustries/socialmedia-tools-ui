import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../../theme/ThemeContext';
import SocialIcon, { availablePlatforms } from '../SocialIcons';

/**
 * AccountCard component displays a circular avatar with a social media icon
 */
const AccountCard = React.memo(({ 
  avatar, 
  name, 
  platform, 
  tooltipText,
  onClick,
  size = 'md',
  isSelected,
  onCardClick,
  id
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const theme = useTheme();
  const [selected, setSelected] = useState(isSelected || false);
  
  // Update selected state when isSelected prop changes
  useEffect(() => {
    setSelected(isSelected || false);
  }, [isSelected]);
  
  // Default avatar if none provided
  const avatarSrc = avatar || 'https://via.placeholder.com/100';

  // Define default behavior for the card click
  const defaultClickHandler = () => {
    alert(`Clicked on ${name || 'AccountCard'}`);
  };

  // Handle click with priority: onCardClick > onClick > defaultClickHandler
  const handleClick = (e) => {
    // If we're in a selectable container, onCardClick will handle the selection
    if (onCardClick) {
      onCardClick(e);
      return; // Don't execute other handlers when in selection mode
    }
    
    // Use the provided onClick handler or fall back to default
    if (onClick) {
      onClick(e);
    } else {
      defaultClickHandler(e);
    }
  };

  // Get size-based classes - INCREASED ICON SIZES
  const getSizeClasses = () => {
    switch(size) {
      case 'sm':
        return {
          container: 'w-12 h-12', // 48px
          icon: 'w-6 h-6 p-[2px]' // Increased from w-5 to w-6, reduced padding
        };
      case 'lg':
        return {
          container: 'w-20 h-20', // 80px
          icon: 'w-9 h-9 p-[4px]' // Increased from w-7 to w-9, reduced padding
        };
      default: // md
        return {
          container: 'w-16 h-16', // 64px
          icon: 'w-6 h-6 p-[4px]' // Increased from w-5 to w-7, reduced padding
        };
    }
  };
  
  const sizeClasses = getSizeClasses();
  const platformColor = getPlatformColor(platform, theme);

  return (
    <div 
      className={`relative inline-flex flex-col items-center justify-center cursor-pointer m-2 transition-transform duration-300 origin-bottom
        ${selected ? '' : 'hover:-translate-y-1'}`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={handleClick}
    >
      {/* Avatar Container with updated selection styling - added border-2/border-3 for proper thickness */}
      <div 
        className={`relative ${sizeClasses.container} rounded-full overflow-visible ${
          selected 
            ? 'border-3 shadow-lg ring-2 ring-offset-2' 
            : 'border-0'
        }`}
        style={{
          borderColor: selected ? theme.colors.primary : 'transparent',
          ringColor: selected ? theme.colors.primary : 'transparent',
        }}
      >
        {/* Avatar Image */}
        <img 
          src={avatarSrc} 
          alt={name || 'User avatar'} 
          className="w-full h-full object-cover rounded-full shadow-md"
        />
        
        {/* Platform Icon - Now bigger */}
        <div 
          className={`absolute bottom-0 right-0 ${sizeClasses.icon} rounded-full flex items-center justify-center 
            translate-x-[20%] translate-y-[20%] shadow-md`}
          style={{ backgroundColor: platformColor }}
        >
          <SocialIcon platform={platform || 'default'} color="#FFFFFF" />
        </div>
      </div>
      
      {/* Removed animated glow effect */}
      
      {/* Tooltip */}
      {showTooltip && tooltipText && (
        <div className="absolute bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2 bg-white text-gray-800 
          px-3 py-1 rounded whitespace-nowrap text-sm z-10 shadow-sm pointer-events-none">
          {tooltipText}
          {/* Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white"></div>
        </div>
      )}
    </div>
  );
});

/**
 * Get brand color for social platform
 */
function getPlatformColor(platform = '', theme) {
  const platformColors = {
    facebook: '#1877F2',
    instagram: '#E4405F',
    tiktok: '#000000',
    linkedin: '#0A66C2',
    youtube: '#FF0000',
    twitter: '#1DA1F2',
    x: '#1DA1F2'
  };

  return platformColors[platform.toLowerCase()] || theme.colors.primary;
}

AccountCard.propTypes = {
  avatar: PropTypes.string,
  name: PropTypes.string,
  platform: PropTypes.oneOf([...availablePlatforms(), 'default']),
  tooltipText: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  isSelected: PropTypes.bool,
  onCardClick: PropTypes.func,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default AccountCard;
