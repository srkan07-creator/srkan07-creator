import React from 'react';
import { motion } from 'framer-motion';
import { User } from '../../types';
import { Plus } from 'lucide-react';

interface StatusTabProps {
  users: User[];
  onViewStories: (user: User) => void;
}

const formatTimestamp = (date: Date) => {
  const now = new Date();
  const diffSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffSeconds < 60) return 'Just now';
  
  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) return `${diffMinutes}m ago`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const StatusTab: React.FC<StatusTabProps> = ({ users, onViewStories }) => {
  const currentUser = users.find(u => u.id === 'current-user');
  const otherUsersWithStories = users.filter(u => u.id !== 'current-user' && u.stories && u.stories.length > 0);

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {/* My Status */}
      <div className="flex items-center p-2 rounded-lg hover:bg-paper dark:hover:bg-dark-background cursor-pointer mb-4">
        <div className="relative">
          <img src={currentUser?.avatar} alt="My Status" className="w-14 h-14 rounded-full object-cover" />
          <div className="absolute bottom-0 right-0 w-6 h-6 bg-wooqoo-teal rounded-full flex items-center justify-center border-2 border-surface dark:border-dark-surface">
            <Plus size={16} className="text-white" />
          </div>
        </div>
        <div className="ml-4">
          <p className="font-semibold">My Status</p>
          <p className="text-sm text-text-muted">Add to my status</p>
        </div>
      </div>

      {/* Recent Updates */}
      <h3 className="text-sm font-semibold text-text-muted px-2 mb-2">Recent updates</h3>
      <div className="space-y-1">
        {otherUsersWithStories.map(user => (
          <div key={user.id} onClick={() => onViewStories(user)} className="flex items-center p-2 rounded-lg hover:bg-paper dark:hover:bg-dark-background cursor-pointer">
            <div className={`relative p-1 rounded-full ${user.hasUnreadStories ? 'bg-gradient-to-tr from-wooqoo-coral to-orange-400' : ''}`}>
              <img src={user.avatar} alt={user.name} className="w-14 h-14 rounded-full object-cover border-2 border-surface dark:border-dark-surface" />
            </div>
            <div className="ml-3">
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-text-muted">{formatTimestamp(user.stories![0].timestamp)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
