import React from 'react';
import { FaImage } from 'react-icons/fa';

const InstagramPreview = ({ account, caption, media, location, selectedMediaIndex, timestamp, formatCaptionForPreview, isVideo, goToPrevMedia, goToNextMedia, selectMediaDot }) => {
  const currentMedia = media[selectedMediaIndex !== null ? selectedMediaIndex : 0];
  
  // Instagram prioritizes keeping the entire image visible
  // Most posts are square, but Instagram now supports different aspect ratios
  const getMediaContainerStyle = () => {
    if (!currentMedia) return null;
    
    // Default to square container for Instagram
    // But we'll add proper padding to maintain aspect ratio
    return { 
      aspectRatio: '1/1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#000'
    };
  };
  
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
      
      {/* Post Image/Video with carousel - Now with proper aspect ratio */}
      <div className="bg-black relative" style={getMediaContainerStyle()}>
        {media.length > 0 ? (
          <>
            {currentMedia && isVideo(currentMedia) ? (
              <video 
                src={currentMedia.url} 
                className="max-w-full max-h-full w-auto h-auto object-contain"
                autoPlay
                loop
                muted
                playsInline
                controls
              />
            ) : (
              <img 
                src={currentMedia ? currentMedia.url : ''} 
                alt="Post media" 
                className="max-w-full max-h-full w-auto h-auto object-contain"
              />
            )}
            
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
          <div className="w-full h-full flex items-center justify-center">
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

export default InstagramPreview;
