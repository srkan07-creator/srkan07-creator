import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus } from 'lucide-react';
import { User } from '../../types';
import { AddContactModal } from '../modals/AddContactModal';

interface ContactsTabProps {
  contacts: User[];
}

export const ContactsTab: React.FC<ContactsTabProps> = ({ contacts }) => {
  const [showAddContactModal, setShowAddContactModal] = useState(false);
  
  const sortedContacts = [...contacts].sort((a, b) => a.name.localeCompare(b.name));
  const groupedContacts = sortedContacts.reduce((acc, contact) => {
    const firstLetter = contact.name[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(contact);
    return acc;
  }, {} as Record<string, User[]>);

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <AnimatePresence>
        {showAddContactModal && (
          <AddContactModal onClose={() => setShowAddContactModal(false)} onAdd={() => { /* Logic to add contact */ }} />
        )}
      </AnimatePresence>
      
      <div className="p-4">
        <button 
          onClick={() => setShowAddContactModal(true)}
          className="w-full flex items-center space-x-3 p-3 bg-paper dark:bg-dark-background rounded-xl hover:bg-wooqoo-primary/10 transition-colors"
        >
          <div className="p-2 bg-wooqoo-primary/20 rounded-lg">
            <UserPlus size={20} className="text-wooqoo-primary" />
          </div>
          <span className="font-medium text-text-primary dark:text-dark-text-primary">Add New Contact</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {Object.entries(groupedContacts).map(([letter, contactsByLetter]) => (
          <div key={letter} className="mb-4">
            <h3 className="text-sm font-semibold text-wooqoo-primary px-2 mb-2">{letter}</h3>
            <div className="space-y-1">
              {contactsByLetter.map(contact => (
                <div key={contact.id} className="flex items-center p-2 rounded-lg hover:bg-paper dark:hover:bg-dark-background cursor-pointer">
                  <img src={contact.avatar} alt={contact.name} className="w-10 h-10 rounded-full object-cover mr-3" />
                  <div className="flex-1">
                    <p className="font-medium text-text-primary dark:text-dark-text-primary">{contact.name}</p>
                    <p className="text-xs text-text-muted dark:text-dark-text-muted">@{contact.username}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
