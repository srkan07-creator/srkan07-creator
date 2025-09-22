import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Paperclip, Mic, Send, Sparkles, BarChart3, Pause } from 'lucide-react';

interface MessageComposerProps {
  onSend: (message: string, type?: 'text' | 'voice', additionalData?: any) => void;
  onQooToggle: () => void;
  onPollCreate: () => void;
  showQooPanel: boolean;
  isGroup: boolean;
}

export const MessageComposer: React.FC<MessageComposerProps> = ({ 
  onSend, 
  onQooToggle, 
  onPollCreate,
  showQooPanel, 
  isGroup 
}) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message.trim());
      setMessage('');
    }
  };

  const handleVoiceRecord = () => {
    if (isRecording) {
      // Stop recording and send voice message
      const voiceData = {
        duration: recordingDuration,
        transcript: "Voice message transcription would appear here",
        audioUrl: "https://audio-sample.com/voice-note.mp3",
      };
      onSend('', 'voice', { voiceData });
      setIsRecording(false);
      setRecordingDuration(0);
    } else {
      // Start recording
      setIsRecording(true);
      const timer = setInterval(() => {
        setRecordingDuration(prev => {
          if (prev >= 60) {
            clearInterval(timer);
            setIsRecording(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
  };

  return (
    <div className="p-4 bg-surface dark:bg-dark-surface border-t border-paper dark:border-dark-background/50">
      <AnimatePresence>
        {isRecording && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-3 p-3 bg-wooqoo-coral/10 rounded-xl flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-3 h-3 bg-wooqoo-coral rounded-full"
              />
              <span className="text-sm font-medium text-text-primary dark:text-dark-text-primary">
                Recording... {recordingDuration}s
              </span>
            </div>
            <button
              onClick={() => {
                setIsRecording(false);
                setRecordingDuration(0);
              }}
              className="text-text-muted hover:text-error"
            >
              Cancel
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center space-x-2">
        <button
          onClick={onQooToggle}
          className={`p-2 rounded-full transition-colors ${
            showQooPanel 
              ? 'bg-wooqoo-primary text-white' 
              : 'bg-paper dark:bg-dark-background text-wooqoo-primary hover:bg-wooqoo-primary/10'
          }`}
        >
          <Sparkles size={18} />
        </button>

        {isGroup && (
          <button
            onClick={onPollCreate}
            className="p-2 rounded-full bg-paper dark:bg-dark-background text-text-muted hover:text-wooqoo-primary transition-colors"
          >
            <BarChart3 size={18} />
          </button>
        )}
        
        <form onSubmit={handleSubmit} className="flex items-center space-x-2 flex-1">
          <button
            type="button"
            className="p-2 rounded-full bg-paper dark:bg-dark-background text-text-muted hover:text-wooqoo-primary transition-colors"
          >
            <Paperclip size={18} />
          </button>
          
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message..."
              className="w-full bg-paper dark:bg-dark-background border-none rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-wooqoo-primary outline-none"
              disabled={isRecording}
            />
          </div>
          
          {message.trim() ? (
            <motion.button
              type="submit"
              whileTap={{ scale: 0.9 }}
              className="p-2.5 bg-wooqoo-primary text-white rounded-full hover:bg-wooqoo-primary/90 transition-colors"
            >
              <Send size={18} />
            </motion.button>
          ) : (
            <motion.button
              type="button"
              onClick={handleVoiceRecord}
              whileTap={{ scale: 0.9 }}
              className={`p-2.5 rounded-full transition-colors ${
                isRecording 
                  ? 'bg-wooqoo-coral text-white' 
                  : 'bg-paper dark:bg-dark-background text-text-muted hover:text-wooqoo-primary'
              }`}
            >
              {isRecording ? <Pause size={18} /> : <Mic size={18} />}
            </motion.button>
          )}
        </form>
      </div>
    </div>
  );
};
