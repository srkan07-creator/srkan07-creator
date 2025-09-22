import React from 'react';
import { ArrowLeft, Bell, BellOff, Vibrate } from 'lucide-react';
import { SettingsListItem } from '../../ui/SettingsListItem';

interface ScreenProps { onBack: () => void; }

export const NotificationsSettingsScreen: React.FC<ScreenProps> = ({ onBack }) => {
  return (
    <div className="w-full max-w-md mx-auto h-screen flex flex-col bg-paper dark:bg-dark-background">
      <header className="p-4 border-b border-paper dark:border-dark-background/50 sticky top-0 bg-paper dark:bg-dark-background z-10">
        <div className="flex items-center space-x-3">
          <button onClick={onBack} className="p-2 rounded-full hover:bg-surface dark:hover:bg-dark-surface"><ArrowLeft size={20} /></button>
          <h1 className="text-xl font-bold">Notifications</h1>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto py-2">
        <SettingsListItem icon={BellOff} iconColor="bg-red-500" label="Mute all notifications" action="toggle" isToggled={false} />
        <div className="h-2 bg-paper dark:bg-dark-surface my-2" />
        <p className="text-xs text-text-muted px-4 py-2">Messages</p>
        <SettingsListItem icon={Bell} iconColor="bg-blue-500" label="Notification tone" sublabel="Default" action="navigate" />
        <SettingsListItem icon={Vibrate} iconColor="bg-purple-500" label="Vibration" sublabel="Default" action="navigate" />
        <p className="text-xs text-text-muted px-4 py-2 mt-4">Groups</p>
        <SettingsListItem icon={Bell} iconColor="bg-green-500" label="Notification tone" sublabel="Default" action="navigate" />
      </main>
    </div>
  );
};
