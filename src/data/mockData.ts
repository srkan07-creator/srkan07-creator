import { faker } from '@faker-js/faker';
import { User, Chat, Message, Channel, CallLog, Story } from '../types';

// Create mock stories
const createMockStories = (): Story[] => {
  if (faker.datatype.boolean(0.6)) return []; // 60% chance of no stories
  return Array.from({ length: faker.number.int({ min: 1, max: 4 }) }, () => ({
    id: faker.string.uuid(),
    type: 'image',
    url: faker.image.urlLoremFlickr({ category: 'nature' }),
    timestamp: faker.date.recent({ days: 1 }),
    duration: 5, // 5 seconds per story
  }));
};

// Create a pool of users with usernames
export const mockUsers: User[] = Array.from({ length: 20 }, (_, i) => {
  const stories = createMockStories();
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    username: faker.internet.userName().toLowerCase(),
    bio: faker.lorem.sentence(),
    avatar: `https://i.pravatar.cc/150?u=${faker.string.uuid()}`,
    isOnline: faker.datatype.boolean(0.7),
    phone: faker.phone.number(),
    isSaved: true,
    stories,
    hasUnreadStories: stories.length > 0,
  };
});

const unsavedUser: User = {
  id: 'unsaved-user-1',
  name: '+1-202-555-0184', // Initially name is phone number
  username: 'new_friend_84',
  avatar: `https://i.pravatar.cc/150?u=unsaved-user-1`,
  isOnline: true,
  phone: '+1-202-555-0184',
  isSaved: false,
  stories: [],
  hasUnreadStories: false,
};

mockUsers.push(unsavedUser);


const currentUser: User = {
  id: 'current-user',
  name: 'You',
  username: 'you',
  avatar: `https://i.pravatar.cc/150?u=current-user`,
  isOnline: true,
  isSaved: true,
  stories: createMockStories(),
  hasUnreadStories: false, // Current user's stories are always "read"
};
mockUsers.push(currentUser);

// Voice note samples
const voiceNotes = [
  { duration: 15, transcript: "Hey, I'll be there in 10 minutes!" },
  { duration: 8, transcript: "Can you pick up some milk on your way home?" },
  { duration: 22, transcript: "I just saw the funniest thing at the store, let me tell you about it..." },
  { duration: 5, transcript: "Thanks!" },
];

// Create mock messages with various types
const createMockMessages = (participants: User[]): Message[] => {
  const messages: Message[] = [];
  const messageCount = faker.number.int({ min: 15, max: 30 });
  let lastTimestamp = faker.date.recent({ days: 7 });

  for (let i = 0; i < messageCount; i++) {
    const sender = faker.helpers.arrayElement([...participants, currentUser]);
    lastTimestamp = new Date(lastTimestamp.getTime() + faker.number.int({ min: 1000, max: 3600000 }));
    
    const messageType = faker.helpers.weightedArrayElement([
      { weight: 0.5, value: 'text' },
      { weight: 0.15, value: 'image' },
      { weight: 0.1, value: 'voice' },
      { weight: 0.1, value: 'poll' },
      { weight: 0.15, value: 'call' },
    ]);

    const baseMessage = {
      id: faker.string.uuid(),
      timestamp: lastTimestamp,
      senderId: sender.id,
      status: sender.id === currentUser.id ? 'read' : faker.helpers.arrayElement(['sent', 'delivered', 'read']),
      isPinned: faker.datatype.boolean(0.05),
    };

    if (messageType === 'image') {
      messages.push({
        ...baseMessage,
        text: faker.datatype.boolean(0.3) ? faker.lorem.sentence() : '',
        type: 'image',
        imageUrl: faker.image.urlLoremFlickr({ width: 400, height: 300, category: 'abstract' }),
      });
    } else if (messageType === 'voice' && sender.id !== 'unsaved-user-1') {
      const voiceNote = faker.helpers.arrayElement(voiceNotes);
      messages.push({
        ...baseMessage, text: '', type: 'voice', voiceData: { ...voiceNote, audioUrl: `https://audio-sample.com/${faker.string.uuid()}.mp3` },
      });
    } else if (messageType === 'poll' && sender.id !== 'unsaved-user-1') {
      const options = Array.from({ length: faker.number.int({ min: 2, max: 4 }) }, () => ({
        id: faker.string.uuid(), text: faker.lorem.words(2), votes: faker.helpers.arrayElements(participants.map(p => p.id), faker.number.int({ min: 0, max: 3 })),
      }));
      messages.push({
        ...baseMessage, text: '', type: 'poll', pollData: { question: faker.lorem.sentence().replace('.', '?'), options, allowMultiple: faker.datatype.boolean(0.3) },
      });
    } else if (messageType === 'call') {
      const direction = sender.id === currentUser.id ? 'outgoing' : faker.helpers.weightedArrayElement([{weight: 0.6, value: 'incoming'}, {weight: 0.4, value: 'missed'}]);
      messages.push({
        ...baseMessage, text: '', type: 'call', callData: {
          type: faker.helpers.arrayElement(['audio', 'video']),
          duration: direction === 'missed' ? 0 : faker.number.int({ min: 10, max: 1800 }),
          direction: direction,
        },
      });
    } else {
      messages.push({ ...baseMessage, text: faker.lorem.sentence(), type: 'text' });
    }
  }
  return messages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
};

// Create mock chats
export const mockChats: Chat[] = Array.from({ length: 15 }, () => {
  const isGroup = faker.datatype.boolean(0.4);
  const isChannel = faker.datatype.boolean(0.2);
  const type = isChannel ? 'channel' : isGroup ? 'group' : 'private';
  
  const participants = type === 'private'
    ? [faker.helpers.arrayElement(mockUsers.filter(u => u.id !== unsavedUser.id && u.isSaved))]
    : faker.helpers.arrayElements(mockUsers.filter(u => u.isSaved), faker.number.int({ min: 3, max: 8 }));
  
  const messages = createMockMessages(participants);
  const pinnedMessages = messages.filter(m => m.isPinned).map(m => m.id);

  return {
    id: faker.string.uuid(), type, participants, messages,
    unreadCount: faker.number.int({ min: 0, max: 5 }),
    isMuted: faker.datatype.boolean(0.2),
    isPinned: faker.datatype.boolean(0.1),
    pinnedMessages,
    name: type !== 'private' ? faker.company.name() : undefined,
    avatar: type !== 'private' ? `https://i.pravatar.cc/150?u=${faker.string.uuid()}` : undefined,
    description: type === 'channel' ? faker.lorem.paragraph() : undefined,
    isPublic: type === 'channel' ? faker.datatype.boolean(0.7) : false,
    memberCount: type === 'channel' ? faker.number.int({ min: 100, max: 50000 }) : undefined,
  };
});

// Add the chat with the unsaved user
const unsavedChat: Chat = {
    id: 'chat-with-unsaved', type: 'private', participants: [unsavedUser], messages: createMockMessages([unsavedUser]), unreadCount: 2, isMuted: false, isPinned: true,
};
mockChats.unshift(unsavedChat);


mockChats.sort((a, b) => {
  if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
  const lastMessageA = a.messages[a.messages.length - 1];
  const lastMessageB = b.messages[b.messages.length - 1];
  return lastMessageB.timestamp.getTime() - lastMessageA.timestamp.getTime();
});

// Mock trending channels for discovery
export const mockChannels: Channel[] = Array.from({ length: 20 }, () => ({
  id: faker.string.uuid(), name: faker.company.name(), description: faker.lorem.sentence(), avatar: `https://i.pravatar.cc/150?u=${faker.string.uuid()}`, memberCount: faker.number.int({ min: 1000, max: 100000 }), category: faker.helpers.arrayElement(['Technology', 'Design', 'Business', 'Entertainment', 'News', 'Sports']), isVerified: faker.datatype.boolean(0.3), isPublic: true,
}));


// Mock Call Logs from chats
export const mockCallLogs: CallLog[] = mockChats
  .flatMap(chat => {
    const callMessages = chat.messages.filter(m => m.type === 'call' && m.callData);
    return callMessages.map(msg => ({
      id: msg.id,
      chatId: chat.id,
      chatName: chat.type === 'private' ? chat.participants[0].name : chat.name!,
      chatAvatar: chat.type === 'private' ? chat.participants[0].avatar : chat.avatar!,
      type: msg.callData!.type,
      direction: msg.callData!.direction,
      timestamp: msg.timestamp,
      duration: msg.callData!.duration,
    }));
  })
  .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
