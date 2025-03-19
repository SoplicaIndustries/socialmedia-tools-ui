import React from 'react';
import PropTypes from 'prop-types';
import './AddAccountButton.css';
import { useTheme } from '../../theme/ThemeContext';
import SocialIcon, { availablePlatforms } from '../SocialIcons';

/**
 * AddAccountButton component with circular platform selection menu
 * Using distribute-on-circle pattern for even spacing
 */
const AddAccountButton = ({ 
  isMenuOpen, 
  onToggleMenu, 
  onSelectPlatform,
  platforms = ["facebook", "instagram", "twitter", "youtube", "tiktok", "linkedin"],
  size = 'md'
}) => {
  const theme = useTheme();
  
  // Platform colors for consistent styling
  const platformColors = {
    facebook: '#1877F2',
    instagram: '#E4405F',
    tiktok: '#000000',
    linkedin: '#0A66C2',
    youtube: '#FF0000',
    twitter: '#1DA1F2',
    x: '#1DA1F2'
  };
  
  // Calculate sizes based on button size
  let buttonSize, translateDistance, itemSize, circleSize, overlaySize;
  
  switch(size) {
    case 'sm':
      buttonSize = 44;
      translateDistance = 85;
      itemSize = 50;
      circleSize = 170;
      overlaySize = 280;
      break;
    case 'lg':
      buttonSize = 72;
      translateDistance = 125;
      itemSize = 65;
      circleSize = 250;
      overlaySize = 360;
      break;
    case 'md':
    default:
      buttonSize = 58;
      translateDistance = 105;
      itemSize = 60;
      circleSize = 210;
      overlaySize = 320;
      break;
  }

  // Calculate specific angles for 6 items (60 degrees apart)
  const angleStep = 360 / platforms.length; // For exactly 6 items this will be 60 degrees

  return (
    <div 
      className={`account-card-wrapper add-button-wrapper add-button-wrapper--${size} ${isMenuOpen ? 'menu-open' : ''}`}
      style={{
        '--button-size': `${buttonSize}px`,
        '--primary-color': theme.colors.primary,
        '--container-bg': theme.colors.surface,
        '--angle-step': `${angleStep}deg` // Make angle step available to CSS
      }}
    >
      <div 
        className="add-account-button-wrapper"
        onClick={onToggleMenu}
      >
        <div className="add-account-button">
          <span className="plus-icon">{isMenuOpen ? '×' : '+'}</span>
        </div>
        {/* Label will be hidden via CSS when menu is open */}
        <span className="add-account-label">Add Account</span>
      </div>
      
      {isMenuOpen && (
        <>
          <div 
            className="local-overlay" 
            style={{ '--overlay-size': `${overlaySize}px` }}
            onClick={onToggleMenu}
          ></div>
          
          <ul className="platform-circle-container" style={{
            '--circle-size': `${circleSize}px`,
            '--item-size': `${itemSize}px`,
            '--translate-distance': `${translateDistance}px`,
          }}>
            {platforms.map((platform, index) => (
              <li 
                key={platform}
                className="platform-item"
                style={{
                  '--platform-color': platformColors[platform.toLowerCase()] || theme.colors.primary,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectPlatform(platform);
                }}
              >
                <div className="platform-icon-wrapper">
                  <SocialIcon platform={platform} />
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

AddAccountButton.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
  onToggleMenu: PropTypes.func.isRequired,
  onSelectPlatform: PropTypes.func.isRequired,
  platforms: PropTypes.arrayOf(PropTypes.string),
  size: PropTypes.oneOf(['sm', 'md', 'lg'])
};

export default AddAccountButton;
