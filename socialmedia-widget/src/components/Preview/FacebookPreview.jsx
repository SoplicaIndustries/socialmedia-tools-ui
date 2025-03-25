import React from 'react';
import { FaGlobe, FaMapMarkerAlt } from 'react-icons/fa';

const FacebookPreview = ({ account, caption, media, location, selectedMediaIndex, timestamp, formatCaptionForPreview, isVideo, goToPrevMedia, goToNextMedia, selectMediaDot }) => {
  const currentMedia = media[selectedMediaIndex !== null ? selectedMediaIndex : 0];
  
  // Facebook is flexible with aspect ratios but typically maintains the natural
  // aspect ratio of the media while fitting it within display constraints
  const getMediaContainerStyle = () => {
    if (!currentMedia) return null;
    
    // Updated container style to ensure full visibility without height cutting off
    return { 
      backgroundColor: '#000',
      position: 'relative',
      padding: '56.25% 0 0 0', // 16:9 aspect ratio container as fallback
      overflow: 'hidden'
    };
  };
  
  // Media style to ensure content is properly displayed
  const getMediaStyle = () => {
    return {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: '100%',
      maxHeight: '100%',
      width: 'auto',
      height: 'auto',
      objectFit: 'contain'
    };
  };
  
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
      
      {/* Post Image/Video - if available with carousel */}
      {media.length > 0 && (
        <div className="border-t border-b border-gray-200 dark:border-gray-700" style={getMediaContainerStyle()}>
          {currentMedia && isVideo(currentMedia) ? (
            <video 
              src={currentMedia.url} 
              style={getMediaStyle()}
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
              style={getMediaStyle()}
            />
          )}
          
          {/* Media count indicator */}
          {media.length > 1 && (
            <div className="absolute top-2 right-2 bg-black/70 text-white text-xs rounded px-1.5 py-0.5 z-10">
              {selectedMediaIndex !== null ? selectedMediaIndex + 1 : 1}/{media.length}
            </div>
          )}
          
          {/* Media navigation arrows */}
          {media.length > 1 && (
              <>
                <button 
                  onClick={goToPrevMedia}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/60 rounded-full text-white hover:bg-black/80 z-10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button 
                  onClick={goToNextMedia}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/60 rounded-full text-white hover:bg-black/80 z-10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </>
            )}
            
            {/* Media indicator dots */}
            {media.length > 1 && (
              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-10">
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03 8 9 8s9-3.582 9-8z" />
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

export default FacebookPreview;
