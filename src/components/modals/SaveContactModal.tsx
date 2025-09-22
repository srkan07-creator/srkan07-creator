import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, UserPlus, Save } from 'lucide-react';
import { User } from '../../types';

interface SaveContactModalProps {
  user: User;
  onClose: () => void;
  onSave: (name: string) => void;
}

export const SaveContactModal: React.FC<SaveContactModalProps> = ({ user, onClose, onSave }) => {
  const [name, setName] = useState('');

  const handleSave = () => {
    if (name.trim()) {
      onSave(name.trim());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-md bg-surface dark:bg-dark-surface rounded-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-wooqoo-primary/10 rounded-lg">
              <UserPlus size={20} className="text-wooqoo-primary" />
            </div>
            <h3 className="font-semibold text-text-primary dark:text-dark-text-primary">
              Save Contact
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-paper dark:hover:bg-dark-background"
          >
            <X size={20} className="text-text-muted" />
          </button>
        </div>

        <div className="flex items-center space-x-4 mb-4">
          <img src={user.avatar} alt="avatar" className="w-16 h-16 rounded-2xl object-cover" />
          <div>
            <p className="font-medium text-text-primary dark:text-dark-text-primary">{user.phone}</p>
            <p className="text-sm text-text-muted">@{user.username}</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary dark:text-dark-text-primary mb-2">
            Contact Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            className="w-full bg-paper dark:bg-dark-background border border-paper dark:border-dark-background rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-wooqoo-primary outline-none"
            autoFocus
          />
        </div>

        <div className="flex space-x-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 bg-paper dark:bg-dark-background text-text-muted rounded-xl font-medium hover:bg-text-muted/10 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!name.trim()}
            className="flex-1 py-3 px-4 rounded-xl font-medium transition-colors bg-wooqoo-primary text-white hover:bg-wooqoo-primary/90 disabled:bg-text-muted/20 disabled:text-text-muted disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <Save size={16} />
            <span>Save</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
