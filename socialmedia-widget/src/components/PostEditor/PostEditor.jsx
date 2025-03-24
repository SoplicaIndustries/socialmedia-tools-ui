import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useTheme } from '../../theme/ThemeContext';
import EmojiPicker from './EmojiPicker';
import { FaSmile, FaImage, FaEye, FaPen, FaHashtag, FaFont, FaTh, FaMapMarkerAlt, FaGlobe, 
  FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube, FaTiktok, FaChevronLeft, FaChevronRight,
  FaCalendarAlt, FaPaperPlane, FaSearch, FaVideo, FaTimes, FaSave } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

// Add custom scrollbar styling
const scrollbarStyles = `
  /* Custom scrollbar styles */
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  
  /* For Firefox */
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: #888 #f1f1f1;
  }
  
  /* For dark mode */
  .dark .custom-scrollbar::-webkit-scrollbar-track {
    background: #2d3748;
  }
  
  .dark .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #4a5568;
  }
  
  .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #718096;
  }
  
  .dark .custom-scrollbar {
    scrollbar-color: #4a5568 #2d3748;
  }
`;

/**
 * PostEditor component for creating and previewing social media posts
 * @param {Object} props - Component props
 * @param {Array} props.selectedAccounts - Array of selected social media accounts
 * @param {React.ReactNode} props.accountSelector - Optional account selector component
 */
const PostEditor = ({ selectedAccounts = [], accountSelector = null, onPost = () => {}, onSchedule = () => {}, onSaveDraft = () => {} }) => {
  // Insert style element for custom scrollbar
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = scrollbarStyles;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);
  
  const theme = useTheme();
  const [caption, setCaption] = useState('');
  const [media, setMedia] = useState([]);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showHashtagPicker, setShowHashtagPicker] = useState(false);
  const [location, setLocation] = useState('');
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [locationResults, setLocationResults] = useState([
    "New York, NY, USA",
    "Los Angeles, CA, USA",
    "Chicago, IL, USA",
    "San Francisco, CA, USA",
    "Miami, FL, USA",
    "London, UK",
    "Paris, France",
    "Berlin, Germany",
    "Tokyo, Japan",
    "Sydney, Australia"
  ]);
  
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const captionInputRef = useRef(null);
  const locationInputRef = useRef(null);
  
  // Close location picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (locationInputRef.current && !locationInputRef.current.contains(event.target)) {
        setShowLocationPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Auto-show preview when accounts are selected
  useEffect(() => {
    if (selectedAccounts.length > 0 && !showPreview) {
      setShowPreview(true);
    }
  }, [selectedAccounts, showPreview]);
  
  // Get active platform from selected accounts
  const getActivePlatform = () => {
    // For now, prioritize Instagram if available
    const instagramAccount = selectedAccounts.find(account => account.platform === 'instagram');
    if (instagramAccount) return instagramAccount;
    
    // If no Instagram account, take the first selected account
    return selectedAccounts[0];
  };
  
  // Get the user data for the preview
  const getUserForPreview = () => {
    const activePlatform = getActivePlatform();
    
    if (activePlatform) {
      return {
        username: activePlatform.name || 'username',
        avatar: `https://i.pravatar.cc/150?img=${activePlatform.id || 11}`,
        platform: activePlatform.platform || 'instagram'
      };
    }
    
    // Default user if no account is selected
    return {
      username: 'your_username',
      avatar: 'https://i.pravatar.cc/150?img=11',
      platform: 'instagram'
    };
  };
  
  // Get the user for preview
  const user = getUserForPreview();
  
  // Current timestamp formatted for Instagram style
  const timestamp = '2 MINUTES AGO';

  // Character counter
  const [charCount, setCharCount] = useState(0);
  useEffect(() => {
    setCharCount(caption.length);
  }, [caption]);
  
  // Popular hashtags for demo
  const popularHashtags = [
    '#instagood', '#photooftheday', '#fashion', '#beautiful', 
    '#happy', '#cute', '#tbt', '#like4like', '#followme', 
    '#picoftheday', '#selfie', '#summer', '#instadaily'
  ];
  
  // Handle text input change
  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };
  
  // Handle media upload
  const handleMediaChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const filesArray = Array.from(e.target.files);
      
      // Process up to 5 files
      const newMediaPromises = filesArray.slice(0, 5).map(file => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            resolve(e.target.result);
          };
          reader.readAsDataURL(file);
        });
      });
      
      Promise.all(newMediaPromises).then(newMedia => {
        setMedia(prev => [...prev, ...newMedia].slice(0, 5)); // Limit to 5 images total
        if (selectedMediaIndex === null) {
          setSelectedMediaIndex(0); // Select first image if none selected
        }
      });
    }
  };
  
  // Trigger file input click
  const handleMediaButtonClick = () => {
    fileInputRef.current.click();
  };
  
  // Toggle preview mode
  const togglePreview = () => {
    setShowPreview(!showPreview);
  };
  
  // Toggle emoji picker
  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
    setShowHashtagPicker(false);
  };
  
  // Toggle hashtag picker
  const toggleHashtagPicker = () => {
    setShowHashtagPicker(!showHashtagPicker);
    setShowEmojiPicker(false);
  };
  
  // Add emoji to caption
  const addEmoji = (emoji) => {
    const cursorPosition = captionInputRef.current.selectionStart;
    const textBeforeCursor = caption.substring(0, cursorPosition);
    const textAfterCursor = caption.substring(cursorPosition);
    
    const newText = textBeforeCursor + emoji + textAfterCursor;
    setCaption(newText);
    
    // Set cursor position after inserted emoji
    setTimeout(() => {
      captionInputRef.current.selectionStart = 
      captionInputRef.current.selectionEnd = cursorPosition + emoji.length;
      captionInputRef.current.focus();
    }, 0);
  };
  
  // Add hashtag to caption
  const addHashtag = (hashtag) => {
    const cursorPosition = captionInputRef.current.selectionStart;
    const textBeforeCursor = caption.substring(0, cursorPosition);
    const textAfterCursor = caption.substring(cursorPosition);
    
    const newText = textBeforeCursor + hashtag + " " + textAfterCursor;
    setCaption(newText);
    
    // Set cursor position after inserted hashtag
    setTimeout(() => {
      captionInputRef.current.selectionStart = 
      captionInputRef.current.selectionEnd = cursorPosition + hashtag.length + 1;
      captionInputRef.current.focus();
    }, 0);
    
    setShowHashtagPicker(false);
  };
  
  // Add placeholder variable
  const addPlaceholder = (variable) => {
    const cursorPosition = captionInputRef.current.selectionStart;
    const textBeforeCursor = caption.substring(0, cursorPosition);
    const textAfterCursor = caption.substring(cursorPosition);
    
    const newText = textBeforeCursor + `{{${variable}}}` + textAfterCursor;
    setCaption(newText);
    
    // Set cursor position after inserted variable
    setTimeout(() => {
      captionInputRef.current.selectionStart = 
      captionInputRef.current.selectionEnd = cursorPosition + variable.length + 4;
      captionInputRef.current.focus();
    }, 0);
  };
  
  // Remove media at index
  const removeMedia = (indexToRemove) => {
    setMedia(prev => prev.filter((_, index) => index !== indexToRemove));
    if (selectedMediaIndex === indexToRemove) {
      setSelectedMediaIndex(prev => prev > 0 ? prev - 1 : null);
    } else if (selectedMediaIndex > indexToRemove) {
      setSelectedMediaIndex(prev => prev - 1);
    }
  };
  
  // Select media at index
  const selectMedia = (index) => {
    setSelectedMediaIndex(index);
  };
  
  // Clear all content
  const clearContent = () => {
    setCaption('');
    setMedia([]);
    setSelectedMediaIndex(null);
    setLocation('');
  };
  
  // Format caption text for display in preview
  const formatCaptionForPreview = (text) => {
    if (!text) return null;
    
    // Replace hashtags with blue styled span
    const hashtagRegex = /#[a-zA-Z0-9_]+/g;
    // Replace placeholder variables with highlighted span
    const placeholderRegex = /\{\{([^}]+)\}\}/g;
    
    // Find all hashtags and placeholders
    let parts = [];
    let lastIndex = 0;
    let match;
    
    // Process hashtags
    while ((match = hashtagRegex.exec(text)) !== null) {
      if (lastIndex < match.index) {
        parts.push({
          type: 'text',
          content: text.substring(lastIndex, match.index)
        });
      }
      parts.push({
        type: 'hashtag',
        content: match[0]
      });
      lastIndex = match.index + match[0].length;
    }
    
    // Add remaining text
    if (lastIndex < text.length) {
      let remainingText = text.substring(lastIndex);
      
      // Process placeholders in the remaining text
      let placeholderParts = [];
      let lastPlaceholderIndex = 0;
      let placeholderMatch;
      
      while ((placeholderMatch = placeholderRegex.exec(remainingText)) !== null) {
        if (lastPlaceholderIndex < placeholderMatch.index) {
          placeholderParts.push({
            type: 'text',
            content: remainingText.substring(lastPlaceholderIndex, placeholderMatch.index)
          });
        }
        placeholderParts.push({
          type: 'placeholder',
          content: placeholderMatch[0],
          variable: placeholderMatch[1]
        });
        lastPlaceholderIndex = placeholderMatch.index + placeholderMatch[0].length;
      }
      
      if (lastPlaceholderIndex < remainingText.length) {
        placeholderParts.push({
          type: 'text',
          content: remainingText.substring(lastPlaceholderIndex)
        });
      }
      
      // If placeholders were found, add them as separate parts
      if (placeholderParts.length > 0) {
        parts = [...parts, ...placeholderParts];
      } else {
        parts.push({
          type: 'text',
          content: remainingText
        });
      }
    }
    
    return (
      <div>
        {parts.map((part, index) => {
          if (part.type === 'hashtag') {
            return <span key={index} className="text-blue-500 hover:underline cursor-pointer">{part.content}</span>;
          } else if (part.type === 'placeholder') {
            return <span key={index} className="bg-yellow-100 dark:bg-yellow-800 px-1 rounded">{part.content}</span>;
          } else {
            return <span key={index}>{part.content}</span>;
          }
        })}
      </div>
    );
  };

  // Active platform state
  const [activePreviewIndex, setActivePreviewIndex] = useState(0);
  
  // Reset active preview index when selected accounts change
  useEffect(() => {
    setActivePreviewIndex(0);
  }, [selectedAccounts]);
  
  // Navigate through platform previews
  const goToPreviousPreview = () => {
    setActivePreviewIndex(prev => 
      prev > 0 ? prev - 1 : selectedAccounts.length - 1
    );
  };
  
  const goToNextPreview = () => {
    setActivePreviewIndex(prev => 
      prev < selectedAccounts.length - 1 ? prev + 1 : 0
    );
  };
  
  // Get the active account for preview
  const getActiveAccount = () => {
    if (selectedAccounts.length === 0) {
      return {
        name: 'your_username',
        avatar: 'https://i.pravatar.cc/150?img=11',
        platform: 'instagram',
        id: 11
      };
    }
    
    return selectedAccounts[activePreviewIndex];
  };
  
  // Get platform icon component
  const getPlatformIcon = (platform) => {
    switch (platform?.toLowerCase()) {
      case 'facebook': return FaFacebook;
      case 'instagram': return FaInstagram;
      case 'linkedin': return FaLinkedin;
      case 'twitter': return FaTwitter;
      case 'x': return FaXTwitter;
      case 'tiktok': return FaTiktok;
      case 'youtube': return FaYoutube;
      default: return FaGlobe;
    }
  };
  
  // Active account for preview
  const activeAccount = getActiveAccount();
  
  // Render platform-specific preview
  const renderPlatformPreview = (account) => {
    const platform = account?.platform?.toLowerCase() || 'instagram';
    
    switch (platform) {
      case 'facebook':
        return renderFacebookPreview(account);
      case 'twitter':
      case 'x':
        return renderTwitterPreview(account);
      case 'linkedin':
        return renderLinkedInPreview(account);
      case 'tiktok':
        return renderTikTokPreview(account);
      case 'youtube':
        return renderYouTubePreview(account);
      case 'instagram':
      default:
        return renderInstagramPreview(account);
    }
  };
  
  // Instagram preview (already implemented)
  const renderInstagramPreview = (account) => {
    const PlatformIcon = getPlatformIcon(account.platform);
    
    return (
      <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-900 mx-auto">
        {/* Post Header */}
        <div className="flex items-center p-3">
          <div className="h-8 w-8 rounded-full overflow-hidden mr-2">
            <img 
              src={`https://i.pravatar.cc/150?img=${account.id || 11}`} 
              alt={account.name} 
              className="h-full w-full object-cover" 
            />
          </div>
          <div className="font-medium text-sm">{account.name}</div>
          {location && (
            <div className="text-xs text-gray-500 ml-2">{location}</div>
          )}
          <div className="ml-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          </div>
        </div>
        
        {/* Post Image with carousel */}
        <div className="aspect-square bg-black relative">
          {media.length > 0 ? (
            <>
              <img 
                src={media[selectedMediaIndex !== null ? selectedMediaIndex : 0]} 
                alt="Post media" 
                className="w-full h-full object-cover"
              />
              
              {/* Media count indicator for Instagram */}
              {media.length > 1 && (
                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs rounded px-1.5 py-0.5">
                  {selectedMediaIndex !== null ? selectedMediaIndex + 1 : 1}/{media.length}
                </div>
              )}
              
              {/* Media navigation arrows */}
              {media.length > 1 && (
                <>
                  <button 
                    onClick={goToPrevMedia}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/60 rounded-full text-white hover:bg-black/80"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button 
                    onClick={goToNextMedia}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/60 rounded-full text-white hover:bg-black/80"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </>
              )}
              
              {/* Media indicator dots */}
              {media.length > 1 && (
                <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                  {media.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => selectMediaDot(index, e)}
                      className={`w-2 h-2 rounded-full ${selectedMediaIndex === index ? 'bg-blue-500' : 'bg-white/70'}`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full aspect-square bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
              <FaImage className="h-10 w-10 text-gray-400 dark:text-gray-600" />
            </div>
          )}
        </div>
        
        {/* Post Actions */}
        <div className="p-3 text-sm">
          <div className="flex mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </div>
          
          {/* Likes */}
          <div className="font-medium text-sm mb-2">0 likes</div>
          
          {/* Caption with formatted text */}
          {caption && (
            <div className="text-sm mb-1">
              <span className="font-medium mr-1">{account.name}</span>
              {formatCaptionForPreview(caption)}
            </div>
          )}
          
          {/* Timestamp */}
          <div className="text-gray-500 text-xs uppercase mt-2">{timestamp}</div>
        </div>
      </div>
    );
  };
  
  // Facebook preview
  const renderFacebookPreview = (account) => {
    const PlatformIcon = getPlatformIcon(account.platform);
    
    return (
      <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-900 mx-auto">
        {/* Post Header */}
        <div className="flex items-center p-3">
          <div className="h-10 w-10 rounded-full overflow-hidden mr-2">
            <img 
              src={`https://i.pravatar.cc/150?img=${account.id || 11}`} 
              alt={account.name} 
              className="h-full w-full object-cover" 
            />
          </div>
          <div className="flex flex-col">
            <div className="font-semibold text-sm">{account.name}</div>
            <div className="text-xs text-gray-500 flex items-center">
              {timestamp} · <FaGlobe className="ml-1" size={10} />
            </div>
          </div>
          <div className="ml-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          </div>
        </div>
        
        {/* Caption */}
        {caption && (
          <div className="px-3 pb-2 text-sm">
            {formatCaptionForPreview(caption)}
          </div>
        )}
        
        {/* Post Image - if available with carousel */}
        {media.length > 0 && (
          <div className="border-t border-b border-gray-200 dark:border-gray-700 relative">
            <div className="aspect-[4/3] bg-black">
              <img 
                src={media[selectedMediaIndex !== null ? selectedMediaIndex : 0]} 
                alt="Post media" 
                className="w-full h-full object-cover"
              />
              
              {/* Media count indicator */}
              {media.length > 1 && (
                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs rounded px-1.5 py-0.5">
                  {selectedMediaIndex !== null ? selectedMediaIndex + 1 : 1}/{media.length}
                </div>
              )}
              
              {/* Media navigation arrows */}
              {media.length > 1 && (
                <>
                  <button 
                    onClick={goToPrevMedia}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/60 rounded-full text-white hover:bg-black/80"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button 
                    onClick={goToNextMedia}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/60 rounded-full text-white hover:bg-black/80"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </>
              )}
              
              {/* Media indicator dots */}
              {media.length > 1 && (
                <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                  {media.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => selectMediaDot(index, e)}
                      className={`w-2 h-2 rounded-full ${selectedMediaIndex === index ? 'bg-blue-500' : 'bg-white/70'}`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Location - if available */} 
        {location && (
          <div className="px-3 py-2 text-xs text-gray-500 flex items-center">
            <FaMapMarkerAlt className="mr-1" /> {location}
          </div>
        )}
        
        {/* Like, Comment and Share */}
        <div className="px-3 py-2 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center text-gray-500 dark:text-gray-400 text-xs mb-2">
            <div>0 Likes</div>
            <div>0 Comments · 0 Shares</div>
          </div>
          <div className="flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-1">
            <button className="flex-1 flex items-center justify-center py-1 text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
              Like
            </button>
            <button className="flex-1 flex items-center justify-center py-1 text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Comment
            </button>
            <button className="flex-1 flex items-center justify-center py-1 text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  // Twitter/X preview
  const renderTwitterPreview = (account) => {
    const PlatformIcon = getPlatformIcon(account.platform);
    const isX = account.platform?.toLowerCase() === 'x';
    
    return (
      <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-900 mx-auto">
        {/* Post Header */}
        <div className="flex items-start p-3">
          <div className="h-10 w-10 rounded-full overflow-hidden mr-2">
            <img 
              src={`https://i.pravatar.cc/150?img=${account.id || 11}`} 
              alt={account.name} 
              className="h-full w-full object-cover" 
            />
          </div>
          <div className="flex flex-col flex-grow min-w-0">
            <div className="flex items-center">
              <span className="font-bold text-sm truncate">{account.name}</span>
              <span className="text-gray-500 text-sm ml-1 truncate">@{account.name.replace(/\s+/g, '').toLowerCase()}</span>
              <span className="text-gray-500 text-sm mx-1">·</span>
              <span className="text-gray-500 text-sm">2m</span>
            </div>
            
            {/* Caption */}
            <div className="text-sm mt-1 break-words">
              {formatCaptionForPreview(caption || "What's happening?")}
            </div>
            
            {/* Location - if available */}
            {location && (
              <div className="mt-1 text-xs text-[#1d9bf0] dark:text-[#1d9bf0]">
                <FaMapMarkerAlt className="inline mr-1" size={12} /> {location}
              </div>
            )}
            
            {/* Post Image - if available, with carousel */}
            {media.length > 0 && (
              <div className="mt-2 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 relative">
                <div className="aspect-[16/9] bg-black">
                  <img 
                    src={media[selectedMediaIndex !== null ? selectedMediaIndex : 0]} 
                    alt="Post media" 
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Media count indicator */}
                  {media.length > 1 && (
                    <div className="absolute top-2 right-2 bg-black/70 text-white text-xs rounded px-1.5 py-0.5">
                      {selectedMediaIndex !== null ? selectedMediaIndex + 1 : 1}/{media.length}
                    </div>
                  )}
                  
                  {/* Media navigation arrows */}
                  {media.length > 1 && (
                    <>
                      <button 
                        onClick={goToPrevMedia}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/60 rounded-full text-white hover:bg-black/80"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <button 
                        onClick={goToNextMedia}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/60 rounded-full text-white hover:bg-black/80"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </>
                  )}
                  
                  {/* Media indicator dots */}
                  {media.length > 1 && (
                    <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                      {media.map((_, index) => (
                        <button
                          key={index}
                          onClick={(e) => selectMediaDot(index, e)}
                          className={`w-2 h-2 rounded-full ${selectedMediaIndex === index ? 'bg-blue-500' : 'bg-white/70'}`}
                          aria-label={`Go to slide ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Tweet Actions */}
            <div className="flex justify-between mt-3 text-gray-500">
              <div className="flex items-center hover:text-[#1d9bf0]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="text-xs ml-1">0</span>
              </div>
              <div className="flex items-center hover:text-[#1d9bf0]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span className="text-xs ml-1">0</span>
              </div>
              <div className="flex items-center hover:text-[#f91880]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="text-xs ml-1">0</span>
              </div>
              <div className="flex items-center hover:text-[#1d9bf0]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // LinkedIn preview
  const renderLinkedInPreview = (account) => {
    const PlatformIcon = getPlatformIcon(account.platform);
    
    return (
      <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-900 mx-auto">
        {/* Post Header */}
        <div className="flex items-start p-3">
          <div className="h-12 w-12 rounded-full overflow-hidden mr-2">
            <img 
              src={`https://i.pravatar.cc/150?img=${account.id || 11}`} 
              alt={account.name} 
              className="h-full w-full object-cover" 
            />
          </div>
          <div className="flex flex-col">
            <div className="font-semibold text-sm">{account.name}</div>
            <div className="text-xs text-gray-500">
              {account.name}'s Professional Title
            </div>
            <div className="text-xs text-gray-500 flex items-center">
              {timestamp} · <FaGlobe className="ml-1" size={10} />
            </div>
          </div>
          <div className="ml-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          </div>
        </div>
        
        {/* Caption */}
        {caption && (
          <div className="px-3 pb-3 text-sm">
            {formatCaptionForPreview(caption)}
          </div>
        )}
        
        {/* Post Image - if available with carousel */}
        {media.length > 0 && (
          <div className="border-t border-b border-gray-200 dark:border-gray-700 relative">
            <div className="aspect-video bg-black">
              <img 
                src={media[selectedMediaIndex !== null ? selectedMediaIndex : 0]} 
                alt="Post media" 
                className="w-full h-full object-cover"
              />
              
              {/* Media count indicator */}
              {media.length > 1 && (
                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs rounded px-1.5 py-0.5">
                  {selectedMediaIndex !== null ? selectedMediaIndex + 1 : 1}/{media.length}
                </div>
              )}
              
              {/* Media navigation arrows */}
              {media.length > 1 && (
                <>
                  <button 
                    onClick={goToPrevMedia}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/60 rounded-full text-white hover:bg-black/80"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button 
                    onClick={goToNextMedia}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/60 rounded-full text-white hover:bg-black/80"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </>
              )}
              
              {/* Media indicator dots */}
              {media.length > 1 && (
                <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                  {media.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => selectMediaDot(index, e)}
                      className={`w-2 h-2 rounded-full ${selectedMediaIndex === index ? 'bg-blue-500' : 'bg-white/70'}`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* LinkedIn Actions */}
        <div className="p-3">
          <div className="flex justify-between text-gray-500 text-xs mb-2">
            <div className="flex items-center">
              <div className="bg-blue-500 text-white p-1 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                </svg>
              </div>
              <span className="ml-1">0</span>
            </div>
            <div>0 comments</div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-2 flex justify-around">
            <button className="flex items-center text-sm text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
              Like
            </button>
            <button className="flex items-center text-sm text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Comment
            </button>
            <button className="flex items-center text-sm text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share
            </button>
            <button className="flex items-center text-sm text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Send
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  // TikTok preview
  const renderTikTokPreview = (account) => {
    const PlatformIcon = getPlatformIcon(account.platform);
    
    return (
      <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden bg-black mx-auto">
        <div className="aspect-[4/5] max-h-[400px] relative">
          {/* Video Preview with carousel */}
          {media.length > 0 ? (
            <>
              <img 
                src={media[selectedMediaIndex !== null ? selectedMediaIndex : 0]} 
                alt="Post media" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              {/* Media count indicator */}
              {media.length > 1 && (
                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs rounded px-1.5 py-0.5">
                  {selectedMediaIndex !== null ? selectedMediaIndex + 1 : 1}/{media.length}
                </div>
              )}
              
              {/* Media navigation arrows */}
              {media.length > 1 && (
                <>
                  <button 
                    onClick={goToPrevMedia}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/60 rounded-full text-white hover:bg-black/80"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button 
                    onClick={goToNextMedia}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/60 rounded-full text-white hover:bg-black/80"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </>
              )}
              
              {/* Media indicator dots */}
              {media.length > 1 && (
                <div className="absolute bottom-14 left-0 right-0 flex justify-center gap-1">
                  {media.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => selectMediaDot(index, e)}
                      className={`w-2 h-2 rounded-full ${selectedMediaIndex === index ? 'bg-[#FE2C55]' : 'bg-white/70'}`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
              <FaImage className="h-16 w-16 text-gray-600" />
            </div>
          )}
          
          {/* Overlay Elements */}
          <div className="absolute inset-0 flex flex-col justify-between p-2">
            {/* Top - Caption */}
            <div className="text-white text-sm p-2 bg-black/30 rounded max-w-[80%] backdrop-blur-sm">
              {caption ? formatCaptionForPreview(caption) : "TikTok Caption"}
            </div>
            
            {/* Right side user controls */}
            <div className="absolute right-2 bottom-20 flex flex-col items-center space-y-4">
              <div className="flex flex-col items-center">
                <div className="bg-black rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <span className="text-white text-xs mt-1">0</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-black rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <span className="text-white text-xs mt-1">0</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-black rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </div>
                <span className="text-white text-xs mt-1">0</span>
              </div>
            </div>
            
            {/* Bottom - User info */}
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-white">
                <img 
                  src={`https://i.pravatar.cc/150?img=${account.id || 11}`}
                  alt={account.name} 
                  className="h-full w-full object-cover" 
                />
              </div>
              <div className="text-white font-medium text-sm">@{account.name.replace(/\s+/g, '').toLowerCase()}</div>
              <div className="ml-auto">
                <button className="bg-[#FE2C55] text-white text-xs font-medium rounded-sm px-3 py-1">
                  Follow
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // YouTube preview
  const renderYouTubePreview = (account) => {
    const PlatformIcon = getPlatformIcon(account.platform);
    
    return (
      <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-900 mx-auto">
        {/* Video Thumbnail with carousel */}
        <div className="relative aspect-video bg-black">
          {media.length > 0 ? (
            <>
              <img 
                src={media[selectedMediaIndex !== null ? selectedMediaIndex : 0]} 
                alt="Video thumbnail" 
                className="w-full h-full object-cover"
              />
              
              {/* Media count indicator */}
              {media.length > 1 && (
                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs rounded px-1.5 py-0.5">
                  {selectedMediaIndex !== null ? selectedMediaIndex + 1 : 1}/{media.length}
                </div>
              )}
              
              {/* Media navigation arrows */}
              {media.length > 1 && (
                <>
                  <button 
                    onClick={goToPrevMedia}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/60 rounded-full text-white hover:bg-black/80"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button 
                    onClick={goToNextMedia}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/60 rounded-full text-white hover:bg-black/80"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </>
              )}
              
              {/* Media indicator dots */}
              {media.length > 1 && (
                <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-1">
                  {media.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => selectMediaDot(index, e)}
                      className={`w-2 h-2 rounded-full ${selectedMediaIndex === index ? 'bg-red-600' : 'bg-white/70'}`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
              
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center group">
                <div className="w-14 h-14 bg-black/70 rounded-full flex items-center justify-center group-hover:bg-red-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
              <FaYoutube className="h-14 w-14 text-red-600" />
            </div>
          )}
          
          {/* Duration indicator */}
          <div className="absolute bottom-2 right-2 bg-black text-white text-xs px-1 py-0.5 rounded">
            00:00
          </div>
        </div>
        
        {/* Video info */}
        <div className="p-3">
          <div className="flex">
            <div className="h-9 w-9 rounded-full overflow-hidden mr-2 flex-shrink-0">
              <img 
                src={`https://i.pravatar.cc/150?img=${account.id || 11}`} 
                alt={account.name} 
                className="h-full w-full object-cover" 
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold line-clamp-2 mb-1">
                {caption || "YouTube Video Title"}
              </h3>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {account.name}
                <span className="mx-1">•</span>
                <span>0 views</span>
                <span className="mx-1">•</span>
                <span>2 hours ago</span>
              </div>
            </div>
            <div className="ml-auto flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Group accounts by platform for better navigation
  const accountsByPlatform = useMemo(() => {
    const grouped = {};
    selectedAccounts.forEach(account => {
      const platform = account.platform || 'other';
      if (!grouped[platform]) {
        grouped[platform] = [];
      }
      grouped[platform].push(account);
    });
    return grouped;
  }, [selectedAccounts]);

  // Get available platform types
  const availablePlatforms = useMemo(() => {
    return Object.keys(accountsByPlatform);
  }, [accountsByPlatform]);

  // State for active platform and account within that platform
  const [activePlatform, setActivePlatform] = useState(null);
  
  // Update active platform when accounts change
  useEffect(() => {
    if (availablePlatforms.length > 0) {
      // Default to Instagram if available, otherwise first platform
      const defaultPlatform = availablePlatforms.includes('instagram') 
        ? 'instagram' 
        : availablePlatforms[0];
      setActivePlatform(defaultPlatform);
    } else {
      setActivePlatform(null);
    }
  }, [availablePlatforms]);
  
  // Navigate between platforms
  const goToPreviousPlatform = () => {
    const currentIndex = availablePlatforms.indexOf(activePlatform);
    if (currentIndex > 0) {
      setActivePlatform(availablePlatforms[currentIndex - 1]);
    } else {
      setActivePlatform(availablePlatforms[availablePlatforms.length - 1]);
    }
  };
  
  const goToNextPlatform = () => {
    const currentIndex = availablePlatforms.indexOf(activePlatform);
    if (currentIndex < availablePlatforms.length - 1) {
      setActivePlatform(availablePlatforms[currentIndex + 1]);
    } else {
      setActivePlatform(availablePlatforms[0]);
    }
  };
  
  // Get active accounts for the current platform
  const activeAccounts = useMemo(() => {
    if (!activePlatform || !accountsByPlatform[activePlatform]) {
      // Default empty account for preview when no accounts are selected
      return [{
        name: 'your_username',
        avatar: 'https://i.pravatar.cc/150?img=11',
        platform: 'instagram',
        id: 11
      }];
    }
    return accountsByPlatform[activePlatform];
  }, [activePlatform, accountsByPlatform]);

  // Handle post now action
  const handlePostNow = () => {
    const postData = {
      caption,
      media,
      location,
      accounts: selectedAccounts,
      timestamp: new Date()
    };
    
    onPost(postData);
  };
  
  // Handle schedule action
  const handleSchedule = () => {
    const postData = {
      caption,
      media,
      location,
      accounts: selectedAccounts
    };
    
    onSchedule(postData);
  };

  // Handle save draft action
  const handleSaveDraft = () => {
    const draftData = {
      caption,
      media,
      location,
      timestamp: new Date()
    };
    
    onSaveDraft(draftData);
  };

  // Handle location search
  const handleLocationSearch = (e) => {
    setLocation(e.target.value);
    setShowLocationPicker(true);
    
    // In a real app, this would call an API to get location results
    // For demo, we're just filtering our static array
    if (e.target.value.trim()) {
      const filtered = locationResults.filter(
        loc => loc.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setLocationResults(filtered.length > 0 ? filtered : ["No results found"]);
    } else {
      // Reset to default locations
      setLocationResults([
        "New York, NY, USA",
        "Los Angeles, CA, USA",
        "Chicago, IL, USA",
        "San Francisco, CA, USA",
        "Miami, FL, USA",
        "London, UK",
        "Paris, France",
        "Berlin, Germany",
        "Tokyo, Japan",
        "Sydney, Australia"
      ]);
    }
  };

  // Select a location from results
  const selectLocation = (loc) => {
    setLocation(loc);
    setShowLocationPicker(false);
  };
  
  // Clear location
  const clearLocation = () => {
    setLocation("");
  };

  // After the clearLocation function, add these media navigation functions
  const goToPrevMedia = (e) => {
    e && e.stopPropagation();
    if (media.length <= 1) return;
    setSelectedMediaIndex(prev => prev > 0 ? prev - 1 : media.length - 1);
  };

  const goToNextMedia = (e) => {
    e && e.stopPropagation();
    if (media.length <= 1) return;
    setSelectedMediaIndex(prev => prev < media.length - 1 ? prev + 1 : 0);
  };

  const selectMediaDot = (index, e) => {
    e && e.stopPropagation();
    if (index >= 0 && index < media.length) {
      setSelectedMediaIndex(index);
    }
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
        {/* Header with integrated account selector */}
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Post Editor</h2>
            {selectedAccounts.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 dark:text-gray-300">Posting to:</span>
                <div className="flex -space-x-2">
                  {selectedAccounts.slice(0, 3).map((account, index) => (
                    <div key={index} className="h-8 w-8 rounded-full border-2 border-white dark:border-gray-800 overflow-hidden" title={`${account.name} (${account.platform})`}>
                      <img 
                        src={`https://i.pravatar.cc/150?img=${account.id || index + 11}`} 
                        alt={account.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                  {selectedAccounts.length > 3 && (
                    <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-medium border-2 border-white dark:border-gray-800">
                      +{selectedAccounts.length - 3}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {/* Render the account selector if provided */}
          {accountSelector && (
            <div className="mb-3">
              {accountSelector}
            </div>
          )}
        </div>
      </div>
      
      <div className={`flex flex-col md:flex-row divide-gray-200 dark:divide-gray-700`}>
        {/* Editor Panel */}
        <div className={`p-4 ${showPreview ? 'md:w-3/5' : 'w-full'}`}>
          {/* Content Composition Area - NOW FIRST */}
          <div className="mb-6">
            <div className="border rounded-lg focus-within:ring-2 focus-within:ring-blue-500 bg-white dark:bg-gray-800">
              <textarea
                ref={captionInputRef}
                className="w-full px-3 py-4 text-gray-700 dark:text-gray-300 border-none rounded-t-lg focus:outline-none bg-white dark:bg-gray-800 resize-none min-h-[180px]"
                placeholder="Write your post... Use #hashtags and {{placeholders}} for dynamic content"
                value={caption}
                onChange={handleCaptionChange}
              />
              
              {/* Icon Toolbar */}
              <div className="flex items-center border-t border-gray-200 dark:border-gray-600 px-2 py-2 bg-gray-50 dark:bg-gray-700 rounded-b-lg">
                <button 
                  onClick={toggleEmojiPicker}
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-gray-300"
                >
                  <FaSmile />
                </button>
                
                <button 
                  onClick={toggleHashtagPicker}
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-gray-300"
                >
                  <FaHashtag />
                </button>
                
                <button 
                  onClick={() => addPlaceholder('website')}
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-gray-300"
                >
                  <FaFont />
                </button>
                
                <div className="flex-grow"></div>
                
                <div className="px-2 text-sm text-gray-500 dark:text-gray-400">
                  {charCount} characters
                </div>
              </div>
            </div>
            
            {/* Emoji Picker */}
            {showEmojiPicker && (
              <div className="mt-2 absolute z-10">
                <EmojiPicker onEmojiSelect={addEmoji} onClose={() => setShowEmojiPicker(false)} />
              </div>
            )}
            
            {/* Hashtag Picker */}
            {showHashtagPicker && (
              <div className="mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-3 absolute z-10">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Popular Hashtags</h3>
                  <button 
                    onClick={() => setShowHashtagPicker(false)} 
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    ✕
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {popularHashtags.map((hashtag, index) => (
                    <button
                      key={index}
                      onClick={() => addHashtag(hashtag)}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800 text-sm transition-colors"
                    >
                      {hashtag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Media Attachments Section - NOW BELOW TEXT INPUT */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Media
              </label>
              <div className="flex gap-2">
                {media.length < 5 && (
                  <>
                    <button
                      onClick={() => fileInputRef.current.click()}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-gray-800 dark:text-gray-200 text-xs flex items-center"
                    >
                      <FaImage className="mr-1" /> Add Image
                      <input 
                        type="file"
                        ref={fileInputRef}
                        onChange={handleMediaChange}
                        accept="image/*"
                        multiple
                        className="hidden"
                      />
                    </button>
                    <button
                      onClick={() => videoInputRef.current.click()}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-gray-800 dark:text-gray-200 text-xs flex items-center"
                    >
                      <FaVideo className="mr-1" /> Add Video
                      <input 
                        type="file"
                        ref={videoInputRef}
                        onChange={(e) => handleMediaChange(e, 'video')}
                        accept="video/*"
                        className="hidden"
                      />
                    </button>
                  </>
                )}
              </div>
            </div>
            
            {/* Media preview area */}
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 min-h-[120px] bg-gray-50 dark:bg-gray-700/50">
              {media.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {media.map((src, index) => (
                    <div 
                      key={index} 
                      className={`relative w-24 h-24 border-2 rounded-lg overflow-hidden cursor-pointer transition-all
                        ${selectedMediaIndex === index ? 'border-blue-500 shadow-md scale-105' : 'border-gray-300 dark:border-gray-600'}`}
                      onClick={() => selectMedia(index)}
                    >
                      <img src={src} alt={`Media ${index + 1}`} className="w-full h-full object-cover" />
                      <button
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-80 hover:opacity-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeMedia(index);
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-32 text-gray-400">
                  <FaImage className="text-4xl mb-2" />
                  <p className="text-sm">Add images or videos to your post</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Post Controls - Redesigned with inline location */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Narrower Location Input - Now inline with buttons */}
            <div className="relative md:w-1/3 max-w-xs flex-shrink-0" ref={locationInputRef}>
              <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 h-10">
                <FaMapMarkerAlt className="text-gray-500 mr-2 flex-shrink-0" />
                <input
                  type="text"
                  className="bg-transparent border-none focus:outline-none text-gray-700 dark:text-gray-300 w-full text-sm"
                  placeholder="Add location"
                  value={location}
                  onChange={handleLocationSearch}
                  onClick={() => setShowLocationPicker(true)}
                />
                {location && (
                  <button 
                    className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400"
                    onClick={clearLocation}
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
              
              {/* Location Results Dropdown */}
              {showLocationPicker && (
                <div className="absolute mt-1 w-full bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                  <div className="max-h-48 overflow-y-auto p-1">
                    {locationResults.map((loc, index) => (
                      <div
                        key={index}
                        className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer flex items-center text-sm"
                        onClick={() => selectLocation(loc)}
                      >
                        <FaMapMarkerAlt className="text-gray-500 mr-2 flex-shrink-0" />
                        <span>{loc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex-grow"></div>
            
            {/* Save Draft Button */}
            <button 
              onClick={handleSaveDraft}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors flex items-center font-medium"
            >
              <FaSave className="mr-2" />
              Save Draft
            </button>
            
            {/* Schedule Button */}
            <button 
              onClick={handleSchedule}
              disabled={selectedAccounts.length === 0}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaCalendarAlt className="mr-2" />
              Schedule
            </button>
            
            {/* Post Now Button */}
            <button 
              onClick={handlePostNow}
              disabled={selectedAccounts.length === 0}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaPaperPlane className="mr-2" />
              Post Now
            </button>
          </div>
        </div>
        
        {/* Preview Panel */}
        {showPreview && (
          <div className="p-4 md:w-2/5 border-l border-gray-200 dark:border-gray-700 flex flex-col h-full">
            {/* Platform Navigation - Only show when multiple platforms are available */}
            {availablePlatforms.length > 1 && (
              <div className="flex justify-between items-center mb-3 flex-shrink-0">
                <button 
                  onClick={goToPreviousPlatform}
                  className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <FaChevronLeft className="text-gray-600 dark:text-gray-300" />
                </button>
                
                <div className="flex items-center">
                  {activePlatform && (
                    <div className="h-6 w-6 mr-1">
                      {React.createElement(getPlatformIcon(activePlatform), {
                        className: "h-full w-full",
                        style: { color: getPlatformColor(activePlatform) }
                      })}
                    </div>
                  )}
                  <span className="text-sm font-medium capitalize">{activePlatform || 'Preview'} ({availablePlatforms.indexOf(activePlatform) + 1}/{availablePlatforms.length})</span>
                </div>
                
                <button 
                  onClick={goToNextPlatform}
                  className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <FaChevronRight className="text-gray-600 dark:text-gray-300" />
                </button>
              </div>
            )}
            
            {/* Platform Account Tabs - Show when multiple accounts for the same platform */}
            {activeAccounts.length > 1 && (
              <div className="flex overflow-x-auto mb-3 pb-1 scrollbar-thin flex-shrink-0">
                {activeAccounts.map((account, index) => (
                  <button
                    key={index}
                    className={`flex-shrink-0 flex items-center px-2 py-1 mr-2 rounded-full text-xs ${
                      index === 0  // Using first account as active for simplicity
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                    title={account.name}
                  >
                    <img 
                      src={`https://i.pravatar.cc/150?img=${account.id || index + 11}`}
                      alt={account.name}
                      className="h-4 w-4 rounded-full mr-1"
                    />
                    <span className="truncate max-w-[80px]">{account.name}</span>
                  </button>
                ))}
              </div>
            )}
            
            {/* Platform-specific Preview - Now with proper scrolling */}
            <div className="flex-grow overflow-y-auto max-h-[500px] space-y-4 pr-2 custom-scrollbar">
              {activeAccounts.map((account, index) => (
                <div key={index} className="relative">
                  {index > 0 && (
                    <div className="absolute -top-2 left-0 right-0 h-px bg-gray-200 dark:bg-gray-700"></div>
                  )}
                  
                  <div className="mb-1 pb-1 flex items-center justify-between sticky top-0 bg-white dark:bg-gray-800 z-10 pt-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                      <img 
                        src={`https://i.pravatar.cc/150?img=${account.id || index + 11}`}
                        alt={account.name}
                        className="h-4 w-4 rounded-full mr-1"
                      />
                      {account.name}
                    </span>
                  </div>
                  
                  {renderPlatformPreview(account)}
                </div>
              ))}
            </div>
            
            {/* Platform-specific features message */}
            <div className="mt-3 text-xs text-center text-gray-500 dark:text-gray-400 flex-shrink-0">
              {activePlatform === 'instagram' ? (
                <p>Instagram supports images, videos, stories, and reels</p>
              ) : activePlatform === 'facebook' ? (
                <p>Facebook supports text posts, images, videos, and events</p>
              ) : activePlatform === 'twitter' || activePlatform === 'x' ? (
                <p>Twitter supports text up to 280 characters, images, and videos</p>
              ) : activePlatform === 'linkedin' ? (
                <p>LinkedIn supports text posts, articles, images, and documents</p>
              ) : activePlatform === 'tiktok' ? (
                <p>TikTok supports short-form videos and images</p>
              ) : activePlatform === 'youtube' ? (
                <p>YouTube supports longer-form video content</p>
              ) : (
                <p>Select an account to see platform-specific features</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to get platform color
const getPlatformColor = (platform = '') => {
  const platformColors = {
    facebook: '#1877F2',
    instagram: '#E4405F',
    tiktok: '#000000',
    linkedin: '#0A66C2',
    youtube: '#FF0000',
    twitter: '#1DA1F2',
    x: '#000000'
  };

  return platformColors[platform.toLowerCase()] || '#4F46E5';
};

export default PostEditor;
 