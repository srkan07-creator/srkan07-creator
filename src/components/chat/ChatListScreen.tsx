import React, { useState } from 'react';
import { Search, MessageSquare, Phone, User, Settings, Plus, Compass, CircleDashed } from 'lucide-react';
import { ChatListItem } from './ChatListItem';
import { DiscoveryTab } from './DiscoveryTab';
import { ContactsTab } from './ContactsTab';
import { CallsTab } from './CallsTab';
import { StatusTab } from '../story/StatusTab';
import { WooqooLogo } from '../ui/WooqooLogo';
import { useTheme } from '../../contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Chat, User as UserType, CallLog } from '../../types';

const tabs = [
  { id: 'chats', label: 'Chats', icon: MessageSquare },
  { id: 'status', label: 'Status', icon: CircleDashed },
  { id: 'calls', label: 'Calls', icon: Phone },
  { id: 'discover', label: 'Discover', icon: Compass },
  { id: 'contacts', label: 'Contacts', icon: User },
];

interface ChatListScreenProps {
  chats: Chat[];
  users: UserType[];
  callLogs: CallLog[];
  onChatSelect: (chat: Chat) => void;
  onNavigateToAccount: () => void;
  onViewStories: (user: UserType) => void;
}

export const ChatListScreen: React.FC<ChatListScreenProps> = ({ chats, users, callLogs, onChatSelect, onNavigateToAccount, onViewStories }) => {
  const [activeTab, setActiveTab] = useState('chats');
  const { isDarkMode, toggleDarkMode } = useTheme();

  const renderTabContent = () => {
    switch (activeTab) {
      case 'status':
        return <StatusTab users={users} onViewStories={onViewStories} />;
      case 'discover':
        return <DiscoveryTab />;
      case 'calls':
        return <CallsTab callLogs={callLogs} onChatSelect={onChatSelect} chats={chats} />;
      case 'contacts':
        return <ContactsTab contacts={users.filter(u => u.isSaved)} />;
      default:
        return (
          <main className="flex-1 overflow-y-auto p-2">
            <AnimatePresence>
              {chats.map((chat, index) => (
                <motion.div
                  key={chat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => onChatSelect(chat)}
                >
                  <ChatListItem chat={chat} />
                </motion.div>
              ))}
            </AnimatePresence>
          </main>
        );
    }
  };

  return (
    <div className="w-full max-w-md mx-auto h-screen flex flex-col bg-surface dark:bg-dark-surface shadow-md">
      {/* Header */}
      <header className="p-4 border-b border-paper dark:border-dark-background/50 sticky top-0 bg-surface dark:bg-dark-surface z-10">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <WooqooLogo />
            <h1 className="text-xl font-bold text-text-primary dark:text-dark-text-primary">Wooqoo</h1>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-paper dark:hover:bg-dark-background">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={onNavigateToAccount} className="p-2 rounded-full hover:bg-paper dark:hover:bg-dark-background">
              <Settings size={20} />
            </button>
          </div>
        </div>
        {(activeTab === 'chats' || activeTab === 'contacts' || activeTab === 'calls') && (
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder={
                activeTab === 'chats' ? "Search chats, people or Qoo" :
                activeTab === 'contacts' ? "Search contacts" : "Search call history"
              }
              className="w-full bg-paper dark:bg-dark-background border-none rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-wooqoo-primary outline-none"
            />
          </div>
        )}
      </header>

      {/* Tab Navigation */}
      <nav className="flex justify-around p-2 border-b border-paper dark:border-dark-background/50">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center space-y-1 p-2 rounded-xl w-16 transition-colors ${
              activeTab === tab.id ? 'text-wooqoo-primary' : 'text-text-muted'
            }`}
          >
            <tab.icon size={24} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
            <span className="text-xs font-semibold">{tab.label}</span>
            {activeTab === tab.id && (
              <motion.div className="w-1.5 h-1.5 bg-wooqoo-primary rounded-full" layoutId="active-tab-indicator" />
            )}
          </button>
        ))}
      </nav>

      {/* Tab Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {renderTabContent()}
      </div>
      
      {/* FAB */}
      {(activeTab === 'chats' || activeTab === 'contacts') && (
        <div className="absolute bottom-6 right-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-16 h-16 bg-wooqoo-primary rounded-2xl flex items-center justify-center text-white shadow-lg"
          >
            <Plus size={32} />
          </motion.button>
        </div>
      )}
    </div>
  );
};
