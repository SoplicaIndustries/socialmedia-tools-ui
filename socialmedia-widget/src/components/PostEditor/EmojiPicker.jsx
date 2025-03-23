import React from 'react';
import PropTypes from 'prop-types';

/**
 * Simple emoji picker component
 */
const EmojiPicker = ({ onEmojiSelect, onClose }) => {
  // Common emojis for social media posts
  const emojis = [
    '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', 
    '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', 
    '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', 
    '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', 
    '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '❣️', '💕', '💞',
    '👍', '👎', '👏', '🙌', '👌', '🤌', '🤞', '✌️', '🤟', '🤘',
    '👋', '🤚', '🖐️', '✋', '🖖', '👆', '👇', '👈', '👉', '🤙',
    '🔥', '✨', '⭐', '💫', '🌟', '💯', '💢', '💥', '💦', '💨'
  ];

  const handleEmojiClick = (emoji) => {
    onEmojiSelect(emoji);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-md font-medium text-gray-700 dark:text-gray-300">Emoji Picker</h3>
        <button 
          onClick={onClose} 
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          ✕
        </button>
      </div>
      <div className="grid grid-cols-8 gap-2">
        {emojis.map((emoji, index) => (
          <button
            key={index}
            onClick={() => handleEmojiClick(emoji)}
            className="h-8 w-8 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer text-xl transition-colors"
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

EmojiPicker.propTypes = {
  onEmojiSelect: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default EmojiPicker;
