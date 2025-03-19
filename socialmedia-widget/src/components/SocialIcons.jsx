import { 
  FaFacebook, 
  FaInstagram, 
  FaTiktok, 
  FaLinkedin, 
  FaYoutube,
  FaXTwitter,
  FaGlobe
} from 'react-icons/fa6';
import PropTypes from 'prop-types';

/**
 * Maps platform names to their respective icons
 */
const platformIcons = {
  facebook: FaFacebook,
  instagram: FaInstagram,
  tiktok: FaTiktok,
  linkedin: FaLinkedin,
  youtube: FaYoutube,
  twitter: FaXTwitter,
  x: FaXTwitter,
  default: FaGlobe
};

/**
 * Social Icon component that renders the appropriate platform icon
 * with additional styling to ensure proper centering
 */
export function SocialIcon({ platform, color, size }) {
  const IconComponent = platformIcons[platform.toLowerCase()] || platformIcons.default;
  
  return (
    <IconComponent 
      color={color} 
      size={size}
      style={{
        display: 'block', // Ensures the SVG behaves like a block element
        margin: 'auto',   // Centers the icon in its container
        width: '100%',    // Fill the container width
        height: '100%',   // Fill the container height
      }}
    />
  );
}

SocialIcon.propTypes = {
  platform: PropTypes.oneOf(['facebook', 'instagram', 'tiktok', 'linkedin', 'youtube', 'twitter', 'x', 'default']).isRequired,
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

SocialIcon.defaultProps = {
  color: 'currentColor',
  size: '100%'
};

/**
 * Get all available social media platforms
 */
export const availablePlatforms = () => Object.keys(platformIcons).filter(p => p !== 'default');

export default SocialIcon;
