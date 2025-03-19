import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './AccountCard.css';
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

  return (
    <div 
      className={`account-card account-card--${size} ${selected ? 'account-card--selected' : ''}`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={handleClick}
      style={{
        '--shadow': theme.shadows.md,
        '--border-radius': theme.borderRadius.full,
        '--transition': theme.transitions.normal,
        '--primary-color': theme.colors.primary
      }}
    >
      <div className="account-card__avatar-container">
        <img 
          src={avatarSrc} 
          alt={name || 'User avatar'} 
          className="account-card__avatar"
        />
        <div 
          className="account-card__icon"
          style={{
            backgroundColor: getPlatformColor(platform, theme)
          }}
        >
          <SocialIcon platform={platform || 'default'} color="#FFFFFF" />
        </div>
      </div>
      
      {showTooltip && tooltipText && (
        <div 
          className="account-card__tooltip"
          style={{
            '--tooltip-bg': theme.colors.surface,
            '--tooltip-color': theme.colors.text.primary,
            '--tooltip-shadow': theme.shadows.sm
          }}
        >
          {tooltipText}
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
    youtube: '#FF0000'
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
