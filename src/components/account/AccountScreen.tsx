import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronRight, KeyRound, Shield, Bell, Palette, CircleHelp, Users, QrCode, Camera, LogOut } from 'lucide-react';
import { mockUsers } from '../../data/mockData';

interface AccountScreenProps {
  onBack: () => void;
  onNavigate: (page: 'accountSettings' | 'privacySettings' | 'appearanceSettings' | 'notificationsSettings' | 'helpSettings') => void;
  onSignOut: () => void;
}

const currentUser = mockUsers.find(u => u.id === 'current-user')!;

const settingsItems = [
  { id: 'accountSettings', icon: KeyRound, label: 'Account', sublabel: 'Privacy, security, change number', color: 'bg-sky-500' },
  { id: 'privacySettings', icon: Shield, label: 'Privacy', sublabel: 'Block contacts, disappearing messages', color: 'bg-blue-500' },
  { id: 'appearanceSettings', icon: Palette, label: 'Appearance', sublabel: 'Theme, wallpapers, chat settings', color: 'bg-purple-500' },
  { id: 'notificationsSettings', icon: Bell, label: 'Notifications', sublabel: 'Message, group & call tones', color: 'bg-green-500' },
  { id: 'helpSettings', icon: CircleHelp, label: 'Help', sublabel: 'Help center, contact us, privacy policy', color: 'bg-orange-500' },
];

export const AccountScreen: React.FC<AccountScreenProps> = ({ onBack, onNavigate, onSignOut }) => {
  return (
    <div className="w-full h-full flex flex-col bg-paper dark:bg-dark-background">
      <header className="p-4 border-b border-paper dark:border-dark-background/50 sticky top-0 bg-paper dark:bg-dark-background z-10">
        <div className="flex items-center space-x-3">
          <button onClick={onBack} className="p-2 rounded-full hover:bg-surface dark:hover:bg-dark-surface">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold">Settings</h1>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        {/* Profile Section */}
        <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-surface dark:hover:bg-dark-surface transition-colors">
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <img src={currentUser.avatar} alt={currentUser.name} className="w-16 h-16 rounded-full object-cover" />
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={24} className="text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{currentUser.name}</h2>
              <p className="text-sm text-text-muted line-clamp-1">{currentUser.bio || "Hey there! I am using Wooqoo."}</p>
            </div>
          </div>
          <button className="p-2 rounded-full text-wooqoo-primary">
            <QrCode size={24} />
          </button>
        </div>

        <div className="h-2 bg-paper dark:bg-dark-surface" />

        {/* Menu Items */}
        <div className="py-2">
          {settingsItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <button
                onClick={() => onNavigate(item.id as any)}
                className="w-full flex items-center px-4 py-3 hover:bg-surface dark:hover:bg-dark-surface transition-colors text-left"
              >
                <div className={`p-2 rounded-lg ${item.color}`}>
                  <item.icon size={18} className="text-white" />
                </div>
                <div className="flex-1 ml-4">
                  <span className="font-medium text-base">{item.label}</span>
                  <p className="text-xs text-text-muted">{item.sublabel}</p>
                </div>
                <ChevronRight size={20} className="text-text-muted/50" />
              </button>
            </motion.div>
          ))}
        </div>

        <div className="h-2 bg-paper dark:bg-dark-surface" />
        
        {/* Invite a Friend & Sign Out */}
        <div className="py-2">
           <button className="w-full flex items-center px-4 py-3 hover:bg-surface dark:hover:bg-dark-surface transition-colors text-left">
             <div className="p-2 rounded-lg bg-wooqoo-coral">
                <Users size={18} className="text-white" />
             </div>
             <span className="flex-1 ml-4 font-medium text-base">Invite a friend</span>
           </button>
           <button onClick={onSignOut} className="w-full flex items-center px-4 py-3 hover:bg-surface dark:hover:bg-dark-surface transition-colors text-left">
             <div className="p-2 rounded-lg bg-error">
                <LogOut size={18} className="text-white" />
             </div>
             <span className="flex-1 ml-4 font-medium text-base text-error">Sign Out</span>
           </button>
        </div>
        
        {/* Footer */}
        <div className="text-center py-8">
            <p className="text-sm text-text-muted">from</p>
            <p className="font-bold text-wooqoo-primary tracking-wider">WOOQOO</p>
        </div>
      </main>
    </div>
  );
};
