import React from 'react';
import { motion } from 'framer-motion';
import { CallLog } from '../../types';
import { Phone, Video, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

interface CallLogItemProps {
  log: CallLog;
}

const formatTimestamp = (date: Date) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const logDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  if (logDate.getTime() === today.getTime()) {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  }
  
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  if (logDate.getTime() === yesterday.getTime()) {
    return 'Yesterday';
  }

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const CallLogItem: React.FC<CallLogItemProps> = ({ log }) => {
  const isMissed = log.direction === 'missed';
  const DirectionIcon = log.direction === 'outgoing' ? ArrowUpRight : ArrowDownLeft;
  const CallIcon = log.type === 'video' ? Video : Phone;

  return (
    <motion.div
      whileHover={{ backgroundColor: 'rgba(var(--color-surface-hover))' }}
      className="flex items-center p-4 cursor-pointer rounded-2xl transition-colors duration-200"
      style={{ '--color-surface-hover': 'var(--color-surface)' } as React.CSSProperties}
    >
      <div className="relative mr-4">
        <img src={log.chatAvatar} alt={log.chatName} className="w-14 h-14 rounded-2xl object-cover" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1">
          <h3 className={`font-semibold truncate ${isMissed ? 'text-error' : 'text-text-primary dark:text-dark-text-primary'}`}>
            {log.chatName}
          </h3>
          <span className="text-xs text-text-muted dark:text-dark-text-muted whitespace-nowrap">
            {formatTimestamp(log.timestamp)}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <DirectionIcon size={14} className={isMissed ? 'text-error' : 'text-text-muted'} />
          <span className="text-sm text-text-muted dark:text-dark-text-muted">
            {log.direction === 'outgoing' ? 'Outgoing' : 'Incoming'}
          </span>
        </div>
      </div>

      <div className="ml-4">
        <CallIcon size={20} className="text-wooqoo-primary" />
      </div>
    </motion.div>
  );
};
