import React from 'react';
import { ChevronRight } from 'lucide-react';

interface SettingsListItemProps {
  icon: React.ElementType;
  iconColor: string;
  label: string;
  sublabel?: string;
  action?: 'navigate' | 'toggle';
  onClick?: () => void;
  isToggled?: boolean;
  onToggle?: (toggled: boolean) => void;
}

export const SettingsListItem: React.FC<SettingsListItemProps> = ({
  icon: Icon,
  iconColor,
  label,
  sublabel,
  action = 'navigate',
  onClick,
  isToggled,
  onToggle,
}) => {
  const content = (
    <>
      <div className={`p-2 rounded-lg ${iconColor}`}>
        <Icon size={18} className="text-white" />
      </div>
      <div className="flex-1 ml-4">
        <span className="font-medium text-base">{label}</span>
        {sublabel && <p className="text-xs text-text-muted">{sublabel}</p>}
      </div>
      {action === 'navigate' && <ChevronRight size={20} className="text-text-muted/50" />}
      {action === 'toggle' && (
        <label className="relative inline-flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            className="sr-only peer" 
            checked={isToggled}
            onChange={(e) => onToggle?.(e.target.checked)}
          />
          <div className="w-11 h-6 bg-paper dark:bg-dark-background rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-wooqoo-primary"></div>
        </label>
      )}
    </>
  );

  return action === 'navigate' ? (
    <button onClick={onClick} className="w-full flex items-center px-4 py-3 hover:bg-surface dark:hover:bg-dark-surface transition-colors text-left">
      {content}
    </button>
  ) : (
    <div onClick={onClick} className="flex items-center px-4 py-3 hover:bg-surface dark:hover:bg-dark-surface transition-colors">
      {content}
    </div>
  );
};
