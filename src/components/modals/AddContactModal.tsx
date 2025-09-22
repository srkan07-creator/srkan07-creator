import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, UserPlus, Phone, AtSign } from 'lucide-react';

interface AddContactModalProps {
  onClose: () => void;
  onAdd: (identifier: string) => void;
}

export const AddContactModal: React.FC<AddContactModalProps> = ({ onClose, onAdd }) => {
  const [identifier, setIdentifier] = useState('');

  const handleAdd = () => {
    if (identifier.trim()) {
      onAdd(identifier.trim());
      onClose();
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
              Add New Contact
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-paper dark:hover:bg-dark-background"
          >
            <X size={20} className="text-text-muted" />
          </button>
        </div>

        <p className="text-sm text-text-muted mb-4">
          Add a new contact by their phone number or unique Wooqoo username.
        </p>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {identifier.startsWith('@') || !/^\d+$/.test(identifier.charAt(0)) ? (
              <AtSign size={18} className="text-text-muted" />
            ) : (
              <Phone size={18} className="text-text-muted" />
            )}
          </div>
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="Enter phone or @username"
            className="w-full bg-paper dark:bg-dark-background border border-paper dark:border-dark-background rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-wooqoo-primary outline-none"
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
            onClick={handleAdd}
            disabled={!identifier.trim()}
            className="flex-1 py-3 px-4 rounded-xl font-medium transition-colors bg-wooqoo-primary text-white hover:bg-wooqoo-primary/90 disabled:bg-text-muted/20 disabled:text-text-muted disabled:cursor-not-allowed"
          >
            Add Contact
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
