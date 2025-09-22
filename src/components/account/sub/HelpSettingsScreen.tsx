import React from 'react';
import { ArrowLeft, CircleHelp, FileText, Users } from 'lucide-react';
import { SettingsListItem } from '../../ui/SettingsListItem';

interface ScreenProps { onBack: () => void; }

export const HelpSettingsScreen: React.FC<ScreenProps> = ({ onBack }) => {
  return (
    <div className="w-full max-w-md mx-auto h-screen flex flex-col bg-paper dark:bg-dark-background">
      <header className="p-4 border-b border-paper dark:border-dark-background/50 sticky top-0 bg-paper dark:bg-dark-background z-10">
        <div className="flex items-center space-x-3">
          <button onClick={onBack} className="p-2 rounded-full hover:bg-surface dark:hover:bg-dark-surface"><ArrowLeft size={20} /></button>
          <h1 className="text-xl font-bold">Help</h1>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto py-2">
        <SettingsListItem icon={CircleHelp} iconColor="bg-blue-500" label="Help Center" action="navigate" />
        <SettingsListItem icon={Users} iconColor="bg-orange-500" label="Contact us" action="navigate" />
        <SettingsListItem icon={FileText} iconColor="bg-gray-500" label="Terms and Privacy Policy" action="navigate" />
      </main>
    </div>
  );
};
