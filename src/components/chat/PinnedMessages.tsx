import React from 'react';
import { motion } from 'framer-motion';
import { X, Pin, Calendar } from 'lucide-react';
import { Message } from '../../types';

interface PinnedMessagesProps {
  messages: Message[];
  onClose: () => void;
  onUnpin: (messageId: string) => void;
}

export const PinnedMessages: React.FC<PinnedMessagesProps> = ({ messages, onClose, onUnpin }) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-end"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="w-full bg-surface dark:bg-dark-surface rounded-t-2xl max-h-96"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-paper dark:border-dark-background/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Pin size={20} className="text-wooqoo-primary" />
              <h3 className="font-semibold text-text-primary dark:text-dark-text-primary">
                Pinned Messages ({messages.length})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-paper dark:hover:bg-dark-background"
            >
              <X size={20} className="text-text-muted" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-80 p-4 space-y-3">
          {messages.length === 0 ? (
            <div className="text-center py-8">
              <Pin size={48} className="mx-auto text-text-muted mb-4" />
              <p className="text-text-muted">No pinned messages</p>
            </div>
          ) : (
            messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-paper dark:bg-dark-background rounded-xl p-3 border border-wooqoo-primary/20"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center space-x-2">
                    <Calendar size={14} className="text-text-muted" />
                    <span className="text-xs text-text-muted">
                      {formatDate(message.timestamp)}
                    </span>
                  </div>
                  <button
                    onClick={() => onUnpin(message.id)}
                    className="p-1 rounded-full hover:bg-wooqoo-coral/20 text-wooqoo-coral"
                  >
                    <Pin size={14} />
                  </button>
                </div>
                <p className="text-sm text-text-primary dark:text-dark-text-primary">
                  {message.text || (message.type === 'voice' ? '🎤 Voice message' : '📊 Poll')}
                </p>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};
