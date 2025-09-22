export interface User {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  username?: string;
  bio?: string;
  phone?: string;
  isSaved?: boolean;
  stories?: Story[];
  hasUnreadStories?: boolean;
}

export interface Story {
  id: string;
  type: 'image' | 'video';
  url: string;
  timestamp: Date;
  duration: number; // in seconds
}

export interface Message {
  id: string;
  text: string;
  timestamp: Date;
  senderId: string;
  status: 'sent' | 'delivered' | 'read';
  type?: 'text' | 'voice' | 'poll' | 'system' | 'call';
  voiceData?: {
    duration: number;
    transcript?: string;
    audioUrl: string;
  };
  pollData?: {
    question: string;
    options: { id: string; text: string; votes: string[] }[];
    allowMultiple: boolean;
  };
  callData?: {
    type: 'audio' | 'video';
    duration: number; // in seconds
    direction: 'incoming' | 'outgoing' | 'missed';
  };
  isPinned?: boolean;
  replyTo?: string;
}

export interface Chat {
  id: string;
  type: 'private' | 'group' | 'channel';
  participants: User[];
  messages: Message[];
  unreadCount: number;
  isMuted: boolean;
  isPinned: boolean;
  pinnedMessages?: string[];
  name?: string;
  avatar?: string;
  description?: string;
  isPublic?: boolean;
  memberCount?: number;
}

export interface Channel {
  id: string;
  name: string;
  description: string;
  avatar: string;
  memberCount: number;
  category: string;
  isVerified: boolean;
  isPublic: boolean;
}

export interface CallLog {
  id: string;
  chatId: string;
  chatName: string;
  chatAvatar: string;
  type: 'audio' | 'video';
  direction: 'incoming' | 'outgoing' | 'missed';
  timestamp: Date;
  duration: number; // in seconds
}
