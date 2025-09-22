import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, CheckCircle, Users, TrendingUp } from 'lucide-react';
import { mockChannels } from '../../data/mockData';

const categories = ['All', 'Technology', 'Design', 'Business', 'Entertainment', 'News', 'Sports'];

export const DiscoveryTab: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChannels = mockChannels.filter(channel => {
    const matchesCategory = selectedCategory === 'All' || channel.category === selectedCategory;
    const matchesSearch = channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         channel.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatMemberCount = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Search */}
      <div className="p-4 border-b border-paper dark:border-dark-background/50">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Discover channels & communities"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-paper dark:bg-dark-background border-none rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-wooqoo-primary outline-none"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp size={16} className="text-wooqoo-primary" />
          <h3 className="font-semibold text-text-primary dark:text-dark-text-primary">Trending</h3>
        </div>
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl whitespace-nowrap text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-wooqoo-primary text-white'
                  : 'bg-paper dark:bg-dark-background text-text-muted hover:text-wooqoo-primary'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Channels List */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="space-y-3">
          {filteredChannels.map((channel, index) => (
            <motion.div
              key={channel.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-surface dark:bg-dark-surface rounded-2xl p-4 border border-paper dark:border-dark-background"
            >
              <div className="flex items-start space-x-3">
                <img src={channel.avatar} alt={channel.name} className="w-12 h-12 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-text-primary dark:text-dark-text-primary truncate">
                      {channel.name}
                    </h4>
                    {channel.isVerified && (
                      <CheckCircle size={16} className="text-wooqoo-primary flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-text-muted dark:text-dark-text-muted line-clamp-2 mb-2">
                    {channel.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-text-muted">
                      <span className="flex items-center space-x-1">
                        <Users size={12} />
                        <span>{formatMemberCount(channel.memberCount)}</span>
                      </span>
                      <span className="px-2 py-1 bg-paper dark:bg-dark-background rounded text-xs">
                        {channel.category}
                      </span>
                    </div>
                    <button className="px-4 py-1.5 bg-wooqoo-primary text-white rounded-lg text-sm font-medium hover:bg-wooqoo-primary/90 transition-colors">
                      Join
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
