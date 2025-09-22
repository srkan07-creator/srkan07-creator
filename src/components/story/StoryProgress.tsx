import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface StoryProgressProps {
  count: number;
  current: number;
  isPaused: boolean;
  duration: number;
}

export const StoryProgress: React.FC<StoryProgressProps> = ({ count, current, isPaused, duration }) => {
  return (
    <div className="flex space-x-1">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
          {index < current && <div className="h-full w-full bg-white" />}
          {index === current && (
            <motion.div
              className="h-full bg-white"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: duration, ease: 'linear' }}
            />
          )}
        </div>
      ))}
    </div>
  );
};
