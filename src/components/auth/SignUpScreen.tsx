import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Lock, User, AtSign } from 'lucide-react';

interface SignUpScreenProps {
  onSignUp: () => void;
  onNavigateToSignIn: () => void;
}

export const SignUpScreen: React.FC<SignUpScreenProps> = ({ onSignUp, onNavigateToSignIn }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="w-full h-full flex flex-col p-6 bg-paper dark:bg-dark-background">
      <header className="mb-8">
        <button onClick={onNavigateToSignIn} className="p-2 rounded-full hover:bg-surface dark:hover:bg-dark-surface">
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
            Create Account
          </h1>
          <p className="text-text-muted dark:text-dark-text-muted mb-8">
            Join Wooqoo and start chatting!
          </p>

          <form className="space-y-4">
            <div className="relative">
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
              <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-surface dark:bg-dark-surface border-none rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-wooqoo-primary outline-none" />
            </div>
            <div className="relative">
              <AtSign size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
              <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-surface dark:bg-dark-surface border-none rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-wooqoo-primary outline-none" />
            </div>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-surface dark:bg-dark-surface border-none rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-wooqoo-primary outline-none" />
            </div>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-surface dark:bg-dark-surface border-none rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-wooqoo-primary outline-none" />
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={onSignUp}
              type="button"
              className="w-full py-3 px-4 rounded-2xl bg-wooqoo-primary text-white font-semibold transition-colors duration-300 hover:bg-wooqoo-primary/90"
            >
              Sign Up
            </motion.button>
          </form>
        </motion.div>
      </main>

      <footer className="text-center text-sm text-text-muted">
        Already have an account?{' '}
        <button onClick={onNavigateToSignIn} className="font-semibold text-wooqoo-primary hover:underline">
          Sign In
        </button>
      </footer>
    </div>
  );
};
