import React from 'react';
import { motion } from 'framer-motion';
import { GoogleIcon } from '../ui/icons/GoogleIcon';
import { AppleIcon } from '../ui/icons/AppleIcon';
import { Mail } from 'lucide-react';
import { WooqooLogo } from '../ui/WooqooLogo';

interface WelcomeScreenProps {
  onNavigateToSignIn: () => void;
  onNavigateToSignUp: () => void;
  onSocialSignIn: (provider: 'google' | 'apple') => void;
}

const AuthButton: React.FC<{
  onClick: () => void;
  icon: React.ReactNode;
  text: string;
  isPrimary?: boolean;
}> = ({ onClick, icon, text, isPrimary }) => (
  <motion.button
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`w-full flex items-center justify-center space-x-3 py-3 px-4 rounded-2xl text-base font-semibold transition-colors duration-300
      ${isPrimary 
        ? 'bg-wooqoo-primary text-white hover:bg-wooqoo-primary/90' 
        : 'bg-surface dark:bg-dark-surface hover:bg-paper dark:hover:bg-dark-background border border-paper dark:border-dark-background'
      }`}
  >
    {icon}
    <span>{text}</span>
  </motion.button>
);

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onNavigateToSignIn,
  onNavigateToSignUp,
  onSocialSignIn,
}) => {
  return (
    <div className="w-full h-full flex flex-col justify-between items-center p-8 text-center bg-paper dark:bg-dark-background">
      <div />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex flex-col items-center"
      >
        <div className="mb-6">
          <motion.div
            animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <WooqooLogo className="w-48 h-48" />
          </motion.div>
        </div>
        <h1 className="text-3xl font-bold text-text-primary dark:text-dark-text-primary mb-2">
          Welcome to Wooqoo
        </h1>
        <p className="text-text-muted dark:text-dark-text-muted">
          Chat easy. Feel seen.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
        className="w-full space-y-3"
      >
        <AuthButton
          onClick={() => onSocialSignIn('google')}
          icon={<GoogleIcon className="w-6 h-6" />}
          text="Continue with Google"
        />
        <AuthButton
          onClick={() => onSocialSignIn('apple')}
          icon={<AppleIcon className="w-6 h-6" />}
          text="Continue with Apple"
        />
        <AuthButton
          onClick={onNavigateToSignUp}
          icon={<Mail size={20} />}
          text="Sign up with email"
          isPrimary
        />
        <p className="text-sm text-text-muted dark:text-dark-text-muted pt-4">
          Already have an account?{' '}
          <button
            onClick={onNavigateToSignIn}
            className="font-semibold text-wooqoo-primary hover:underline"
          >
            Sign In
          </button>
        </p>
      </motion.div>
    </div>
  );
};
