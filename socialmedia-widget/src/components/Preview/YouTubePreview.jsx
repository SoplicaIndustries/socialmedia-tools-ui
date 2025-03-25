import React from 'react';
import { FaImage } from 'react-icons/fa';

const YouTubePreview = ({ account, caption, media, selectedMediaIndex, isVideo, goToPrevMedia, goToNextMedia, selectMediaDot }) => {
  const currentMedia = media[selectedMediaIndex !== null ? selectedMediaIndex : 0];
  
  // Determine if the media is portrait/vertical orientation
  const isVerticalMedia = () => {
    if (!currentMedia || !currentMedia.url) return false;
    
    // YouTube now supports vertical videos (shorts) but typically still presents them in
    // a standard container. We'll handle both horizontal and vertical content.
    
    // For vertical content, we'll use a black background and contain approach
    // For horizontal content, we'll maintain 16:9 with cover
    return false; // This would ideally check media dimensions from a property
  };
  
  // Get container style for YouTube videos and thumbnails
  const getMediaContainerStyle = () => {
    // Maintain YouTube's preferred aspect ratio
    return {
      aspectRatio: '16/9', // Standard YouTube ratio
      backgroundColor: '#000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    };
  };
  
  // Determine optimal media display properties
  const getMediaStyle = () => {
    if (!currentMedia) return {};
    
    // Vertical videos (Shorts) need proper handling
    // YouTube shows black bars on sides for vertical videos rather than cropping
    return {
      maxWidth: '100%',
      maxHeight: '100%',
      margin: 'auto'
    };
  };
  
  return (
    <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-900 mx-auto">
      {/* Video thumbnail or preview - YouTube uses 16:9 aspect ratio */}
      {media.length > 0 ? (
        <div className="relative">
          <div className="w-full" style={getMediaContainerStyle()}>
            {currentMedia && isVideo(currentMedia) ? (
              <video 
                src={currentMedia.url} 
                style={getMediaStyle()}
                className="bg-black"
                autoPlay
                loop
                muted
                playsInline
                controls
              />
            ) : (
              <img 
                src={currentMedia ? currentMedia.url : ''} 
                alt="Video thumbnail" 
                style={getMediaStyle()}
                className="bg-black"
              />
            )}
            
            {/* Video duration (placeholder) */}
            <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
              0:30
            </div>
            
            {/* Media navigation for multiple media items */}
            {media.length > 1 && (
              <>
                {/* Media count indicator */}
                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs rounded px-1.5 py-0.5">
                  {selectedMediaIndex !== null ? selectedMediaIndex + 1 : 1}/{media.length}
                </div>
                
                {/* Navigation arrows */}
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
                
                {/* Media indicator dots */}
                <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                  {media.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => selectMediaDot(index, e)}
                      className={`w-2 h-2 rounded-full ${selectedMediaIndex === index ? 'bg-red-500' : 'bg-white/70'}`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="aspect-video bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
          <FaImage className="h-10 w-10 text-gray-400 dark:text-gray-600" />
        </div>
      )}
      
      {/* YouTube video info */}
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

export default YouTubePreview;
