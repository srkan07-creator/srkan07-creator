import React from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, Video, VideoOff, ScreenShare, UserPlus, PhoneOff } from 'lucide-react';

interface CallControlsProps {
  isMuted: boolean;
  isCameraOff: boolean;
  showCameraToggle: boolean;
  onToggleMute: () => void;
  onToggleCamera: () => void;
  onEndCall: () => void;
}

const ControlButton: React.FC<{
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}> = ({ onClick, className = 'bg-white/20 hover:bg-white/30', children }) => (
  <motion.button
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
    className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${className}`}
  >
    {children}
  </motion.button>
);

export const CallControls: React.FC<CallControlsProps> = ({
  isMuted,
  isCameraOff,
  showCameraToggle,
  onToggleMute,
  onToggleCamera,
  onEndCall,
}) => {
  return (
    <div className="flex justify-center items-center space-x-4">
      <ControlButton onClick={onToggleMute}>
        {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
      </ControlButton>
      
      {showCameraToggle && (
        <ControlButton onClick={onToggleCamera}>
          {isCameraOff ? <VideoOff size={24} /> : <Video size={24} />}
        </ControlButton>
      )}
      
      <ControlButton>
        <ScreenShare size={24} />
      </ControlButton>
      
      <ControlButton>
        <UserPlus size={24} />
      </ControlButton>
      
      <ControlButton onClick={onEndCall} className="bg-error hover:bg-red-500">
        <PhoneOff size={24} />
      </ControlButton>
    </div>
  );
};
