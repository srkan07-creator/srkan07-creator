import React from 'react';
import { ArrowLeft, Sun, Moon, Wallpaper, MessageSquare } from 'lucide-react';
import { SettingsListItem } from '../../ui/SettingsListItem';
import { useTheme } from '../../../contexts/ThemeContext';

interface ScreenProps { onBack: () => void; }

export const AppearanceSettingsScreen: React.FC<ScreenProps> = ({ onBack }) => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <div className="w-full max-w-md mx-auto h-screen flex flex-col bg-paper dark:bg-dark-background">
      <header className="p-4 border-b border-paper dark:border-dark-background/50 sticky top-0 bg-paper dark:bg-dark-background z-10">
        <div className="flex items-center space-x-3">
          <button onClick={onBack} className="p-2 rounded-full hover:bg-surface dark:hover:bg-dark-surface"><ArrowLeft size={20} /></button>
          <h1 className="text-xl font-bold">Appearance</h1>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto py-2">
        <p className="text-xs text-text-muted px-4 py-2">Theme</p>
        <SettingsListItem 
          icon={isDarkMode ? Moon : Sun} 
          iconColor="bg-gray-800" 
          label="Dark Mode" 
          action="toggle" 
          isToggled={isDarkMode}
          onToggle={toggleDarkMode}
        />
        <p className="text-xs text-text-muted px-4 py-2 mt-4">Chat Settings</p>
        <SettingsListItem icon={Wallpaper} iconColor="bg-green-500" label="Wallpaper" action="navigate" />
        <SettingsListItem icon={MessageSquare} iconColor="bg-blue-500" label="Chat Backup" action="navigate" />
      </main>
    </div>
  );
};
