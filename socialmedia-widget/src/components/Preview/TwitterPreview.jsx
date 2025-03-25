import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

const TwitterPreview = ({ account, caption, media, location, selectedMediaIndex, formatCaptionForPreview, isVideo, goToPrevMedia, goToNextMedia, selectMediaDot }) => {
  const currentMedia = media[selectedMediaIndex !== null ? selectedMediaIndex : 0];

  // Twitter typically uses 16:9 for videos and maintains aspect ratio for images
  // with a maximum height constraint
  const getMediaContainerStyle = () => {
    if (!currentMedia) return null;

    if (isVideo(currentMedia)) {
      // Use 16:9 aspect ratio for videos on Twitter
      return { aspectRatio: '16/9', backgroundColor: '#000' };
    }

    // For images, maintain aspect ratio with max height
    return {
      maxHeight: '400px',
      backgroundColor: '#000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    };
  };

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
          
          {/* Post Image/Video - if available, with carousel */}
          {media.length > 0 && (
            <div className="mt-2 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 relative" style={getMediaContainerStyle()}>
              {currentMedia && isVideo(currentMedia) ? (
                <video 
                  src={currentMedia.url} 
                  className="w-full h-full object-contain"
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

export default TwitterPreview;
