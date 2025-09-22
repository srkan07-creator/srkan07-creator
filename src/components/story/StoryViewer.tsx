import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User } from '../../types';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { StoryProgress } from './StoryProgress';

interface StoryViewerProps {
  user: User;
  onClose: () => void;
}

export const StoryViewer: React.FC<StoryViewerProps> = ({ user, onClose }) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const stories = user.stories || [];
  const currentStory = stories[currentStoryIndex];

  const goToNext = () => {
    setCurrentStoryIndex(prev => (prev < stories.length - 1 ? prev + 1 : prev));
    if (currentStoryIndex === stories.length - 1) onClose();
  };

  const goToPrev = () => {
    setCurrentStoryIndex(prev => (prev > 0 ? prev - 1 : prev));
  };

  useEffect(() => {
    if (!isPaused) {
      const timer = setTimeout(goToNext, currentStory.duration * 1000);
      return () => clearTimeout(timer);
    }
  }, [currentStoryIndex, isPaused]);

  return (
    <div 
      className="w-full max-w-md mx-auto h-screen flex flex-col bg-black text-white relative"
      onMouseDown={() => setIsPaused(true)}
      onMouseUp={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="absolute top-0 left-0 right-0 p-4 z-20 bg-gradient-to-b from-black/50 to-transparent">
        <StoryProgress count={stories.length} current={currentStoryIndex} isPaused={isPaused} duration={currentStory.duration} />
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-3">
            <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-xs text-white/80">Just now</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2"><X size={24} /></button>
        </div>
      </div>
      
      <AnimatePresence initial={false}>
        <motion.div
          key={currentStoryIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex-1 flex items-center justify-center"
        >
          <img src={currentStory.url} alt="Story" className="max-h-full max-w-full object-contain" />
        </motion.div>
      </AnimatePresence>

      {/* Navigation areas */}
      <div className="absolute left-0 top-0 bottom-0 w-1/3 z-30" onClick={goToPrev} />
      <div className="absolute right-0 top-0 bottom-0 w-1/3 z-30" onClick={goToNext} />

      <div className="absolute bottom-0 left-0 right-0 p-4 z-20 bg-gradient-to-t from-black/50 to-transparent">
        {/* Reply input could go here */}
      </div>
    </div>
  );
};
