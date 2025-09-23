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
import { ChatInfoScreen } from './components/chat/ChatInfoScreen';
import { WelcomeScreen } from './components/auth/WelcomeScreen';
import { SignInScreen } from './components/auth/SignInScreen';
import { SignUpScreen } from './components/auth/SignUpScreen';
import { OnboardingScreen } from './components/auth/OnboardingScreen';
import { Chat, User, CallLog } from './types';
import { motion, AnimatePresence } from 'framer-motion';
import { mockUsers, mockChats, mockCallLogs } from './data/mockData';

type AppView = 
  | 'welcome'
  | 'signIn'
  | 'signUp'
  | 'onboarding'
  | 'chatList' 
  | 'conversation' 
  | 'account' 
  | 'call' 
  | 'storyViewer'
  | 'accountSettings'
  | 'privacySettings'
  | 'appearanceSettings'
  | 'notificationsSettings'
  | 'helpSettings'
  | 'chatInfo';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [view, setView] = useState<AppView>('welcome');
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [callType, setCallType] = useState<'audio' | 'video' | null>(null);
  const [storyUser, setStoryUser] = useState<User | null>(null);
  
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [chats, setChats] = useState<Chat[]>(mockChats);
  const [callLogs, setCallLogs] = useState<CallLog[]>(mockCallLogs);

  // --- Auth Handlers ---
  const handleSignInSuccess = (isNewUser = false) => {
    setIsAuthenticated(true);
    setView(isNewUser ? 'onboarding' : 'chatList');
  };

  const handleCompleteOnboarding = () => {
    setView('chatList');
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setView('welcome');
  };

  const navigateTo = (targetView: AppView) => setView(targetView);

  // --- Main App Handlers ---
  const handleChatSelect = (chat: Chat) => {
    setSelectedChat(chat);
    setView('conversation');
  };

  const handleBack = () => {
    if (view === 'conversation' || view === 'account') {
      setView('chatList');
      setSelectedChat(null);
    } else if (view === 'call') {
      setView('conversation');
      setCallType(null);
    } else if (view === 'storyViewer') {
      setView('chatList');
      setStoryUser(null);
    } else if (['accountSettings', 'privacySettings', 'appearanceSettings', 'notificationsSettings', 'helpSettings'].includes(view)) {
      setView('account');
    } else if (view === 'chatInfo') {
      setView('conversation');
    }
  };

  const handleNavigateToAccount = () => {
    setView('account');
  };
  
  const handleNavigateToChatInfo = () => {
    setView('chatInfo');
  }

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
    if (!isAuthenticated) {
      switch (view) {
        case 'signIn':
          return <motion.div key="signIn" {...screenAnimation} className="w-full h-full"><SignInScreen onSignIn={() => handleSignInSuccess()} onNavigateToSignUp={() => navigateTo('signUp')} /></motion.div>;
        case 'signUp':
          return <motion.div key="signUp" {...screenAnimation} className="w-full h-full"><SignUpScreen onSignUp={() => handleSignInSuccess(true)} onNavigateToSignIn={() => navigateTo('signIn')} /></motion.div>;
        case 'onboarding':
          return <motion.div key="onboarding" {...screenAnimation} className="w-full h-full"><OnboardingScreen onComplete={handleCompleteOnboarding} /></motion.div>;
        case 'welcome':
        default:
          return <motion.div key="welcome" {...screenAnimation} className="w-full h-full"><WelcomeScreen onNavigateToSignIn={() => navigateTo('signIn')} onNavigateToSignUp={() => navigateTo('signUp')} onSocialSignIn={() => handleSignInSuccess(true)} /></motion.div>;
      }
    }

    switch (view) {
      case 'conversation':
        return selectedChat && (
          <motion.div key="conversation" className="w-full h-full" {...screenAnimation}>
            <ConversationScreen
              chat={selectedChat}
              onBack={handleBack}
              onSaveContact={handleSaveContact}
              onStartCall={(type) => handleStartCall(selectedChat, type)}
              onNavigateToChatInfo={handleNavigateToChatInfo}
            />
          </motion.div>
        );
      case 'account':
        return (
          <motion.div key="account" className="w-full h-full" {...screenAnimation}>
            <AccountScreen onBack={handleBack} onNavigate={handleNavigateToSettingsSubPage} onSignOut={handleSignOut} />
          </motion.div>
        );
      case 'call':
        return selectedChat && callType && (
          <motion.div key="call" className="w-full h-full" {...screenAnimation}>
            <CallScreen
              chat={selectedChat}
              type={callType}
              onEndCall={handleBack}
            />
          </motion.div>
        );
      case 'storyViewer':
        return storyUser && (
          <motion.div key="story-viewer" className="w-full h-full" {...screenAnimation}>
            <StoryViewer user={storyUser} onClose={handleBack} />
          </motion.div>
        );
      case 'chatInfo':
        return selectedChat && (
          <motion.div key="chat-info" className="w-full h-full" {...screenAnimation}>
            <ChatInfoScreen chat={selectedChat} onBack={handleBack} />
          </motion.div>
        );
      case 'accountSettings':
        return <motion.div key="account-settings" className="w-full h-full" {...screenAnimation}><AccountSettingsScreen onBack={handleBack} /></motion.div>;
      case 'privacySettings':
        return <motion.div key="privacy-settings" className="w-full h-full" {...screenAnimation}><PrivacySettingsScreen onBack={handleBack} /></motion.div>;
      case 'appearanceSettings':
        return <motion.div key="appearance-settings" className="w-full h-full" {...screenAnimation}><AppearanceSettingsScreen onBack={handleBack} /></motion.div>;
      case 'notificationsSettings':
        return <motion.div key="notifications-settings" className="w-full h-full" {...screenAnimation}><NotificationsSettingsScreen onBack={handleBack} /></motion.div>;
      case 'helpSettings':
        return <motion.div key="help-settings" className="w-full h-full" {...screenAnimation}><HelpSettingsScreen onBack={handleBack} /></motion.div>;
      case 'chatList':
      default:
        return (
          <motion.div key="chat-list" className="w-full h-full" {...screenAnimation}>
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
      <div className="h-screen w-screen bg-paper dark:bg-dark-background flex flex-col">
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
};

const screenAnimation = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
  transition: { duration: 0.3, ease: 'easeInOut' },
};

export default App;
