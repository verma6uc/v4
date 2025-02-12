import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
  icon?: React.ElementType;
  badge?: {
    text: string;
    variant?: 'primary' | 'success' | 'warning' | 'error';
  };
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  variant?: 'default' | 'pills' | 'underline' | 'contained';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  onChange?: (tabId: string) => void;
  animated?: boolean;
}

export function Tabs({ 
  tabs, 
  defaultTab, 
  variant = 'default',
  size = 'md',
  fullWidth = false,
  className = '',
  onChange,
  animated = true
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].id);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    // Update indicator position when active tab changes
    const activeElement = document.querySelector(`[data-tab-id="${activeTab}"]`);
    if (activeElement) {
      const { offsetLeft, offsetWidth } = activeElement as HTMLElement;
      setIndicatorStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [activeTab]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'text-sm px-3 py-1.5';
      case 'lg':
        return 'text-base px-5 py-2.5';
      default:
        return 'text-sm px-4 py-2';
    }
  };

  const getTabStyles = (isActive: boolean) => {
    const baseStyles = `flex items-center gap-2 font-medium transition-all duration-200 ${getSizeStyles()}`;
    
    switch (variant) {
      case 'pills':
        return `${baseStyles} rounded-lg ${
          isActive 
            ? 'bg-blue-50 text-blue-600' 
            : 'text-gray-600 hover:bg-gray-50'
        }`;
      
      case 'underline':
        return `${baseStyles} ${
          isActive 
            ? 'text-blue-600' 
            : 'text-gray-600 hover:text-gray-900'
        }`;
      
      case 'contained':
        return `${baseStyles} ${
          isActive 
            ? 'bg-white text-blue-600 shadow-sm' 
            : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
        }`;
      
      default:
        return `${baseStyles} ${
          isActive 
            ? 'text-blue-600' 
            : 'text-gray-600 hover:text-gray-900'
        }`;
    }
  };

  const getBadgeStyles = (badgeVariant?: 'primary' | 'success' | 'warning' | 'error') => {
    const baseStyles = 'ml-2 px-2 py-0.5 text-xs font-medium rounded-full';
    
    switch (badgeVariant) {
      case 'success':
        return `${baseStyles} bg-green-50 text-green-600`;
      case 'warning':
        return `${baseStyles} bg-yellow-50 text-yellow-600`;
      case 'error':
        return `${baseStyles} bg-red-50 text-red-600`;
      default:
        return `${baseStyles} bg-blue-50 text-blue-600`;
    }
  };

  return (
    <div className={className}>
      <div className={`relative ${variant === 'contained' ? 'bg-gray-50 p-1 rounded-lg' : 'border-b border-gray-200'}`}>
        <nav 
          className={`flex ${fullWidth ? 'w-full' : 'space-x-4'}`} 
          aria-label="Tabs"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            
            return (
              <button
                key={tab.id}
                data-tab-id={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`${getTabStyles(isActive)} ${fullWidth ? 'flex-1' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {Icon && <Icon className="w-4 h-4" />}
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={getBadgeStyles(tab.badge.variant)}>
                    {tab.badge.text}
                  </span>
                )}
              </button>
            );
          })}

          {variant === 'underline' && (
            <div
              className="absolute bottom-0 h-0.5 bg-blue-600 transition-all duration-200"
              style={indicatorStyle}
            />
          )}
        </nav>
      </div>

      <div className="mt-4">
        {animated ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {tabs.find(tab => tab.id === activeTab)?.content}
            </motion.div>
          </AnimatePresence>
        ) : (
          tabs.find(tab => tab.id === activeTab)?.content
        )}
      </div>
    </div>
  );
}