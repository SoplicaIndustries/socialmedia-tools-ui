import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useTheme } from '../../theme/ThemeContext';
import EmojiPicker from './EmojiPicker';
import { FaSmile, FaImage, FaEye, FaPen, FaHashtag, FaFont, FaTh, FaMapMarkerAlt, FaGlobe, 
  FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube, FaTiktok, FaChevronLeft, FaChevronRight,
  FaCalendarAlt, FaPaperPlane, FaSearch, FaVideo, FaTimes, FaSave, FaChevronDown } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { InstagramPreview, FacebookPreview, TwitterPreview, LinkedInPreview, TikTokPreview, YouTubePreview } from '../Preview';

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
  const handleMediaChange = (e, mediaType = 'image') => {
    if (e.target.files && e.target.files[0]) {
      const filesArray = Array.from(e.target.files);
      
      // Process up to 5 files
      const newMediaPromises = filesArray.slice(0, 5).map(file => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            // Store media type along with the data URL
            resolve({
              url: e.target.result,
              type: file.type.startsWith('video/') ? 'video' : 'image',
              file: file
            });
          };
          reader.readAsDataURL(file);
        });
      });
      
      Promise.all(newMediaPromises).then(newMedia => {
        setMedia(prev => [...prev, ...newMedia].slice(0, 5)); // Limit to 5 media items total
        if (selectedMediaIndex === null) {
          setSelectedMediaIndex(0); // Select first item if none selected
        }
      });
    }
  };
  
  // Helper function to check if a media item is a video
  const isVideo = (mediaItem) => {
    return mediaItem && mediaItem.type === 'video';
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
    
    const commonProps = {
      account,
      caption,
      media,
      location,
      selectedMediaIndex,
      timestamp,
      formatCaptionForPreview,
      isVideo,
      goToPrevMedia,
      goToNextMedia,
      selectMediaDot
    };
    
    switch (platform) {
      case 'facebook':
        return <FacebookPreview {...commonProps} />;
      case 'twitter':
      case 'x':
        return <TwitterPreview {...commonProps} />;
      case 'linkedin':
        return <LinkedInPreview {...commonProps} />;
      case 'tiktok':
        return <TikTokPreview {...commonProps} />;
      case 'youtube':
        return <YouTubePreview {...commonProps} />;
      case 'instagram':
      default:
        return <InstagramPreview {...commonProps} />;
    }
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

  // New state for tracking overflow and scroll position
  const [hasOverflow, setHasOverflow] = useState(false);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  const previewScrollContainerRef = useRef(null);
  
  // Check for overflow in preview container
  useEffect(() => {
    const checkOverflow = () => {
      const container = previewScrollContainerRef.current;
      if (container) {
        const hasVerticalOverflow = container.scrollHeight > container.clientHeight;
        setHasOverflow(hasVerticalOverflow);
        
        // Check if scrolled to bottom
        const isAtBottom = Math.abs((container.scrollHeight - container.scrollTop) - container.clientHeight) < 20;
        setIsScrolledToBottom(isAtBottom);
      }
    };
    
    // Check initially and when content might change
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    
    return () => {
      window.removeEventListener('resize', checkOverflow);
    };
  }, [media, activeAccounts, activePlatform]);
  
  // Track scroll position to update UI
  const handleScroll = () => {
    const container = previewScrollContainerRef.current;
    if (container) {
      const isAtBottom = Math.abs((container.scrollHeight - container.scrollTop) - container.clientHeight) < 20;
      setIsScrolledToBottom(isAtBottom);
    }
  };
  
  // Scroll to the bottom when arrow is clicked
  const scrollToBottom = () => {
    const container = previewScrollContainerRef.current;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col h-full">
      {/* Header section */}
      <div className="flex border-b border-gray-200 dark:border-gray-600 flex-shrink-0">
        {/* Left section - accounts display */}
        <div className={`p-4 bg-gray-50 dark:bg-gray-700 ${showPreview ? 'md:w-3/5' : 'w-full'} flex items-center border-r border-gray-200 dark:border-gray-600`}>
          {/* Only showing "Posting to" with account avatars */}
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
        
        {/* Right section - full width platform switcher */}
        {showPreview && (
          <div className="md:w-2/5 bg-gray-50 dark:bg-gray-700 flex items-center justify-center">
            {/* Platform switcher now takes full width */}
            {availablePlatforms.length > 1 && (
              <div className="flex items-center justify-center w-full px-4 py-3">
                <button 
                  onClick={goToPreviousPlatform}
                  className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300"
                >
                  <FaChevronLeft size={14} />
                </button>
                
                <div className="flex-grow mx-4 text-center">
                  {activePlatform && (
                    <div className="flex items-center justify-center">
                      <div className="h-5 w-5 mr-2">
                        {React.createElement(getPlatformIcon(activePlatform), {
                          className: "h-full w-full",
                          style: { color: getPlatformColor(activePlatform) }
                        })}
                      </div>
                      <span className="text-sm font-medium capitalize">{activePlatform}</span>
                    </div>
                  )}
                </div>
                
                <button 
                  onClick={goToNextPlatform}
                  className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300"
                >
                  <FaChevronRight size={14} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Main content area - Using flex with h-full to fill available space */}
      <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
        {/* Editor Panel */}
        <div className={`flex flex-col ${showPreview ? 'md:w-3/5' : 'w-full'} overflow-hidden`}>
          {/* Account Selector - Now with flex-shrink-0 to prevent shrinking */}
          {accountSelector && (
            <div className="p-4 border-b border-gray-200 dark:border-gray-600 flex-shrink-0">
              {accountSelector}
            </div>
          )}
          
          {/* Editor Content - Using flex-grow to take available space */}
          <div className="p-4 flex-grow overflow-y-auto custom-scrollbar">
            {/* Content Composition Area */}
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
            
            {/* Media Attachments Section */}
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
                        <img src={src.url} alt={`Media ${index + 1}`} className="w-full h-full object-cover" />
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
          </div>
          
          {/* Post Controls - Bottom of the editor section with flex-shrink-0 */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-600 flex-shrink-0">
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
        </div>
        
        {/* Preview Panel - Fixed to not exceed container height */}
        {showPreview && (
          <div className="md:w-2/5 border-l border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden">
            {/* Platform Account Tabs - With flex-shrink-0 */}
            {activeAccounts.length > 1 && (
              <div className="flex-shrink-0 p-2 border-b border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 overflow-x-auto">
                <div className="flex pb-1 scrollbar-thin">
                  {activeAccounts.map((account, index) => (
                    <button
                      key={index}
                      className={`flex-shrink-0 flex items-center px-2 py-1 mr-2 rounded-full text-xs ${
                        index === 0
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
              </div>
            )}
            
            {/* Platform-specific Preview - Now with strict height limits and scroll indicator */}
            <div 
              ref={previewScrollContainerRef}
              onScroll={handleScroll}
              className="flex-grow overflow-y-auto custom-scrollbar relative"
              style={{ minHeight: '0', maxHeight: '100%' }} // Strict height control
            >
              <div className="p-4 space-y-4">
                {activeAccounts.map((account, index) => (
                  <div key={index} className="relative">
                    {/* No divider or account header anymore */}
                    {renderPlatformPreview(account)}
                  </div>
                ))}
              </div>
              
              {/* Enhanced scroll indicator arrow - more visible */}
              {hasOverflow && !isScrolledToBottom && (
                <div 
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer z-20"
                  onClick={scrollToBottom}
                >
                  <div className="bg-gray-800/80 dark:bg-gray-600/90 text-white rounded-full p-2.5 shadow-lg">
                    <FaChevronDown className="h-5 w-5" />
                  </div>
                </div>
              )}
            </div>
            
            {/* Platform-specific features message - Now with flex-shrink-0 and matching padding */}
            <div className="p-4 text-xs text-center text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 flex-shrink-0">
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
