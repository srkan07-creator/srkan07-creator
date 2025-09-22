import React from 'react';
import { motion } from 'framer-motion';
import { CallLog, Chat } from '../../types';
import { CallLogItem } from './CallLogItem';

interface CallsTabProps {
  callLogs: CallLog[];
  chats: Chat[];
  onChatSelect: (chat: Chat) => void;
}

export const CallsTab: React.FC<CallsTabProps> = ({ callLogs, chats, onChatSelect }) => {
  const handleCallLogClick = (chatId: string) => {
    const chat = chats.find(c => c.id === chatId);
    if (chat) {
      onChatSelect(chat);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-2">
      {callLogs.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-text-muted">No recent calls</p>
          </div>
        </div>
      ) : (
        callLogs.map((log, index) => (
          <motion.div
            key={log.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            onClick={() => handleCallLogClick(log.chatId)}
          >
            <CallLogItem log={log} />
          </motion.div>
        ))
      )}
    </div>
  );
};
