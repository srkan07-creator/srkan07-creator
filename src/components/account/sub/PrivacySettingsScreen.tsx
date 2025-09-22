import React from 'react';
import { ArrowLeft, EyeOff, UserX, Clock, Users } from 'lucide-react';
import { SettingsListItem } from '../../ui/SettingsListItem';

interface ScreenProps { onBack: () => void; }

export const PrivacySettingsScreen: React.FC<ScreenProps> = ({ onBack }) => {
  return (
    <div className="w-full max-w-md mx-auto h-screen flex flex-col bg-paper dark:bg-dark-background">
      <header className="p-4 border-b border-paper dark:border-dark-background/50 sticky top-0 bg-paper dark:bg-dark-background z-10">
        <div className="flex items-center space-x-3">
          <button onClick={onBack} className="p-2 rounded-full hover:bg-surface dark:hover:bg-dark-surface"><ArrowLeft size={20} /></button>
          <h1 className="text-xl font-bold">Privacy</h1>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto py-2">
        <p className="text-xs text-text-muted px-4 py-2">Who can see my personal info</p>
        <SettingsListItem icon={EyeOff} iconColor="bg-blue-500" label="Last seen & online" sublabel="Everyone" action="navigate" />
        <SettingsListItem icon={Clock} iconColor="bg-purple-500" label="Disappearing messages" sublabel="Off" action="navigate" />
        <SettingsListItem icon={UserX} iconColor="bg-red-500" label="Blocked contacts" sublabel="3" action="navigate" />
        <SettingsListItem icon={Users} iconColor="bg-orange-500" label="Groups" sublabel="Everyone" action="navigate" />
      </main>
    </div>
  );
};
