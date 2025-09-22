import React from 'react';
import { motion } from 'framer-motion';
import { Chat } from '../../types';
import { VolumeX, Pin } from 'lucide-react';

interface ChatListItemProps {
  chat: Chat;
}

const formatTimestamp = (date: Date) => {
  const now = new Date();
  const diffSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffSeconds < 60) return 'Just now';
  
  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) return `${diffMinutes}m ago`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const ChatListItem: React.FC<ChatListItemProps> = ({ chat }) => {
  const lastMessage = chat.messages[chat.messages.length - 1];
  const chatName = chat.type === 'group' ? chat.name : chat.participants[0].name;
  const avatar = chat.type === 'group' ? chat.avatar : chat.participants[0].avatar;

  return (
    <motion.div
      whileHover={{ backgroundColor: 'rgba(var(--color-surface-hover))' }}
      className="flex items-center p-4 cursor-pointer rounded-2xl transition-colors duration-200"
      style={{ '--color-surface-hover': 'var(--color-surface)' } as React.CSSProperties}
    >
      <div className="relative mr-4">
        <img src={avatar} alt={chatName} className="w-14 h-14 rounded-2xl object-cover" />
        {chat.type === 'private' && chat.participants[0].isOnline && (
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-success rounded-full border-2 border-paper dark:border-dark-background" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1">
          <h3 className="font-semibold text-text-primary dark:text-dark-text-primary truncate">{chatName}</h3>
          <span className="text-xs text-text-muted dark:text-dark-text-muted whitespace-nowrap">
            {formatTimestamp(lastMessage.timestamp)}
          </span>
        </div>
        <div className="flex justify-between items-start">
          <p className="text-sm text-text-muted dark:text-dark-text-muted truncate pr-4">
            {lastMessage.text}
          </p>
          <div className="flex items-center space-x-2">
            {chat.isMuted && <VolumeX size={14} className="text-text-muted dark:text-dark-text-muted" />}
            {chat.unreadCount > 0 ? (
              <span className="bg-wooqoo-coral text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">
                {chat.unreadCount}
              </span>
            ) : (
              chat.isPinned && <Pin size={14} className="text-text-muted dark:text-dark-text-muted" />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
