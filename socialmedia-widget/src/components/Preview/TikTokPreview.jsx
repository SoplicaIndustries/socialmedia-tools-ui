import React from 'react';
import { FaImage } from 'react-icons/fa';

const TikTokPreview = ({ account, caption, media, selectedMediaIndex, formatCaptionForPreview, isVideo, goToPrevMedia, goToNextMedia, selectMediaDot }) => {
  const currentMedia = media[selectedMediaIndex !== null ? selectedMediaIndex : 0];
  
  return (
    <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden bg-black mx-auto">
      <div className="aspect-[4/5] max-h-[400px] relative">
        {/* Video/Image Preview with carousel */}
        {media.length > 0 ? (
          <>
            {currentMedia && isVideo(currentMedia) ? (
              <video 
                src={currentMedia.url} 
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              <img 
                src={currentMedia ? currentMedia.url : ''}
                alt="Post media" 
                className="absolute inset-0 w-full h-full object-cover"
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

export default TikTokPreview;
