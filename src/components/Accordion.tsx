import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  icon?: React.ElementType;
  badge?: {
    text: string;
    variant?: 'primary' | 'success' | 'warning' | 'error';
  };
  disabled?: boolean;
}

interface AccordionProps {
  items: AccordionItem[];
  variant?: 'default' | 'bordered' | 'ghost' | 'contained';
  defaultOpen?: string[];
  allowMultiple?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  onChange?: (openItems: string[]) => void;
  animated?: boolean;
}

export function Accordion({
  items,
  variant = 'default',
  defaultOpen = [],
  allowMultiple = false,
  className = '',
  size = 'md',
  onChange,
  animated = true
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen);

  const toggleItem = (itemId: string) => {
    let newOpenItems: string[];
    
    if (allowMultiple) {
      newOpenItems = openItems.includes(itemId)
        ? openItems.filter(id => id !== itemId)
        : [...openItems, itemId];
    } else {
      newOpenItems = openItems.includes(itemId) ? [] : [itemId];
    }
    
    setOpenItems(newOpenItems);
    onChange?.(newOpenItems);
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'py-2 px-3';
      case 'lg':
        return 'py-4 px-5';
      default:
        return 'py-3 px-4';
    }
  };

  const getItemStyles = () => {
    const baseStyles = 'transition-all duration-200';
    
    switch (variant) {
      case 'bordered':
        return `${baseStyles} border border-gray-200 rounded-lg mb-2`;
      case 'contained':
        return `${baseStyles} bg-gray-50 rounded-lg mb-2`;
      case 'ghost':
        return `${baseStyles} bg-transparent`;
      default:
        return `${baseStyles} border-b border-gray-200`;
    }
  };

  const getButtonStyles = (isOpen: boolean, isDisabled: boolean) => {
    const baseStyles = `flex items-center justify-between w-full ${getSizeStyles()} text-left transition-colors duration-200`;
    
    if (isDisabled) {
      return `${baseStyles} cursor-not-allowed opacity-50`;
    }

    switch (variant) {
      case 'bordered':
      case 'contained':
        return `${baseStyles} ${
          isOpen 
            ? 'bg-gray-50 rounded-t-lg' 
            : 'hover:bg-gray-50 rounded-lg'
        }`;
      case 'ghost':
        return `${baseStyles} ${
          isOpen 
            ? 'bg-gray-50' 
            : 'hover:bg-gray-50'
        }`;
      default:
        return `${baseStyles} ${
          isOpen 
            ? 'bg-gray-50' 
            : 'hover:bg-gray-50'
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
    <div className={`space-y-2 ${className}`}>
      {items.map((item) => {
        const isOpen = openItems.includes(item.id);
        const Icon = item.icon;

        return (
          <div key={item.id} className={getItemStyles()}>
            <button
              type="button"
              onClick={() => !item.disabled && toggleItem(item.id)}
              className={getButtonStyles(isOpen, !!item.disabled)}
              aria-expanded={isOpen}
              disabled={item.disabled}
            >
              <span className="flex items-center gap-2">
                {Icon && <Icon className="w-5 h-5 text-gray-400" />}
                <span className="text-sm font-medium text-gray-900">
                  {item.title}
                </span>
                {item.badge && (
                  <span className={getBadgeStyles(item.badge.variant)}>
                    {item.badge.text}
                  </span>
                )}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                  isOpen ? 'transform rotate-180' : ''
                }`}
              />
            </button>
            
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={animated ? { height: 0, opacity: 0 } : false}
                  animate={animated ? { height: 'auto', opacity: 1 } : { opacity: 1 }}
                  exit={animated ? { height: 0, opacity: 0 } : { opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={`px-4 pb-4 ${variant === 'ghost' ? 'pt-2' : 'pt-0'}`}>
                    <div className="text-sm text-gray-600">
                      {item.content}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}