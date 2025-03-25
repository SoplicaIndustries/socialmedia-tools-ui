import React from 'react';

const YouTubePreview = ({ account, caption }) => {
  return (
    <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-900 mx-auto">
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
