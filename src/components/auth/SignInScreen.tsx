import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Lock } from 'lucide-react';

interface SignInScreenProps {
  onSignIn: () => void;
  onNavigateToSignUp: () => void;
}

export const SignInScreen: React.FC<SignInScreenProps> = ({ onSignIn, onNavigateToSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="w-full h-full flex flex-col p-6 bg-paper dark:bg-dark-background">
      <header className="mb-8">
        <button onClick={onNavigateToSignUp} className="p-2 rounded-full hover:bg-surface dark:hover:bg-dark-surface">
          <ArrowLeft size={20} />
        </button>
      </header>

      <main className="flex-1 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <h1 className="text-3xl font-bold text-text-primary dark:text-dark-text-primary mb-2">
            Welcome Back!
          </h1>
          <p className="text-text-muted dark:text-dark-text-muted mb-8">
            Sign in to continue your conversations.
          </p>

          <form className="space-y-4">
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                type="email"
                placeholder="Email or Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface dark:bg-dark-surface border-none rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-wooqoo-primary outline-none"
              />
            </div>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface dark:bg-dark-surface border-none rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-wooqoo-primary outline-none"
              />
            </div>
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center space-x-2 text-text-muted">
                <input type="checkbox" className="rounded text-wooqoo-primary focus:ring-wooqoo-primary" />
                <span>Remember me</span>
              </label>
              <a href="#" className="font-medium text-wooqoo-primary hover:underline">Forgot password?</a>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={onSignIn}
              type="button"
              className="w-full py-3 px-4 rounded-2xl bg-wooqoo-primary text-white font-semibold transition-colors duration-300 hover:bg-wooqoo-primary/90"
            >
              Sign In
            </motion.button>
          </form>
        </motion.div>
      </main>

      <footer className="text-center text-sm text-text-muted">
        Don't have an account?{' '}
        <button onClick={onNavigateToSignUp} className="font-semibold text-wooqoo-primary hover:underline">
          Sign Up
        </button>
      </footer>
    </div>
  );
};
