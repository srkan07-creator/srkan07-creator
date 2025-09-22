import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { ChatListScreen } from './components/chat/ChatListScreen';
import { ConversationScreen } from './components/chat/ConversationScreen';
import { AccountScreen } from './components/account/AccountScreen';
import { CallScreen } from './components/call/CallScreen';
import { StoryViewer } from './components/story/StoryViewer';
import { AccountSettingsScreen } from './components/account/sub/AccountSettingsScreen';
import { PrivacySettingsScreen } from './components/account/sub/PrivacySettingsScreen';
import { AppearanceSettingsScreen } from './components/account/sub/AppearanceSettingsScreen';
import { NotificationsSettingsScreen } from './components/account/sub/NotificationsSettingsScreen';
import { HelpSettingsScreen } from './components/account/sub/HelpSettingsScreen';
import { Chat, User, CallLog } from './types';
import { motion, AnimatePresence } from 'framer-motion';
import { mockUsers, mockChats, mockCallLogs } from './data/mockData';

type AppView = 
  | 'chatList' 
  | 'conversation' 
  | 'account' 
  | 'call' 
  | 'storyViewer'
  | 'accountSettings'
  | 'privacySettings'
  | 'appearanceSettings'
  | 'notificationsSettings'
  | 'helpSettings';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('chatList');
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [callType, setCallType] = useState<'audio' | 'video' | null>(null);
  const [storyUser, setStoryUser] = useState<User | null>(null);
  
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [chats, setChats] = useState<Chat[]>(mockChats);
  const [callLogs, setCallLogs] = useState<CallLog[]>(mockCallLogs);

  const handleChatSelect = (chat: Chat) => {
    setSelectedChat(chat);
    setView('conversation');
  };

  const handleBack = () => {
    if (view === 'conversation' || view === 'account') {
      setView('chatList');
      setSelectedChat(null);
    } else if (view === 'call') {
      setView('conversation'); // Go back to chat after a call
      setCallType(null);
    } else if (view === 'storyViewer') {
      setView('chatList');
      setStoryUser(null);
    } else if (['accountSettings', 'privacySettings', 'appearanceSettings', 'notificationsSettings', 'helpSettings'].includes(view)) {
      setView('account');
    }
  };

  const handleNavigateToAccount = () => {
    setView('account');
  };

  const handleNavigateToSettingsSubPage = (page: AppView) => {
    setView(page);
  }

  const handleStartCall = (chat: Chat, type: 'audio' | 'video') => {
    setSelectedChat(chat);
    setCallType(type);
    setView('call');
  };

  const handleViewStories = (user: User) => {
    setStoryUser(user);
    setView('storyViewer');
    // Mark stories as read
    setUsers(prev => prev.map(u => u.id === user.id ? { ...u, hasUnreadStories: false } : u));
  };

  const handleSaveContact = (userId: string, name: string) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, name, isSaved: true } : user
      )
    );
    setChats(prevChats =>
      prevChats.map(chat => {
        if (chat.participants.some(p => p.id === userId)) {
          const updatedParticipants = chat.participants.map(p =>
            p.id === userId ? { ...p, name, isSaved: true } : p
          );
          return { ...chat, participants: updatedParticipants };
        }
        return chat;
      })
    );
    if (selectedChat && selectedChat.participants.some(p => p.id === userId)) {
      setSelectedChat(prev => {
        if (!prev) return null;
        const updatedParticipants = prev.participants.map(p =>
          p.id === userId ? { ...p, name, isSaved: true } : p
        );
        return { ...prev, participants: updatedParticipants };
      });
    }
  };

  const renderContent = () => {
    switch (view) {
      case 'conversation':
        return selectedChat && (
          <motion.div key="conversation" className="w-full" {...screenAnimation}>
            <ConversationScreen
              chat={selectedChat}
              onBack={handleBack}
              onSaveContact={handleSaveContact}
              onStartCall={(type) => handleStartCall(selectedChat, type)}
            />
          </motion.div>
        );
      case 'account':
        return (
          <motion.div key="account" className="w-full" {...screenAnimation}>
            <AccountScreen onBack={handleBack} onNavigate={handleNavigateToSettingsSubPage} />
          </motion.div>
        );
      case 'call':
        return selectedChat && callType && (
          <motion.div key="call" className="w-full" {...screenAnimation}>
            <CallScreen
              chat={selectedChat}
              type={callType}
              onEndCall={handleBack}
            />
          </motion.div>
        );
      case 'storyViewer':
        return storyUser && (
          <motion.div key="story-viewer" className="w-full" {...screenAnimation}>
            <StoryViewer user={storyUser} onClose={handleBack} />
          </motion.div>
        );
      case 'accountSettings':
        return <motion.div key="account-settings" {...screenAnimation}><AccountSettingsScreen onBack={handleBack} /></motion.div>;
      case 'privacySettings':
        return <motion.div key="privacy-settings" {...screenAnimation}><PrivacySettingsScreen onBack={handleBack} /></motion.div>;
      case 'appearanceSettings':
        return <motion.div key="appearance-settings" {...screenAnimation}><AppearanceSettingsScreen onBack={handleBack} /></motion.div>;
      case 'notificationsSettings':
        return <motion.div key="notifications-settings" {...screenAnimation}><NotificationsSettingsScreen onBack={handleBack} /></motion.div>;
      case 'helpSettings':
        return <motion.div key="help-settings" {...screenAnimation}><HelpSettingsScreen onBack={handleBack} /></motion.div>;
      case 'chatList':
      default:
        return (
          <motion.div key="chat-list" className="w-full" {...screenAnimation}>
            <ChatListScreen
              chats={chats}
              users={users}
              callLogs={callLogs}
              onChatSelect={handleChatSelect}
              onNavigateToAccount={handleNavigateToAccount}
              onViewStories={handleViewStories}
            />
          </motion.div>
        );
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-paper dark:bg-dark-background flex justify-center">
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
};

const screenAnimation = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: 0.3, ease: 'easeInOut' },
};

export default App;
