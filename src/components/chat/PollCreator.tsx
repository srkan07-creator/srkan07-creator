import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Plus, Trash2, BarChart3 } from 'lucide-react';

interface PollCreatorProps {
  onClose: () => void;
  onCreate: (question: string, options: string[], allowMultiple: boolean) => void;
}

export const PollCreator: React.FC<PollCreatorProps> = ({ onClose, onCreate }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [allowMultiple, setAllowMultiple] = useState(false);

  const addOption = () => {
    if (options.length < 6) {
      setOptions([...options, '']);
    }
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleCreate = () => {
    const validOptions = options.filter(opt => opt.trim() !== '');
    if (question.trim() && validOptions.length >= 2) {
      onCreate(question.trim(), validOptions, allowMultiple);
    }
  };

  const isValid = question.trim() && options.filter(opt => opt.trim() !== '').length >= 2;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-md bg-surface dark:bg-dark-surface rounded-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-wooqoo-primary/10 rounded-lg">
              <BarChart3 size={20} className="text-wooqoo-primary" />
            </div>
            <h3 className="font-semibold text-text-primary dark:text-dark-text-primary">
              Create Poll
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-paper dark:hover:bg-dark-background"
          >
            <X size={20} className="text-text-muted" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary dark:text-dark-text-primary mb-2">
              Question
            </label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="What's your question?"
              className="w-full bg-paper dark:bg-dark-background border border-paper dark:border-dark-background rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-wooqoo-primary outline-none"
              maxLength={100}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary dark:text-dark-text-primary mb-2">
              Options
            </label>
            <div className="space-y-2">
              {options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                    className="flex-1 bg-paper dark:bg-dark-background border border-paper dark:border-dark-background rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-wooqoo-primary outline-none"
                    maxLength={50}
                  />
                  {options.length > 2 && (
                    <button
                      onClick={() => removeOption(index)}
                      className="p-2 text-error hover:bg-error/10 rounded-lg"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            
            {options.length < 6 && (
              <button
                onClick={addOption}
                className="mt-2 flex items-center space-x-2 text-wooqoo-primary hover:text-wooqoo-primary/80 font-medium"
              >
                <Plus size={16} />
                <span>Add option</span>
              </button>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="allowMultiple"
              checked={allowMultiple}
              onChange={(e) => setAllowMultiple(e.target.checked)}
              className="w-4 h-4 text-wooqoo-primary bg-paper border-2 border-paper dark:border-dark-background rounded focus:ring-wooqoo-primary focus:ring-2"
            />
            <label htmlFor="allowMultiple" className="text-sm text-text-primary dark:text-dark-text-primary">
              Allow multiple selections
            </label>
          </div>
        </div>

        <div className="flex space-x-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 bg-paper dark:bg-dark-background text-text-muted rounded-xl font-medium hover:bg-text-muted/10 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={!isValid}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors ${
              isValid
                ? 'bg-wooqoo-primary text-white hover:bg-wooqoo-primary/90'
                : 'bg-text-muted/20 text-text-muted cursor-not-allowed'
            }`}
          >
            Create Poll
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
