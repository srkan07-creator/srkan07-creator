import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Chat } from '../../types';
import { CallControls } from './CallControls';
import { Clock } from 'lucide-react';

interface CallScreenProps {
  chat: Chat;
  type: 'audio' | 'video';
  onEndCall: () => void;
}

const formatDuration = (seconds: number) => {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
};

export const CallScreen: React.FC<CallScreenProps> = ({ chat, type, onEndCall }) => {
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(type === 'audio');

  const participant = chat.participants[0];
  const chatName = chat.type === 'private' ? participant.name : chat.name!;
  const avatar = chat.type === 'private' ? participant.avatar : chat.avatar!;

  useEffect(() => {
    const timer = setInterval(() => {
      setDuration(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-md mx-auto h-screen flex flex-col bg-dark-background text-white relative">
      {/* Background Video/Image */}
      <AnimatePresence>
        {type === 'video' && !isCameraOff && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-cover bg-center" 
            style={{ backgroundImage: `url(${avatar})` }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-8 text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }}>
          <img src={avatar} alt={chatName} className="w-32 h-32 rounded-3xl object-cover shadow-2xl mx-auto mb-4" />
          <h1 className="text-3xl font-bold">{chatName}</h1>
          <div className="flex items-center justify-center space-x-2 mt-2 text-lg text-white/80">
            <Clock size={16} />
            <span>{formatDuration(duration)}</span>
          </div>
        </motion.div>
      </div>

      {/* PiP for own video */}
      {type === 'video' && (
        <motion.div 
          drag 
          dragConstraints={{ top: -200, left: -100, right: 100, bottom: 200 }}
          className="absolute top-6 right-6 w-24 h-32 bg-dark-surface rounded-2xl overflow-hidden shadow-lg border-2 border-white/20 cursor-grab active:cursor-grabbing"
        >
          {isCameraOff ? (
            <div className="w-full h-full bg-black flex items-center justify-center">
              <p className="text-xs text-text-muted">You</p>
            </div>
          ) : (
            <img src="https://i.pravatar.cc/150?u=current-user" alt="My video" className="w-full h-full object-cover" />
          )}
        </motion.div>
      )}

      {/* Controls */}
      <div className="relative z-10 p-6">
        <CallControls
          isMuted={isMuted}
          isCameraOff={isCameraOff}
          onToggleMute={() => setIsMuted(!isMuted)}
          onToggleCamera={() => setIsCameraOff(!isCameraOff)}
          onEndCall={onEndCall}
          showCameraToggle={type === 'video'}
        />
      </div>
    </div>
  );
};
