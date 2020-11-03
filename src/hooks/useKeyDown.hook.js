import React from 'react';

function useKeyDown(code, callback) {
  React.useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        callback();
      }
    }
    window.addEventListener('keydown', handleKeyPress);
    return () => {
    window.removeEventListener('keydown', handleKeyPress);
    };
  });
  return;
}

export default useKeyDown;
