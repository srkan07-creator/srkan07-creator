import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Sparkles, Mic, Languages, Type, Zap } from 'lucide-react';

interface QooPanelProps {
  onClose: () => void;
  onSuggestion: (suggestion: string) => void;
  currentMessage: string;
}

const qooSuggestions = [
  { text: "How's your day going?", category: "greeting", icon: "👋" },
  { text: "Want to grab coffee later? ☕", category: "friendly", icon: "☕" },
  { text: "That sounds amazing! 🎉", category: "positive", icon: "🎉" },
  { text: "I'm here if you need to talk", category: "supportive", icon: "💙" },
  { text: "Let's plan something fun!", category: "enthusiastic", icon: "🚀" },
  { text: "Thanks for being such a great friend 💝", category: "appreciative", icon: "💝" },
];

const qooActions = [
  { id: 'rewrite', label: 'Make it friendlier', icon: Type, color: 'bg-blue-500' },
  { id: 'shorten', label: 'Shorten to 1 sentence', icon: Zap, color: 'bg-orange-500' },
  { id: 'translate', label: 'Translate to Spanish', icon: Languages, color: 'bg-green-500' },
  { id: 'voice', label: 'Convert to voice note', icon: Mic, color: 'bg-purple-500' },
];

export const QooPanel: React.FC<QooPanelProps> = ({ onClose, onSuggestion, currentMessage }) => {
  const [activeTab, setActiveTab] = useState<'suggestions' | 'actions'>('suggestions');

  const handleAction = (actionId: string) => {
    switch (actionId) {
      case 'rewrite':
        onSuggestion("Hey there! Hope you're having an awesome day! 😊");
        break;
      case 'shorten':
        onSuggestion("Hope you're well!");
        break;
      case 'translate':
        onSuggestion("¡Espero que estés bien!");
        break;
      case 'voice':
        // Would trigger voice message creation
        onSuggestion(currentMessage || "Voice message created");
        break;
    }
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="bg-surface dark:bg-dark-surface border-t border-paper dark:border-dark-background p-4 rounded-t-2xl shadow-lg max-h-80 overflow-hidden"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-wooqoo-primary to-wooqoo-coral rounded-full flex items-center justify-center">
            <Sparkles size={16} className="text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-text-primary dark:text-dark-text-primary">Qoo</h3>
            <p className="text-xs text-text-muted dark:text-dark-text-muted">
              {activeTab === 'suggestions' ? 'Hey — need a quick reply? I got you!' : 'Let me help improve your message!'}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-paper dark:hover:bg-dark-background"
        >
          <X size={16} className="text-text-muted" />
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-4 bg-paper dark:bg-dark-background rounded-lg p-1">
        <button
          onClick={() => setActiveTab('suggestions')}
          className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'suggestions'
              ? 'bg-wooqoo-primary text-white'
              : 'text-text-muted hover:text-text-primary'
          }`}
        >
          Quick Replies
        </button>
        <button
          onClick={() => setActiveTab('actions')}
          className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'actions'
              ? 'bg-wooqoo-primary text-white'
              : 'text-text-muted hover:text-text-primary'
          }`}
        >
          AI Actions
        </button>
      </div>
      
      <div className="overflow-y-auto max-h-48">
        {activeTab === 'suggestions' ? (
          <div className="grid grid-cols-1 gap-2">
            {qooSuggestions.map((suggestion, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onSuggestion(suggestion.text);
                  onClose();
                }}
                className="p-3 bg-paper dark:bg-dark-background rounded-xl text-left text-sm text-text-primary dark:text-dark-text-primary hover:bg-wooqoo-primary/10 transition-colors border border-transparent hover:border-wooqoo-primary/20 flex items-center space-x-3"
              >
                <span className="text-lg">{suggestion.icon}</span>
                <span>{suggestion.text}</span>
              </motion.button>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {qooActions.map((action, index) => (
              <motion.button
                key={action.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAction(action.id)}
                className="w-full p-3 bg-paper dark:bg-dark-background rounded-xl text-left text-sm text-text-primary dark:text-dark-text-primary hover:bg-wooqoo-primary/10 transition-colors border border-transparent hover:border-wooqoo-primary/20 flex items-center space-x-3"
              >
                <div className={`p-2 ${action.color} rounded-lg`}>
                  <action.icon size={16} className="text-white" />
                </div>
                <span className="font-medium">{action.label}</span>
              </motion.button>
            ))}
          </div>
        )}
      </div>
      
      <div className="mt-4 p-3 bg-gradient-to-r from-wooqoo-primary/10 to-wooqoo-coral/10 rounded-xl">
        <p className="text-xs text-text-muted dark:text-dark-text-muted text-center">
          ✨ <strong>Pro tip:</strong> I learn from your writing style to give better suggestions!
        </p>
      </div>
    </motion.div>
  );
};
