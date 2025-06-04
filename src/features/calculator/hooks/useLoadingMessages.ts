import { useState, useEffect } from 'react';

export const useLoadingMessages = (messages: string[], interval = 2500) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === messages.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [messages.length, interval]);

  return messages[currentIndex];
};
