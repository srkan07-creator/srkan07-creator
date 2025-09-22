import React from 'react';
import { motion } from 'framer-motion';
import { Check, CheckCheck, Pin, Play, BarChart3, Phone, Video, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { Message } from '../../types';

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  showAvatar: boolean;
  avatar?: string;
  onPin?: () => void;
  onVote?: (optionId: string) => void;
  onLongPress?: () => void;
}

const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).format(date);
};

const formatDuration = (seconds: number) => {
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
};

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isOwn, showAvatar, avatar, onPin, onVote, onLongPress }) => {
  const StatusIcon = () => {
    if (!isOwn) return null;
    switch (message.status) {
      case 'sent': return <Check size={14} className="text-text-muted" />;
      case 'delivered': return <CheckCheck size={14} className="text-text-muted" />;
      case 'read': return <CheckCheck size={14} className="text-wooqoo-primary" />;
      default: return null;
    }
  };

  const renderCallMessage = () => {
    if (!message.callData) return null;
    const { type, duration, direction } = message.callData;
    const isMissed = direction === 'missed';
    const CallIcon = type === 'video' ? Video : Phone;
    const DirectionIcon = direction === 'outgoing' ? ArrowUpRight : ArrowDownLeft;
    
    const statusText = isMissed 
      ? (isOwn ? 'Call not answered' : 'Missed call') 
      : (direction === 'outgoing' ? 'Outgoing call' : 'Incoming call');

    return (
      <div className={`flex items-center space-x-3 ${isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
        <div className="flex items-center">
          <DirectionIcon size={16} className={isMissed ? 'text-error' : 'text-text-muted'} />
          <CallIcon size={18} className={isMissed ? 'text-error' : 'text-text-muted'} />
        </div>
        <div className={isOwn ? 'text-right' : 'text-left'}>
          <p className={`font-medium ${isMissed ? 'text-error' : ''}`}>{type === 'video' ? 'Video Call' : 'Audio Call'}</p>
          <p className="text-xs text-text-muted">{isMissed ? 'Missed' : formatDuration(duration)}</p>
        </div>
      </div>
    );
  };

  const renderMessageContent = () => {
    switch (message.type) {
      case 'call':
        return renderCallMessage();
      case 'image':
        return (
          <div className="relative">
            <img src={message.imageUrl} alt="Shared media" className="rounded-lg max-w-full h-auto" />
            {message.text && (
              <div className={`absolute bottom-0 left-0 right-0 p-2 text-white bg-gradient-to-t from-black/60 to-transparent ${isOwn ? '' : 'text-white'}`}>
                <p className="text-sm">{message.text}</p>
              </div>
            )}
          </div>
        );
      case 'voice':
        return (
          <div className="flex items-center space-x-3 min-w-0">
            <button className="p-2 bg-white/20 rounded-full flex-shrink-0"><Play size={16} className="text-white fill-current" /></button>
            <div className="flex-1 min-w-0">
              <div className="h-8 bg-white/20 rounded-full flex items-center"><div className="w-full h-1 bg-white/40 rounded-full"><div className="w-1/3 h-1 bg-white rounded-full"></div></div></div>
              <p className="text-xs mt-1 opacity-80">{formatDuration(message.voiceData?.duration || 0)}</p>
            </div>
          </div>
        );
      case 'poll':
        if (!message.pollData) return null;
        const totalVotes = message.pollData.options.reduce((sum, opt) => sum + opt.votes.length, 0);
        return (
          <div className="space-y-3">
            <div className="flex items-center space-x-2"><BarChart3 size={16} className={isOwn ? 'text-white' : 'text-wooqoo-primary'} /><h4 className="font-medium">{message.pollData.question}</h4></div>
            <div className="space-y-2">
              {message.pollData.options.map((option) => {
                const percentage = totalVotes > 0 ? (option.votes.length / totalVotes) * 100 : 0;
                const hasVoted = option.votes.includes('current-user');
                return (
                  <motion.button key={option.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => onVote?.(option.id)} className={`w-full p-3 rounded-xl relative overflow-hidden text-left transition-colors ${hasVoted ? (isOwn ? 'bg-white/30 border-2 border-white/50' : 'bg-wooqoo-primary/20 border-2 border-wooqoo-primary') : (isOwn ? 'bg-white/10 hover:bg-white/20' : 'bg-paper dark:bg-dark-background hover:bg-wooqoo-primary/10')}`}>
                    <div className={`absolute inset-0 transition-all duration-300 ${isOwn ? 'bg-white/20' : 'bg-wooqoo-primary/10'}`} style={{ width: `${percentage}%` }}/>
                    <div className="relative flex justify-between items-center"><span className="font-medium">{option.text}</span><span className="text-sm opacity-75">{option.votes.length} ({percentage.toFixed(0)}%)</span></div>
                  </motion.button>
                );
              })}
            </div>
            <p className="text-xs opacity-75">{totalVotes} vote{totalVotes !== 1 ? 's' : ''} • {message.pollData.allowMultiple ? 'Multiple choice' : 'Single choice'}</p>
          </div>
        );
      default:
        return <p className="text-sm leading-relaxed">{message.text}</p>;
    }
  };

  if (message.type === 'call') {
    return (
      <div className="w-full flex justify-center my-2">
        <div className="px-3 py-1 bg-paper dark:bg-dark-background rounded-full text-xs text-text-muted shadow-soft">
          {renderCallMessage()}
        </div>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.3, ease: 'easeOut' }} className={`flex items-end space-x-2 ${isOwn ? 'flex-row-reverse space-x-reverse' : ''}`} onContextMenu={(e) => { e.preventDefault(); onLongPress?.(); }}>
      {!isOwn && showAvatar && avatar && (<img src={avatar} alt="Avatar" className="w-8 h-8 rounded-lg object-cover" />)}
      {!isOwn && !showAvatar && <div className="w-8" />}
      <div className={`max-w-xs lg:max-w-md ${isOwn ? 'ml-auto' : ''}`}>
        <motion.div whileHover={{ scale: 1.02 }} className={`rounded-2xl shadow-soft relative ${isOwn ? 'bg-wooqoo-primary text-white rounded-br-md' : 'bg-surface dark:bg-dark-surface text-text-primary dark:text-dark-text-primary rounded-bl-md border border-paper dark:border-dark-background'} ${message.type === 'image' ? 'p-1.5' : 'px-4 py-2'}`}>
          {message.isPinned && (<div className="absolute -top-2 -right-2"><div className="w-5 h-5 bg-wooqoo-coral rounded-full flex items-center justify-center"><Pin size={10} className="text-white" /></div></div>)}
          {renderMessageContent()}
          {message.voiceData?.transcript && (<div className="mt-2 pt-2 border-t border-white/20"><p className="text-xs opacity-75 italic">"{message.voiceData.transcript}"</p></div>)}
        </motion.div>
        <div className={`flex items-center space-x-1 mt-1 px-1 ${isOwn ? 'justify-end' : ''}`}>
          <span className="text-xs text-text-muted dark:text-dark-text-muted">{formatTime(message.timestamp)}</span>
          <StatusIcon />
        </div>
      </div>
    </motion.div>
  );
};
