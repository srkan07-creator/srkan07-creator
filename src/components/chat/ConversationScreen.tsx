import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MoreHorizontal, Pin, Search, UserPlus, ShieldX, Phone, Video } from 'lucide-react';
import { Chat, Message, User } from '../../types';
import { MessageBubble } from './MessageBubble';
import { MessageComposer } from './MessageComposer';
import { QooPanel } from './QooPanel';
import { PinnedMessages } from './PinnedMessages';
import { PollCreator } from './PollCreator';
import { SaveContactModal } from '../modals/SaveContactModal';

interface ConversationScreenProps {
  chat: Chat;
  onBack: () => void;
  onSaveContact: (userId: string, name:string) => void;
  onStartCall: (type: 'audio' | 'video') => void;
  onNavigateToChatInfo: () => void;
}

export const ConversationScreen: React.FC<ConversationScreenProps> = ({ chat, onBack, onSaveContact, onStartCall, onNavigateToChatInfo }) => {
  const [messages, setMessages] = useState<Message[]>(chat.messages);
  const [isTyping, setIsTyping] = useState(false);
  const [showQooPanel, setShowQooPanel] = useState(false);
  const [showPinnedMessages, setShowPinnedMessages] = useState(false);
  const [showPollCreator, setShowPollCreator] = useState(false);
  const [showSaveContactModal, setShowSaveContactModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const participant = chat.participants[0];
  const isUnsavedContact = chat.type === 'private' && !participant.isSaved;

  const chatName = chat.type === 'private' ? participant.name : chat.name;
  const avatar = chat.type === 'private' ? participant.avatar : chat.avatar;
  const isOnline = chat.type === 'private' ? participant.isOnline : true;
  const pinnedMessages = messages.filter(m => m.isPinned);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (text: string, type: 'text' | 'voice' | 'poll' = 'text', additionalData?: any) => {
    const newMessage: Message = {
      id: Date.now().toString(), text, timestamp: new Date(), senderId: 'current-user', status: 'sent', type, ...additionalData,
    };
    setMessages(prev => [...prev, newMessage]);
    if (type === 'text') {
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          const responses = ["That's interesting! Tell me more 😊", "I see what you mean. How did that make you feel?", "Thanks for sharing that with me!", "That sounds exciting! 🎉", "I understand. Want to talk about it more?"];
          const responseMessage: Message = {
            id: (Date.now() + 1).toString(), text: responses[Math.floor(Math.random() * responses.length)], timestamp: new Date(), senderId: participant.id, status: 'delivered',
          };
          setMessages(prev => [...prev, responseMessage]);
        }, 1500);
      }, 500);
    }
  };

  const handlePinMessage = (messageId: string) => {
    setMessages(prev => prev.map(msg => msg.id === messageId ? { ...msg, isPinned: !msg.isPinned } : msg));
  };

  const handleVoteInPoll = (messageId: string, optionId: string) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId && msg.pollData) {
        const updatedOptions = msg.pollData.options.map(option => {
          if (option.id === optionId) {
            const hasVoted = option.votes.includes('current-user');
            return { ...option, votes: hasVoted ? option.votes.filter(id => id !== 'current-user') : [...option.votes, 'current-user'] };
          }
          return option;
        });
        return { ...msg, pollData: { ...msg.pollData, options: updatedOptions } };
      }
      return msg;
    }));
  };

  const handleCreatePoll = (question: string, options: string[], allowMultiple: boolean) => {
    const pollData = { question, options: options.map(text => ({ id: Date.now() + Math.random().toString(), text, votes: [] as string[] })), allowMultiple };
    handleSendMessage('', 'poll', { pollData });
    setShowPollCreator(false);
  };

  const handleSave = (name: string) => {
    onSaveContact(participant.id, name);
    setShowSaveContactModal(false);
  };

  return (
    <div className="w-full max-w-md mx-auto h-screen flex flex-col bg-surface dark:bg-dark-surface">
      <header className="p-4 border-b border-paper dark:border-dark-background/50 bg-surface dark:bg-dark-surface z-10">
        <div className="flex items-center space-x-3">
          <button onClick={onBack} className="p-2 rounded-full hover:bg-paper dark:hover:bg-dark-background">
            <ArrowLeft size={20} className="text-text-primary dark:text-dark-text-primary" />
          </button>
          <button onClick={onNavigateToChatInfo} className="flex-1 flex items-center space-x-3 min-w-0">
            <div className="relative">
              <img src={avatar} alt={chatName} className="w-10 h-10 rounded-xl object-cover" />
              {chat.type === 'private' && isOnline && <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-surface dark:border-dark-surface" />}
            </div>
            <div className="flex-1 min-w-0 text-left">
              <h2 className="font-semibold text-text-primary dark:text-dark-text-primary truncate">{chatName}</h2>
              <p className="text-xs text-text-muted dark:text-dark-text-muted">
                {isUnsavedContact ? 'Tap to add to contacts' : chat.type === 'private' ? (isOnline ? 'Online' : 'Last seen recently') : chat.type === 'channel' ? `${chat.memberCount?.toLocaleString()} members` : `${chat.participants.length} members`}
              </p>
            </div>
          </button>
          <div className="flex items-center space-x-1">
            <button onClick={() => onStartCall('audio')} className="p-2 rounded-full hover:bg-paper dark:hover:bg-dark-background"><Phone size={18} className="text-text-primary dark:text-dark-text-primary" /></button>
            <button onClick={() => onStartCall('video')} className="p-2 rounded-full hover:bg-paper dark:hover:bg-dark-background"><Video size={18} className="text-text-primary dark:text-dark-text-primary" /></button>
            <button className="p-2 rounded-full hover:bg-paper dark:hover:bg-dark-background"><MoreHorizontal size={18} className="text-text-primary dark:text-dark-text-primary" /></button>
          </div>
        </div>
        {isUnsavedContact && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mt-3 p-3 bg-paper dark:bg-dark-background rounded-xl flex items-center justify-between">
            <p className="text-sm text-text-muted">You have a new message!</p>
            <div className="flex space-x-2">
              <button onClick={() => setShowSaveContactModal(true)} className="flex items-center space-x-1.5 text-sm font-medium text-wooqoo-primary px-3 py-1.5 rounded-lg hover:bg-wooqoo-primary/10">
                <UserPlus size={16} /><span>Save Contact</span>
              </button>
              <button className="flex items-center space-x-1.5 text-sm font-medium text-error px-3 py-1.5 rounded-lg hover:bg-error/10">
                <ShieldX size={16} /><span>Block</span>
              </button>
            </div>
          </motion.div>
        )}
      </header>
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gradient-to-b from-surface to-paper dark:from-dark-surface dark:to-dark-background">
        <AnimatePresence>
          {messages.map((message, index) => (
            <MessageBubble key={message.id} message={message} isOwn={message.senderId === 'current-user'} showAvatar={index === 0 || messages[index - 1].senderId !== message.senderId} avatar={message.senderId !== 'current-user' ? avatar : undefined} onPin={() => handlePinMessage(message.id)} onVote={message.pollData ? (optionId) => handleVoteInPoll(message.id, optionId) : undefined} onLongPress={() => setSelectedMessage(message)} />
          ))}
        </AnimatePresence>
        {isTyping && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center space-x-2">
            <img src={avatar} alt={chatName} className="w-8 h-8 rounded-lg object-cover" />
            <div className="bg-surface dark:bg-dark-surface rounded-2xl px-4 py-2 shadow-soft">
              <div className="flex space-x-1">{[0, 1, 2].map((i) => (<motion.div key={i} className="w-2 h-2 bg-text-muted rounded-full" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }} />))}</div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <AnimatePresence>
        {showPinnedMessages && <PinnedMessages messages={pinnedMessages} onClose={() => setShowPinnedMessages(false)} onUnpin={handlePinMessage} />}
        {showPollCreator && <PollCreator onClose={() => setShowPollCreator(false)} onCreate={handleCreatePoll} />}
        {showQooPanel && <QooPanel onClose={() => setShowQooPanel(false)} onSuggestion={handleSendMessage} currentMessage="" />}
        {showSaveContactModal && isUnsavedContact && <SaveContactModal user={participant} onClose={() => setShowSaveContactModal(false)} onSave={handleSave} />}
      </AnimatePresence>
      <MessageComposer onSend={handleSendMessage} onQooToggle={() => setShowQooPanel(!showQooPanel)} onPollCreate={() => setShowPollCreator(true)} showQooPanel={showQooPanel} isGroup={chat.type === 'group'} />
    </div>
  );
};
