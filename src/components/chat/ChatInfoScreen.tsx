import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Bell, BellOff, ChevronRight, Eye, FileText, Image, Link2, LogOut, Search, ShieldX, Star, Timer, UserPlus, Users } from 'lucide-react';
import { Chat } from '../../types';
import { SettingsListItem } from '../ui/SettingsListItem';

interface ChatInfoScreenProps {
  chat: Chat;
  onBack: () => void;
}

const SettingsGroup: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-surface dark:bg-dark-surface rounded-2xl overflow-hidden">{children}</div>
);

export const ChatInfoScreen: React.FC<ChatInfoScreenProps> = ({ chat, onBack }) => {
  const [isMuted, setIsMuted] = useState(chat.isMuted);
  
  const participant = chat.participants[0];
  const chatName = chat.type === 'private' ? participant.name : chat.name;
  const avatar = chat.type === 'private' ? participant.avatar : chat.avatar;
  const status = chat.type === 'private'
    ? (participant.isOnline ? 'Online' : 'Last seen recently')
    : `${chat.participants.length} members`;

  const mediaMessages = chat.messages.filter(m => m.type === 'image').slice(-9);

  return (
    <div className="w-full h-full flex flex-col bg-paper dark:bg-dark-background">
      <header className="p-4 sticky top-0 bg-paper/80 dark:bg-dark-background/80 backdrop-blur-sm z-10">
        <div className="flex items-center space-x-3">
          <button onClick={onBack} className="p-2 rounded-full hover:bg-surface dark:hover:bg-dark-surface">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold truncate">
            {chat.type === 'private' ? 'Contact Info' : 'Group Info'}
          </h1>
        </div>
      </header>
      
      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Profile Section */}
        <div className="flex flex-col items-center text-center">
          <img src={avatar} alt={chatName} className="w-24 h-24 rounded-3xl object-cover mb-4 shadow-md" />
          <h2 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary">{chatName}</h2>
          <p className="text-sm text-text-muted dark:text-dark-text-muted">{chat.type === 'private' ? participant.phone : status}</p>
        </div>

        {/* Media Section */}
        <SettingsGroup>
          <SettingsListItem
            icon={Image}
            iconColor="bg-green-500"
            label="Media, Links, and Docs"
            sublabel={`${mediaMessages.length} items`}
            action="navigate"
          />
          {mediaMessages.length > 0 && (
            <div className="grid grid-cols-3 gap-0.5 p-2">
              {mediaMessages.map(msg => (
                <img key={msg.id} src={msg.imageUrl} alt="media" className="aspect-square object-cover w-full h-full" />
              ))}
            </div>
          )}
        </SettingsGroup>

        {/* Settings Section */}
        <SettingsGroup>
          <SettingsListItem
            icon={isMuted ? BellOff : Bell}
            iconColor="bg-purple-500"
            label="Mute Notifications"
            action="toggle"
            isToggled={isMuted}
            onToggle={setIsMuted}
          />
          <SettingsListItem icon={Star} iconColor="bg-yellow-500" label="Starred Messages" action="navigate" />
          <SettingsListItem icon={Timer} iconColor="bg-cyan-500" label="Disappearing Messages" sublabel="Off" action="navigate" />
        </SettingsGroup>

        {/* Group Members (for groups) */}
        {chat.type === 'group' && (
          <SettingsGroup>
            <SettingsListItem icon={Users} iconColor="bg-blue-500" label={`${chat.participants.length} Members`} action="navigate" />
            <SettingsListItem icon={UserPlus} iconColor="bg-green-500" label="Add Participants" action="navigate" />
          </SettingsGroup>
        )}

        {/* Danger Zone */}
        <SettingsGroup>
          {chat.type === 'private' ? (
            <>
              <button className="w-full text-left px-4 py-3 text-error font-medium hover:bg-error/10 transition-colors flex items-center space-x-4">
                <ShieldX size={18} />
                <span>Block {chatName}</span>
              </button>
              <button className="w-full text-left px-4 py-3 text-error font-medium hover:bg-error/10 transition-colors flex items-center space-x-4">
                <ShieldX size={18} />
                <span>Report {chatName}</span>
              </button>
            </>
          ) : (
            <button className="w-full text-left px-4 py-3 text-error font-medium hover:bg-error/10 transition-colors flex items-center space-x-4">
              <LogOut size={18} />
              <span>Exit Group</span>
            </button>
          )}
        </SettingsGroup>
      </main>
    </div>
  );
};
