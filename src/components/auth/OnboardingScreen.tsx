import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, User, Sparkles } from 'lucide-react';

interface OnboardingScreenProps {
  onComplete: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [displayName, setDisplayName] = useState('');
  const [avatar, setAvatar] = useState<string | null>(null);

  const handleAvatarUpload = () => {
    // Simulate avatar upload
    setAvatar(`https://i.pravatar.cc/150?u=${Date.now()}`);
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-8 bg-paper dark:bg-dark-background text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full"
      >
        <Sparkles size={40} className="mx-auto text-wooqoo-primary mb-4" />
        <h1 className="text-3xl font-bold text-text-primary dark:text-dark-text-primary mb-2">
          Just one more step!
        </h1>
        <p className="text-text-muted dark:text-dark-text-muted mb-8">
          Let's set up your profile.
        </p>

        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <button
              onClick={handleAvatarUpload}
              className="w-32 h-32 rounded-full bg-surface dark:bg-dark-surface flex items-center justify-center"
            >
              {avatar ? (
                <img src={avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
              ) : (
                <User size={60} className="text-text-muted" />
              )}
            </button>
            <div className="absolute bottom-0 right-0 p-2 bg-wooqoo-primary rounded-full text-white cursor-pointer">
              <Camera size={20} />
            </div>
          </div>

          <div className="w-full relative">
            <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Enter your display name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full bg-surface dark:bg-dark-surface border-none rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-wooqoo-primary outline-none"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={onComplete}
            disabled={!displayName.trim()}
            className="w-full py-3 px-4 rounded-2xl bg-wooqoo-primary text-white font-semibold transition-colors duration-300 hover:bg-wooqoo-primary/90 disabled:bg-text-muted/50"
          >
            Get Started
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
